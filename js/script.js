const time = document.querySelector('.time');
const date_time = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
let nameUser = document.querySelector('.name');
const body = document.querySelector('body');

let lang = 'ru';



const changeQuote = document.querySelector('.change-quote');

// const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };

const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

let numberSlide = 1;

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let timeOfDay;

const city = document.querySelector('.city');
city.addEventListener('change', () => {
    // console.log(city.value);
    getWeather();
});


const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');



// console.log(time);
// time.textContent = "Text"; // отобразить внутри элемента текст, используется метод textContent
//
// const date = new Date();
// console.log(date);
//
// const currentTime = date.toLocaleTimeString();
// console.log(currentTime);

function showLangFormatTime() {
    let showTimeLang;
    switch (lang) {
        case 'ru':
            showTimeLang = 'ru-RU';
            break;
        default:
            showTimeLang = 'ru-RU';
    }
    return showTimeLang;
}

function showTime() {


    const date = new Date();
    const currentTime = date.toLocaleTimeString(showLangFormatTime(), timeOptions);
    time.textContent = currentTime;

    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
}
//  'ru-RU', 'en-US', 'en-Br'

function showDate() {
    const date = new Date();
    const currentDate = date.toLocaleDateString(showLangFormatTime(), dateOptions);
    date_time.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let welcomeText = 'night';

    if (hours >= 6 && hours < 12) {
        welcomeText = 'morning';
    } else if (hours >= 12 && hours < 18) {
        welcomeText = 'afternoon';
    } else if (hours >= 18 && hours < 24) {
        welcomeText = 'evening';
    }

    timeOfDay = welcomeText;

    return welcomeText;
}

function showGreeting() {
    let welcomeText;
    if (lang = 'ru') {
        switch (getTimeOfDay()) {
            case 'morning':
                welcomeText = 'Доброе утро';
                break;
            case 'afternoon':
                welcomeText = 'Добрый день';
                break;
            case 'evening':
                welcomeText = 'Добрый вечер';
                break;
            case 'night':
                welcomeText = 'Спокойной ночи';
                break;
            default:
                welcomeText = '';
        }
    }
    // greeting.textContent = `Good ${getTimeOfDay()}`;
    greeting.textContent = welcomeText;
}

showTime();


// перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage() {
    localStorage.setItem('name', nameUser.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

// перед загрузкой страницы (событие load) данные нужно восстановить и отобразить
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameUser.value = localStorage.getItem('name');
    }

    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)


function getRandomNum() {
    const min = 1;
    const max = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let randomNum = getRandomNum();

function setBg() {
    const img = new Image();
    img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timeOfDay + "/" + randomNum.toString().padStart(2, '0') + ".jpg";

    img.onload = () => {
        body.style.backgroundImage = body.style.backgroundImage = "url('" + img.src + "')";
    };
}

setBg();

function getSlideNext() {
    randomNum++;
    randomNum > 20 ? randomNum = 1 : randomNum;
    setBg();
}

function getSlidePrev() {
    randomNum--;
    randomNum < 1 ? randomNum = 20 : randomNum;
    setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


// Погода

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

// .weather[0].id - id иконки погоды
// .weather[0].description - описание погоды
// .main.temp - температура

async function getWeather(newSity) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=9cdada7fb28c4dfbf39ead2d36a2b20b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);

    weatherIcon.className = 'weather-icon owf';

    weatherIcon.classList.add(`owf-${data.weather[0].id}`); //иконка погоды
    temperature.textContent = `${data.main.temp}°C`; //температуру в °C
    weatherDescription.textContent = data.weather[0].description; //описание погоды


    if (lang === 'ru') {
        wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`; //скорость ветра в м/с
        humidity.textContent = `Относительная влажность воздуха: ${data.main.humidity} %`; // относительную влажность воздуха в %
    }



    // weatherIcon.className = 'weather-icon owf';
}
getWeather();



// changeQuote.addEventListener('click', function() {
//     console.log(nameUser.value);
// });