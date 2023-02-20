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
// prevBtnRef.addEventListener('click', onPrevBtnClick);
// function onPrevBtnClick() {
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
// *PAGINATOR ACTIVE - NOT READY yet
// const pageLinksArrayRef = document.getElementsByClassName('page__link');
// const paginatorWrapperRef = document.querySelector('.paginator__wrapper');
const paginatorRef = document.querySelector('.paginator');
const prevBtnRef = document.querySelector('.prev__btn');
const nextBtnRef = document.querySelector('.next__btn');

let currentPage = 1;

const per_page = 10;
const totalNewsQuantity = 85;

const totalPages = Math.ceil(totalNewsQuantity / per_page);

const centerPageBtn = Math.ceil(totalPages / 2);
console.log('centerPageBtn :>> ', centerPageBtn);


if (totalPages > 1) {
  renderPagination(totalPages);
}

function renderPagination(totalPagesNumber) {
    const ulRef = document.createElement('ul');
    ulRef.classList.add('paginator');
    ulRef.classList.add('list');

    const firstPageBtn = renderPaginationBtns(1);
    ulRef.appendChild(firstPageBtn);
  
  
    if (totalPagesNumber <= 7) {
      for (let i = 2; i < totalPagesNumber; i += 1) {
      const currentPage = renderPaginationBtns(i);
      ulRef.appendChild(currentPage);
      }
    }
    if (totalPagesNumber === 8) {
      for (let i = 2; i < (totalPagesNumber - 2); i += 1) {
      const currentPage = renderPaginationBtns(i);
      ulRef.appendChild(currentPage);
      }
      const pointsBtn = renderPaginationPoints();
      ulRef.appendChild(pointsBtn);
    }
    if (totalPagesNumber > 8) {
      ulRef.appendChild(renderPaginationPoints());  

      for (let i = (centerPageBtn - 1); i <= (centerPageBtn +1); i += 1) {
      const currentPage = renderPaginationBtns(i);
      ulRef.appendChild(currentPage);
      }

      ulRef.appendChild(renderPaginationPoints());
    }
  
    const lastPageBtn = renderPaginationBtns(totalPages);
    ulRef.appendChild(lastPageBtn);

    console.log('ulRef :>> ', ulRef);
  
    prevBtnRef.after(ulRef);
  }

function renderPaginationBtns(pageNumber) {
  const liEl = document.createElement('li');
  liEl.classList.add('page__link');
  liEl.textContent = pageNumber;

  if (currentPage===pageNumber) liEl.classList.add('active');

  liEl.addEventListener('click', () => {
    currentPage = pageNumber;
    console.log('pageNumber :>> ', pageNumber);
    const currentActiveLi = document.querySelector('.page__link.active')
    currentActiveLi.classList.remove("active");

    liEl.classList.add("active");
      
  });

  return liEl;
  
}
function renderPaginationPoints() {
  const liEl = document.createElement('li');
  liEl.classList.add('page__link');
  liEl.textContent = "...";

  return liEl;
}

//   if (currentValue > 1 && currentValue < 5) {
//     prevBtnRef.disabled = false;
//     nextBtnRef.disabled = false;


// prevBtnRef.addEventListener('click', onPrevBtnClick);
// function onPrevBtnClick() {
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


// *------------------