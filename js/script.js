
const time = document.querySelector('.time');
const date_time = document.querySelector('.date');
const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};

const timeOptions = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
const dateOptions = {weekday: 'long' , month:'long',  day:'numeric'};


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
}

//  'ru-RU', 'en-US', 'en-Br'


function showDate(){
    const date = new Date();
    // const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    // const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-RU', dateOptions);
    date_time.textContent = currentDate;
}





showTime();