import { getBooks, deleteBook, createBook, getGenres } from "../script.js";


const scaffali = document.getElementById("scaffali");
const addShelfButton = document.getElementById("addShelf");
const deleteShelfButton = document.getElementById("deleteShelf");

const addShelf = async (shelfName) => {
    const res = await fetch(`${URL}/api/Shelf`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: shelfName }),
    });
    return res;
}

const deleteShelf = async (shelfId) => {
    const res = await fetch(`${URL}/api/Shelf/${shelfId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}

addShelfButton.addEventListener("click", async function() {
    const shelfName = prompt("Enter shelf name:");
    await addShelf(shelfName);
});

deleteShelfButton.addEventListener("click", async function() {
    const shelfId = prompt("Enter shelf ID to delete:");
    await deleteShelf(shelfId);
});