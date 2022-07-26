

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



const quotesQuote = document.querySelector('.quote');
const quotesAuthor = document.querySelector('.author');
const quotesButton = document.querySelector('.change-quote');
//Quotes
//quote
//author


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

const max = 100
const min = 1;
let count = Math.floor(Math.random() * (max - min)) + min;
let maxCount = 0;

async function getQuotes(lang) {

    const quotes = lang === 'ru' ? '../assets/json/quotes.json' : 'https://type.fit/api/quotes';
    const res = await fetch(quotes);
    // const res = await fetch(quotes);
    // const data = await res.json();
    return await res.json();
}

// getQuotes();

async function goGetQuotes(i,lang){
    const data = await getQuotes(lang);
    maxCount = data.length;

    setTimeout(() => {
        quotesQuote.textContent = data[i].text;
        quotesAuthor.textContent = data[i].author;
    }, 500);

    maxCount >= count ? count++ : count = 0;
}




goGetQuotes(count,lang);


if (quotesButton) {

    quotesButton.addEventListener("click", function (e) {
        goGetQuotes(count,lang);
    });

}



// Audio

// const audio = document.querySelector('audio');
// const playBtn = document.querySelector('.play');
//
// function playAudio() {
//     audio.currentTime = 0;
//     audio.play();
// }
// function pauseAudio() {
//     audio.pause();
// }
//
// playBtn.addEventListener('click', playAudio);

import playList from './playList.js';
console.log(playList);


let isPlay = false;
let playNum = 0;

const audio = new Audio();
const playBtn = document.querySelector('.play');

const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

const playListContainer = document.querySelector('.play-list');

function playAudio() {
    // playBtn.classList.toggle("pause");

    console.log(playNum);
    if(!isPlay){
        isPlay = true;
        // audio.src = "../assets/sounds/Ennio Morricone.mp3";
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        playBtn.classList.add("pause");

        let elements = playListContainer.querySelectorAll('li');
        for (let elem of elements) {
            elem.classList.remove('item-active');
        }
        elements[playNum].classList.add('item-active');

    } else{
        isPlay = false;
        audio.pause();
        playBtn.classList.remove("pause");
    }
}

playBtn.addEventListener('click', playAudio);

function playNext(){
    playNum < playList.length - 1 ? playNum++ : playNum=0;
    isPlay = false;

    // playListContainer[playNum].classList.add('item-active');
    // item-active
    playAudio();
}

function playPrev(){
    playNum <= 0 ? playNum = playList.length - 1 : playNum--;
    isPlay = false;
    playAudio();
}


playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);


    // for (let i = 0; i < playList.length; i++){
    //     const li = document.createElement('li');
    //     li.classList.add('play-item');
    //     li.textContent = playList[i].title;
    //     playListContainer.append(li);
    // }

    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = el.title;
        playListContainer.append(li);
    })


