const calendarInputRef = document.querySelector('.calendar__form input');
const currentMonthYearRef = document.querySelector('.calendar__title');
const daysRef = document.querySelector('.days');

const prevNextArrowsRef = document.querySelector('.calendar__arrows');

const calendarWrapperRef = document.querySelector('.calendar__wrapper');
const calendarFormRef = document.querySelector('.calendar__form');
const calendarDisplayDateRef = document.querySelector('.calendar__form-text');


// console.log('calendarInputRef :>> ', calendarInputRef);

calendarFormRef.addEventListener('click', () => {
  calendarWrapperRef.classList.toggle('hidden');
  calendarFormRef.classList.toggle('selected');

})





let selectedApiDate = '';// to transfer to API request
let displayDate = '';// to display on calendar input

  // calendarInputRef.value = displayDate;

  // calendarInputRef.value = 'kfkfdkhgdkhgd';

// getting new Date, current year and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

renderCalendar();
prevNextArrowsRef.addEventListener('click', onArrowsClick);//listening click on month and year arrows
daysRef.addEventListener('click', onDaysClick);//listening click on days






function renderCalendar() {
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();//getting first day of month
  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();//getting last date of month
  const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();//getting last day of month
  const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();//getting last date of previous month

  let liTag = "";

  for (let i = firstDayOfMonth - 1; i > 0; i -=1) {// creating li for previous month last days
    liTag += `<li class='inactive'>${lastDateOfPrevMonth - i + 1}</li>`;
  }
  if (firstDayOfMonth === 0) {
    for (let i = 6; i > 0; i -= 1) {// creating li for previous month last days in case of Sunday
      liTag += `<li class='inactive'>${lastDateOfPrevMonth - i + 1}</li>`;
    }
  }
  for (let i = 1; i <= lastDateOfMonth; i += 1) {// creating li for all days of current month
    //adding active class to li if the current day, month and year matched 
    const isToday = i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear===new Date().getFullYear() ? 'active' : '';
    liTag += `<li class='${isToday} usual'>${i}</li>`;
  }
  if (lastDayOfMonth !== 0) { // if not Sunday
    for (let i = lastDayOfMonth; i < 7; i += 1) {// creating li of next month first days
      liTag += `<li class='inactive'>${i - lastDayOfMonth + 1}</li>`;
    }
  }
  currentMonthYearRef.innerHTML = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysRef.innerHTML = liTag;

  }

function onArrowsClick(e) {//adding click events on month and year arrows
    const clickedIconRef = e.target;
 
    // if clicked icon is previous icon then decrement current month or year by 1 else increment it by 1
    switch (clickedIconRef.id) {
      case 'month__prev':
        currMonth -= 1;
        break;
      case 'month__next':
        currMonth += 1;
        break;
      case 'year__prev':
        currYear -= 1;
        break;
      case 'year__next':
        currYear += 1;
        break;
    }
    if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
}

function onDaysClick(e) { //adding click events on days
  const clickedDate = e.target.innerText;
  console.log('e :>> ', e);

  if (e.target.className !== 'inactive') {//to exclude selection of inactive dates

    // e.target.classList.add('selected');

    let selectedApiDate = `${currYear}/${addLeadingZero(currMonth + 1)}/${addLeadingZero(clickedDate)}`;
    console.log('selectedApiDate :>> ', selectedApiDate);

    let displayDate = `${addLeadingZero(clickedDate)}/${addLeadingZero(currMonth + 1)}/${currYear}`;
    console.log('displayDate :>> ', displayDate);
    calendarDisplayDateRef.textContent = displayDate;
  }

  console.log('selectedApiDate :>> ', selectedApiDate);
  console.log('displayDate :>> ', displayDate);

  return selectedApiDate;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


export default selectedApiDate;