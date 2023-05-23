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

function generateBookshelfObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
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
   
    document.dispatchEvent(new Event(RENDER_EVENT));
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
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;

    const generatedID = generateId();
    const booksObject = generateBookshelfObject(generatedID, bookTitle, bookAuthor, bookYear, false);
    bookshelves.push(booksObject);

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

function addBookToCompleted(bookId) {
    const bookTarget = findBooks(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveData();
}

function removeBooksFromCompleted(bookId) {
    const bookTarget = findBooksIndex(bookId);

    if (bookTarget === -1) return;

    bookshelves.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveData();
}

function undoBooksTaskFromCompleted(bookId) {
    const bookTarget = findBooks(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_BOOKS));
    saveData();
}

function makeBookshelves(booksObject) {
    const bookTitle = document.createElement('h2');
    bookTitle.innerText = booksObject.title;

    const bookAuthor = document.createElement('h2');
    bookAuthor.innerText = booksObject.author;

    const bookYear = document.createElement('h2');
    bookYear.innerText = booksObject.year;

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('inner');
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(bookContainer);
    container.setAttribute('id', `books-${booksObject.id}`);

    if (booksObject.isComplete) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function () {
            undoBooksTaskFromCompleted(booksObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click', function () {
            removeBooksFromCompleted(booksObject.id);
        });

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function () {
            addBookToCompleted(booksObject.id);
        });

        container.append(checkButton);
    }

    return container;
}

document.addEventListener(RENDER_BOOKS, function () {
    //console.log(todos);
    const uncompleteBOOKSList = document.getElementById('incompleteBookshelfList');
    uncompleteBOOKSList.innerHTML = '';

    const completedBOOKSList = document.getElementById('completeBookshelfList');
    completedBOOKSList.innerHTML = '';

    for (const bookItem of bookshelves) {
        const bookElement = makeBookshelves(bookItem);
        if (!bookItem.isComplete) {
            uncompleteBOOKSList.append(bookElement);
        } else {
            completedBOOKSList.append(bookElement);
        }
    }
});

document.addEventListener(RENDER_BOOKS, function () {
    const uncompletedBOOKSList = document.getElementById('incompleteBookshelfList');
    const listCompleted = document.getElementById('completeBookshelfList');
  
    // clearing list item
    uncompletedBOOKSList.innerHTML = '';
    listCompleted.innerHTML = '';
  
    for (const bookItem of bookshelves) {
      const todoElement = makeBookshelves(bookItem);
      if (bookItem.isComplete) {
        listCompleted.append(bookElement);
      } else {
        uncompletedBOOKSList.append(bookElement);
      }
    }
});

document.addEventListener('DOMContentLoaded', function () {

    const submitForm /* HTMLFormElement */ = document.getElementById('inputBook');
  
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBooks();
    });
  
    if (isStorageExist()) {
      loadDataFromStorage();
    }
});

document.addEventListener(SAVED_BOOKS, () => {
    console.log("Data berhasil disimpan");
})