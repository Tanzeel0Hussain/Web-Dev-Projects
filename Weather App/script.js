function showWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    // Fake weather data (UI demo)
    const weatherData = [
        { temp: "32°C", condition: "Sunny ☀️", humidity: "40%", wind: "10 km/h" },
        { temp: "25°C", condition: "Cloudy ☁️", humidity: "55%", wind: "14 km/h" },
        { temp: "18°C", condition: "Rainy 🌧️", humidity: "70%", wind: "18 km/h" },
        { temp: "10°C", condition: "Cold ❄️", humidity: "65%", wind: "12 km/h" }
    ];

    const random = weatherData[Math.floor(Math.random() * weatherData.length)];

    document.getElementById("weatherBox").style.display = "block";
    document.getElementById("city").innerText = city;
    document.getElementById("temp").innerText = `🌡️ Temperature: ${random.temp}`;
    document.getElementById("condition").innerText = `🌤️ Condition: ${random.condition}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${random.humidity}`;
    document.getElementById("wind").innerText = `💨 Wind Speed: ${random.wind}`;
}
