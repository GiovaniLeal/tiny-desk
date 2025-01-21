const apiKey = '2ad9c7c3b1870d70f5634594337170b';
const weatherDiv = document.getElementById('weather');
const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=fetch:ip`;


//Consumo de dados da API weatherstack
async function fetchWeather() {

    try {
        const response = await fetch(url)

        //Caso a requisão não seja bem sucedida
        if (!response.ok){
            throw new Error(`Erro ao buscar dados:${response.status}`);
        }

        //Response em Json 
        const weatherData = await response.json();

        //Selecionando informações desejadas da API
        const weatherInfo = {
            temperature: weatherData.current.temperature,
            weatherIcon: weatherData.current.weather_icons[0],
            weatherDescription: weatherData.current.weather_descriptions[0],
            location: weatherData.location.region

        };

        //exibindo dados através da função dysplayWeather
        displayWeather(weatherInfo);

    } catch (error) {
        console.error('Erro:', error);
    }
}


//Exibindo os dados no HTML
function displayWeather (weather){
    weatherDiv.innerHTML = 
        `<img src="${weather.weatherIcon}" alt="Weathericon"  id="weather-icon"">
        <p> ${weather.weatherDescription}</p>
         <p> ${weather.temperature} °c</p>
         <p> ${weather.location}</p>
        `
        
}

fetchWeather()
