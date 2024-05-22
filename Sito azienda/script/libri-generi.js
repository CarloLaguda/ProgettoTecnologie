import { getBooks, deleteBook, createBook, getGenres, updateData } from "../script.js";

const libri = document.getElementById("books");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const genreSelect = document.getElementById("genreSelect");
const selectGenere = document.getElementById("selectGenere");
const searchButton = document.getElementById("searchButton");
const addBook = document.getElementById("addBook");
const inputTitle = document.getElementById("title");
const preferitiDiv = document.getElementById("libriPreferiti")
const generi = document.getElementById("generi")

let allBooks = [];
let idNumber = 0;
let genres = [];
let findGenres = []
let favourites = [];

searchInput.addEventListener("input", filterBooks);
priceRange.addEventListener("input", function() {
    priceValue.textContent = priceRange.value;
    filterBooks();
});
genreSelect.addEventListener("change", filterBooks);
selectGenere.addEventListener("change", updateAddBook);

addBook.addEventListener("click", addNewBook);

async function initialize() {
    await Promise.all([loadGenres(), loadBooks()]);
}

async function loadBooks() {
    try {
        allBooks = await getBooks();
        console.log(allBooks);
        displayBooks(allBooks);
    } catch (error) {
        console.error('Failed to load books:', error);
    }
}

async function loadGenres() {
    try {
        genres = await getGenres();
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
//#region 
    if (titleValue === "") {
        alert("The title of the book cannot be empty.");
        return;
    }else if(titleValue === "Tizi"){
        alert("CUPARDO GAY!!!!!!!!")
    }
//#endregion

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
        findGeneri()
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
    btnStella.value = dataId;
    btnStella.addEventListener("click", function(){
        if(checkIfAlreadyFav(this.value)){
            alert("Il libro è già nei preferiti")
        }else{
            addFavourite(this.value)
        }
    })
    btnStella.textContent = "Favorite";
    stella.appendChild(btnStella);
    book.appendChild(stella);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const btnElimina = document.createElement("button");
    btnElimina.value = dataId;
    btnElimina.addEventListener("click", async function() {
        try {
            await deleteBook(parseInt(this.value));
            findGeneri()
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
    btnSegnala.addEventListener('click', function(){
        emailjs.init('dkVykgsHdumN4cCws');
        const params = {
            email: 'Unknown User',
            oggetto_mail: 'Segnalazione Libro',
            messaggio: 'Viene segnalato questo libro ' + dataTitle + 'per imprecisioni o per argomenti pococ consoni a dei libro' 
        }
        emailjs.send('service_9nsoibj', 'template_9qfnw2v', params)
        .then(function (response) {
            // Mostra un messaggio di successo
            alert("Email inviata con successo!");
        }, function (error) {
            // Mostra un messaggio di errore in caso di fallimento
            alert("Errore durante l'invio dell'email: " + error);
            // Resetta i campi del modulo in caso di errore
        });
    })
    buttons.appendChild(btnSegnala);
    book.appendChild(buttons);

    libri.appendChild(book);
}

initialize();

function openEditModal(id, currentTitle, currentDescription, currentGenreId) {
    const modalTitleInput = document.getElementById("modalTitle");
    modalTitleInput.value = currentTitle;

    const modalDescriptionInput = document.getElementById("modalDescription");
    modalDescriptionInput.value = currentDescription;

    const modalGenreSelect = document.getElementById("modalGenre");
    modalGenreSelect.innerHTML = '<option value="" disabled>Select Genre</option>';
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.genreId;
        option.textContent = genre.description;
        if (genre.genreId === currentGenreId) {
            option.selected = true;
        }
        modalGenreSelect.appendChild(option);
    });

    const saveButton = document.getElementById("saveButton");
    saveButton.onclick = async function() {
        const newName = modalTitleInput.value.trim();
        const newDescription = modalDescriptionInput.value.trim();
        const newGenreId = parseInt(modalGenreSelect.value);

        if (!newName || !newDescription || isNaN(newGenreId)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const updatedData = {
            title: newName,
            description: newDescription,
            genreId: newGenreId
        };

        try {
            await updateBook(id, updatedData);
            closeModal();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const modal = document.getElementById("editModal");
    modal.style.display = "block";
}

const URL = 'https://librarymanagementpw.azurewebsites.net';

async function updateBook(id, updatedData) {
    const url = `${URL}/api/Book/${id}`;
    
    try {
        console.log(`Updating book with ID: ${id}`);
        console.log(`PUT URL: ${url}`);
        console.log('Data being sent:', updatedData);

        const response = await updateData({ ...updatedData, id }); // Add the ID to the updated data
        
        if (!response.ok) {
            const errorDetails = await response.json().catch(() => ({}));
            console.error('Failed to update the book:', response.status, errorDetails);
            throw new Error(`Failed to update the book: ${response.statusText}`);
        }

        console.log('Book updated successfully');
        await loadBooks();
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}

const loadFavourites =  async () => {
    let libri = await getBooks()

    preferitiDiv.innerHTML = ""

    for(let i = 0; i < favourites.length; i++){
        libri.forEach(book => {
            if(favourites[i] == parseInt(book.id)){
                const newFav = document.createElement("div")
                newFav.classList.add("preferito")
                const title = document.createElement("h3")
                title.innerHTML = book.title
                newFav.appendChild(title)
                const deleteFav = document.createElement("button")
                deleteFav.value = book.id
                deleteFav.innerHTML = "Togli preferito"
                deleteFav.addEventListener("click", function(){
                    deleteFavourite(parseInt(this.value))
                })
                newFav.appendChild(deleteFav)
                preferitiDiv.appendChild(newFav)
            }
        })
    }
}

const addFavourite =  async (id) => {
    favourites.push(id)
    loadFavourites()
}

function deleteFavourite(id){
    for(let i = 0; i < favourites.length; i++){
        if(favourites[i] == id){
            favourites.splice(i, 1)
            break
        }
    }

    loadFavourites()
}

function checkIfAlreadyFav(id){
    for(let i = 0; i < favourites.length; i++){
        if(favourites[i] == id){
            return true;
        }
    }

    return false;
}

const findGeneri = async () => {
    generi.innerHTML = ""

    let books = await getBooks()

    books.forEach(libro => {
        if(findGenres.length == 0){
            findGenres.push(libro.genreName)
        }else{
            if(checkIfAlreadyGenre(libro.genreName)){
                console.log("")
            }else{
                findGenres.push(libro.genreName)
            }
        }
    })

    console.log(findGenres)
    displayGenres(findGenres)
}

function checkIfAlreadyGenre(libro){
    for(let i = 0; i < findGenres.length; i++){
        if(libro == findGenres[i]){
            return true
        }
    }

    return false
}

async function displayGenres(findGenres){
    let books = await getBooks()

    findGenres.forEach(genre => {
        console.log(genre)
        const newGenre = document.createElement("div")
        const titleGenre = document.createElement("h2")
        titleGenre.innerHTML = genre
        newGenre.appendChild(titleGenre)
        const flexGenre = document.createElement("div")
        flexGenre.classList.add("genere")
        newGenre.appendChild(flexGenre)
        for(let i = 0; i < books.length; i++){
            if(books[i].genreName == genre){
                const book = document.createElement("div")
                book.classList.add("bookGenre")
                const title = document.createElement("h3")
                title.innerHTML = books[i].title
                book.appendChild(title)
                flexGenre.appendChild(book)
            }
        }
        generi.appendChild(newGenre)
    })
}

findGeneri()
