const time = document.querySelector('.time')
const dateItem = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.querySelector('body')
const slideNext = document.querySelector(".slide-prev");
const slidePrev = document.querySelector(".slide-next");
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const audio = document.querySelector('audio');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

/*ВРЕМЯ*/

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate(date);
    showGreeting(date);
}

/*ДАТА*/

function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString('en-US', options);
    dateItem.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        return 'morning';
    }
    if (hours >= 12 && hours < 18) {
        return 'afternoon';
    }
    if (hours >= 18 && hours <= 23) {
        return 'evening';
    }
    else {
        return 'night';
    }
}

/*ПРИВЕТСТВИЕ*/

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
}
showTime();

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

/*СЛАЙДЕР*/

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum(1, 20);
function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${url})`;
    };
    img.src = url;
}
setBg();

function getSlidePrev() {
    if (randomNum >= 20) {
        randomNum = 1;
    } else {
        randomNum++;
    }
    setBg();
}

function getSlideNext() {
    if (randomNum <= 1) {
        randomNum = 20;
    } else {
        randomNum--;
    }
    setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

/*ПОГОДА*/

async function getWeather() {
    city.value !== '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=11d61e5ba482600d21388f5726f2efd3&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    error.textContent = '';
}

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageCity);

function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        setTimeout(getWeather, 10);
    }
}
window.addEventListener('load', getLocalStorageCity);

/*ЦИТАТЫ*/

async function getQuotes() {
    const url = 'data.json';
    const res = await fetch(url);
    const data = await res.json();
    const randomNumber = Math.floor(Math.random() * data.length);

    author.innerHTML = data[randomNumber].author;
    quote.innerHTML = `"${data[randomNumber].text}"`;
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);


/*ПЛЕЕР*/

function playAudio() {
    audio.currentTime = 0;
    audio.play();
}
function pauseAudio() {
    audio.pause();
}


