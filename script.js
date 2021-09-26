const api = {
  key: "379fcb6791d8900c886ba13c1faf369a",
  base: "http://api.openweathermap.org/data/2.5/",
};


const searchbox = document.getElementById("pac-input");
searchbox.addEventListener("keypress", setQuery);

// const outBlur = document.querySelector('input[type="city_search"]');
// outBlur.addEventListener("focusout", setQuery);

// function setQuery(evt) {
//   if (evt.keyCode == 13 || evt.keyCode == 32 || outBlur) {
//     getResults(searchbox.value);
//   }
// }
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  if (temp.innerHTML >= "17") {
    document.querySelector("body").style.backgroundImage =
      "url(/img/day-bg.jpg)";
  } else if (temp.innerHTML <= "17") {
    document.querySelector("body").style.backgroundImage =
      "url(/img/night-bg.jpg)";
  }
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day} ${date} ${month} ${year}`;
}
///////////

function initMap() {
  // const componentForm = [
  //   "location",
  //   "locality",
  //   "administrative_area_level_1",
  //   "country",
  //   "postal_code",
  // ];
  const autocompleteInput = document.getElementById("pac-input");
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput);
  autocomplete.addListener("place_changed", function () {
    getResults(searchbox.value);

    const place = autocomplete.getPlace();

    

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

  });



}
