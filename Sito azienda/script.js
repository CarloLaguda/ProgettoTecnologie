const URL = 'https://librarymanagementpw.azurewebsites.net/'

// lista libri
const getBooks = async () => {
    const res = await fetch(`${URL}/api/Book`);
    const data = await res.json();
    return data;
}

// crea un libro
const createBook = async (post) => {

    const res = await fetch(`${URL}/api/Book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })

    return res;
}

// cancella un libro
const deleteBook = async (id) => {
    const res = await fetch(`${URL}/api/Book/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return res;
}

// lista generi
const getGenres = async () => {
    const res = await fetch(`${URL}/api/Genre`);
    const data = await res.json();
    return data;
}

// crea un genere
const createGenre = async (genre) => {
    const res = await fetch(`${URL}/api/Genre`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: genre }),
    })
    return res;
}

// cancella un genere
const deleteGenre = async (id) => {
    const res = await fetch(`${URL}/api/Genre/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return res;
}

export { deleteBook, deleteGenre, createGenre, createBook, getGenres, getBooks }
