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

    this.setRead = function(read) {
        this.read = read;
    }

    this.getRead = function() {
        return this.read;
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
                '<button class="remove_button" data-index=' + myLibrary.indexOf(book) +'>Remove</button>' +
                '<h2>' + book.getTitleAndAuthor() + '</h2>' +
                '<p>' + book.getPages() + '</p>' +
                '<p>Genre: <span class="emphasis">' + book.getGenre() + '</spa>' +
                '<div class="read '+ (book.getRead() ? 'yes' : 'no') +'" data-index=' + myLibrary.indexOf(book) +'>' + (book.getRead() ? 'yes' : 'no') + '</div >' +
                '</div>'
    })

    let buttonsRemoval = document.getElementsByClassName('remove_button');
    for (let button of buttonsRemoval) {
        button.addEventListener('click', function(e) {
            let index = e.target.getAttribute('data-index');
            console.log(index)
            myLibrary.splice(index, 1);
            loadLibrary();
        })
    }
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

let readButtons = document.getElementsByClassName('read');
for (button of readButtons) {
    button.addEventListener('click', function(e) {
        let index = e.target.getAttribute('data-index');
        let element = e.target;
        book = myLibrary[index];
        book.setRead(!book.getRead());
        if (book.getRead()) {
            element.classList.add('yes');
            element.innerHTML = 'yes';
            element.classList.remove('no');
        } else {
            element.classList.add('no');
            element.innerHTML = 'no';
            element.classList.remove('yes'); 
        }
    });
}