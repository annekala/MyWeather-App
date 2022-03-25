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
function displayWeather(response) {
  document.querySelector("#citty").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#precipitation").innerHTML = response.data.rain;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

celsiusTemperature = response.data.main.temp;

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&long=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  searchLocation(position);
}

function displayFahrenheiTemperature(event) {
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

let celsiuslink = document.querySelector("#celsius - link");
celsiuslink.addEventListener("click", displaycelsiusTemperature);

let fahrenheitlink = document.querySelector("#Fareinheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheiTemperature);
searchFor("New York");
