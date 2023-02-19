const currentDateRef = document.querySelector('.calendar__title');
const daysRef = document.querySelector('.days');

// const prevNextIconRef = document.querySelectorAll('.icons span');
const prevNextArrowsRef = document.querySelector('.calendar__arrows');


// getting new Date, current year and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();//getting first day of month
  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();//getting last date of month
  const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();//getting last day of month
  const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();//getting last date of previous month

  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i -=1) {// creating li for previous month last days
    liTag += `<li class='inactive'>${lastDateOfPrevMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i += 1) {// creating li for all days of current month
    //adding active class to li if the current day, month and year matched 
    const isToday = i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear===new Date().getFullYear() ? 'active' : '';
    liTag += `<li class='${isToday}'>${i}</li>`;
    
  }

  for (let i = lastDayOfMonth; i < 6; i +=1) {// creating li of next month first days
    liTag += `<li class='inactive'>${i - lastDayOfMonth + 1}</li>`;
  }

  currentDateRef.innerHTML = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysRef.innerHTML = liTag;
  }
  

renderCalendar();

// *original block
// prevNextIconRef.forEach(icon => {// getting prev and next icons
//   icon.addEventListener('click', () => {//adding click events on both buttons
//     // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
//     currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

//     if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
//       // creating a new date of current year & month and pass it as date value
//       date = new Date(currYear, currMonth, new Date().getDate());
//       currYear = date.getFullYear(); // updating current year with new date year
//       currMonth = date.getMonth(); // updating current month with new date month
//     } else {
//       date = new Date(); // pass the current date as date value
//     }
    
//     renderCalendar(); // calling renderCalendar function
//   });
// });

  // prevNextIconRef.addEventListener('click', (e) => {//adding click events on both buttons
  //   const clickedIconRef = e.target;
  //   console.log('clickedIconRef :>> ', clickedIconRef);
  // });

  // *mine version
prevNextArrowsRef.addEventListener('click', (e) => {//adding click events on both buttons
  const clickedIconRef = e.target;
  console.log('clickedIconRef :>> ', clickedIconRef);
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1

    // currMonth = clickedIconRef.id === 'prev' ? currMonth - 1 : currMonth + 1;

  console.log('clickedIconRef.id :>> ', clickedIconRef.id);
  
  switch (clickedIconRef.id) {
  case 'month__prev':
    currMonth -= 1;
    break;

  case 'month__next':
    currMonth += 1;
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
  });




