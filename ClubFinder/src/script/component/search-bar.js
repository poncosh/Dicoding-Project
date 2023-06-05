class SearchBar extends HTMLElement {
    connectedCallback() {
        this.getAttribute('placeholder') || null
        this.getAttribute('id') || null
        this.getAttribute('type') || null
        this.render();
    };


    get value() {
        return this.querySelector('#searchElement').value;
    }
    render() {
        this.innerHTML = `
                <div id="search-container" class="search-container">           
                    <input placeholder="Search football club" id="searchElement" type="search">
                    <button id="searchButtonElement" type="submit">Search</button>
                </div>
            `;

    }
}

customElements.define('search-bar', SearchBar);