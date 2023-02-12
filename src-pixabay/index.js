// import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import picsTpl from './templates/pics-list.hbs';

import PicsApiService from "./pics-api.js";


const formRef = document.querySelector(".search-form");
const picsContainerRef = document.querySelector(".gallery");
const sentinelRef = document.querySelector('#sentinel');

const picsApiService = new PicsApiService();

// const gallery = new SimpleLightbox('.gallery a');

formRef.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  clearPicsList();
  picsApiService.query = e.currentTarget.searchQuery.value.trim();

  if (picsApiService.query === '') {
      return Notify.info("Please enter a request.")
  };
  
  picsApiService.resetPage();
  getPics();
}

async function getPics() {
  try {
    const { hits, totalHits } = await picsApiService.fetchPics();

    if (hits.length === 0 && picsApiService.queryPage <= 2) throw "No data";
    if (hits.length === 0 && picsApiService.queryPage > 2) {
      throw "End of data";
    };
    if (!(hits.length === 0) && picsApiService.queryPage === 2) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    };
      
    renderPicsMarkup(hits);

    // gallery.refresh();
    // gallery.on('show.simplelightbox');
  }
  catch (err) {
    onFetchError(err);
  }
  finally {
    if (picsApiService.queryPage === 2) formRef.reset();
  }
}
// via handlebars
// function renderPicsMarkup(pics) {
//   const markup = picsTpl(pics);
//     picsContainerRef.insertAdjacentHTML('beforeend', markup);
// }

function renderPicsMarkup(pics) {
  const markup = pics
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
    <a href="${webformatURL}">
      <img src="${largeImageURL}" alt="${tags}" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b><span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b><span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b><span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b><span>${downloads}</span>
        </p>
      </div>
    </a>
  </div>`
    })
    .join('');

  picsContainerRef.insertAdjacentHTML('beforeend', markup);
}

function clearPicsList() {
  picsContainerRef.innerHTML = "";
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
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && picsApiService.query !== '') {
        getPics();
      }
    }
  );
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(sentinelRef);


