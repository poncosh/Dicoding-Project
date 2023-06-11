class ClubItem extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
    }

    set club(club) {
      this._club = club;
      this.render();
    }
   
    render() {
      this._shadowRoot.innerHTML = `
        <style>
            club-item {
                margin-top: 32px 20px 10px 20px;
                overflow: hidden;
            }
            
            .fan-art-club {
                margin: 80px 20px 0 20px;
                height: 40%;
                width: 90%;
                max-height: 500px;
                max-width: 700px;
                object-fit: cover;
                object-position: center;
                border-radius: 10px;
            }
            
            .club-info {
                padding: 24px;
                border-radius: 10px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                background-color: #FFFFFF;
            }
            
            h2 {
                font-family: 'Quicksand', sans-serif;
                font-weight: bold;
                padding: 10px;
                border-bottom: 2px solid #37003C;
            }
            
            p {
                margin-top: 10px;
                padding: 10px;
                overflow: auto;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 10; /* number of lines to show */
                font-family: 'Quicksand', sans-serif;
            }
            
            ::-webkit-scrollbar {
                width: 5px;
                height: 5px;
            }
                
            ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 10px #df92e6;
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: #cd68f6; 
                box-shadow: inset 0 0 6px rgba(124, 124, 124, 0.5); 
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #484848;
            }
        </style>

        <img class="fan-art-club" src="${this._club.fanArt}" alt="Fan Art">
        <div class="club-info">
          <h2>${this._club.name}</h2>
          <p>${this._club.description}</p>
        </div>
      `;
    }
  }
   
  customElements.define('club-item', ClubItem);