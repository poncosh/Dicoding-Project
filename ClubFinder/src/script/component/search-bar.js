class SearchBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
      this.render();
    }
    
    set clickEvent(event) {
      this._clickEvent = event;
      this.render();
    }

    get value() {
      return this._shadowRoot.querySelector('#searchElement').value;
    }
   
    render() {
        this._shadowRoot.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

        .search-container {
        max-width: 800px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        padding: 16px;
        border-radius: 5px;
        display: flex;
        position: sticky;
        top: 10px;
        background-color: white;
        }

        .search-container > input {
        width: 75%;
        padding: 16px;
        border: 0;
        border-bottom: 1px solid #37003C;
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        }

        .search-container > input:focus {
        outline: 0;
        border-bottom: 2px solid #37003C;
        }

        .search-container > input:focus::placeholder {
        font-family: 'Quicksand', sans-serif;
        font-weight: bold;
        }

        .search-container > input::placeholder {
        color: #37003C;
        font-family: 'Quicksand', sans-serif;
        font-weight: normal;
        }

        .search-container > button {
        width: 23%;
        cursor: pointer;
        margin-left: auto;
        padding: 16px;
        background-color: #37003C;
        color: white;
        border: 0;
        border-radius: 10px;
        font-family: 'Quicksand', sans-serif;
        font-size: 0.96rem;
        transition: 0.5s;
        text-transform: uppercase;
        }

        .search-container > button:hover {
        font-size: 1.04rem;
        }

        @media screen and (max-width: 550px) {
        .search-container {
            flex-direction: column;
            position: static;
        }

        .search-container > input {
            width: 100%;
            margin-bottom: 12px;
        }

        .search-container > button {
            width: 100%;
        }
        }
        </style>
        <div id="search-container" class="search-container">
          <input placeholder="Search football club" id="searchElement" type="search">
          <button id="searchButtonElement" type="submit">Search</button>
        </div>
      `;
        
        const searchButton = this._shadowRoot.querySelector('#searchButtonElement');

        searchButton.addEventListener('click', this._clickEvent);
        this._shadowRoot.querySelector('#searchElement').addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                searchButton.click(this._clickEvent);
            }
        })
    }
}

customElements.define('search-bar', SearchBar);