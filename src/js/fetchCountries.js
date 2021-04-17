const BASE_URL = "https://restcountries.eu/rest/v2/name";

export default class СountriesApi {
  constructor() {
    this.searchQuery = "";
  }
  fetchCountries() {
    return fetch(`${BASE_URL}/${this.searchQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
