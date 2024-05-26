const booksList = document.querySelector(".books-list");

const getBooks = () => {
  fetch("http://localhost:3000/BOOKS")
    .then((res) => res.json())
    .then((data) => showBooks(data));
};

const showBooks = (data) => {
  for (let i = 0; i < data.length; i++) {
    const { title, genre, author, image } = data[i];
    const h3 = document.createElement("h3");
    const genreParagraph = document.createElement("p");
    const authorParagraph = document.createElement("p");
    const img = document.createElement("img");

    const div = document.createElement("div");
    div.setAttribute("class", "book-card");

    h3.setAttribute("class", "book-title");
    h3.append(title);
    genreParagraph.setAttribute("class", "book-genre");
    genreParagraph.append(genre);
    authorParagraph.setAttribute("class", "book-author");
    authorParagraph.append(author);
    img.setAttribute("src", `./images/${image}`);
    img.setAttribute("alt", title);
    img.append(image);

    div.appendChild(h3);
    div.appendChild(genreParagraph);
    div.appendChild(authorParagraph);
    div.appendChild(img);

    booksList.append(div);
  }
};

getBooks();
