// Weather Section
const apiKey = '940e306871392e9d281614f5348d45ed'; // Replace with your OpenWeatherMap API key
const city = 'Port Harcourt';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function displayWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    const weatherDiv = document.querySelector('#weather');
    const forecastDiv = document.querySelector('#forecast');

    const current = data.list[0];
    const currentTemp = Math.round(current.main.temp);
    const description = current.weather[0].description;

    weatherDiv.innerHTML = `
      <p><strong>Current Temperature:</strong> ${currentTemp}°C</p>
      <p><strong>Condition:</strong> ${description}</p>
    `;

    // Filter for forecasts around midday (12:00:00)
    const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(1, 4);

    forecastDiv.innerHTML = '';
    forecastDays.forEach((item, index) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temp = Math.round(item.main.temp);

      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${day}</strong><br>
        ${temp}°C<br>
        ${item.weather[0].main}
      `;
      forecastDiv.appendChild(div);
    });

  } catch (error) {
    console.error('Weather fetch error:', error);
  }
}

displayWeather();
