const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "9f481825e2abb0f90454531bc499a210";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityinput.value;
    
    if(city){
        try{
            const weatherdata = await getWeatherData(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("Please enter a city")
    }
});

async function getWeatherData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiurl);

    if(!response.ok){
        throw new Error("Couldn't fetch weather data");
    }
    else{
        return await response.json();
    }

};

function displayweatherinfo(data){
    const {name: city, main: {temp, humidity}, weather: [{description, id}]}  = data;

    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descpdisplay = document.createElement("p");
    const emojidisplay = document.createElement("p");

    citydisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    descpdisplay.textContent = description;
    emojidisplay.textContent = getweatheremoji(id);

    citydisplay.classList.add("citydisplay");
    tempDisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descpdisplay.classList.add("descdisplay");
    emojidisplay.classList.add("weatheremoji");

    card.appendChild(citydisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descpdisplay);
    card.appendChild(emojidisplay);
}

function getweatheremoji(weatherid){
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️";

        case (weatherid >= 300 && weatherid < 400):
            return "🌧️";

        case (weatherid >= 500 && weatherid < 600):
            return "🌧️";

        case (weatherid >= 600 && weatherid < 700):
            return "❄️";

        case (weatherid >= 700 && weatherid < 800):
            return "😶‍🌫️";

        case (weatherid === 800):
            return "☀️";

        case (weatherid >= 801 && weatherid < 810):
            return "☁️";

        default:
            return "❓";

    }
}

function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}
