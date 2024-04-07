const APIKey = '4115e0c777e4f5d36149f0410dd53abe';
var historyEl = document.getElementById('searchHistory');
var longitude;
var latitude;

document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('button works')


  let cityName = document.getElementById('cityInput').value;


  localStorage.setItem(cityName,cityName)
  console.log(cityName)

  getGeoCode(cityName);
});

function getGeoCode(cityName) {
  var geoQuery = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=' + 1 + '&appid=' + APIKey + '&units=imperial';

  fetch(geoQuery)
    .then(function (response) {return response.json()})
    .then(function(data) {
      console.log(data);
      latitude = data[0].lat;
      longitude = data[0].lon;
      console.log(latitude,longitude);

      getWeather(latitude, longitude);
      getForecast(latitude,longitude)
    });
}

function getWeather(latitude, longitude) {
  var weatherQuery = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKey + '&units=imperial';

  fetch(weatherQuery)
    .then(function(response) {return response.json()})
    .then(function(data) {
      console.log(data);
      displayWeather(data);
    }).catch(function(error){
      console.error('Failed to fetch weather', error);
    });
}

function displayWeather(data) {
  var currentWeather = data.list[0];
  var cityName = data.city.name;
  var currentDate = new Date(currentWeather.dt * 1000);

  document.getElementById('city').innerHTML = 'City: ' + cityName;

  document.getElementById('date').innerHTML = 'Date: ' + currentDate.toLocaleDateString();

  document.getElementById('icon').innerHTML = '<img src="https://openweathermap.org/img/wn/' + currentWeather.weather[0].icon + '.png" alt="weather icon">';

  document.getElementById('current-temp').innerHTML = 'Temperature: ' + currentWeather.main.temp + '°F';

  document.getElementById('current-wind').innerHTML = 'Wind: ' +  currentWeather.wind.speed + ' MPH';

  document.getElementById('current-humidity').innerHTML = 'Humidity: ' + currentWeather.main.humidity + '%';
}

function getForecast(latitude, longitude, city) {
  var weatherQuery = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKey + '&units=imperial';
  fetch(weatherQuery)
  .then(function(response) {return response.json()})
    .then(function(data) {
      console.log(data);
      displayForecast(data);
    }).catch(function(error) {
      console.error('Failed to fetch forecast: ',error);
    });
}

function displayForecast(data) {
  console.log(data);
  for(var i = 0; i < 6; i++) {
    var forecast = data.list[i * 8]
    var date = new Date(forecast.dt * 1000);

    document.getElementById('date-' + (i+1)).innerHTML = 'Date: ' + date.toLocaleDateString();

    document.getElementById('icon-' + (i+1)).innerHTML = '<img src="https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png" alt="weather icon">';

    document.getElementById('temp-' + (i+1)).innerHTML = 'Temperature: ' + Math.round(forecast.main.temp) + '°F';

    document.getElementById('wind-' + (i+1)).innerHTML = 'Wind: ' + Math.round(forecast.wind.speed) + 'MPH';

    document.getElementById('humidity-' + (i+1)).innerHTML = 'Humidity: ' + forecast.main.humidity + '%';
  }
}