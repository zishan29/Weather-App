import { format } from 'date-fns';

function showDateTime() {
  const date = document.querySelector('#date');
  date.textContent = format(new Date(), 'dd.MM.yyyy');
  const time = document.querySelector('#time');
  time.innerText = `${new Date().toLocaleTimeString('en-US', {
    timeStyle: 'short',
  })}`;
  setTimeout(showDateTime, 1000);
}

async function fetchWeather(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=de6d61d5a3d04af183d160101230709&days=7&q=${location}`,
      {
        mode: 'cors',
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

function filterCurrentWeather(data) {
  const object = {};
  object.condition = data.current.condition.text;
  object.temperature_c = data.current.temp_c;
  object.temperature_f = data.current.temp_f;
  object.feelslike_c = data.current.feelslike_c;
  object.feelslike_f = data.current.feelslike_f;
  object.wind_kph = data.current.gust_kph;
  object.wind_mph = data.current.gust_mph;
  object.humidity = data.current.humidity;
  object.location = data.location.name;
  object.icon = data.current.condition.icon;
  return object;
}

function filterForecastWeather(data) {
  const object = [];
  for (let i = 0; i < 7; i += 1) {
    const day = {};
    day.condition = data.forecast.forecastday[i].day.condition.text;
    day.temperature_c = data.forecast.forecastday[i].day.avgtemp_c;
    day.temperature_f = data.forecast.forecastday[i].day.avgtemp_f;
    object.push(day);
  }
  return object;
}

function displayCurrentWeather(data) {
  document.querySelector('.wind').textContent = `${data.wind_kph} kph`;
  document.querySelector('.humidity').textContent = `${data.humidity} %`;
  document.querySelector('.right-wind').textContent = `${data.wind_kph} kph`;
  document.querySelector('.right-humidity').textContent = `${data.humidity} %`;
  document.querySelector(
    '#temperature',
  ).textContent = `${data.temperature_c}\u00B0`;
  document.querySelector(
    '#right-temperature',
  ).textContent = `${data.temperature_c}\u00B0`;
  document.querySelector('#condition').textContent = data.condition;
  document.querySelector('#condition-icon').src = data.icon;
  document.querySelector('#right-condition').textContent = data.condition;
  document.querySelector(
    '#feel',
  ).textContent = `feels like ${data.feelslike_c}\u00B0`;
  document.querySelector('#city').textContent = data.location;
}

function displayWeekForecast(data) {
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d = new Date();
  let day = weekday[d.getDay()];
  let i = 0;
  let days = document.querySelectorAll('.day');
  let temperatures = document.querySelectorAll('.temp');
  days.forEach((day) => {
    if (i === 0) {
      day.textContent = 'Today';
      i++;
    } else {
      day.textContent = `${weekday[d.getDay() + i]}`;
      i++;
    }
  });
  i = 0;
  console.log(temperatures);
}

fetchWeather('mumbai').then((data) => {
  console.log(data);
  console.log(filterCurrentWeather(data));
  console.log(filterForecastWeather(data));
  displayCurrentWeather(filterCurrentWeather(data));
  displayWeekForecast(filterForecastWeather(data));
});

showDateTime();
