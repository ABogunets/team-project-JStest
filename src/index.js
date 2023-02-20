// import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import picsTpl from './templates/pics-list.hbs';

import NewsApiService from "./news-api.js";


const formRef = document.querySelector(".search-form");
const articlesWrapperRef = document.querySelector('.articlesWrapper');
// const sentinelRef = document.querySelector('#sentinel');




const newsApiService = new NewsApiService();

formRef.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  clearNewsList();
  newsApiService.query = e.currentTarget.searchQuery.value.trim();

  if (newsApiService.query === '') {
      return Notify.info("Please enter a request.")
  };
  
  newsApiService.resetPage();
  getNews();
}

async function getNews() {
  try {
    const {docs} = await newsApiService.fetchNews();
    console.log('docs :>> ', docs);
    // if (hits.length === 0 && newsApiService.queryPage <= 2) throw "No data";
    // if (hits.length === 0 && newsApiService.queryPage > 2) {
    //   throw "End of data";
    // };
    // if (!(hits.length === 0) && newsApiService.queryPage === 2) {
    //   Notify.success(`Hooray! We found ${totalHits} images.`);
    // };
      
    renderNewsMarkup(docs);
  }
  catch (err) {
    onFetchError(err);
  }
  finally {
    // if (newsApiService.queryPage === 2) formRef.reset();
  }
}

function renderNewsMarkup(docs) {
  const markup = docs
    .map(({headline, web_url, multimedia, abstract, pub_date}) => {
      return `
    <div class="article-card">
         <img src="https://www.nytimes.com/${multimedia[1].url}" class="article-img">
          <h2 class="article-title">${headline.main}</h2>
          <p class="article-description">${abstract} ...</p>
          <div class="article-footer">
            <p class="article-date">${pub_date.slice(0, 10)}</p>
            <a href="${web_url}" class="article-link" target="_blank">Read more</a>
          </div>
    </div>`
    })
    .join('');

  console.log('markup :>> ', markup);
  
  articlesWrapperRef.insertAdjacentHTML('beforeend', markup);
}

function clearNewsList() {
  articlesWrapperRef.innerHTML = "";
}

function onFetchError(error) {
  console.log('error :>> ', error);
  switch (error) { 
    case "No data":
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      break;
    case "End of data":
      Notify.failure("We're sorry, but you've reached the end of search results.");
      break;
  }
}

// infinite scroll
// const onEntry = entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting && newsApiService.query !== '') {
//         getNews();
//       }
//     }
//   );
// };

// const observer = new IntersectionObserver(onEntry, {
//   rootMargin: '150px',
// });
// observer.observe(sentinelRef);


