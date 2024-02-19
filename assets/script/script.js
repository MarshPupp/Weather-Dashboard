const apiKey = '4115e0c777e4f5d36149f0410dd53abe';
var historyEl = document.getElementById('searchHistory')

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

  fetch(
    'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + apiKey
  )
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(lon,lat);
    fetch(
      'https://api.openweathermap.org/data/3.0/onecall?lat= ' + lat +'&lon=' + lon + '&appid=' + apiKey
    )
    .then((response) => response.json())
    .then((data) => 
    console.log(data)
  )
  
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