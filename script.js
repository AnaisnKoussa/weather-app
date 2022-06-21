const input = document.querySelector("#City")
const button = document.querySelector("button")
const searchbar = document.querySelector("#searchbar")
const dayOfTheWeek = document.querySelector("#dayOfTheWeek")
const ul = document.querySelector("ul")
const dayOne = document.querySelector("#dayOne")
const dayTwo = document.querySelector("#dayTwo")
const dayThree = document.querySelector("#dayThree")
const dayFour = document.querySelector("#dayFour")
const dayFive = document.querySelector("#dayFive")
let data = [];


async function fetchWeather(city) {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=8b725c1c0b42726f30d5b1c49987c0f3`)
        .then(response => response.json())
        .then(array => (data = array))
        .catch(error => {
            console.error("This is an error", error)
        })
}

fetchWeather();

function getDayOfWeek(n) {
    let day = new Date(`${data.list[n].dt_txt}`)
    let numberOfWeek = day.getDay()
    let dayOfWeek;
    switch (numberOfWeek) {
        case 0 :
            dayOfWeek = "Dimanche";
            break;
        case 1 :
            dayOfWeek = "Lundi";
            break;
        case 2 :
            dayOfWeek = "Mardi";
            break;
        case 3 :
            dayOfWeek = "Mercredi";
            break;
        case 4 :
            dayOfWeek = "Jeudi";
            break;
        case 5 :
            dayOfWeek = "Vendredi";
            break;
        case 6 :
            dayOfWeek = "Samedi";
            break;
    }
    return dayOfWeek
}

function roundTemp (n) {
    let temp = Math.round(`${data.list[n].main.temp}`)
    return temp
}

function iconDayDisplay(n) {
    let iD = (data.list[n].weather[0].icon)

    switch (iD) {
        case "01d" :
            iconDay = "/icons/sun.png";
            break;
        case "02d" :
            iconDay = "/icons/cloudy.png";
            break;
        case "03d" :
            iconDay = "/icons/clouds.png";
            break;
        case "04d" :
            iconDay = "/icons/brokenclouds.png";
            break;
        case "09d" :
            iconDay = "/icons/rainy-day.png";
            break;
        case "10d" :
            iconDay = "/icons/rain.png";
            break;
        case "11d" :
            iconDay = "/icons/thunder.png";
            break;
        case "13d" :
            iconDay = "/icons/snowflake.png";
            break;
        case "50d" :
            iconDay = "/icons/haze.png";
            break;
    }

    return iconDay
}

function iconWeekDisplay (n) {
    let iW = (data.list[n].weather[0].icon)
    switch (iW) {
        case "01d" :
            iconWeek = "/icons/soleil.png";
            break;
        case "02d" :
            iconWeek = "/icons/soleil.png";
            break;
        case "03d" :
            iconWeek = "/icons/nuage.png";
            break;
        case "04d" :
            iconWeek = "/icons/nuage.png";
            break;
        case "09d" :
            iconWeek = "/icons/slight-rain.png";
            break;
        case "10d" :
            iconWeek = "/icons/slight-rain.png";
            break;
        case "11d" :
            iconWeek = "/icons/flash.png";
            break;
        case "13d" :
            iconWeek = "/icons/snowflake.png";
            break;
        case "50d" :
            iconWeek = "/icons/haze.png";
            break;
    }
    return iconWeek
}

function windSpeed (n) {
    let speed = Math.round((data.list[n].wind.speed) * 3.6)
    return speed
}

function dateTime() {
    let current = new Date();
    let currentTime = current.getHours() + "h" + (current.getMinutes()<10?'0':'') + current.getMinutes();
    return currentTime
}

function weatherWeekDisplay(event) {
    console.log(data);

    dayOfTheWeek.innerHTML = `
        <div>
            <h1>${roundTemp(0)} °C</h1>
            <h2>${data.list[0].weather[0].description}</h2>
            <h3>${data.city.name}, ${data.city.country}</h3>
            <h3>${getDayOfWeek(0)}, ${dateTime()}</h3>
            <h3>Pression : ${data.list[0].main.pressure} hPa|Vent: ${windSpeed(0)} km/h|Humidité: ${data.list[0].main.humidity}%</h3>
        </div>
        <img src="${iconDayDisplay(0)}">
    `
    dayOne.innerHTML = `
        <img id="img-dayOne" src="${iconWeekDisplay(0)}">
        <h2 id="h2-dayOne">${roundTemp(0)} °</h2>
        <h3 id="h3-dayOne">${getDayOfWeek(0)}</h3>
    `
    dayTwo.innerHTML = `
        <img id="img-dayTwo" src="${iconWeekDisplay(8)}">
        <h2 id="h2-dayTwo">${roundTemp(8)} °</h2>
        <h3 id="h3-dayTwo">${getDayOfWeek(8)}</h3>
    `
    dayThree.innerHTML = `
        <img id="img-dayThree" src="${iconWeekDisplay(16)}">
        <h2 id="h2-dayThree">${roundTemp(16)} °</h2>
        <h3 id="h3-dayThree">${getDayOfWeek(16)}</h3>
    `
    dayFour.innerHTML = `
        <img id="img-dayFour" src="${iconWeekDisplay(24)}">
        <h2 id="h2-dayFour">${roundTemp(24)} °</h2>
        <h3 id="h3-dayFour">${getDayOfWeek(24)}</h3>
    `
    dayFive.innerHTML = `
        <img id="img-dayFive" src="${iconWeekDisplay(32)}">
        <h2 id="h2-dayFive">${roundTemp(32)} °</h2>
        <h3 id="h3-dayFive">${getDayOfWeek(32)}</h3>
    `

    button.classList.add("reset")
    button.classList.remove("search")
    document.querySelector(".reset").addEventListener("click", (e) => {
        input.value = "";
        button.classList.remove("reset")
        button.classList.add("search")
    })
    document.querySelector(".search").addEventListener("click", (e) => {
        weatherWeekDisplay()
    })

}

input.addEventListener("focusout", (e) => {
    fetchWeather(e.target.value)
})

button.addEventListener("click", weatherWeekDisplay)

dayOne.addEventListener('click', () => {
    let img = document.querySelector("#img-dayOne");
    let h2 = document.querySelector("#h2-dayOne");
    let h3 = document.querySelector("#h3-dayOne");

    dayOfTheWeek.innerHTML = `
    <div>
        <h1>${roundTemp(0)} °C</h1>
        <h2>${data.list[0].weather[0].description}</h2>
        <h3>${data.city.name}, ${data.city.country}</h3>
        <h3>${getDayOfWeek(0)}, ${dateTime()}</h3>
        <h3>Pression : ${data.list[0].main.pressure} hPa|Vent: ${windSpeed(0)} km/h|Humidité: ${data.list[0].main.humidity}%</h3>
    </div>
    <img src="${iconDayDisplay(0)}">
    `
    img.classList.add("active")
    h2.style.fontWeight = "700"
    h3.style.color = "black"
})

dayTwo.addEventListener('click', () => {
    let img = document.querySelector("#img-dayTwo");
    let h2 = document.querySelector("#h2-dayTwo");
    let h3 = document.querySelector("#h3-dayTwo");
    dayOfTheWeek.innerHTML = `
    <div>
        <h1>${roundTemp(8)} °C</h1>
        <h2>${data.list[8].weather[0].description}</h2>
        <h3>${data.city.name}, ${data.city.country}</h3>
        <h3>${getDayOfWeek(8)}</h3>
        <h3>Pression : ${data.list[8].main.pressure} hPa|Vent: ${windSpeed(8)} km/h|Humidité: ${data.list[8].main.humidity}%</h3>
    </div>
    <img src="${iconDayDisplay(8)}">
    `
    img.classList.add("active")
    h2.style.fontWeight = "700"
    h3.style.color = "black"
})

dayThree.addEventListener('click', () => {
    let img = document.querySelector("#img-dayThree");
    let h2 = document.querySelector("#h2-dayThree");
    let h3 = document.querySelector("#h3-dayThree");
    dayOfTheWeek.innerHTML = `
    <div>
        <h1>${roundTemp(16)} °C</h1>
        <h2>${data.list[16].weather[0].description}</h2>
        <h3>${data.city.name}, ${data.city.country}</h3>
        <h3>${getDayOfWeek(16)}</h3>
        <h3>Pression : ${data.list[16].main.pressure} hPa|Vent: ${windSpeed(16)} km/h|Humidité: ${data.list[16].main.humidity}%</h3>
    </div>
    <img src="${iconDayDisplay(16)}">
    `
    img.classList.add("active")
    h2.style.fontWeight = "700"
    h3.style.color = "black"
})

dayFour.addEventListener('click', () => {
    let img = document.querySelector("#img-dayFour");
    let h2 = document.querySelector("#h2-dayFour");
    let h3 = document.querySelector("#h3-dayFour");
    dayOfTheWeek.innerHTML = `
    <div>
        <h1>${roundTemp(24)} °C</h1>
        <h2>${data.list[24].weather[0].description}</h2>
        <h3>${data.city.name}, ${data.city.country}</h3>
        <h3>${getDayOfWeek(24)}</h3>
        <h3>Pression : ${data.list[24].main.pressure} hPa|Vent: ${windSpeed(24)} km/h|Humidité: ${data.list[24].main.humidity}%</h3>
    </div>
    <img src="${iconDayDisplay(24)}">
    `

    img.classList.add("active")
    h2.style.fontWeight = "700"
    h3.style.color = "black"
})

dayFive.addEventListener('click', () => {
    let img = document.querySelector("#img-dayFive");
    let h2 = document.querySelector("#h2-dayFive");
    let h3 = document.querySelector("#h3-dayFive");
    dayOfTheWeek.innerHTML = `
    <div>
        <h1>${roundTemp(32)} °C</h1>
        <h2>${data.list[32].weather[0].description}</h2>
        <h3>${data.city.name}, ${data.city.country}</h3>
        <h3>${getDayOfWeek(32)}</h3>
        <h3>Pression : ${data.list[32].main.pressure} hPa|Vent: ${windSpeed(32)} km/h|Humidité: ${data.list[32].main.humidity}%</h3>
    </div>
    <img src="${iconDayDisplay(32)}">
    ` 
    img.classList.add("active")
    h2.style.fontWeight = "700"
    h3.style.color = "black"

})





