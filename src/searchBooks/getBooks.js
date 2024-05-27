const booksList = document.querySelector(".books-list");
const searchInput = document.getElementById("filter-book");
const URL = "http://localhost:3000/BOOKS";

async function fetchBooks() {
  try {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        showBooksOnDisplay(data);
      });
  } catch (error) {
    throw new Error(error);
  }
}

function showBooksOnDisplay(data) {
  for (let i = 0; i < data.length; i++) {
    const { title, genre, author, image } = data[i];
    const bookTitle = document.createElement("h2");
    const bookGenre = document.createElement("p");
    const bookAuthor = document.createElement("h3");
    const bookImage = document.createElement("img");

    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    bookTitle.setAttribute("class", "book-title");
    bookTitle.append(title);
    bookGenre.setAttribute("class", "book-genre");
    bookGenre.append(genre);
    bookAuthor.setAttribute("class", "book-author");
    bookAuthor.append(author);
    bookImage.setAttribute("src", `./images/${image}`);
    bookImage.setAttribute("alt", title);
    bookImage.append(image);

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookImage);
    bookCard.appendChild(bookGenre);
    bookCard.appendChild(bookAuthor);

    booksList.append(bookCard);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  filterBookByName();
}

function filterBookByName() {
  const filterValue = searchInput.value.toLowerCase();
  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach((card) => {
    const title = card.querySelector(".book-title");
    if (title.textContent.toLowerCase().includes(filterValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterBookByName);

fetchBooks();
