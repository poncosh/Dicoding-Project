import clubs from './clubs.js';

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

export default DataSource;