window.onload = function(){
    const apiKey = "c3841b9bc39b06edc9a9cc1c6a66e563";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector(".search input")
    const searchBtn = document.querySelector(".search button")
    const weatherIcon = document.querySelector(".weather-icon")
    async function checkWeather(city){
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";

        }
        else{
            
            var data = await response.json();
            //act on the classes
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
            
            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "/img/clouds.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "/img/clear.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "/img/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "/img/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "/img/mist.png";
            }
            //display weather informations
            document.querySelector(".weather").style.display = "block";
            //hide error message
            document.querySelector(".error").style.display = "none";
        }
    }
        
    //if click on search button
    searchBtn.addEventListener("click", ()=>{
        checkWeather(searchBox.value);
    })
    //if press keydown button enter
    searchBox.addEventListener("keydown", (event) =>{
        if (event.key === "Enter") {
            checkWeather(searchBox.value);
        }
    });
    checkWeather("paris");
}
