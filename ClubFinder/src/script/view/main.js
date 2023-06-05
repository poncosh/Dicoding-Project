import clubs from '../data/clubs.js';
import '../component/club-item.js';

class DataSource {
  constructor() {
    this.promise = null;
  }

  static searchClub(keyword) {
    this.promise = new Promise((onSuccess, onFailed) => {
      const filteredClubs = clubs.filter(club => club.name.toUpperCase().includes(keyword.toUpperCase()));
  
    if (filteredClubs.length) {
      onSuccess(filteredClubs);
    } else {
      onFailed(`${keyword} is not found`);
    }
    })

    return this.promise;
  };
}

class ClubList extends HTMLElement {
  set clubs(clubs) {
      this._clubs = clubs;
      this.main();
  }
      
  main() {
      const searchElement = document.querySelector('#searchElement');
      const buttonSearchElement = document.querySelector('#searchButtonElement');
    
      const onButtonSearchClicked = async () => {
        try {
          const result = await DataSource.searchClub(searchElement.value);
          renderResult(result);
        } catch (message) {
          fallbackResult(message);
        }
      };
    
      const renderResult = results => {
          this.innerHTML = ''
          results.forEach(club => {
              const clubItemElement = document.createElement('club-item');

              clubItemElement.club = club;

              this.appendChild(clubItemElement);
          })
      }
    
      const fallbackResult = message => {
          this.innerHTML = `<h2 class="placeholder">${message}</h2>`
      };
    
      buttonSearchElement.addEventListener('click', onButtonSearchClicked);
      searchElement.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          buttonSearchElement.click(onButtonSearchClicked);
        };
      })
  };
}

customElements.define('club-list', ClubList);