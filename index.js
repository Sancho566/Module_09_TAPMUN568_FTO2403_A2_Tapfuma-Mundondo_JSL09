// Function to fetch and set background image with author information
async function fetchBackgroundImage() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
        if (!res.ok) throw new Error("Failed to fetch background image");
        const data = await res.json();
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById("author").textContent = `By: ${data.user.name}`;
    } catch (err) {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
        document.getElementById("author").textContent = `By: Dodi Achmad`;
        console.error(err);
    }
}

// Function to fetch and display cryptocurrency data
async function fetchCryptoData() {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
        if (!res.ok) throw new Error("Failed to fetch crypto data");
        const data = await res.json();
        document.getElementById("crypto-top").innerHTML = `
            <img src="${data.image.small}" alt="${data.name}" />
            <span>${data.name}</span>
        `;
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    } catch (err) {
        document.getElementById("crypto").textContent = "Failed to load cryptocurrency data";
        console.error(err);
    }
}

// Function to get and display the current time
function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

// Function to fetch weather data based on user's location
function fetchWeatherData(position) {
    console.log('Fetching weather data for position:', position); // Added logging
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src="${iconUrl}" />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => {
            console.error(err);
            document.getElementById("weather").textContent = "Failed to load weather data";
        });
}

// Initialization function to load all data
async function init() {
    fetchBackgroundImage();
    fetchCryptoData();
    getCurrentTime();
    setInterval(getCurrentTime, 1000);
    navigator.geolocation.getCurrentPosition(fetchWeatherData, err => {
        document.getElementById("weather").textContent = "Geolocation not enabled";
        console.error('Geolocation error:', err); // Added detailed error logging
    });
}

// Call the initialization function
init();
