const apikey = "01142e59029fb439f5abafa4f744eb31";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);

});

async function getWeatherData(cityValue){
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

    if(!response.ok){
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const temprature = Math.round(data.main.temp)

    const description = data.weather[0].description

    const icon = data.weather[0].icon

    const details = [
      `Feels like : ${Math.round(data.main.feels_like)}`,
      `Humidity : ${data.main.humidity}%`,
      `Wind speed : ${data.wind.speed} m/s`,
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
    weatherDataEl.querySelector(".temperature").textContent = `${temprature}°C`;
    weatherDataEl.querySelector(".description").textContent =  description;

    weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");


  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent = "Le nom de la ville que vous insérez n'existe pas, vérifiez la faute de frappe";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}  