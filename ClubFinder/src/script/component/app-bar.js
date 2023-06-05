class AppBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.getElementsByTagName('h2') || null
        this.render();
    };

    

    render() {
        this._shadowRoot.innerHTML = `
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

                * {
                    margin: 0;
                    padding: 0;
                }

                :host {
                    display: block;
                    width: 100%;
                    background-image: linear-gradient(to bottom right, #02F7C2, #5c81f0);
                    color: #360D3A;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                }

                h2 {
                    padding: 16px;
                }
                </style>

                <h2>Club Finder</h2>
            `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this._shadowRoot.render();
    }
     
      static get observedAttributes() {
        return ['h2'];
    }
}

customElements.define('app-bar', AppBar);