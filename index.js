/*
api definition is provided in another file 
env.js => please create an env.js file and 
add your own credentials

like

const api = {
    key: "your-api-key",
    baseurl: "https://api.openweathermap.org/data/2.5",
}

*/

// capture input element into js
const searchbox = document.querySelector(".search-box")

const setQuery = e => e?.keyCode == 13 && getSearchResults(searchbox?.value)

const getSearchResults = query =>
    fetch(`${api.baseurl}/weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(displayResults)
        .catch(err => console.error(err))

const displayResults = data => {
    if (data?.cod >= "400") {
        alert(`${searchbox?.value} Not Found!`)
        searchbox.value = ""
        return
    }
    const city = document.querySelector(".city")
    city.innerText = `${data?.name}${
        data?.sys?.country ? `, ${data?.sys?.country}` : ""
    }`

    const temperature = document.querySelector(".temp")
    temperature.innerHTML = `${Math.round(data?.main?.temp)}<span>°c</span>`

    const weather = document.querySelector(".weather")
    weather.innerText = `${data?.weather[0]?.main}`

    const highLow = document.querySelector(".hi-low")
    highLow.innerText = `${Math.floor(data?.main?.temp_min)}°c / ${Math.ceil(
        data?.main?.temp_max
    )}°c`

    searchbox.value = ""
}

// Add Current Day to HTMl
const date = document.querySelector(".date")
date.innerText = `${new Date()
    .toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    })
    .replaceAll(/,+/gm, " ")}`

// Attach event listener to input
searchbox.addEventListener("keypress", setQuery)
