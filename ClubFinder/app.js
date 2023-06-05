import './src/script/component/app-bar.js';
import './src/script/component/search-bar.js';
import './src/script/view/main.js';
import clubs from './src/script/data/clubs.js';

const main = document.querySelector('main')

const clubListElement = document.createElement('club-list');
clubListElement.clubs = clubs;

main.append(clubListElement);