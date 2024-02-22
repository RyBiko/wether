// import { getData} from "./jsы/api.js";

// // Функция обновления времени, дня недели, года и месяца
// function updateTime() {
//     const date = new Date();
//     const dayOfWeek = date.toLocaleString('ru-RU', { weekday: 'long' });
//     const fullDate = date.toLocaleString('ru-RU', { day: '2-digit', year: 'numeric', month: 'long' });
//     const clock = document.getElementsByClassName("time")[0];
//     const changeDayOfWeek = document.getElementsByClassName('week')[0];
//     const changeFullDate = document.getElementsByClassName('date')[0];
//     const time =  date.toLocaleString("ru-RU", { hour: '2-digit', minute: '2-digit' });
//     clock.innerHTML = `${time}`;
//     changeDayOfWeek.innerHTML = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase();
//     changeFullDate.innerHTML = fullDate.charAt(0).toUpperCase() + fullDate.slice(1).toLowerCase().slice(0, -1);
    
//     setTimeout(updateTime, 1000);
// } 
// updateTime();

// // Функция обновления температуры
// function temperature(data) {
//     const temperature = data.main.temp;
//     let changeTemp = document.getElementsByClassName('temp')[0];
//     changeTemp.innerHTML = `${Math.round(temperature)}°C`;
// }

// // Функция обновления города
// function country(data) {
//     let changeCity = document.getElementsByClassName('city')[0];
//     changeCity.innerHTML = `${data.name}, ${data.sys.country ? data.sys.country : '...'}`;
// }

// // Функция обновления описания погоды
// function weather(data) {
//     const weatherDescription = data.weather[0].description;
//     let changeWeatherDescription = document.getElementsByClassName('weather')[0];
//     changeWeatherDescription.innerHTML = `${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1).toLowerCase()}`;
// }

// // Функция обновления изображения погоды
// function weatherDescriptionImg(data) {
//     const weatherDescriptionImg = data.weather[0].icon;
//     let changeWeatherDescriptionImg = document.getElementsByClassName('weather-img')[0];
//     changeWeatherDescriptionImg.src = `./icons/weather_icons/${weatherDescriptionImg}.png`;
// }

// // Функция обновления облачности в процентах
// function cloudy(data) {
//     const cloudy = data.clouds.all;
//     let changeCloudy = document.getElementsByClassName('clouds-bar')[0];
//     let changeCloudyPer = document.getElementsByClassName('clouds-per')[0];

//     changeCloudy.style.setProperty('--fill-clouds', `${cloudy}%`);
//     changeCloudy.classList.remove('clouds-bar');
//     setTimeout(function(){
//         changeCloudy.classList.add('clouds-bar');
//     }, 1);

//     changeCloudyPer.innerHTML = `${cloudy}%`;
// }

// // Функция обновления скорости ветра
// function windSpeed(data) { 
//     const windSpeed = data.wind.speed;
//     let changeWindBar = document.getElementsByClassName("wind-bar")[0];
//     let changeWindSpeed = document.getElementsByClassName("wind-speed")[0];
//     let windSpeedPer = (Math.round(windSpeed) / 30) * 100;

//     changeWindBar.style.setProperty('--fill-wind', `${windSpeedPer}%`);
//     changeWindBar.classList.remove('wind-bar');
//     setTimeout(function(){
//         changeWindBar.classList.add('wind-bar');
//     }, 1);

//     changeWindSpeed.innerHTML = `${Math.round(windSpeed)}м/с`;
// }

// // Функция обновления максимальной и минимальной температуры
// function minMaxTemp(data) {
//     const maxTemp = data.main.temp_max;
//     const minTemp = data.main.temp_min;
//     let changeMinMaxTemp = document.getElementsByClassName('min-max-temp')[0];
//     changeMinMaxTemp.innerHTML = `${Math.round(minTemp)}° | ${Math.round(maxTemp)}°`;
// }

// // Функция обновления времени рассвета и заката
// function sunriseSunset(data) {
//     const sunriseTimestamp = data.sys.sunrise;
//     const sunsetTimestamp = data.sys.sunset;

//     const sunriseDate = new Date(sunriseTimestamp * 1000);
//     const sunsetDate = new Date(sunsetTimestamp * 1000);

//     const sunriseTime = sunriseDate.toLocaleTimeString("ru-RU", { hour: '2-digit', minute: '2-digit' });
//     const sunsetTime = sunsetDate.toLocaleTimeString("ru-RU", { hour: '2-digit', minute: '2-digit' });

//     let changeSunrise = document.getElementsByClassName("sunrise")[0];
//     let changeSunset = document.getElementsByClassName("sunset")[0];
//     changeSunrise.innerHTML = `Восход ${sunriseTime}`;
//     changeSunset.innerHTML = `Закат ${sunsetTime}`;
// }

// // Обработчик события клика по иконке GPS
// document.getElementsByClassName('gps-icon')[0].addEventListener('click', function(event) {
//     if(event.type == 'click') {
//         navigator.geolocation.getCurrentPosition(showPosition);
//         async function showPosition(position) {
//             let lat = position.coords.latitude;
//             let lon = position.coords.longitude;
            
//             const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//             const response = await fetch(url);
//             const city = await response.json()

//             const data = await getData(city.address.city);
//             updateWeather(data);
//             sunriseSunset(data);
//             document.getElementsByClassName('search-box')[0].value = ""
//         }
//     }
// });


// function updateWeather(data){
//     console.log(data);
//     temperature(data);
//     country(data);
//     weather(data);
//     weatherDescriptionImg(data);
//     cloudy(data);
//     windSpeed(data);
//     minMaxTemp(data);
    
// }

// if(document.getElementsByClassName('search-box')[0].value == ""){
//     const data = await getData();
//     updateWeather(data);
//     sunriseSunset(data);
// }
// // Обработчик события ввода Enter в поле поиска
// async function enter(event) {
//     if(event.key == "Enter") {
//         let city = document.getElementsByClassName('search-box')[0].value;
//         const data = await getData(city);
//         if(data.message === 'city not found') {
//             document.getElementsByClassName('search-box')[0].value = "Город не найден";
//         } else {
//             updateWeather(data)
//         }
//     }
// }


// const searchBox = document.querySelector('.search-box');
// searchBox.addEventListener('keypress', enter);






alert(34);