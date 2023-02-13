import axios from "axios";

const BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const API_KEY = "uox4PdeVGCyG0Y86e9GfSzZ5AsD37lLD";

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.queryPage = 1;
    this.queryPerPage = 10;
    // this.image_type = 'photo';
    // this.orientation = 'horizontal';
    // this.safesearch = true;
  }

  async fetchNews() {
    const url = `${BASE_URL}?q=${this.searchQuery}&api-key=${API_KEY}`;
    // &page=${this.queryPage}&per_page=${this.queryPerPage}`;
    
    const response = await axios.get(url);
    console.log('response.data.response :>> ', response.data.response);
    this.incrementPage();
    return response.data.response;
  }

  get query() {
    return this.searchQuery;
  }

  set query (newQuery){
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.queryPage = 1;
  }

  incrementPage() {
    this.queryPage += 1;
  }
}

