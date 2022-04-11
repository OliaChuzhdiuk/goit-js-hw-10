import './css/styles.css';

import fetchCountries from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

export default function showError() {
  Notify.failure('Oops, there is no country with that name');
}

const refs = {
  inputRef: document.querySelector(`#search-box`),
  ulRef: document.querySelector('.country-list'),
  infoDivRef: document.querySelector('.country-info'),
};

refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const requestText = e.target.value.trim();
  clearMarkup();
  if (requestText.length === 0) {
    return;
  }
  fetchCountries(requestText).then(result => {
    if (result.length <= 10) {
      createListMarkup(result);
    } else Notify.info('Too many matches found. Please enter a more specific name.');
    if (result.length === 1) {
      createCountryInfoMarkup(result[0]);
    }
  });
}

function createListMarkup(countryList) {
  let markup = '';
  countryList.map(country => {
    markup += `<li class="country-item"><img class="country-image" src="${country.flags.svg}" alt="${country.name.official} flag">${country.name.official}</li>`;
  });
  refs.ulRef.innerHTML = markup;
}

function createCountryInfoMarkup(country) {
  let languages = '';
  Object.values(country.languages).map(language => {
    languages += language;
  }).join( );
  languages = languages.slice(0, languages.length - 2);
  const markup = `<p><span>Capital: </span>${country.capital}</p>
  <p><span>Population: </span>${country.population}</p>
  <p><span>Languages: </span>${languages}</p>`;
  refs.infoDivRef.innerHTML = markup;
}

function clearMarkup() {
  refs.ulRef.innerHTML = '';
  refs.infoDivRef.innerHTML = '';
}