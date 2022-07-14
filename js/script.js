const time = document.querySelector('.time');
const date_time = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
let nameUser = document.querySelector('.name');

const changeQuote = document.querySelector('.change-quote');

// const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };

const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };


// console.log(time);
// time.textContent = "Text"; // отобразить внутри элемента текст, используется метод textContent
//
// const date = new Date();
// console.log(date);
//
// const currentTime = date.toLocaleTimeString();
// console.log(currentTime);

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('ru-RU', timeOptions);
    time.textContent = currentTime;

    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}
//  'ru-RU', 'en-US', 'en-Br'

function showDate() {
    const date = new Date();
    // const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    // const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-RU', dateOptions);
    date_time.textContent = currentDate;
}

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    let welcomeText = 'night';

    if (hours >= 6 && hours < 12) {
        welcomeText = 'morning';
    } else if (hours >= 12 && hours < 18) {
        welcomeText = 'day';
    } else if (hours >= 18 && hours < 24) {
        welcomeText = 'evening';
    }
    greeting.textContent = `Good ${welcomeText}`;
}

showTime();


// перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage() {
    localStorage.setItem('name', nameUser.value);
}
window.addEventListener('beforeunload', setLocalStorage);

// перед загрузкой страницы (событие load) данные нужно восстановить и отобразить
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameUser.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)



// changeQuote.addEventListener('click', function() {
//     console.log(nameUser.value);
// });