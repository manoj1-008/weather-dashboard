const apiKey = "b679e24490bb8e78f37e2c942c475da2"; // Replace with your actual key

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(() => showError("❌ Error fetching weather."));
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch(() => showError("❌ Error fetching weather."));
    }, () => {
      alert("❌ Permission denied or error getting location.");
    });
  } else {
    alert("❌ Geolocation is not supported by this browser.");
  }
}

function displayWeather(data) {
  if (data.cod !== 200) {
    showError("❌ City not found.");
    return;
  }

  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.style.display = "block";
  weatherInfo.innerHTML = `
    <h2>📍 ${data.name}, ${data.sys.country}</h2>
    <p>🌡️ Temperature: ${data.main.temp} °C</p>
    <p>🌥️ Weather: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function showError(message) {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.style.display = "block";
  weatherInfo.innerHTML = `<p>${message}</p>`;
}
