const myLibrary = [];
const libraryContainer = document.getElementById("libraryContainer");

function addToThelibrary(book) {
    myLibrary.push(book);
    return myLibrary;
}

function Book(title, author, pages, read, genre) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.genre = genre;

    this.getTitleAndAuthor = function() {
        return `${this.title} by ${this.author}`;
    }

    this.getPages = function() {
        return `${this.pages} pages`;
    }

    this.getRead = function() {
        return (this.read ? 'yes' : 'no');
    }

    this.getGenre = function() {
        return this.genre;
    }
}

let gameOfThrones = new Book('Game Of Thrones', 'George R.R. Martin', 694, true, 'fantasy');
let prideAndPrejudice = new Book('Pride And Prejudice', 'Jane Austen', 376, false, 'romance');
let oAutoDaCompadecida = new Book('O Auto da Compadecida', 'Ariano Suassuna', 208, false, 'comedy');
let captainsOfTheSand = new Book('Capitaes da Areia', 'Jorge Amado', 280, true, 'drama');

addToThelibrary(gameOfThrones);
addToThelibrary(prideAndPrejudice);
addToThelibrary(oAutoDaCompadecida);
addToThelibrary(captainsOfTheSand);

function loadLibrary() {
    libraryContainer.innerHTML = '';
    myLibrary.forEach(book => {
        libraryContainer.innerHTML += '<div class="card">' +
                '<h2>' + book.getTitleAndAuthor() + '</h2>' +
                '<p>' + book.getPages() + '</p>' +
                '<p>Genre: <span class="emphasis">' + book.getGenre() + '</spa>' +
                '<div class="read '+ book.getRead() +'">' + book.getRead() + '</div >' +
                '</div>'
    })
}

loadLibrary();

document.getElementById("formAddBook").addEventListener("submit", function (e) {
    e.preventDefault();
    let form = document.getElementById("formAddBook");
    let formData = new FormData(form);
    let title = formData.get("title_book");
    let author = formData.get("author_book");
    let pages = formData.get("pages_book");
    let genre = formData.get("genre_book");
    let readBook = false;
    if (formData.get("read_book") != null) {
        readBook = true;
    }

    let newBook = new Book(
        title,
        author,
        pages,
        readBook,
        genre
    );

    addToThelibrary(newBook);
    loadLibrary();
});
