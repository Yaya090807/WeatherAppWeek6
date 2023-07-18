//La fecha con formato Mon 05 10:00
function formatDate(date) {
    let hours = date.getHours();
    if(hours<10){
        hours = `0${hours}`;
    }

    let letra = "m.d.";
    if (hours <12){
        letra ="a.m.";
    } else
            if (hours>12){
        letra = "p.m.";
    }
    
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes = `0${minutes}`;
    }

    let fecha =date.getDate();

    let days = [ "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()]
  
    return ` · ${day} ${fecha}, ${hours}:${minutes} ${letra}`;
  }

let dateElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Para agarrar el valor del form y buscar datos de la ciudad escrita

function getcity (event){
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
  
    let apikey = "e8afbbe875eb43e7801438b2c0996358";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  
    axios.get(apiurl).then(showdata);

    function showdata(response){
        
        let ciudad = response.data.name;
        let country = response.data.sys.country;
        let ciudadcompleta = ciudad + ", " +country ;
        document.querySelector("#city-id").innerHTML = ciudadcompleta;

        document.querySelector("#tempnum").innerHTML = Math.round(response.data.main.temp);
        document.querySelector("#pressure").innerHTML = Math.round(response.data.main.pressure);
        document.querySelector("#humidity").innerHTML =response.data.main.humidity;
        document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
        document.querySelector("#info").innerHTML =  response.data.weather[0].main;    
    } 
        
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", getcity);

//Own Geolication API

function getcp (){
    navigator.geolocation.getCurrentPosition(showposition);
}

function showposition (position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apikey ="e8afbbe875eb43e7801438b2c0996358";
    let apiurl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

    axios.get(apiurl2).then(showdata2);

    function showdata2(response){
        
        let ciudad = response.data.name;
        let country = response.data.sys.country;
        let ciudadcompleta = ciudad + ", " +country ;
        document.querySelector("#city-id").innerHTML = ciudadcompleta;

        document.querySelector("#tempnum").innerHTML = Math.round(response.data.main.temp);
        document.querySelector("#pressure").innerHTML = Math.round(response.data.main.pressure);
        document.querySelector("#humidity").innerHTML =response.data.main.humidity;
        document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
        document.querySelector("#info").innerHTML =  response.data.weather[0].main;    
    } 
    
}

let getcurrentlocalitation = document.querySelector("#current-button");
getcurrentlocalitation.addEventListener("click", getcp);

//Convert to F
function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#tempnum");
    temperatureElement.innerHTML = 66;
  }