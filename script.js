const apiKey = "dcb66753beab8eeb43ed7f4376e3244e";

// Constructor para el objeto Weather

function Weather(city) {
  this.city = city;

  this.getWeather = async function () {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();

        // Procesar la respuesta
        const WeatherData = `
          <div class="weather-widget">
            <p>Ciudad: ${data.name}</p>
            <!-- El siguiente cálculo muestra la temperatura en grados Celsius -->
            <p>Temperatura: ${Math.round(data.main.temp - 273.15)}°C</p> 
            <p>Clima: ${data.weather[0].description}</p>
          </div>
        `;

        document.getElementById("weatherData").innerHTML = WeatherData;

        // Obtener el pronóstico
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${apiKey}`
        );
        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();

          // Mostrar el pronóstico de los próximos días
          const forecastWidgets = forecastData.list
            .filter((item, index) => index % 8 === 0) // Tomar un pronóstico al día
            .map(
              (item) => `
              <div class="weather-widget">
                <p>${item.dt_txt}</p>
                <p>Temperatura: ${Math.round(item.main.temp - 273.15)}°C</p>
                <p>Clima: ${item.weather[0].description}</p>
              </div>
            `
            );

          document.getElementById("weatherData").innerHTML +=
            forecastWidgets.join("");
        }
      } else {
        throw new Error("Error al obtener datos del clima");
      }
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
    }
  };
}

const WeatherApp = {
  init: function () {
    document.getElementById("getWeatherBtn").addEventListener("click", () => {
      const city = document.getElementById("cityInput").value;
      const weather = new Weather(city);
      weather.getWeather();
    });
  },
};

WeatherApp.init();
