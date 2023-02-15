// import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import picsTpl from './templates/pics-list.hbs';

import NewsApiService from "./news-api.js";
import { save, load } from "./storage.js";

const formRef = document.querySelector(".search-form");
const articlesWrapperRef = document.querySelector('.articlesWrapper');


// const sentinelRef = document.querySelector('#sentinel');

//* theme-switch -----------------------------
const themeSwitchFormRef = document.querySelector('.theme-form');
const themeSwitchInputDarkRef = document.querySelector('#dark');
const themeSwitchInputLightRef = document.querySelector('#light');

const bodyRef = document.querySelector('body');
// const lightTheme = {
//   bkgColor: dark,
// };
const STORAGE_KEY = "theme-state-key";

const storedTheme = load(STORAGE_KEY);
if (storedTheme !== undefined) { setTheme(storedTheme) } else setTheme('Light');

function setTheme(theme) {
  if (theme === 'Light') {
    bodyRef.classList.remove('theme-dark');
    themeSwitchInputLightRef.checked = true;
    themeSwitchInputDarkRef.checked = false;
  };
  if (theme === 'Dark') {

    bodyRef.classList.add('theme-dark');
    themeSwitchInputLightRef.checked = false;
    themeSwitchInputDarkRef.checked = true;
  }
}

themeSwitchFormRef.addEventListener('input', onThemeSwitchFormInput);

function onThemeSwitchFormInput(e) {
  const currentTheme = e.currentTarget.color.value;
  console.log('currentTheme :>> ', currentTheme);
  save(STORAGE_KEY, currentTheme);
  setTheme(currentTheme);
}
//*-------------------------------
 
//* paginator example-----------------------------
// let currentValue = 1;
// const pageLinksArrayRef = document.getElementsByClassName('page__link');
// const paginatorRef = document.querySelector('.paginator');
// const prevBtnRef = document.querySelector('.prev__btn');
// const nextBtnRef = document.querySelector('.next__btn');

// paginatorRef.addEventListener('click', onPaginatorClick);
// function onPaginatorClick(e) {
//   for (const p of pageLinksArrayRef) {
//     p.classList.remove('active');
//   }
//     e.target.classList.add("active");
//   currentValue = e.target.value;
//   if (currentValue === 1) {
//     prevBtnRef.disabled = true;
//     nextBtnRef.disabled = false;
//   }
//   if (currentValue === 5) {
//     nextBtnRef.disabled = true;
//     prevBtnRef.disabled = false;
//   }
//   if (currentValue > 1 && currentValue < 5) {
//     prevBtnRef.disabled = false;
//     nextBtnRef.disabled = false;
//   };
//   console.log('currentValue :>> ', currentValue);
// }
// prevBtnRef.addEventListener('click', onPrevRtnClick);
// function onPrevRtnClick() {
//   if (currentValue > 1) {
//     for (const p of pageLinksArrayRef) p.classList.remove('active');
//   };
//   currentValue -= 1;
//   pageLinksArrayRef[currentValue - 1].classList.add('active');
//   console.log('currentValue :>> ', currentValue);
//   if (currentValue === 1) {
//     prevBtnRef.disabled = true;
//     nextBtnRef.disabled = false;
//   }

// }
// nextBtnRef.addEventListener('click', onNextBtnClick);
// function onNextBtnClick() {
//   if (currentValue < 5) {
//     for (const p of pageLinksArrayRef) p.classList.remove('active');
//   };
//   currentValue += 1;
//   pageLinksArrayRef[currentValue-1].classList.add('active');
//   console.log('currentValue :>> ', currentValue);
  
//     if (currentValue === 5) {
//     nextBtnRef.disabled = true;
//     prevBtnRef.disabled = false;
//     }
// }
//*------------------
// *PAGINATOR ACTIVE
// const pageLinksArrayRef = document.getElementsByClassName('page__link');
// const paginatorWrapperRef = document.querySelector('.paginator__wrapper');
const paginatorRef = document.querySelector('.paginator');
const prevBtnRef = document.querySelector('.prev__btn');
const nextBtnRef = document.querySelector('.next__btn');


const per_page = 10;
const totalNewsQuantity = 150;

const totalPages = Math.ceil(totalNewsQuantity / per_page);
console.log('totalPages :>> ', totalPages);

const ulRef = document.createElement('ul');
ulRef.classList.add('paginator');
ulRef.classList.add('list');

for (let i = 0; i < totalPages; i += 1) {
  const liRef = renderPaginationBtns(i+1);
  ulRef.appendChild(liRef);
}
console.log('ulRef :>> ', ulRef);
prevBtnRef.after(ulRef);

function renderPaginationBtns(pageNumber) {
  const liEl = document.createElement('li');
  liEl.classList.add('page__link');
  liEl.textContent = pageNumber;
  return liEl;

}



// *------------------

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
// via handlebars
// function renderPicsMarkup(pics) {
//   const markup = picsTpl(pics);
//     picsContainerRef.insertAdjacentHTML('beforeend', markup);
// }

// function renderPicsMarkup(pics) {
//   const markup = pics
//     .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `<div class="photo-card">
//     <a href="${webformatURL}">
//       <img src="${largeImageURL}" alt="${tags}" />
//       <div class="info">
//         <p class="info-item">
//           <b>Likes</b><span>${likes}</span>
//         </p>
//         <p class="info-item">
//           <b>Views</b><span>${views}</span>
//         </p>
//         <p class="info-item">
//           <b>Comments</b><span>${comments}</span>
//         </p>
//         <p class="info-item">
//           <b>Downloads</b><span>${downloads}</span>
//         </p>
//       </div>
//     </a>
//   </div>`
//     })
//     .join('');

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


