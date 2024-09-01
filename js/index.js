

function render(cityCode) {

  // Get current weather

  axios({
    url: 'https://api.weatherapi.com/v1/forecast.json',
    params: {
      key: '824c546553e34041b72135429240109',
      q: cityCode,
      days: 7,
      hours: 7 // Retrieve the next 7 hours of weather
    }
  }).then(result => {

    console.log(result.data);

    // Top box
    document.querySelector('.top-box').innerHTML = `
      <div class="title">
        <span class="dateShort">${result.data.current.last_updated}</span>
        <span class="calendar">&nbsp;
          <span class="dateLunar">${result.data.location.tz_id}</span>
        </span>
      </div>
      <div class="search-box">
        <div class="location">
          <img src="./imgs/定位.png" alt="">
          <span class="area">${result.data.location.region}</span>
        </div>
        <div class="search">
          <input type="text" class="search-city" placeholder="Search city">
          <ul class="search-list">
            <li class="city-item">London</li>
          </ul>
        </div>
      </div>
    `


    // Big Weather-box

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


    // Get next 7 hour forecast weather

    // Get current hour
    const currentHour = new Date(result.data.current.last_updated).getHours()
    // console.log(currentHour)

    // Get a 24-hour forecast array
    const hourForecast = result.data.forecast.forecastday[0].hour
    // console.log(hourForecast)

    let next7Hours = []

    if (currentHour + 7 > 24) {

      // Define remaining hours of today
      const remainingHours = 24 - currentHour
      // console.log(remainingHours)

      // Get the rest hours from the next day
      const nextDayHours = result.data.forecast.forecastday[1].hour.slice(0, 7 - remainingHours)
      // console.log(nextDayHours)

      // Concatenate today's remaining hours with next day's hours
      next7Hours = hourForecast.slice(currentHour).concat(nextDayHours)

    } else {

      // Get next 7 hours from today
      next7Hours = hourForecast.slice(currentHour, currentHour + 7)

    }

    // Loop through every element inside the next7Hours Array
    const hourForecastStr = next7Hours.map(item => {

      // If the item hour equals current hour, show Now instead of item hour
      const itemHour = new Date(item.time).getHours()
      const displayHour = itemHour === currentHour ? 'Now' : itemHour

      return `
      <li class="item">
        <div class="date-box">
          <span class="dateFormat">${displayHour}</span>
          </div>
          <img src=${item.condition.icon} alt="" class="weatherImg">
          <!-- <span class="weather">Cloudy</span> -->
          <span class="weather">${item.condition.text}</span>
        <div class="temp">
          <span class="temNight">${item.temp_c}</span>
          <span>℃</span>
        </div>
        <div class="wind">
          <span class="windDirection">Humidity</span>
          <span class="windPower">${item.humidity}</span>
        </div>
      </li>`
    }).join('')

    document.querySelector('.week-wrap').innerHTML = hourForecastStr

  }).catch(error => {
    // console.error('Error:', error.result ? error.result.data : error.message);
  });



}

render('SE15 6QW')