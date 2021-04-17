import "./fetchCountries";
import CountriesApi from "./fetchCountries";
import countryMarkup from "../templates/country.hbs";
import countriesListMarkup from "../templates/countries.hbs";
import refs from "./refs";
import { error, info, success } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
const debounce = require("lodash.debounce");

const settings = {
  title: false,
  sticker: false,
  maxTextHeight: null,
  mouseReset: false,
  delay: 2000,
};

const countriesApi = new CountriesApi();

refs.input.addEventListener("input", debounce(onInputChange, 500));

function onInputChange(event) {
  countriesApi.query = event.target.value;

  countriesApi
    .fetchCountries()
    .then((data) => {
      renderMarkup(data);
    })
    .catch(catchError);
}

function renderMarkup(data) {
  const [country] = data;
  const countriesName = data.map((elem) => elem.name);

  if (refs.input.value === "") {
    clearAll();
  }

  if (data.length === 1) {
    refs.input.value = "";
    refs.country.innerHTML = "";
    refs.wrapper.style.display = "none";

    success({
      text: "Country found!",
      ...settings,
    });

    refs.country.insertAdjacentHTML("beforeend", countryMarkup(country));
  } else if (data.length <= 10) {
    refs.country.innerHTML = "";
    refs.countriesList.innerHTML = "";
    refs.wrapper.style.display = "flex";

    refs.countriesList.insertAdjacentHTML(
      "beforeend",
      countriesListMarkup(countriesName)
    );
  } else {
    info({
      text: "Too many matches found. Please enter a more specific query!",
      ...settings,
    });
  }
}

function catchError() {
  error({
    text: "No matches found. Please enter a valid query!",
    ...settings,
  });
}

function clearAll() {
  refs.country.innerHTML = "";
  refs.countriesList.innerHTML = "";
  refs.input.value = "";
  refs.wrapper.style.display = "none";
}
