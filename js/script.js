// Variáveis e selecao
const apiKey = "882838064b1ab1807f6654f2026c91f4";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorElement = document.querySelector("#error");

const body = document.querySelector("body");

// Funcoes
const getWeatherdata = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    if (data.cod == "404") {
        console.log("Não funcionou");
        errorElement.classList.remove("hide")
        weatherContainer.classList.add("hide");
    } else {
        errorElement.classList.add("hide")
    }

    console.log(data);

    cityElement.innerText = data.name;
    // De kelvin para Celsius 
    tempElement.innerText = parseInt(data.main.temp - 273).toFixed(1);

    descElement.innerText = data.weather[0].description;
    
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    
    humidityElement.innerText = `${data.main.humidity}%`;
    
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1200x800/?${cityInput.value}')`;
}

const showWeatherData = async (city) => {
    getWeatherdata(city);
};

// Eventos 
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city)
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city)
    }
})