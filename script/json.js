function formatDate(date) {
  let day = now.getDay();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
  
            <div class="col-2">
              <div class="date-forecast">${formatDay(forecastDay.dt)}</div>

              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div class="temperature-forecast">
                <span class="temperature-forecast-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                <span class="temperature-forecast-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
              </div>
            </div>
           
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "24ac2360a2fa6e18066acab43e4b5d52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#citty").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#precipitation").innerHTML = response.data.rain;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    (document.querySelector("#icon").innerHTML = "src"),
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    (document.querySelector("#icon").innerHTML = "alt"),
    response.data.weather[0].main
  );

  getForecast(response.data.coord);
}

function searchFor(city) {
  let apiKey = "24ac2360a2fa6e18066acab43e4b5d52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#query").value;
  searchFor(city);
}
function searchLocation(position) {
  let apiKey = "24ac2360a2fa6e18066acab43e4b5d52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&long=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  searchLocation(position);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let dateElement = document.querySelector("#currentDate");
let now = new Date();
dateElement.innerHTML = formatDate(now);

let celsiusTemperature = null;

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", handleSearch);

let currentForm = document.querySelector("#currentButton");
currentForm.addEventListener("submit", getLocation);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displaycelsiusTemperature);

let fahrenheitlink = document.querySelector("#Fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);
let iconElement = document.querySelector("#icon");
searchFor("New York");
