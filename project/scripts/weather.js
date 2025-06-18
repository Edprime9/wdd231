const API_KEY = "940e306871392e9d281614f5348d45ed"; // Replace with your actual API key

async function fetchWeather() {
  try {
    // First get user's approximate location
    const position = await getLocation();
    const { latitude, longitude } = position.coords;

    // Fetch weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Weather data not available");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("weather-data").innerHTML = `
            <div class="weather-error">Weather data unavailable</div>
        `;
  }
}

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation not supported"));
    }
  });
}

function displayWeather(data) {
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h

  document.getElementById("weather-data").innerHTML = `
        <div class="weather-main">
            <img src="${weatherIcon}" alt="${description}">
            <div class="weather-temp">${temp}°C</div>
        </div>
        <div class="weather-details">
            <p>Feels like: ${feelsLike}°C</p>
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind: ${windSpeed} km/h</p>
        </div>
    `;
}

// Initialize weather when DOM is loaded
document.addEventListener("DOMContentLoaded", fetchWeather);
