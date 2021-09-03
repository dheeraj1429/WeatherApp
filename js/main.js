'use strict';

const container = document.querySelector('.container');
const mainDiv = document.querySelector('.main_div');
const bars = document.querySelector('.bars');
const Weatherman = document.querySelector('.Weatherman');
const plus = document.querySelector('.plus');

const placeName = document.querySelector('.header_name');
const dateNow = document.querySelector('.data');
const temp = document.querySelector('.temp');

const mansoon = document.querySelector('.mansoon');
const weatherDetails = document.querySelector('.weatherDetails');

const today = document.querySelector('.today');
const friday = document.querySelector('.Friday');
const saterday = document.querySelector('.Saterday');

const todayWind = document.querySelector('.today_wind');
const fridayWind = document.querySelector('.friday_wind');
const saterdayWind = document.querySelector('.saterday_wind');
const content = document.querySelector('.content');

const countryTemRender = function () {
  setInterval(() => {
    const date = new Date();

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    const formateDate = Intl.DateTimeFormat('GMT', options).format(date);
    dateNow.textContent = formateDate;
  }, 1000);
};

const randerCountryDetails = function (data) {
  temp.textContent = data.temperature;
  weatherDetails.textContent = `${data.wind} Wind`;
  mansoon.textContent = data.description;
};

const randerToday = function (data) {
  today.textContent = data.forecast[0].temperature;
  friday.textContent = data.forecast[1].temperature;
  saterday.textContent = data.forecast[2].temperature;

  todayWind.textContent = data.forecast[0].wind;
  fridayWind.textContent = data.forecast[1].wind;
  saterdayWind.textContent = data.forecast[2].wind;
};

// Weather Api
const renderweathereApi = function (weatherCountry) {
  fetch(`https://goweather.herokuapp.com/weather/${weatherCountry}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data) {
        countryTemRender();
      }

      randerCountryDetails(data);

      randerToday(data);
    });
};

plus.addEventListener('click', () => {
  const countryName = prompt('Type a Country name here');
  const toLower = countryName.toLowerCase();
  renderweathereApi(`${toLower}`);
  placeName.textContent = `${toLower}`;
  content.style.opacity = '1';
});
