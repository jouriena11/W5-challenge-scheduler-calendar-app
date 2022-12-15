// Display the current date in the header of the page.
const today = dayjs();
$('#currentDay').text(today.format('dddd, MMMM D, YYYY'));

const currentHr = dayjs().format('H'); // this is a string ; H = 24-hour format
const currentHrNum = Number(currentHr); // convert currentHr into a number

/* Time Display -- not required but it helps inspecting whether or not the time block is rendered correctly or not. 
Besides, in real life, this is deemed convenient to a user, as there's no need to check the time elsewhere. */

const timeDisplayEl = $('#time-display');

function displayTime() {
  let rightNow = dayjs().format('hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}
displayTime();
setInterval(displayTime, 1000);

/* Wrap all code that interacts with the DOM in a call to jQuery to ensure that
the code isn't run until the browser has finished rendering all the elements
in the html.*/

$(document).ready(function() {
  console.log("Page is loaded and ready to run codes.")
  init();
});

// Codes to execute when a save button is clicked

var scheduleItems = [];

function saveItem(event) { // event = button click
  const buttonEl = event.target;
  const parentID = buttonEl.parentElement.id;
  const textAreaEl = buttonEl.parentElement.children[1]

  // Saving an empty textarea is not allowed. If the input textarea is blank when saved, the following alert message would appear.
  if(textAreaEl.value.trim() === '') {
    alert('Saving a blank field is not allowed. Please enter some text.');
    return;
  }

  // Checking if the scheduleItems array contains any saved data by using findIndex() array method.
  const foundIndex = scheduleItems.findIndex((item) => { 
    return item.time === parentID.split('-')[1]; // returns the index of the object of which the 'time' value is the same as the last numerical character of an element's ID
  })

  if(foundIndex === -1) { // If no data is found (i.e., findIndex() returns a value of -1), then add the new data to the array.
    scheduleItems.push({
      value: textAreaEl.value.trim(), // use .trim() to remove any blank space before and after the input content
      time: parentID.split('-')[1], // use split() to split hour-i into "hour" and "i", then select i which has an index of 1
    })
  }
  else {
    scheduleItems[foundIndex] = { // If saved data is found (i.e., findIndex() returns a value other than -1), then replace the data in that particular index with new data.
      value: textAreaEl.value.trim(),
      time: parentID.split('-')[1],
    }
  }
  localStorage.setItem('schedulerCalendar', JSON.stringify(scheduleItems)); // Save the latest array data to localStorage
  alert('Your data is successfully saved.') // Alert the user that the data is successfully saved to localStorage
}
// Render time block container

function timeBlockRender() {  
  
  const timeBlockEl = document.getElementById('time-block-container');

  for(var i = 9; i <= 17; i++) { // Time block is only available from 9am to 5pm to resemble the mock-up.
    
    let hourStr = i + 'AM';
    if(i == 12) {
      hourStr = i + 'PM';
    }
    else if(i > 12) {
      hourStr = (i-12)+'PM'; // e.g. if i = 13, then 1PM is returned.
    }

    // Change container CSS class (past/present/future) by comparing i to current time
    let bgClass = 'past';
    if (i === currentHrNum) {
      bgClass = 'present';
    } else if (i < currentHrNum) {
      bgClass = 'past';
    } else {
      bgClass = 'future';
    }

    /* When refreshing the page, the saved item should still be displayed on the web app. 
    This is again achieved by using findIndex() method and conditional statements. */
    
    const foundIndex = scheduleItems.findIndex((item) => {
      return item.time == i // find the index of the saved data of which the 'time' value is the same as i
    })

    let textAreaStr = "";
    if(foundIndex === -1) { // if no saved data is found (i.e., findIndex() returns -1), then returns empty string.
      textAreaStr = "";
    }
    else {
      textAreaStr = scheduleItems[foundIndex].value; // if saved data is found, then returns the 'value' value stored in that particular index
    }

    // Reference to Week 5 student activity #10, but this is written in JavaScript instead of jQuery
    let html = `<div id="hour-${i}" class="row time-block ${bgClass}">
                  <div class="col-2 col-md-1 hour text-center py-3">${hourStr}</div>
                  <textarea class="col-8 col-md-10 description" rows="3">${textAreaStr}</textarea>
                  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
                    <i class="fas fa-save pe-none" aria-hidden="true"></i>
                  </button>
                </div>`;
    timeBlockEl.insertAdjacentHTML('beforeend',html); // reference: https://css-tricks.com/comparing-methods-for-appending-and-inserting-with-javascript/.
  }
}

// Apply addEventListener to saveBtn with jQuery

function addEventListenerSaveButton() {
  $('.saveBtn').on('click', function(event) {
    saveItem(event);
  });
}

function init() {
  scheduleItems = [];
  var schedulerCalendar = JSON.parse(localStorage.getItem('schedulerCalendar'));
  if (schedulerCalendar !== null) {
      scheduleItems = schedulerCalendar;
  }

  timeBlockRender();
  addEventListenerSaveButton();
}; 
