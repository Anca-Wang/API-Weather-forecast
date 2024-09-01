

function render(cityCode) {


  axios({
    url: 'https://api.weatherapi.com/v1/forecast.json?key=824c546553e34041b72135429240109&q=London&days=1&aqi=no&alerts=no',
    params: {
      q: cityCode
    }
  }).then(result => {
    console.log(result)

    // Top box
    document.querySelector('.top-box').innerHTML = `
      <div class="title">
        <span class="dateShort">${result.data.current.last_updated}</span>
        <span class="calendar">&nbsp;
          <span class="dateLunar">Region: ${result.data.location.region}</span>
        </span>
      </div>
      <div class="search-box">
        <div class="location">
          <img src="./imgs/定位.png" alt="">
          <span class="area">${result.data.location.name}</span>
        </div>
        <div class="search">
          <input type="text" class="search-city" placeholder="Search city">
          <ul class="search-list">
            <li class="city-item">London</li>
          </ul>
        </div>
      </div>
    `


    // Weather-box
    document.querySelector('.weather-box').innerHTML = `
      <div class="tem-box">
        <span class="temp">
        <span class="temperature">${result.data.current.temp_c}</span>
        <span>°</span>
        <img src=${result.data.current.condition.icon} class="weatherImg" alt="">
        </span>
      </div>
      <div class="climate-box">
      <!-- Air quality -->
        <!-- <div class="air">
          <span class="psPm25">55</span>
          <span class="psPm25Level">良</span>
        </div> -->
        <ul class="weather-list">
          <li>
            <!-- <img src=${result.data.current.condition.icon} class="weatherImg" alt="">
            <span class="weather">${result.data.current.condition.text}</span> -->
          </li>
          <li class="windDirection">Feels like</li>
          <li class="windPower">${result.data.current.feelslike_c}</li>
        </ul>
      </div>
    `


    // Today
    document.querySelector('.today-weather').innerHTML = `
      <div class="range-box">
        <span>Today</span>
        <span class="range">&nbsp;&nbsp;
            <span class="weather">${result.data.current.condition.text}</span>
          <span class="temNight">9</span>
          <span>-</span>
          <span class="temDay">14</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>UV</span>
          <span class="ultraviolet">${result.data.current.uv}</span>
        </li>
        <li>
          <span>Humidity Percentate</span>
          <span class="humidity">${result.data.current.humidity}</span>%
        </li>
        <li>
          <span>Sunrise</span>
          <span class="sunriseTime">${result.data.forecast.forecastday[0].astro.sunrise}</span>
        </li>
        <li>
          <span>Sunset</span>
          <span class="sunsetTime">${result.data.forecast.forecastday[0].astro.sunset}</span>
        </li>
      </ul>
    `

    // Weather forecast for 7 hours

    const index= result.data.forecast.forecastday[0]
    const hourForecast = result.data.forecast.forecastday[0].hour.splice(index, 7)
    console.log((hourForecast));

    const hourForecastStr = hourForecast.map(item => {
      console.log(item)
      return `<li class="item">
        <div class="date-box">
          <span class="dateFormat">${item.time}</span>
          <span class="date">Date</span>
        </div>
        <img src="./imgs/多云.png" alt="" class="weatherImg">
          <span class="weather">Cloudy</span>
          <div class="temp">
            <span class="temNight">12</span>-
            <span class="temDay">12</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">Wind</span>
            <span class="windPower">&lt;Wind index</span>
          </div>
      </li>`
    }).join('')

    document.querySelector('.week-wrap').innerHTML = hourForecastStr

  })


}

render('DE15 6QW')