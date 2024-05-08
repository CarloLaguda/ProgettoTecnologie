//Sr Matta le metto i due codici che ci hanno fornito
button.addEventListener('click', function(name){
fetch('https://librarymanagementpw.azurewebsites.net/api/Book')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(err => alert("get andata male"));
})

post = {
  "id": 4,
  "title": "prova",
  "price": 24,
  "isOut": true,
  "isbn": "asdasdasdasdasd",
  "genreId": 1,
  "shelfId": 1,
  "genreName": "string"
}

const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
};

button1.addEventListener('click', function(name){
fetch('https://librarymanagementpw.azurewebsites.net/api/Book', requestOptions)
.catch(error => {
  console.error(error);
  alert("Post andata male");
})
})
/***********************************************************/

const URL = 'https://librarymanagementpw.azurewebsites.net'

// lista libri
const getBooks = async () => {
	const res = await fetch(`${URL}/api/Book`)
	const data = await res.json()
	return data
}
// crea un libro
const createBook = async (book) => {
	const res = await fetch(`${URL}/api/Book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
	})
	return res
}

// cancella un libro
const deleteBook = async (id) => {
	const res = await fetch(`${URL}/api/Book/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return res
}
// lista generi
const getGenres = async () => {
	const res = await fetch(`${URL}/api/Genre`)
	const data = await res.json()
	return data
}
// crea un genere
const createGenre = async (genre) => {
	const res = await fetch(`${URL}/api/Genre`, {
	    method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(genre),
	})
    return res
}
// cancella un genere
const deleteGenre = async (id) => {
	const res = await fetch(`${URL}/api/Genre/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return res
}
async function test() {
// lista dei generi
    let generi = await getGenres()
	console.log('lista dei generi', generi)
	// stampo i generi in pagina
	for (let genere of generi) {
		const genereEl = document.createElement('div')
		genereEl.innerHTML = genere.description
		document.body.appendChild(genereEl)
	}
	// creo un genere
	const genereRes = await createGenre({ description: 'test' })
	console.log('genere creato (risposta)', genereRes)
	//riscarico i generei
	generi = await getGenres()
	console.log('lista dei generi', generi)
	// recupero l'ultimo genere creato
	const genereCreato = generi[generi.length - 1]
	console.log('genere creato (oggetto)', genereCreato)
	//cancello il genere appena creato
	const delGenre = await deleteGenre(genereCreato.genreId)
	console.log('genere cancellato (risposta)', delGenre)
	//riscarico i generei
	generi = await getGenres()
	console.log('lista dei generi', generi)
    // lista dei libri
	let books = await getBooks()
	console.log('lista dei libri', books)
	// creo un libro
	const bookRes = await createBook({
		title: 'Libro test',
		price: 10,
		isOut: true,
		isbn: '1000-0000-0000',
		genreId: 1,
	})
	console.log('libro creato (risposta)', bookRes)
    // lista dei libri
	books = await getBooks()
	console.log('lista dei libri', books)
	// recupero l'ultimo libro creato
	const bookCreato = books[books.length - 1]
	console.log('libro creato (oggetto)', bookCreato)
	//cancello il libro appena creato
	const delBook = await deleteBook(bookCreato.id)
	console.log('libro cancellato (risposta)', delBook)
	//riscarico i libri
	books = await getBooks()
	console.log('lista dei libri', books)
	// pulizia generi
	// for (let genere of generi) {
	// 	if (genere.genreId > 11) {
    // 		const res = await deleteGenre(genere.genreId)
	// 		console.log('genere cancellato (risposta)', res)
	// 	}
	// }
	// pulizia libri
	// for (let book of books) {
	// 	const res = await deleteBook(book.id)
	// 	console.log('libro cancellato (risposta)', res)
	// }
}
test()