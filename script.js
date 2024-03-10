class Weather{
    // Класс для работы с данными о погоде.
    
    constructor(city){
        // Инициализация основных переменных. 
        this.api_key = "3804ff570868a922168d27bdc56c96e4"
        this.city = city
        this.updade_time()
    }

    // РАБОТА С API
    async get_data(){
        // Полученние данных о погоде на текущее время.
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=ru&units=metric&appid=${this.api_key}`
        try{
            let response = await fetch(url)
            let data = response.json()
            return data
        } catch(error){
            console.error('Произошла ошибка:', error)
        }
    }

    async get_data5(){
        // Получение данных о погоде на 5 дней.
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&lang=ru&units=metric&appid=${this.api_key}`
        try{
            let response = await fetch(url)
            let data5 = response.json()
            return data5
        } catch(error){
            console.error('Произошла ошибка:', error)
        }
    }

    // ОСНОВНОЕ ПРИЛОЖЕНИЕ
    _capitalize(str){
        // Возводит первый символ в верхний регистр.
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    async updade_weather(){
        // Обновление всех данных о погоде. 
        this.data = await this.get_data()
        this.data5 = await this.get_data5()
        if(this.data.message === 'city not found') {
            document.getElementsByClassName('search-box')[0].value = "Город не найден"
        } else{
            this.temp()
            this.country()
            this.weather()
            this.clody()
            this.wind()
            this.max_min_temp()
            this.sunrise_sunset()
            this.humidity()
            this.visibility()
            this.pressure()
            this.gust()
            this.temp5()
        }
    }

    updade_time(){
        // Обновляет дату и время.
        let date = new Date
        let week = date.toLocaleString("ru-RU", {weekday:"long"})
        let full_date = date.toLocaleString("ru-RU", {day:'2-digit', month:"long", year:"numeric"})
        let time = date.toLocaleString("ru-RU", {hour:"2-digit", minute:"2-digit"})

        document.getElementsByClassName("time")[0].innerHTML = `${time}`
        document.getElementsByClassName('week')[0].innerHTML = this._capitalize(week)
        document.getElementsByClassName('date')[0].innerHTML = this._capitalize(full_date).slice(0, -1)

        setTimeout(() => this.updade_time(), 1000)
    }

    temp(){
        // Обновляет температуру.
        let temp = this.data.main.temp
        document.getElementsByClassName('temp')[0].innerHTML = `${Math.round(temp)}°C`
    }

    country(){
        // Обновляет город.
        let city_name = this.data.name
        let country_name = this.data.sys.country
        document.getElementsByClassName('city')[0].innerHTML = `${city_name}, 
                        ${country_name ? country_name : "..."}`
    }

    weather(){
        // Обновляет описание и картинку погоды.
        let disc = this.data.weather[0].description
        let disc_img = this.data.weather[0].icon
        document.getElementsByClassName("weather")[0].innerHTML = this._capitalize(disc)
        document.getElementsByClassName('weather-img')[0].src = `./icons/weather_icons/${disc_img}.png`
    }

    clody(){
        // Обновляет облачность.
        let cloudy = this.data.clouds.all
        let cloudy_bar = document.getElementsByClassName('clouds-bar')[0]

        document.getElementsByClassName('clouds-per')[0].innerHTML = `${cloudy}%`
        cloudy_bar.style.setProperty('--fill-clouds', `${cloudy}%`)
        cloudy_bar.classList.remove('clouds-bar')
        setTimeout(function(){
            cloudy_bar.classList.add('clouds-bar')
        }, 1)
    }

    wind(){
        // Обновляет скорость ветра.
        let speed = this.data.wind.speed
        let wind_bar = document.getElementsByClassName("wind-bar")[0]
        
        document.getElementsByClassName("wind-speed")[0].innerHTML = `${Math.round(speed)}м/с`
        let wind_percent = (Math.round(speed) / 30) * 100
        wind_bar.style.setProperty("--fill-wind", `${wind_percent}%`)
        wind_bar.classList.remove("wind-bar")
        setTimeout(function(){
            wind_bar.classList.add("wind-bar")
        }, 1)
    }

    max_min_temp(){
        // Обновляет максимальную и минимальную температуру.
        let max_temp = this.data.main.temp_max
        let min_temp = this.data.main.temp_min
        document.getElementsByClassName("min-max-temp")[0].innerHTML = `${Math.round(min_temp)}° | ${Math.round(max_temp)}°`
    }

    sunrise_sunset(){
        // Обновляет время восхода и заката.
        let sunrise = this.data.sys.sunrise
        let sunset = this.data.sys.sunset
        
        let sunrise_time = new Date(sunrise * 1000).toLocaleTimeString("ru-RU", { hour: '2-digit', minute: '2-digit' })
        let sunset_time = new Date(sunset * 1000).toLocaleTimeString("ru-RU", { hour: '2-digit', minute: '2-digit' })

        document.getElementsByClassName("sunrise")[0].innerHTML = `Восход ${sunrise_time}`
        document.getElementsByClassName("sunset")[0].innerHTML = `Закат ${sunset_time}`
    }

    humidity(){
        // Обновляет информацию о влажности.
        let humidity = this.data.main.humidity
        let humidity_bar = document.getElementsByClassName("humidity-bar")[0]

        document.getElementsByClassName("humidity-per")[0].innerHTML = `${humidity}%`
        humidity_bar.style.setProperty("--fill-humidity", `${humidity}%`)
        humidity_bar.classList.remove("humidity-bar")
        setTimeout(function(){
            humidity_bar.classList.add("humidity-bar")
        }, 1)
    }

    visibility(){
        // Обновляет информацию о видимисти.
        let visibility = this.data.visibility / 1000
        let visibility_bar = document.getElementsByClassName("visibility-bar")[0]

        document.getElementsByClassName("visibility-dist")[0].innerHTML = `${visibility}Км`
        let visibility_percent = (Math.round(visibility) / 10) * 100
        visibility_bar.style.setProperty("--fill-visibility", `${visibility_percent}%`)
        visibility_bar.classList.remove("visibility-bar")
        setTimeout(function(){
            visibility_bar.classList.add("visibility-bar")
        }, 1)
    }

    pressure(){
        // Обновляет информацию о давлении.
        let pressure = this.data.main.pressure
        document.getElementsByClassName("pressure-hpa")[0].innerHTML = `${pressure}ГпА`
    }

    gust(){
        // Обновляет информацию о порыве ветра.
        let gust = this.data.wind.gust
        document.getElementsByClassName("gust-speed")[0].innerHTML = `${gust ? gust: "..."}м/с`
    }

    temp5(){
        // Обновляет информацияю на 5 дней.
        let date = new Date()
        let temps = []
        let weathers = []
        let hours = []
        for(let i=1; i<=5; i++){
            document.getElementsByClassName(`date-day${i}`)[0].innerHTML = 
                                date.toLocaleString("ru-RU", {day:"2-digit", month:"numeric", year:"numeric", })
            document.getElementsByClassName(`week-day${i}`)[0].innerHTML = 
                                this._capitalize(date.toLocaleString("ru-RU", {weekday:"long"}))
            date.setDate(date.getDate() + 1)
        }
        this.data5.list.forEach((data) => {
            let date = new Date(data.dt * 1000)
            if(date.getHours() >= 9 && date.getHours() < 14){
                temps.push(data.main.temp)
                weathers.push(this._capitalize(data.weather[0].description))
                hours.push(date.toLocaleString("ru-RU", {hour:"2-digit", minute:"2-digit"}))
                console.log(date.getHours())
            }
        })
        for(let i=1; i<=5; i++){
            document.getElementsByClassName(`temp-day${i}`)[0].innerHTML = Math.round(temps[i-1])
            document.getElementsByClassName(`weather-day${i}`)[0].innerHTML = weathers[i-1]
            document.getElementsByClassName(`time-day${i}`)[0].innerHTML = hours[i-1]
        }
    }
}


let app =  new Weather("караганда")
app.updade_weather()

async function enter(event){
    if(event.key == "Enter"){
       let city = document.getElementsByClassName('search-box')[0].value
       app.city = city
       app.updade_weather()
    }
}
