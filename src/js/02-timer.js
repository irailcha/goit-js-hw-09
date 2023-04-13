// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20};




const datetimePicker = document.getElementById("datetime-picker");
const button = document.querySelector("button[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");


let selectedDates = [];
const currentTime = new Date();
console.log(currentTime);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
    onClose(selectedDatesArr) {
         selectedDates = selectedDatesArr;
        if (selectedDates[0] <= currentTime) {
            
            alert("Please choose a date in the future")
        }
        
        else {
            button.disabled = false;
            console.log(selectedDates[0]);
            selectedDates.forEach(date => console.log(date));
        }
  },
};
flatpickr(datetimePicker, options);


let timerId = null;
// timerId = setInterval(() => { }, 1000);
// Напиши функцію addLeadingZero(value), яка
//  використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.








    
button.addEventListener("click", () => {
    button.disabled = true;
    let ms = [];
    ms = selectedDates[0] - currentTime;
    const time = convertMs(ms);

    daysEl.textContent = time.days;
    hoursEl.textContent = time.hours;
    minutesEl.textContent = time.minutes;
    secondsEl.textContent = time.seconds;
 

});

