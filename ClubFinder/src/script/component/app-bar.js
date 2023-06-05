class AppBar extends HTMLElement {
    connectedCallback() {
        this.getElementsByTagName('h2') || null
        this.render();
    };

    render() {
        this.innerHTML = `
                <h2>Club Finder</h2>
            `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this.render();
    }
     
      static get observedAttributes() {
        return ['h2'];
    }
}

customElements.define('app-bar', AppBar);