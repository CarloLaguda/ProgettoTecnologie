import { getBooks, deleteBook, createBook, getGenres } from "../script.js";

const libri = document.getElementById("books");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const genreSelect = document.getElementById("genreSelect");
const selectGenere = document.getElementById("selectGenere");
const searchButton = document.getElementById("searchButton");
const addBook = document.getElementById("addBook");
const inputTitle = document.getElementById("title");

let allBooks = [];
let idNumber = 0;

searchInput.addEventListener("input", filterBooks);
priceRange.addEventListener("input", function() {
    priceValue.textContent = priceRange.value;
    filterBooks();
});
genreSelect.addEventListener("change", filterBooks);
selectGenere.addEventListener("change", updateAddBook);

searchButton.addEventListener("click", filterBooks);
addBook.addEventListener("click", addNewBook);

async function initialize() {
    await Promise.all([loadGenres(), loadBooks()]);
}

async function loadBooks() {
    try {
        allBooks = await getBooks();
        displayBooks(allBooks);
    } catch (error) {
        console.error('Failed to load books:', error);
    }
}

async function loadGenres() {
    try {
        const genres = await getGenres();
        genreSelect.innerHTML = '<option value="" disabled selected>Select Genre</option>';
        selectGenere.innerHTML = '<option value="" disabled selected>Select Genre</option>';
        genres.forEach(genre => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = genre.genreId;
            option2.value = genre.genreId;
            option1.textContent = genre.description;
            option2.textContent = genre.description;
            genreSelect.appendChild(option1);
            selectGenere.appendChild(option2);
        });
    } catch (error) {
        console.error('Failed to load genres:', error);
    }
}

function updateAddBook() {
    const selectedGenre = selectGenere.options[selectGenere.selectedIndex];
    inputTitle.disabled = selectedGenre.value === "";
}

async function addNewBook() {
    const selectedGenre = selectGenere.options[selectGenere.selectedIndex];
    const selectedValue = selectedGenre.value;
    const titleValue = inputTitle.value.trim();

    if (selectedValue === "") {
        alert("Please select a genre for the book.");
        return;
    }

    if (titleValue === "") {
        alert("The title of the book cannot be empty.");
        return;
    }

    const post = {
        id: idNumber,
        title: titleValue,
        price: 24,
        isOut: true,
        isbn: "asdasdasdasdasd",
        genreId: selectedValue,
        shelfId: 1,
        genreName: "string"
    };

    try {
        await createBook(post);
        await loadBooks();
        idNumber++;
        inputTitle.value = "";
    } catch (error) {
        console.error('Failed to create the book:', error);
    }
}

function filterBooks() {
    const searchQuery = searchInput.value.toLowerCase();
    const maxPrice = parseFloat(priceRange.value);
    const selectedGenre = genreSelect.value;

    let filteredBooks = allBooks;

    if (selectedGenre !== "") {
        filteredBooks = filteredBooks.filter(book => book.genreId === parseInt(selectedGenre));
    }

    filteredBooks = filteredBooks.filter(book => book.price <= maxPrice);

    if (searchQuery) {
        filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchQuery));
    }

    displayBooks(filteredBooks);
}

function displayBooks(books) {
    libri.innerHTML = "";
    books.forEach(bookData => {
        createDivBook(bookData.title, bookData.id);
    });
}

function createDivBook(dataTitle, dataId) {
    const book = document.createElement("div");
    book.classList.add("book");

    const img = document.createElement("img");
    img.src = "#";
    img.alt = "Book image";
    book.appendChild(img);

    const desc = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = dataTitle;
    desc.appendChild(title);
    const description = document.createElement("p");
    description.textContent = "Brief description";
    desc.appendChild(description);
    book.appendChild(desc);

    const stella = document.createElement("div");
    stella.classList.add("stella");
    const btnStella = document.createElement("button");
    btnStella.textContent = "Favorite";
    stella.appendChild(btnStella);
    book.appendChild(stella);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    const btnModifica = document.createElement("button");
    btnModifica.classList.add("btn");
    btnModifica.textContent = "Edit";
    buttons.appendChild(btnModifica);
    const btnElimina = document.createElement("button");
    btnElimina.value = dataId;
    btnElimina.addEventListener("click", async function() {
        try {
            await deleteBook(parseInt(this.value));
            this.parentElement.parentElement.remove();
        } catch (error) {
            console.error('Failed to delete the book:', error);
        }
    });
    btnElimina.classList.add("btn");
    btnElimina.textContent = "Delete";
    buttons.appendChild(btnElimina);
    const btnSegnala = document.createElement("button");
    btnSegnala.classList.add("btn");
    btnSegnala.textContent = "Report";
    buttons.appendChild(btnSegnala);
    book.appendChild(buttons);

    libri.appendChild(book);
}

initialize();