document.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY >0);
});

const bookshelves = [];
const RENDER_BOOKS = 'render-bookshelf';
const SAVED_BOOKS = 'saved-books';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function generateId () {
    return +new Date();
}

function generateBookshelfObject(id, title, bookClass, author, year, isComplete) {
    return {
        id,
        title,
        bookClass,
        author,
        year,
        isComplete
    }
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookshelves);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_BOOKS));
    }
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
        for (const book of data) {
            bookshelves.push(book);
        }
    }
   
    document.dispatchEvent(new Event(RENDER_BOOKS));
}

function findBooks(bookId) {
    for (const bookItem of bookshelves) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function addBooks() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookClass = bookTitle.replace(/\s+/g, '')
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;

    const generatedID = generateId();
    const bookIsReaded = document.getElementById('inputBookIsComplete');
    
    if (bookIsReaded.checked) {
        const booksObject = generateBookshelfObject(generatedID, bookTitle, bookClass, bookAuthor, bookYear, true);

        bookshelves.push(booksObject);
    } else {
        const booksObject = generateBookshelfObject(generatedID, bookTitle, bookClass, bookAuthor, bookYear, false);

        bookshelves.push(booksObject);
    }

    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveData();
}

function findBooksIndex(bookId) {
    for (const index in bookshelves) {
        if (bookshelves[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function removeBooksFromCompleted(bookId) {
    const bookTarget = findBooksIndex(bookId);

    if (bookTarget === -1) return;

    bookshelves.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveData();
}

function undoBooksFromCompleted(bookId) {
    const bookTarget = findBooks(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveData();
}

document.addEventListener("change", function() {
    const bookIsReaded = document.getElementById('inputBookIsComplete');
    const submitBook = document.getElementById('bookSubmit');
    
    if (bookIsReaded.checked) {
        submitBook.innerHTML = `Input the book to <span>already read</span> shelf`
    } else {
        submitBook.innerHTML = `Input the book to <span>not yet read</span> shelf`
    }
})


function makeBooks(bookObject) {
    const undo = 'Not Yet Read';
    const alreadyRead = 'Already Read'
    const deletes = 'Delete Book'

    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerText = bookObject.year;

    const bookContainer = document.createElement('div');
    bookContainer.classList.add(`book-${bookObject.id}`);
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement('article');
    container.setAttribute('id', `book-${bookObject.bookClass}`);
    container.classList.add('book-item');
    container.classList.add('active');
    container.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.07), 0 15px 40px rgba(0, 0, 0, 0.07)"
    container.style.width = "100.6%"
    container.style.transition = "1s"
    container.append(bookContainer);
    requestAnimationFrame(() =>
        setTimeout(() => {
            container.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2), 0 15px 40px rgba(0, 0, 0, 0.2)"
            container.style.width = "100%"
        })
    );

    if (bookObject.isComplete) {
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('action');

        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerHTML = undo;

        undoButton.addEventListener('click', function () {
            undoBooksFromCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerHTML = deletes;

        deleteButton.addEventListener('click', function () {
            removeBooksFromCompleted(bookObject.id)
        });

        actionDiv.append(undoButton, deleteButton)
        bookContainer.append(actionDiv);
    } else {
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('action');

        const alreadyButton = document.createElement('button');
        alreadyButton.classList.add('green');
        alreadyButton.innerHTML = alreadyRead;

        alreadyButton.addEventListener('click', function () {
            addBooksToCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerHTML = deletes;

        deleteButton.addEventListener('click', function () {
            removeBooksFromCompleted(bookObject.id);
        });

        actionDiv.append(alreadyButton, deleteButton)
        bookContainer.append(actionDiv);
    }

    return container;
}



function addBooksToCompleted (bookId) {
    const bookTarget = findBooks(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveData();
}

document.addEventListener('DOMContentLoaded', function () {

    const submitForm /* HTMLFormElement */ = document.getElementById('inputBook');
    const searchButton = document.getElementById('searchBook');
  
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBooks();
    });
  
    if (isStorageExist()) {
      loadDataFromStorage();
    }

    searchButton.addEventListener('submit', function(event) {
        event.preventDefault();
        const bookName = document.getElementById('searchBookTitle').value;
        let bookIs = [];

        if (!bookName) {
            const notBook = document.querySelectorAll('article');
            notBook.forEach(article => {
                article.classList.remove('inactive');
                article.classList.add('active');
            })
        } else if (bookName) {
            for (const index in bookshelves) {
                if (!bookshelves[index].title.toLowerCase().match(bookName.toLowerCase())) {
                    const notBook = document.querySelectorAll('article');
                    notBook.forEach(article => {
                        article.classList.remove('active');
                        article.classList.add('inactive');
                    })

                } else if (bookshelves[index].title.toLowerCase().match(bookName.toLowerCase())) {
                    const notBook = document.querySelectorAll('article');

                    notBook.forEach(article => {
                        article.classList.remove('active');
                        article.classList.add('inactive');
                    })
                    

                    const isBook = document.querySelectorAll(`[id=book-${bookshelves[index].bookClass}]`);

                    bookIs.push(isBook)
                    
                } else {
                    const notBook = document.querySelectorAll('article');
                    notBook.forEach(article => {
                        article.classList.remove('active');
                        article.classList.add('inactive');
                    })
                }
            } 
        }

        for (let i = 0; i < bookIs.length; i++) {
            for (let j = 0; j < bookIs[i].length; j++) {
                bookIs[i][j].classList.add('active');
                bookIs[i][j].classList.remove('inactive');
            }   
        }

        console.log(`searching ${bookName}...`)
    });
});

document.addEventListener(RENDER_BOOKS, function () {

    const uncompleteBOOKSList = document.getElementById('incompleteBookshelfList');
    uncompleteBOOKSList.innerHTML = '';

    const completedBOOKSList = document.getElementById('completeBookshelfList');
    completedBOOKSList.innerHTML = '';

    for (const bookItem of bookshelves) {
        const bookElement = makeBooks(bookItem);
        if(!bookItem.isComplete) {
            uncompleteBOOKSList.append(bookElement);
        } else {
            completedBOOKSList.append(bookElement);
        }
    }
});
/*
document.addEventListener(RENDER_BOOKS, function () {
    const uncompleteBOOKSList = document.getElementById('incompleteBookshelfList');
    const completedBOOKSList = document.getElementById('completeBookshelfList');

    uncompleteBOOKSList.innerHTML = '';
    completedBOOKSList.innerHTML = '';

    for (const bookItem of bookshelves) {
        const bookElement = makeBooks(bookItem);
        if(bookItem.isComplete) {
            completedBOOKSList.append(bookElement);
        } else {
            uncompleteBOOKSList.append(bookElement);
        }
    }
});
*/