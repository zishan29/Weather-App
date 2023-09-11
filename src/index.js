import { format } from 'date-fns';

let hourlyData;
let currentData;
let weeklyData;
let count = 1;
const left = document.querySelector('#left-button');
const right = document.querySelector('#right-button');
const input = document.querySelector('#location-input');
const search = document.querySelector('#search');
const loader = document.querySelector('#loading');

function showDateTime() {
  const date = document.querySelector('#date');
  date.textContent = format(new Date(), 'yyyy.MM.dd');
  const time = document.querySelector('#time');
  time.innerText = `${new Date().toLocaleTimeString('en-US', {
    timeStyle: 'short',
  })}`;
  setTimeout(showDateTime, 1000);
}

function displayLoading() {
  loader.classList.add('display');
}

function hideLoading() {
  loader.classList.remove('display');
}

async function fetchWeather(location) {
  displayLoading();
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=de6d61d5a3d04af183d160101230709&days=7&q=${location}`,
    {
      mode: 'cors',
    },
  );
  const data = await response.json();
  return data;
}

function filterCurrentWeather(data) {
  const object = {};
  object.condition = data.current.condition.text;
  object.temperature_c = data.current.temp_c;
  object.temperature_f = data.current.temp_f;
  object.feelslike_c = data.current.feelslike_c;
  object.feelslike_f = data.current.feelslike_f;
  object.wind_kph = data.current.wind_kph;
  object.wind_mph = data.current.wind_mph;
  object.humidity = data.current.humidity;
  object.location = data.location.name;
  return object;
}

function filterForecastWeather(data) {
  const object = [];
  for (let i = 0; i < 7; i += 1) {
    const day = {};
    day.condition = data.forecast.forecastday[i].day.condition.icon;
    day.temperature_c = data.forecast.forecastday[i].day.avgtemp_c;
    day.temperature_f = data.forecast.forecastday[i].day.avgtemp_f;
    object.push(day);
  }
  return object;
}

function filterHourlyForecastWeather(data) {
  const arr = [];
  for (let i = 0; i < data.length; i += 1) {
    const obj = {};
    obj.temperature_c = data[i].temp_c;
    obj.temperature_f = data[i].temp_f;
    obj.condition = data[i].condition.icon;
    arr.push(obj);
  }
  return arr;
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
  document.querySelector('#condition-span').textContent = data.condition;
  document.querySelector('#right-condition').textContent = data.condition;
  document.querySelector(
    '#feel',
  ).textContent = `feels like ${data.feelslike_c}\u00B0`;
  document.querySelector('#city').textContent = data.location;
}

function displayFahrenheitCurrentWeather(data) {
  document.querySelector('.wind').textContent = `${data.wind_kph} kph`;
  document.querySelector('.humidity').textContent = `${data.humidity} %`;
  document.querySelector('.right-wind').textContent = `${data.wind_kph} kph`;
  document.querySelector('.right-humidity').textContent = `${data.humidity} %`;
  document.querySelector(
    '#temperature',
  ).textContent = `${data.temperature_f}\u00B0`;
  document.querySelector(
    '#right-temperature',
  ).textContent = `${data.temperature_f}\u00B0`;
  document.querySelector('#condition-span').textContent = data.condition;
  document.querySelector('#right-condition').textContent = data.condition;
  document.querySelector(
    '#feel',
  ).textContent = `feels like ${data.feelslike_f}\u00B0`;
  document.querySelector('#city').textContent = data.location;
}

function displayWeekForecast(data) {
  const days = document.querySelectorAll('.day');
  const temperatures = document.querySelectorAll('.temp');
  const conditions = document.querySelectorAll('.condition');
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d = new Date();
  let initial = d.getDay() + 1;
  for (let i = 0; i < days.length; i += 1) {
    if (initial > 6) {
      initial = 0;
    }
    days[i].textContent = weekday[initial];
    initial += 1;
  }
  for (let i = 0; i < temperatures.length; i += 1) {
    temperatures[i].textContent = `${data[i].temperature_c}\u00B0`;
  }
  for (let i = 0; i < conditions.length; i += 1) {
    conditions[i].src = data[i].condition;
  }
}

function displayFahrenheitWeekForecast(data) {
  const days = document.querySelectorAll('.day');
  const temperatures = document.querySelectorAll('.temp');
  const conditions = document.querySelectorAll('.condition');
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d = new Date();
  let initial = d.getDay() + 1;
  for (let i = 0; i < days.length; i += 1) {
    if (initial > 6) {
      initial = 0;
    }
    days[i].textContent = weekday[initial];
    initial += 1;
  }
  for (let i = 0; i < temperatures.length; i += 1) {
    temperatures[i].textContent = `${data[i].temperature_f}\u00B0`;
  }
  for (let i = 0; i < conditions.length; i += 1) {
    conditions[i].src = data[i].condition;
  }
}

function displayHourlyForecast(data) {
  let start;
  if (count === 1) {
    start = 0;
  } else if (count === 2) {
    start = 6;
  } else if (count === 3) {
    start = 12;
  } else {
    start = 18;
  }
  const temperatures = document.querySelectorAll('.hour-temp');
  const conditions = document.querySelectorAll('.hour-condition');
  const time = document.querySelectorAll('.time');
  if (start === 0) {
    let a = 12;
    time[0].textContent = `${a} AM`;
    a = 1;
    for (let i = 1; i < time.length; i += 1) {
      time[i].textContent = `${a} AM`;
      a += 1;
    }
  } else if (start === 6) {
    let a = 6;
    for (let i = 0; i < time.length; i += 1) {
      time[i].textContent = `${a} AM`;
      a += 1;
    }
  } else if (start === 12) {
    let a = 12;
    time[0].textContent = `${a} PM`;
    a = 1;
    for (let i = 1; i < time.length; i += 1) {
      time[i].textContent = `${a} PM`;
      a += 1;
    }
  } else {
    let a = 6;
    for (let i = 0; i < time.length; i += 1) {
      time[i].textContent = `${a} PM`;
      a += 1;
    }
  }
  for (let i = 0; i < temperatures.length; i += 1) {
    temperatures[i].textContent = `${data[start].temperature_c}\u00B0`;
    conditions[i].src = data[start].condition;
    start += 1;
  }
}

function displayFahrenheitHourlyForecast(data) {
  let start;
  if (count === 1) {
    start = 0;
  } else if (count === 2) {
    start = 6;
  } else if (count === 3) {
    start = 12;
  } else {
    start = 18;
  }
  const temperatures = document.querySelectorAll('.hour-temp');
  const conditions = document.querySelectorAll('.hour-condition');
  const time = document.querySelectorAll('.time');
  if (start === 0) {
    let a = 12;
    time[0].textContent = `${a} AM`;
    a = 1;
    for (let i = 1; i < time.length; i += 1) {
      time[i].textContent = `${a} AM`;
      a += 1;
    }
  } else if (start === 6) {
    let a = 6;
    for (let i = 0; i < time.length; i += 1) {
      time[i].textContent = `${a} AM`;
      a += 1;
    }
  } else if (start === 12) {
    let a = 12;
    time[0].textContent = `${a} PM`;
    a = 1;
    for (let i = 1; i < time.length; i += 1) {
      time[i].textContent = `${a} PM`;
      a += 1;
    }
  } else {
    let a = 6;
    for (let i = 0; i < time.length; i += 1) {
      time[i].textContent = `${a} PM`;
      a += 1;
    }
  }
  for (let i = 0; i < temperatures.length; i += 1) {
    temperatures[i].textContent = `${data[start].temperature_f}\u00B0`;
    conditions[i].src = data[start].condition;
    start += 1;
  }
}

fetchWeather('mumbai').then((data) => {
  hideLoading();
  currentData = filterCurrentWeather(data);
  weeklyData = filterForecastWeather(data);
  hourlyData = filterHourlyForecastWeather(data.forecast.forecastday[0].hour);
  if (document.querySelector('input[type=checkbox]').checked) {
    displayHourlyForecast(hourlyData, 1);
    displayCurrentWeather(currentData);
    displayWeekForecast(weeklyData);
  } else {
    displayFahrenheitHourlyForecast(hourlyData);
    displayFahrenheitCurrentWeather(currentData);
    displayFahrenheitWeekForecast(weeklyData);
  }
  input.value = '';
});

left.addEventListener('click', () => {
  if (count === 1) {
    count = 4;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  } else if (count === 2) {
    count -= 1;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  } else if (count === 3) {
    count -= 1;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  } else {
    count -= 1;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  }
});

right.addEventListener('click', () => {
  if (count === 4) {
    count = 1;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  } else if (count === 3) {
    count += 1;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  } else if (count === 2) {
    count += 1;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  } else {
    count += 1;
    if (document.querySelector('input[type=checkbox]').checked) {
      displayHourlyForecast(hourlyData);
    } else {
      displayFahrenheitHourlyForecast(hourlyData);
    }
  }
});

search.addEventListener('click', () => {
  document.querySelector('.error-msg').classList.remove('visible');
  fetchWeather(input.value)
    .then((data) => {
      hideLoading();
      currentData = filterCurrentWeather(data);
      weeklyData = filterForecastWeather(data);
      hourlyData = filterHourlyForecastWeather(
        data.forecast.forecastday[0].hour,
      );
      if (document.querySelector('input[type=checkbox]').checked) {
        displayHourlyForecast(hourlyData, 1);
        displayCurrentWeather(currentData);
        displayWeekForecast(weeklyData);
      } else {
        displayFahrenheitHourlyForecast(hourlyData);
        displayFahrenheitCurrentWeather(currentData);
        displayFahrenheitWeekForecast(weeklyData);
      }
      input.value = '';
    })
    .catch(() => {
      document.querySelector('.error-msg').classList.add('visible');
      input.value = '';
    });
});

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.querySelector('.error-msg').classList.remove('visible');
    fetchWeather(input.value)
      .then((data) => {
        hideLoading();
        currentData = filterCurrentWeather(data);
        weeklyData = filterForecastWeather(data);
        hourlyData = filterHourlyForecastWeather(
          data.forecast.forecastday[0].hour,
        );
        if (document.querySelector('input[type=checkbox]').checked) {
          displayHourlyForecast(hourlyData, 1);
          displayCurrentWeather(currentData);
          displayWeekForecast(weeklyData);
        } else {
          displayFahrenheitHourlyForecast(hourlyData);
          displayFahrenheitCurrentWeather(currentData);
          displayFahrenheitWeekForecast(weeklyData);
        }
        input.value = '';
      })
      .catch(() => {
        document.querySelector('.error-msg').classList.add('visible');
        input.value = '';
      });
  }
});

showDateTime();

const status = document.querySelector('input[type=checkbox]');
status.addEventListener('click', (e) => {
  if (e.target.checked) {
    displayHourlyForecast(hourlyData, 1);
    displayCurrentWeather(currentData);
    displayWeekForecast(weeklyData);
  } else {
    displayFahrenheitHourlyForecast(hourlyData, 1);
    displayFahrenheitCurrentWeather(currentData);
    displayFahrenheitWeekForecast(weeklyData);
  }
});
