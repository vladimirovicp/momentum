const time = document.querySelector('.time');
const date_time = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
let nameUser = document.querySelector('.name');
const body = document.querySelector('body');



const changeQuote = document.querySelector('.change-quote');

// const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };

const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

let numberSlide = 1;

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let timeOfDay;

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

function getTimeOfDay(){
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

    timeOfDay = welcomeText;

    return welcomeText;
}

function showGreeting() {
    greeting.textContent = `Good ${getTimeOfDay()}`;
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


//https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/01.jpg
//https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/20.jpg

// night
//morning
//afternoon

// changeQuote.addEventListener('click', function() {
//     console.log(nameUser.value);
// });


function getRandomNum(){
    const min = 1;
    const max = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let randomNum = getRandomNum();

function setBg(){
    // let bgNum = randomNum.toString().padStart(2,'0');
    const img = new Image();
    img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timeOfDay +"/" + randomNum.toString().padStart(2,'0') + ".jpg";

    img.onload = () => {
        body.style.backgroundImage = body.style.backgroundImage = "url('" + img.src+ "')";
    };

    // body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timeOfDay +"/" + bgNum + ".jpg')";
}

setBg();

function getSlideNext(){
    randomNum++;
    randomNum > 20 ? randomNum = 1 : randomNum;
    setBg();
    // body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timeOfDay +"/" + randomNum.toString().padStart(2,'0') + ".jpg')";
}

function getSlidePrev(){
    randomNum--;
    randomNum < 1 ? randomNum = 20 : randomNum;
    setBg();
    // body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timeOfDay +"/" + randomNum.toString().padStart(2,'0') + ".jpg')";
}

slideNext.addEventListener('click',  getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);