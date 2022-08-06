const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

// state['blocks']['time']= 1;
// state['blocks']['date']= 1;
// state['blocks']['greeting']= 1;
// state['blocks']['quote']= 1;
// state['blocks']['weather']= 1;
// state['blocks']['audio']= 1;
// state['blocks']['todolist']= 1;

const time = document.querySelector('.time');
const date_time = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
let nameUser = document.querySelector('.name');
const body = document.querySelector('body');

const changeQuote = document.querySelector('.change-quote');



let numberSlide = 1;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let timeOfDay;

const city = document.querySelector('.city');


city.addEventListener('change', () => {
    getWeather();
});


const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');


const quotesQuote = document.querySelector('.quote');
const quotesAuthor = document.querySelector('.author');
const quotesButton = document.querySelector('.change-quote');

let lang = localStorage.getItem('lang');
let apiImg = localStorage.getItem('apiImg');

// const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };

let dateOptions;

if(lang === 'ru'){
    dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    // state.language = 1;
} else {
    dateOptions = { month: 'long', day: 'numeric', weekday: 'long'};
    // state.language = 0;
}

const timeOptions = { hour: 'numeric', hour12: false, minute: 'numeric', second: 'numeric'};
// const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

const selectAPIImg = document.querySelector('.setting__api-select');
const tagAPIImg = document.querySelector('.setting__api-tag');


function showLangFormatTime() {
    let showTimeLang;
    switch (lang) {
        case 'ru':
            showTimeLang = 'ru-RU';
            break;
        default:
            showTimeLang = 'en-US';
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
    if (lang === 'ru') {
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
        greeting.textContent = welcomeText;
    } else {
        greeting.textContent = `Good ${getTimeOfDay()}`;
    }
}

showTime();


// console.log(greetingContainer.querySelector('input').placeholder);
//
// // console.log(greeting.attr('placeholder')

function greetingPlaceholder(lang){
    greetingContainer.querySelector('input').placeholder = lang === 'ru' ? '[Введите имя]' : '[Enter name]';
}

greetingPlaceholder(lang);

// перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage() {
    localStorage.setItem('name', nameUser.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('lang', lang);
    localStorage.setItem('apiImg', apiImg);
    localStorage.setItem('hidePlayer', state['blocks']['audio']);
    localStorage.setItem('hideWeather', state['blocks']['weather']);
    localStorage.setItem('hideGreeting', state['blocks']['greeting']);
    localStorage.setItem('hideTime', state['blocks']['time']);
    localStorage.setItem('hideDate', state['blocks']['date']);
    localStorage.setItem('hideFooter', state['blocks']['quote']);



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
    if (localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
        state.language = lang;
    }
    if (localStorage.getItem('apiImg')) {
        apiImg = localStorage.getItem('apiImg');
    } else {
        apiImg = 'GitHub';
    }

    if (localStorage.getItem('hidePlayer')) {
        state['blocks']['audio'] = localStorage.getItem('hidePlayer');
    } else {
        state['blocks']['audio'] = false;
    }

    if (localStorage.getItem('hideWeather')) {
        state['blocks']['weather'] = localStorage.getItem('hideWeather');
    } else {
        state['blocks']['weather'] = false;
    }

    if (localStorage.getItem('hideGreeting')) {
        state['blocks']['greeting'] = localStorage.getItem('hideGreeting');
    } else {
        state['blocks']['greeting'] = false;
    }

    if (localStorage.getItem('hideTime')) {
        state['blocks']['time'] = localStorage.getItem('hideTime');
    } else {
        state['blocks']['time'] = false;
    }

    if (localStorage.getItem('hideDate')) {
        state['blocks']['date'] = localStorage.getItem('hideDate');
    } else {
        state['blocks']['date'] = false;
    }

    if (localStorage.getItem('hideQuote')) {
        state['blocks']['quote'] = localStorage.getItem('hideQuote');
    } else {
        state['blocks']['quote'] = false;
    }



    // blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']

    instalBlock();

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

async function getLinkToImageUnsplash() {
    const img = new Image();
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query='+tagAPIImg.value+'&client_id=Y5qN3vbov74jTCVNbP11Y28IU7zpVybrJ-IMcqGVaZM';
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.urls.regular)
    img.src = data.urls.regular;
    img.onload = () => {
        body.style.backgroundImage = body.style.backgroundImage = "url('" + img.src + "')";
    };
}

async function getLinkToImageFlickr() {
    const img = new Image();
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6adfdf0d7a547c1711a04c607737089c&tags='+tagAPIImg.value+'&extras=url_l&format=json&nojsoncallback=1';
    const res = await fetch(url)
    const data = await res.json();
    // console.log(randomNum);
    //https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6adfdf0d7a547c1711a04c607737089c&tags=nature&extras=url_l&format=json&nojsoncallback=1

    // img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + timeOfDay + "/" + randomNum.toString().padStart(2, '0') + ".jpg";
    img.src = data.photos.photo[randomNum].url_l;
    img.onload = () => {
        body.style.backgroundImage = body.style.backgroundImage = "url('" + img.src + "')";
    };
}

// getLinkToImageFlickr();


function backgroundImage(){
    switch(apiImg) {
        case 'GitHub': setBg();
            break;
        case 'Unsplash API': getLinkToImageUnsplash();
            break;
        case 'Flickr API': getLinkToImageFlickr();
            break;
        default: setBg();
    }

    for(let i=0; i<selectAPIImg.options.length; i++) {
        if (selectAPIImg.options[i].value === apiImg) {
            selectAPIImg.options[i].selected = true;
        } else {
            selectAPIImg.options[i].selected = false;
        }
    }


}

backgroundImage();







function getSlideNext() {

    // console.log(apiImg);
    switch(apiImg) {
        case 'GitHub': {
            // console.log('888')
            randomNum++;
            randomNum > 20 ? randomNum = 1 : randomNum;
            setBg();
        }
        break;
        case 'Unsplash API': getLinkToImageUnsplash();
        break;
        case 'Flickr API': {
            randomNum++;
            randomNum > 20 ? randomNum = 1 : randomNum;
            getLinkToImageFlickr();

        }
        break;
        default: {
            randomNum++;
            randomNum > 20 ? randomNum = 1 : randomNum;
            setBg();
        }
    }


}

function getSlidePrev() {
    switch(apiImg) {
        case 'GitHub': {
            randomNum--;
            randomNum < 1 ? randomNum = 20 : randomNum;
            setBg();
        }
            break;
        case 'Unsplash API': getLinkToImageUnsplash();
            break;
        case 'Flickr API': {
            randomNum--;
            randomNum < 1 ? randomNum = 20 : randomNum;
            getLinkToImageFlickr();
        }
            break;
        default: {
            randomNum--;
            randomNum < 1 ? randomNum = 20 : randomNum;
            setBg();
        }
    }
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


// Погода

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError =  document.querySelector('.weather-error');
// .weather[0].id - id иконки погоды
// .weather[0].description - описание погоды
// .main.temp - температура


function defaultCity(){
    if (city.value === '') {
        city.value = lang === 'ru' ? 'Минск' : 'Minsk';
    } else if(city.value === 'Минск' || city.value === 'Minsk'){
        city.value = lang === 'ru' ? 'Минск' : 'Minsk';
    }
}

async function getWeather() {

    defaultCity();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=9cdada7fb28c4dfbf39ead2d36a2b20b&units=metric`;

    console.log(city.value)

    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('111')
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`); //иконка погоды
            temperature.textContent = `${Math.trunc(data.main.temp)}°C`; //температуру в °C
            weatherDescription.textContent = data.weather[0].description; //описание погоды

            if (lang === 'ru') {
                wind.textContent = `Скор. ветра: ${Math.trunc(data.wind.speed)}м/с`; //скорость ветра в м/с
                humidity.textContent = `Влаж. воздуха: ${Math.trunc(data.main.humidity)}%`; // относительную влажность воздуха в %
            } else{
                wind.textContent = ` Wind speed: ${Math.trunc(data.wind.speed)}м/с`; //скорость ветра в м/с
                humidity.textContent = `Humidity: ${Math.trunc(data.main.humidity)}%`; // относительную влажность воздуха в %
            }
        weatherError.textContent = '';
    } catch (error){
        console.log('0000')
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
        weatherError.textContent = 'Город ' + city.value + ' не определен системой';
    }


    // const res = await fetch(url);
    // const data = await res.json();
    //
    //
    //     weatherIcon.className = 'weather-icon owf';
    //     weatherIcon.classList.add(`owf-${data.weather[0].id}`); //иконка погоды
    //     temperature.textContent = `${Math.trunc(data.main.temp)}°C`; //температуру в °C
    //     weatherDescription.textContent = data.weather[0].description; //описание погоды
    //
    //     if (lang === 'ru') {
    //         wind.textContent = `Скор. ветра: ${Math.trunc(data.wind.speed)}м/с`; //скорость ветра в м/с
    //         humidity.textContent = `Влаж. воздуха: ${Math.trunc(data.main.humidity)}%`; // относительную влажность воздуха в %
    //     } else{
    //         wind.textContent = ` Wind speed: ${Math.trunc(data.wind.speed)}м/с`; //скорость ветра в м/с
    //         humidity.textContent = `Humidity: ${Math.trunc(data.main.humidity)}%`; // относительную влажность воздуха в %
    //     }



}

getWeather();

const max = 100
const min = 1;
let count = Math.floor(Math.random() * (max - min)) + min;
let maxCount = 0;

async function getQuotes(lang) {
    const quotes = lang === 'ru' ? '../assets/json/quotes.json' : 'https://type.fit/api/quotes';
    const res = await fetch(quotes);
    return await res.json();
}

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

import playList from './playList.js';
// console.log(playList);

let isPlay = false;
let playNum = 0;

const player = document.querySelector('.player');
const audio = new Audio();
const playBtn = player.querySelector('.play');
const playPrevBtn = player.querySelector('.play-prev');
const playNextBtn = player.querySelector('.play-next');
const playListContainer = player.querySelector('.play-list');

const playerTimeline = player.querySelector(".player-timeline");

const playerCurrent = player.querySelector(".player-current");
const playerLength = player.querySelector(".player-length");

const progressBar = player.querySelector('.player-progress');
let currentTime = 0;

function playAudio() {
    // console.log(playNum);
    if(!isPlay){
        isPlay = true;
        audio.src = playList[playNum].src;
        audio.currentTime = currentTime;

        audio.play();
        playBtn.classList.add("pause");

        let elements = playListContainer.querySelectorAll('li');
        for (let elem of elements) {
            elem.classList.remove('item-active');
        }
        elements[playNum].classList.add('item-active');

        // playerCurrent.textContent = audio.currentTime;
        playerLength.textContent = playList[playNum].duration;

    } else{
        isPlay = false;
        audio.pause();
        playBtn.classList.remove("pause");
        currentTime = audio.currentTime;
    }
}

playBtn.addEventListener('click', playAudio);

function playNext(){
    playNum < playList.length - 1 ? playNum++ : playNum=0;
    isPlay = false;
    currentTime = 0;
    playAudio();
}

function playPrev(){
    playNum <= 0 ? playNum = playList.length - 1 : playNum--;
    isPlay = false;
    currentTime = 0;
    playAudio();
}


playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = el.title;
        playListContainer.append(li);
    })


// обрабатываем прогресс
function handleAudioProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function initializeAudio() {
    const audioDuration = Math.round(Audio.duration);
    const time = formatTime(audioDuration);

    playerLength.innerText = `${time.minutes}:${time.seconds}`;
    playerLength.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}


function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substring(11, 19);
    return {
        minutes: result.substring(3, 5),
        seconds: result.substring(6, 8),
    };
};


// //слушаем событие обновление времени
audio.addEventListener('timeupdate', handleAudioProgress);

//обновим время, прошедшее с момента
function updateTimePlayerElapsed() {
    const time = formatTime(Math.round(audio.currentTime));
    playerCurrent.textContent = `${time.minutes}:${time.seconds}`;

    if( audio.currentTime === audio.duration){
        playNum < playList.length - 1 ? playNum++ : playNum=0;
        isPlay = false;
        playAudio();
    }
}

function scrub(e) {
    const scrubTime = (e.offsetX / playerTimeline.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
}

audio.addEventListener('timeupdate', updateTimePlayerElapsed);

let mousedown = false;
playerTimeline.addEventListener('click', scrub);

playerTimeline.addEventListener('mousedown', (e) => mousedown && scrub(e));
playerTimeline.addEventListener('mousedown', () => mousedown = true);
playerTimeline.addEventListener('mouseup', () => mousedown = false);


/* Translate */

let currentlanguage = document.querySelector('.language');
const listLanguage = currentlanguage.querySelectorAll('li a');


if( lang === 'en'){
    listLanguage.forEach(el => {
        if(el.classList.contains('active')){
            el.classList.remove('active');
        } else{
            el.classList.add('active');
        }
    });
}



currentlanguage.addEventListener('click', (e) => {
    lang = e.target.innerText;
    currentlanguage.querySelectorAll('li a').forEach(el => {
        el.classList.toggle('active');
    });
    selectlang();
    getWeather();
    greetingPlaceholder(lang);
    goGetQuotes(count,lang);
});



//Popup

let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно loginPopUp
let openPopupButton = document.querySelectorAll('.setting__link'); // Кнопки для показа окна

openPopupButton.forEach((button) =>{
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
    })
})

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === popupBg) { // Если цель клика - фот, то:
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active');
    }
});



let loginPopUpSignIn = document.querySelectorAll('.loginPopUp__signIn');
loginPopUpSignIn.forEach((button) =>{
    button.addEventListener('click', (e) => {
        let loginPopUpEmail = loginPopUp.querySelector('.loginPopUp__email');
        let loginPopUpPassword = loginPopUp.querySelector('.loginPopUp__password');
        alert(`Вы ввели: \n Почта: `  + loginPopUpEmail.value  + `\n Пароль: ` + loginPopUpPassword.value);
    })
});

let signUpPopUpSignIn = document.querySelectorAll('.signUpPopUp__signIn');
signUpPopUpSignIn.forEach((button) =>{
    button.addEventListener('click', (e) => {
        let createPopUpEmail = signUpPopUp.querySelector('.signUpPopUp__email');
        let createPopUpPassword = signUpPopUp.querySelector('.signUpPopUp__password');
        alert(`Вы ввели: \n Почта: `  + createPopUpEmail.value  + `\n Пароль: ` + createPopUpPassword.value);
    })
});



const setting = document.querySelector('.setting');
const settingLanguage = setting.querySelector('.setting__language-select');

function selectlang(){
    for(let i=0; i<settingLanguage.options.length; i++){
        if(settingLanguage.options[i].value === lang){
            settingLanguage.options[i].selected = true;
        } else {
            settingLanguage.options[i].selected = false;
        }
    }
}

selectlang();

settingLanguage.addEventListener("change", ()=>{
    let currentSelectLang = settingLanguage.value;
    for(let i=0; i<settingLanguage.options.length; i++){
        if(settingLanguage.options[i].value === currentSelectLang){
            settingLanguage.options[i].selected = true;
        } else {
            settingLanguage.options[i].selected = false;
        }
    }

    lang = currentSelectLang;
    currentlanguage.querySelectorAll('li a').forEach(el => {
        el.text === currentSelectLang ? el.classList.add('active') : el.classList.remove('active');
    });

    getWeather();
    greetingPlaceholder(lang);
    goGetQuotes(count,lang);
});



selectAPIImg.addEventListener("change", ()=>{
    let currentSelectAPI = selectAPIImg.value;
    for(let i=0; i<selectAPIImg.options.length; i++){
        if(selectAPIImg.options[i].value === currentSelectAPI ){
            selectAPIImg.options[i].selected = true;
            apiImg = selectAPIImg.options[i].value;
        } else {
            selectAPIImg.options[i].selected = false;
        }
        // GitHub
        // Unsplash API
        // Flickr API
    }
    backgroundImage();
});

tagAPIImg.addEventListener("change", ()=>{
    backgroundImage();
})



// Скрытие блоков

//audio
const hideBlock = document.querySelector('.setting__hideBlock');
const hidePlayer = hideBlock.querySelector('.setting__hideBlock-player');

hidePlayer.addEventListener("change", ()=>{
    if(hidePlayer.checked){
        player.classList.add('hide');
    } else {
        player.classList.remove('hide');
    }
    state['blocks']['audio'] = hidePlayer.checked;
});

function instalBlock(){
    if(state['blocks']['audio'] === 'true'){
        player.classList.add('hide');
        hidePlayer.checked = true;
    } else {
        player.classList.remove('hide');
        hidePlayer.checked = false;
    }

    if(state['blocks']['weather'] === 'true'){
        weather.classList.add('hide');
        hideWeather.checked = true;
    } else {
        weather.classList.remove('hide');
        hideWeather.checked = false;
    }

    if(state['blocks']['greeting'] === 'true'){
        greetingContainer.classList.add('hide');
        hideGreeting.checked = true;
    } else {
        greetingContainer.classList.remove('hide');
        hideGreeting.checked = false;
    }

    // state['blocks']['greeting']= 1;
// state['blocks']['quote']= 1;
// state['blocks']['weather']= 1;
// state['blocks']['audio']= 1;
// state['blocks']['todolist']= 1;


}

//

const weather = document.querySelector('.weather');
const hideWeather = hideBlock.querySelector('.setting__hideBlock-weather');

hideWeather.addEventListener("change", ()=>{
    if(hideWeather.checked){
        weather.classList.add('hide');
    } else {
        weather.classList.remove('hide');
    }
    state['blocks']['weather'] = hideWeather.checked;
});

 const hideGreeting = hideBlock.querySelector('.setting__hideBlock-greeting');

hideGreeting.addEventListener("change", ()=>{
        if(hideGreeting.checked){
            greetingContainer.classList.add('hide');
        } else {
            greetingContainer.classList.remove('hide');
        }
        state['blocks']['greeting'] = hideGreeting.checked;
    });



// .time.hide,
// .date.hide,
// .greeting-container.hide,
// .footer.hide







