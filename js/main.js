'use strict' 

class Weather {
    cityes = [
        {city: 'Полтава'},
        {city: 'Київ'},
        {city: 'Кременчук'},
        {city: 'Дніпро'},
        {city: 'Львів'}
    ];

    #weatherIcons = [
        {rain: 'rain.png'},
        {storm: 'storm.png'},
        {sun: 'sun.png'},
        {cloudy: 'cloudy.png'},
        {cloud: 'cloud.png'},
        {fog: 'fog.png'},
        {snow: 'snow.png'},
    ];
    constructor() {
        this.api = 'https://api.openweathermap.org/data/2.5/weather?q=Poltava&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504';
        this.json = null;
        this.currentIcon = null;
        this.currentTemp = null;
        this.currentFeel = null;
        this.currentWindSpeed = null;
        this.currentWeatherStatus = null;
        this.currentWeatherStatusDescr = null;
        this.humidity = null;
        this.rain = null;
        this.cloudy = null;
        this.city = 'Полтава';
        this.body = document.body;
        
    }

    get wrapper() {
        return document.querySelector('.weather');
    }
    get date() {
        return this.wrapper.querySelector('.weather-main_date')
    }
    get contentWrap() {
        return this.wrapper.querySelector('.weather-add');
    }
    getDate() {
        const d = new Date();

        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() +1).toString().padStart(2, '0');
        const year = d.getFullYear();

        const currentDate = `<span>${day}.${month}.${year}</span>`
        this.date.insertAdjacentHTML('beforeend', currentDate);
    }
    renderChooseCity() {
        this.cityes.forEach((elem) => {
            let str = `
                 <div class="weather-choose_city" data-id=${elem.city}>${elem.city}</div>
            `
            this.wrapper.querySelector('.weather-choose').insertAdjacentHTML('beforeend', str);
        })
       
    }
    getCurrentWeather() {
        const request = new XMLHttpRequest();

        request.open('GET', this.api);
        request.responseType = 'json';

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200) {
                this.json = request.response;
                this.renderCity()
                this.renderChooseCity();
                this.getDate();
            }
            
        });

        request.send();
    }

    renderWeatherInfo() {
        this.wrapper.innerHTML = '';
        let str = `
        <div class="weather-window">
            <div class="weather-main">
                <div class="weather-main_date"></div>
                <div class="weather-main_location">
                    <img src="icons/map.png" alt="">
                    <p class="weather-main_name">${this.city}</p>
                </div>
                <div class="weather-choose"></div>
            </div>
            <div class="weather-info">
                <div class="weather-info_temp">
                    <img class="weather-info_icon" src="icons/thermometer.png" alt="">
                    <div class="weather-info_num">${this.currentTemp}&#176</div>
                </div>
                <img class="weather-info_pic" src="icons/${this.currentIcon}" alt="">
            </div>
            <div class="weather-status">
                <p class="weather-status_descr">${this.currentWeatherStatus}</p>
                <p class="weather-status_feel">Відчувається як: ${this.currentFeel}&#176</p>
            </div>
            <div class="weather-add">
                <div class="weather-add_item">
                    <img src="icons/wind.png" alt="">
                    <p>Швидкість вітру: ${this.currentWindSpeed}м/сек</p>
                </div>
                <div class="weather-add_item">
                    <img src="icons/cloud.png" alt="">
                    <p>Хмарність: ${this.cloudy}%</p>
                </div>
                <div class="weather-add_item">
                    <img src="icons/drop.png" alt="">
                    <p>Вологість: ${this.humidity}%</p>
                </div>
            </div>
        </div>
        `
        this.wrapper.insertAdjacentHTML('beforeend', str);
        
     }

     renderWeather(event) {
        let target = event.target;
        let t = target.dataset.id;
        if(target.matches('.weather-main_name')) {
            this.wrapper.querySelector('.weather-choose').classList.toggle('fog');  
        }
        if(t === 'Київ') {
            this.api = 'https://api.openweathermap.org/data/2.5/weather?q=Kiev&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504';
            this.renderWeatherInfo();
            this.renderChooseCity();
            this.city = 'Київ';
            this.getCurrentWeather();
            this.renderCity();
            this.getDate();
        }
        if(t === 'Полтава') {
            this.api = 'https://api.openweathermap.org/data/2.5/weather?q=Poltava&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504';
            this.renderWeatherInfo();
            this.renderChooseCity();
            this.city = 'Полтава';
            this.getCurrentWeather();
            this.renderCity();
            this.getDate();
        }
        if(t === 'Кременчук') {
            this.api = 'https://api.openweathermap.org/data/2.5/weather?q=Kremenchuk&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504';
            this.renderWeatherInfo();
            this.renderChooseCity();
            this.city = 'Кременчук';
            this.getCurrentWeather();
            this.renderCity();
            this.getDate();
        }
        if(t === 'Дніпро') {
            this.api = 'https://api.openweathermap.org/data/2.5/weather?q=Dnipro&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504';
            this.renderWeatherInfo();
            this.renderChooseCity();
            this.city = 'Дніпро';
            this.getCurrentWeather();
            this.renderCity();
            this.getDate();
        }
        if(t === 'Львів') {
            this.api = 'https://api.openweathermap.org/data/2.5/weather?q=Lviv&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504';
            this.renderWeatherInfo();
            this.renderChooseCity();
            this.city = 'Львів';
            this.getCurrentWeather();
            this.renderCity();
            this.getDate();
        }
     }

     renderCity() {
        this.currentTemp = Math.floor(this.json.main.temp);
        this.humidity = this.json.main.humidity;
        this.currentWindSpeed = this.json.wind.speed;
        this.cloudy = this.json.clouds.all;
        this.currentFeel = Math.floor(this.json.main.feels_like)
        this.currentWeatherStatus = this.json.weather[0].main;
        
        if(this.currentWeatherStatus == 'Rain'){
            this.currentIcon = this.#weatherIcons[0].rain;
            this.body.style.backgroundImage = 'url(../img/rain.jpg)';
        }
        if(this.currentWeatherStatus == 'Thunderstorm'){
            this.currentIcon = this.#weatherIcons[1].storm;
            this.body.style.backgroundImage = 'url(../img/storm.jpg)';
        }
        if(this.currentWeatherStatus == 'Clear'){
            this.currentIcon = this.#weatherIcons[2].sun;
            this.body.style.backgroundImage = 'url(img/clear.jpg)';
        }
        if(this.currentWeatherStatus == 'Clouds'){
            this.currentIcon = this.#weatherIcons[4].cloud;
            this.body.style.backgroundImage = 'url(../img/back4.jpg)';
        }
        if(this.currentWeatherStatus == 'Fog'){
            this.currentIcon = this.#weatherIcons[5].fog;
            this.body.style.backgroundImage = 'url(../img/fog.jpg)';
        }
        if(this.currentWeatherStatus == 'Snow'){
            this.currentIcon = this.#weatherIcons[6].snow;
            this.body.style.backgroundImage = 'url(../img/snow.jpg)';
        }
        this.renderWeatherInfo();
     }

    init() {
        this.getCurrentWeather();
        this.wrapper.addEventListener('click', this.renderWeather.bind(this));
        
    }
}

const info = new Weather();

info.init();