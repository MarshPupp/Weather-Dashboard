const APIKey = '4115e0c777e4f5d36149f0410dd53abe';
var historyEl = document.getElementById('searchHistory');
var longitude;
var latitude;

function getLocalStorage() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let storedCity = localStorage.getItem(localStorage.key(i));
      var listEl = document.createElement('returnButton');
      listEl.textContent = storedCity;

      historyEl.append(listEl);
    }
  }
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('button works')

  let cityName = document.getElementById('cityInput').value;

  localStorage.setItem(cityName,cityName)
  console.log(cityName)

var geoQueryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + APIKey + '&units=imperial';
var weatherQuery = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKey + '&units=imperial';

  fetch(geoQueryURL)
    .then(function (response) {return response.json() })
    .then(function (data) {
      console.log(data);
      latitude = data[0].latitude;
      longitude = data[0].longitude;
      console.log(longitude,latitude);

    fetch(weatherQuery)
    .then(function (response) {response.json()})
    .then(function (weatherData) {
      console.log(weatherData);
      //let city = weatherData.name;
      //let date = new Date(weatherData.dt * 1000).toLocaleDateString();
      //let icon = weatherData.weather[0].icon;
      //let temperature = weatherData.main.temp;
      //let humidity = weatherData.main.humidity;
      //let windSpeed = weatherData.wind.speed;

      document.getElementById('weatherDisplay').innerHTML = `
        <h2>${city} (${date})</h2>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} MPH</p>
      `;
    })
  })


});

function updateHistory() {
  historyEl.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    let storedCity = localStorage.getItem(localStorage.key(i));
    var listEl = document.createElement('returnButton');
    listEl.textContent = storedCity;

    historyEl.append(listEl);
  }
};

function clearSearch() {

}