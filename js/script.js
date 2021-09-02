// selecting loading div
const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 7000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}

// function after click on search button
const findCity = () => {

    let cityName = document.getElementById('city-name').value;
    const API_KEY = `d6596da12267cf90a69ac685c356aa5d`;
    const findParent = document.getElementById('main-parent');
    if (cityName == '') {
        alert('Enter a city Name First');
    }
    else {

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
        displayLoading()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                hideLoading()
                if (data.message == "city not found") {
                    alert('Provide a correct city name');
                    document.getElementById('city-name').value = '';
                    window.location.reload();

                }
                else {
                    loader.style.display = 'block';
                    // console.log(data);
                    findParent.textContent = '';
                    document.getElementById('city-name').value = '';
                    const cloudImg = data.weather[0].icon;
                    const tempReal = Math.round(data.main.temp);
                    const tempFeel = Math.round(data.main.feels_like);
                    const cityLocation = data.name;
                    const weatherCondition = data.weather[0].main;
                    const weatherDescription = data.weather[0].description;
                    const div = document.createElement('div');
                    div.classList.add('col-md-12');
                    div.innerHTML = `
                    <img src="https://openweathermap.org/img/wn/${cloudImg}@2x.png" alt="">
                    <h1><span style="font-size:17px">Your Searched Location:</span> ${cityLocation}</h1>
                    <h3><span><span style="font-size:17px">Temperature:</span> ${tempReal}</span>&deg;C</h3>
                    <h3><span><span style="font-size:17px">Feels Like:</span> ${tempFeel}</span>&deg;C</h3>
                    <h1 class="lead">${weatherCondition}</h1>
                    <h1 class="lead">${weatherDescription}</h1>
                    `;
                    findParent.appendChild(div);
                    loader.style.display = 'none';
                    // set background image according to weather condition
                    if (weatherCondition == 'Clouds') {
                        document.body.style.background = 'url("./images/bg-image.jpg") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Clear') {
                        document.body.style.background = 'url("./images/bg-clear.jpg") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Rain') {
                        document.body.style.background = 'url("./images/bg-rain.webp") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Drizzle') {
                        document.body.style.background = 'url("./images/bg-drizzles.jpg") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Mist') {
                        document.body.style.background = 'url("./images/bg-mist.jpg") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Haze') {
                        document.body.style.background = 'url("./images/bg-haze.png") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Fog') {
                        document.body.style.background = 'url("./images/bg-fog.jpg") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Sand') {
                        document.body.style.background = 'url("./images/bg-sand.jpg") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }
                    else if (weatherCondition == 'Snow') {
                        document.body.style.background = 'url("./images/bg-snow.jpg") no-repeat';
                        document.body.style.backgroundSize = 'cover';
                    }

                }

            })
    }

}

// find location of current user
const findLocation = () => {
    displayLoading()
    fetch('https://freegeoip.app/json/')
        .then(res => res.json())
        .then(data => {
            hideLoading()
            let cityName = data.city;
            // call weather function to display weather according to user location
            currentLocationTempDisplay(cityName);
        });


}

findLocation();
// weather api function
const currentLocationTempDisplay = (cityName) => {
    const findParent = document.getElementById('main-parent');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=d6596da12267cf90a69ac685c356aa5d`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const cloudImg = data.weather[0].icon;
            const tempReal = Math.round(data.main.temp);
            const tempFeel = Math.round(data.main.feels_like);
            const cityLocation = data.name;
            const weatherCondition = data.weather[0].main;
            const weatherDescription = data.weather[0].description;
            const div = document.createElement('div');
            div.classList.add('col-md-12');
            div.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${cloudImg}@2x.png" alt="">
            <h1><span style="font-size:17px">Your Current Location:</span> ${cityLocation}</h1>
            <h3><span><span style="font-size:17px">Temperature:</span> ${tempReal}</span>&deg;C</h3>
            <h3><span><span style="font-size:17px">Feels Like:</span> ${tempFeel}</span>&deg;C</h3>
            <h1 class="lead">${weatherCondition}</h1>
            <h1 class="lead">${weatherDescription}</h1>
            `;
            findParent.appendChild(div);

            if (weatherCondition == 'Clouds') {
                console.log(weatherCondition);
                document.body.style.background = 'url("./images/bg-image.jpg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Clear') {
                document.body.style.background = 'url("./images/bg-clear.jpg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Rain') {
                document.body.style.background = 'url("./images/bg-rain.webp") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Drizzle') {
                document.body.style.background = 'url("./images/bg-drizzles.jpg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Mist') {
                document.body.style.background = 'url("./images/bg-mist.jpg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Haze') {
                document.body.style.background = 'url("./images/bg-haze.png") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Fog') {
                document.body.style.background = 'url("./images/bg-fog.jpg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Sand') {
                document.body.style.background = 'url("./images/bg-sand.jpg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
            else if (weatherCondition == 'Snow') {
                document.body.style.background = 'url("./images/bg-snow.jpg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            }
        })
}

