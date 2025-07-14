async function getWeather() {
    const city = document.querySelector('#input').value.trim();
    if(!city) {
        alert('Please enter a city name!');
        return;
    }

    const api_key = "a31794f33db72ac38705a5aed928326f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${api_key}&units=metric`;
    
    document.querySelector('.searchBar').style.display = "none";
    const loading = document.querySelector('.loading');
    loading.style.display = "block";
    loading.innerHTML = "Loading...";

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("City not found");
        }

        loading.style.display = "none";
        document.querySelector('.weatherInfo').style.display = "block";
        const data = await response.json();

        console.log(data);

        const temp = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const description = data.weather[0].description;
        const tempMax = Math.round(data.main.temp_max);
        const tempMin = Math.round(data.main.temp_min);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const visibility = (data.visibility/1000).toFixed(1);
        const pressure = data.main.pressure;

        document.querySelector('.location').innerHTML = data.name;
        document.querySelector('#mainTemp').innerHTML = `${temp}°C`;
        document.querySelector('#weatherImg').setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
        document.querySelector('#weatherDescription').innerHTML = description;
        document.querySelector('#tempMaxMin').innerHTML = `${tempMin}°C/${tempMax}°C`;
        document.querySelector('#feelsLike').innerHTML = `${feelsLike}°C`;
        document.querySelector('#humidity').innerHTML = `${humidity}%`;
        document.querySelector('#visibility').innerHTML = `${visibility} km`;
        document.querySelector('#pressure').innerHTML = `${pressure} hPa`;


    } catch(error) {
        loading.innerHTML = "City not found";
        
        setTimeout(() => {
            loading.style.display = "none";
            document.querySelector('.searchBar').style.display = "block";
        }, 2000);
    }
}

document.querySelector('.location').addEventListener('click', () => {
    document.querySelector('.weatherInfo').style.display = "none";
    document.querySelector('.searchBar').style.display = "block";
});
