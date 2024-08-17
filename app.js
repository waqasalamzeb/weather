


// const apikey = "c861769f6c8e6885aa2341b798560cfc";
// const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// const searchbtn = document.querySelector("#search-btn");
// async function checkWeather(city) {
//     const response = await fetch(currentWeatherUrl + city + `&appid=${apikey}`);
//     const data = await response.json();

//     document.querySelector("#city").innerHTML = data.name;
//     document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + `°C`;
//     document.querySelector("#description").innerHTML = data.weather[0].description;
//     // weathericon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     document.querySelector("#temp-range").innerHTML = `H: ${Math.round(data.main.temp_max)}° L: ${Math.round(data.main.temp_min)}°`;
//     document.querySelector("#details").innerHTML = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;
// }

// async function checkForecast(city) {
//     const response = await fetch(forecastUrl + city + `&appid=${apikey}`);
//     const data = await response.json();
    
//     const forecastContainer = document.querySelector("#forecast-container");
//     forecastContainer.innerHTML = "";
    
//     const forecastByDay = {};
    
//     data.list.forEach(item => {
//         const date = new Date(item.dt * 1000).toLocaleDateString("en-GB", {
//             weekday: "short",
//             day: "numeric",
//         });
        
//         if (!forecastByDay[date]) {
//             forecastByDay[date] = [];
//         }
        
//         forecastByDay[date].push(item);
//     });
    
//     for (const [date, forecasts] of Object.entries(forecastByDay)) {
//         const dailyForecast = document.createElement("div");
//         dailyForecast.classList.add("daily-forecast");

//         const dateEl = document.createElement("h4");
//         dateEl.innerText = date;
//         dailyForecast.appendChild(dateEl);

//         const iconEl = document.createElement("img");
//         iconEl.src = `https://openweathermap.org/img/wn/${forecasts[0].weather[0].icon}@2x.png`;
//         dailyForecast.appendChild(iconEl);
        
//         const tempEl = document.createElement("p");
//         const tempSum = forecasts.reduce((sum, item) => sum + item.main.temp, 0);
//         const avgTemp = tempSum / forecasts.length;
//         tempEl.innerText = `${Math.round(avgTemp)}°C`;
//         dailyForecast.appendChild(tempEl);
        
//         forecastContainer.appendChild(dailyForecast);
//     }
// }

// // searchbtn.addEventListener("click", () => {
    
// //     const city = inputbox.value;
// //     checkWeather(city);
// //     checkForecast(city);
// //     inputbox.value = "";
// // });
// // searchbtn.style.disply="none"

// const inputbox = document.querySelector("#city-input");
// inputbox.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         const city = inputbox.value;
//         checkWeather(city);
//         checkForecast(city);
//         inputbox.value = "";
//     }
// });



const apikey = "c861769f6c8e6885aa2341b798560cfc";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchbtn = document.querySelector("#search-btn");
const inputbox = document.querySelector("#city-input");

async function checkWeather(city) {
    const response = await fetch(currentWeatherUrl + city + `&appid=${apikey}`);
    const data = await response.json();

    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + `°C`;
    document.querySelector("#description").innerHTML = data.weather[0].description;
    // weathericon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector("#temp-range").innerHTML = `H: ${Math.round(data.main.temp_max)}° L: ${Math.round(data.main.temp_min)}°`;
    document.querySelector("#details").innerHTML = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

    setBackground(data.weather[0].main);
}

async function checkForecast(city) {
    const response = await fetch(forecastUrl + city + `&appid=${apikey}`);
    const data = await response.json();
    
    const forecastContainer = document.querySelector("#forecast-container");
    forecastContainer.innerHTML = "";
    
    const forecastByDay = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
        });
        
        if (!forecastByDay[date]) {
            forecastByDay[date] = [];
        }
        
        forecastByDay[date].push(item);
    });
    
    for (const [date, forecasts] of Object.entries(forecastByDay)) {
        const dailyForecast = document.createElement("div");
        dailyForecast.classList.add("daily-forecast");

        const dateEl = document.createElement("h4");
        dateEl.innerText = date;
        dailyForecast.appendChild(dateEl);

        const iconEl = document.createElement("img");
        iconEl.src = `https://openweathermap.org/img/wn/${forecasts[0].weather[0].icon}@2x.png`;
        dailyForecast.appendChild(iconEl);
        
        const tempEl = document.createElement("p");
        const tempSum = forecasts.reduce((sum, item) => sum + item.main.temp, 0);
        const avgTemp = tempSum / forecasts.length;
        tempEl.innerText = `${Math.round(avgTemp)}°C`;
        dailyForecast.appendChild(tempEl);
        
        forecastContainer.appendChild(dailyForecast);
    }
}

function setBackground(weatherCondition) {
    const body = document.querySelector("body");
    let backgroundUrl;

    switch (weatherCondition.toLowerCase()) {
        case "clear":
            backgroundUrl = "url('clear.jpg')";
            break;
        case "clouds":
            backgroundUrl = "url('cloudy.jpg')";
            break;
        case "rain":
            backgroundUrl = "url('rainy.jpg')";
            break;
        case "snow":
            backgroundUrl = "url('snowy.jpg')";
            break;
        case "thunderstorm":
            backgroundUrl = "url('thunderstorm.jpg')";
            break;
            case "smoke":
                backgroundUrl = "url('smoke.jpg')";
                break;
                case "haze":
                    backgroundUrl = "url('haze.jpg')";
                    break;
        default:
            backgroundUrl = "url('images/default.jpg')";
            break;
    }

    body.style.backgroundImage = backgroundUrl;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
}



inputbox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = inputbox.value;
        checkWeather(city);
        checkForecast(city);
        inputbox.value = "";
    }
});
