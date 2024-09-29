// Fetch a random nature image from Unsplash API and set it as the background
try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()

    // Set the background image and display the author's name
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    // Fallback image and author in case the unsplash API fails
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
    document.getElementById("author").textContent = `By: Neo Radebe`
}

// Fetch Dogecoin data from CoinGecko API and display its image, name, and price data
try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    
    // Check if the response is successful
    if (!res.ok) {
        throw Error("Something went wrong")
    }

    const data = await res.json()

    // Display Dogecoin image and name
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>`

    // Display Dogecoin current price, 24-hour high, and 24-hour low
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>`

} catch (err) {
    // Log the error to the console if the API call fails
    console.error(err)
}

// Function to get and display the current time
function getCurrentTime() {
    const date = new Date()
    // Display time in 'short' format (e.g., 9:00 AM)
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

// Update the time every second
setInterval(getCurrentTime, 1000)

// Get the user's location and fetch weather data from OpenWeatherMap API
navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        