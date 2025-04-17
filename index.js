
window.onload = function(){
	//améliore la précision de la position
	let options = {
		enableHighAccuracy:true
	}
	if ('geolocation' in navigator) {
		alert("Position allowed");
		navigator.geolocation.watchPosition((position)=>{//watch appelé à chaque fois que la position change (plus fiable que getCurrent position)
			const url = 
			'https://api.openweathermap.org/data/2.5/weather?lon=' + 
			position.coords.longitude +'&lat='+ position.coords.latitude + 
			'&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
			console.log("Position détectée :", position.coords.latitude, position.coords.longitude);
			let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
			requete.open('GET', url); // Nous récupérons juste des données
			requete.responseType = 'json'; // Nous attendons du JSON
			requete.send(); // Nous envoyons notre requête
		  
			// Dès qu'on reçoit une réponse, cette fonction est executée
			requete.onload = function() {
			if (requete.readyState === XMLHttpRequest.DONE) {
				if (requete.status === 200) {
					let response = requete.response;
					let temperature = response.main.temp;
					let city = response.name;
					document.querySelector(".temp").innerHTML = Math.round(temperature) + "°C";
					document.querySelector(".city").innerHTML = city;
					document.querySelector(".humidity").innerHTML = response.main.humidity + "%";
					document.querySelector(".wind").innerHTML = response.wind.speed + "km/h";
					if(response.weather[0].main == "Clouds"){
					weatherIcon.src = "/img/clouds.png";
					}
					else if(response.weather[0].main == "Clear"){
						weatherIcon.src = "/img/clear.png";
					}
					else if(response.weather[0].main == "Rain"){
						weatherIcon.src = "/img/rain.png";
					}
					else if(response.weather[0].main == "Drizzle"){
						weatherIcon.src = "/img/drizzle.png";
					}
					else if(response.weather[0].main == "Mist"){
						weatherIcon.src = "/img/mist.png";
					}
					//display weather informations
					document.querySelector(".weather").style.display = "block";
					//hide error message
					document.querySelector(".error").style.display = "none";
					}
					else {
						alert('A problem appeared, try again later.');
					}
			  }
			}
		},error, options);
	}
	function error(){
		alert("You refused position");
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
		checkWeather("London");
	}
	

}
