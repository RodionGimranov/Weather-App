<template>
  <main class="main__wrapper">
  <section class="greetings__window__container" :style="{ display: displayItems}">
    <div class="greetings__window__content">
      <img class="greetings__window__image_image" src="../src/assets/images/svg/weather-app-logo.svg" alt="Image of Logo">
      <div class="greetings__window__text__content">
        <p class="name__of__app">Weather App</p>
        <a href="https://rodiongimranov.github.io/Personal_WebSite/" class="link__to__author" target="_blank">By Rodion Gimranov</a>
      </div>
    </div>
    <button class="get__started__btn"
    @click="pressGetStartedBTN">Get started</button>
  </section>

  <!--HTML Templates for the main information window-->
  <section class="weather__data__window__container" :style="backgroundStyle">
    <div class="starus__bar__content">
      <p id="time__block">--:--</p>
      <div class="network__battery__block">
        <img class="network__icon" src="../src/assets/images/svg/Status-bar-items/network-icon.svg" alt="Icon of network status">
        <img class="wifi__icon" src="../src/assets/images/svg/Status-bar-items/wifi-icon.svg" alt="Icon of wifi status">
        <img class="battery__icon" src="../src/assets/images/svg/Status-bar-items/battery-icon.svg" alt="Icon of battery status">
      </div>
    </div>
    <div class="appBar__container">
      <div class="search__block__container" 
      :style="{ width: searchBlockWidth, 'border-radius': searchBlockBorder }">
        <a href="#" class="search__btn__container"
        @click="pressSearchBTN(), searchCity(), showWeatherInfo()">
          <img class="search__icon" src="../src/assets/images/svg/NavBar-items/search-icon.svg" alt="Image of search icon">
        </a>
        <input class="search__input" type="text" placeholder="Search city" data-lang="lang-search_city" ref="input" v-model.lazy="cityName" @keyup.enter="searchCity(), showWeatherInfo()">
      </div>
      <div class="settings__block__container"
      :style="{ width: settingsBlockWidth, 'border-radius': settingsBlockBorder} ">
      <div class="settings__items">
          <a href="#" class="change__theme__btn" id="lang"
          @click="changeThemeBTN">{{ themeMode }}</a>
          <a href="#" class="change__lang__btn" id="langBTN"
          @click="changeLangBTN">{{ lang }}</a>
        </div>
        <a href="#" class="settings__btn__container"
        @click="pressSettingsBTN">
          <img class="settings__icon" src="../src/assets/images/svg/NavBar-items/settings-icon.svg" alt="Image of settings icon"
          :style="{ transform: rotateSettingsBTN, display: showSettingsBTN }">
        </a>
      </div>
    </div>
    <div class="weather__image__container">
      <img class="big__weather__icon" src="../src/assets/images/svg/Weather-icons/big-weather-icon.svg" alt="Weather today">
    </div>

    <div class="stub__content-1" :style="{ display: showStub }"></div>
    <div class="weather__block__now__container" :style="{ display: ShowWeatherBlock }">
      <div class="city__temperature__block">
          <p class="name__of__city" :style="{ 'font-size': cityNameSize}">{{ cityName }}</p>
          <p class="temperature__information">{{ temperatureNow }}°</p>
      </div>
      <div class="local__time__block">
        <p class="local__time__title" data-lang="lang-local_time">Local time</p>
        <p class="local__time__info">{{ localTime }}</p>
      </div>
      <div class="min__max__temperature__container">
        <p class="min__temperature__title" data-lang="lang-min">min<span class="min__temperature__info">{{ minTemperature }}°</span></p>
        <p class="max__temperature__title" data-lang="lang-max">max<span class="max__temperature__info">{{ maxTemperature }}°</span></p>
      </div>
    </div>

    <div class="stub__content-2" :style="{ display: showStub }"></div>
    <div class="weather__block__two__days__container" :style="{ display: ShowWeatherBlock }">
      <div class="two__day__forcaste__header">
        <p class="two__day__forcaste__title" data-lang="lang-two_day_forecast">Two day forecast</p>
      </div>
      <div class="day__one__forecaste__block">
        <p class="date1">{{ date1 }}<img class="small__weather__icon" src="../src/assets/images/svg/Weather-icons/small-weather-icon.svg" alt="Weather tomorrow"></p>
        <p class="min__temperature__title1" data-lang="lang-min1">min<span class="min__temperature__info1">{{ minTemperature1 }}°</span></p>
        <p class="max__temperature__title1" data-lang="lang-max1">max<span class="max__temperature__info1">{{ maxTemperature1 }}°</span></p>
      </div>
      <div class="day__two__forecaste__block">
        <p class="date2">{{ date2 }}<img class="small__weather__icon" src="../src/assets/images/svg/Weather-icons/small-weather-icon.svg" alt="Weather day after tomorrow"></p>
        <p class="min__temperature__title2" data-lang="lang-min2">min<span class="min__temperature__info2">{{ minTemperature2 }}°</span></p>
        <p class="max__temperature__title2" data-lang="lang-max2">max<span class="max__temperature__info2">{{ maxTemperature2 }}°</span></p>
      </div>
    </div>
  </section>
  </main>
</template>

<script>
import axios from 'axios';
dayjs.extend(window.dayjs_plugin_utc)
dayjs.extend(window.dayjs_plugin_timezone)

export default {
  data() {
    return {
      backgroundStyle: '',
      displayItems: 'flex',
      showSettingsBTN: 'none',

      showStub: 'flex',
      ShowWeatherBlock: 'none',

      settingsBlockWidth: '40px',
      settingsBlockBorder: '50px',
      rotateSettingsBTN: 'rotate(0deg)',
      searchBlockWidth: '260px',
      searchBlockBorder: '28px',
      darkTheme: 'false',
      themeMode: 'Dark',
      lang: 'Ru',

      cityNameSize: '35px',
      cityName: '',
      temperatureNow: '',
      localTime: '',
      minTemperature: '',
      maxTemperature: '',

      date1: '',
      minTemperature1: '',
      maxTemperature1: '',

      date2: '',
      minTemperature2: '',
      maxTemperature2: '',
    };
  },

  mounted() {
    this.applyTheme();
  },
  
  methods: {
    pressGetStartedBTN() {
      this.displayItems = 'none';
      this.showSettingsBTN = 'flex';
    },
    pressSettingsBTN() {
      this.settingsBlockWidth = this.settingsBlockWidth === '40px' ? '260px' : '40px';
      this.settingsBlockBorder = this.settingsBlockBorder === '50px' ? '28px' : '50px';
      this.searchBlockWidth = this.searchBlockWidth === '260px' ? '40px' : '260px';
      this.searchBlockBorder = this.searchBlockBorder === '28px' ? '50px' : '28px';
      this.rotateSettingsBTN = this.rotateSettingsBTN === 'rotate(0deg)' ? 'rotate(-90deg)' : 'rotate(0deg)';
    },
    pressSearchBTN() {
      this.settingsBlockWidth = '40px';
      this.settingsBlockBorder = '50px';
      this.searchBlockWidth = '260px';
      this.searchBlockBorder = '28px';
      this.rotateSettingsBTN = 'rotate(0deg)';
    },
    changeThemeBTN() {
      this.darkTheme = !this.darkTheme;
      this.applyTheme();
      this.themeMode = this.themeMode === 'Dark' ? 'Light' : 'Dark';
    },
    applyTheme() {
      if (this.darkTheme) {
        document.body.style.backgroundColor = '#fff';
      } else {
        document.body.style.backgroundColor = '#000';
      }
    },
    changeLangBTN() {
      this.lang = this.lang === 'Ru' ? 'En' : 'Ru';
    },
    showWeatherInfo() {
      if (this.cityName.trim() === '') {
        this.showStub = 'flex';
        this.ShowWeatherBlock = 'none';
      } else {
        this.showStub = 'none';
        this.ShowWeatherBlock = 'flex';
      };

      const trimmedInput = this.cityName.trim();
      if (trimmedInput.length > 8) {
        this.cityNameSize = '25px'
      } else {
        this.cityNameSize = '35px'
      };
    },

    // WEATHER FORECAST
    async searchCity() {
      this.$refs.input.blur();

      try {
        const apiKey = '566760046b7b4ce182fb740e4fe1a96b';
        const response = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(this.cityName)}&key=${apiKey}&units=M`);

        this.temperatureNow = Math.round(response.data.data[0].temp);

        const forecastResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${encodeURIComponent(this.cityName)}&key=${apiKey}&units=M`);

        const todayForecast = forecastResponse.data.data[0];
        this.minTemperature = Math.round(todayForecast.min_temp);
        this.maxTemperature = Math.round(todayForecast.max_temp);

        const timezone = response.data.data[0].timezone;
        const currentTime = dayjs().tz(timezone);
        this.localTime = currentTime.format('HH:mm');

        const tomorrowForecast = forecastResponse.data.data[1];
        this.date1 = dayjs(tomorrowForecast.valid_date).format('MM.DD');
        this.minTemperature1 = Math.round(tomorrowForecast.min_temp);
        this.maxTemperature1 = Math.round(tomorrowForecast.max_temp);

        const dayAfterTomorrowForecast = forecastResponse.data.data[2];
        this.date2 = dayjs(dayAfterTomorrowForecast.valid_date).format('MM.DD');
        this.minTemperature2 = Math.round(dayAfterTomorrowForecast.min_temp);
        this.maxTemperature2 = Math.round(dayAfterTomorrowForecast.max_temp);

        this.setBackground(currentTime); 
      }
      catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
      }
    },
    setBackground(currentTime) {
      const hour = currentTime.hour();
      
      if (hour >= 6 && hour < 12) {
        this.backgroundStyle = "background: linear-gradient(18deg, #F1B14B 0%, #BC2C35 100%)";
      } else if (hour >= 12 && hour < 18) {
        this.backgroundStyle = "background: linear-gradient(18deg, #4BB5F1 0%, #2F2CBC 100%)";
      } else {
        this.backgroundStyle = "background: linear-gradient(18deg, #223076 0%, #06050E 100%)";
      }
    },
  }
};
</script>

<style>
body {
  min-width: 320px;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
}
* {
    margin: 0;
    padding: 0;
    padding: 0;
}
a {
    color: #fff;
    text-decoration: none;
}
button {
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0%);
}

.main__wrapper {
  position: relative;
  width: 350px;
  height: 600px;
  overflow: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-radius: 30px;
  box-shadow: 10px 20px 40px 10px rgba(0, 0, 0, 0.25);
}

.greetings__window__container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  background: linear-gradient(18deg, #223076 -0.75%, #06050E 100%);
}

.greetings__window__content {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

.greetings__window__text__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.name__of__app {
  font-size: 40px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
}

.link__to__author {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.70);
  text-decoration: underline;
  transition: 0.2s;
  user-select: none;
  -webkit-user-select: none;
}

.link__to__author:hover {
  text-decoration: none;
  color: #fff;
}

.get__started__btn {
  width: 100%;
  height: auto;

  box-sizing: border-box;
  padding: 15px 0px;

  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.25);
  transition: 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 600;
  color: #fff;
  user-select: none;
  -webkit-user-select: none;
}

.get__started__btn:hover {
  background-color: rgba(192, 192, 192, 0.25);
}

.get__started__btn:active {
  color: #BABABA;
  transform: scale(0.98);
  background-color: rgba(122, 122, 122, 0.25);
}

.weather__data__window__container {
  left: 190px;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(18deg, #4BB5F1 -0.75%, #2F2CBC 100%);
}

.starus__bar__content {
  width: 100%;
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#time__block {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  user-select: none;
  -webkit-user-select: none;
}

.network__battery__block {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}

.network__icon,
.wifi__icon,
.battery__icon {
  user-select: none;
  -webkit-user-select: none;
}

.appBar__container {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.search__block__container {
  width: 260px;
  height: 40px;
  overflow: hidden;
  transition: 0.3s;

  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.10);

  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.search__btn__container {
  min-width: 40px;
  height: 40px;
  margin-right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
  -webkit-user-select: none;
}

.search__input {
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  outline: none;

  font-size: 16px;
  font-weight: 500;
  color: #fff;
}

.search__input::placeholder {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.50);
}

.settings__block__container {
  width: 40px;
  height: 40px;
  overflow: hidden;
  transition: 0.3s;

  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.10);

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.settings__btn__container {
  min-width: 40px;
  height: 40px;
  margin-left: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
  -webkit-user-select: none;
}

.settings__icon {
  transition: 0.3s;
}

.settings__items {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.change__theme__btn,
.change__lang__btn {
  width: 99px;
  height: 32px;

  border-radius: 28px;
  background: rgba(255, 255, 255, 0.10);
  transition: 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: 500;
  color:  #fff;
  user-select: none;
  -webkit-user-select: none;
}

.change__theme__btn:active,
.change__lang__btn:active {
  transform: scale(0.95);
}

.weather__image__container {
  width: 100%;
  height: 124px;
  margin-top: 50px;
  margin-bottom: 46px;

  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
}

.big__weather__icon {
  transition: 0.2s;
}

.big__weather__icon:hover {
  transform: scale(1.05);
}

.stub__content-1,
.stub__content-2 {
  width: 100%;
  height: 116px;
  
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);

  background: linear-gradient(120deg, rgba(255, 255, 255, 0.10) 30%, rgba(255, 255, 255, 0.30) 38%, rgba(255, 255, 255, 0.30) 40%, rgba(255, 255, 255, 0.10) 48%);
  background-size: 200% 100%;
  background-position: 100% 0;

  display: flex;
  animation: stub-content-anim 2s infinite;
  -webkit-animation: stub-content-anim 2s infinite;
}

@keyframes stub-content-anim {
    100% {
        background-position: -100% 0;
    }
}

@-webkit-keyframes stub-content-anim {
    100% {
        background-position: -100% 0;
    }
}

.stub__content-1 {
  height: 143px;
  margin-bottom: 10px;
}

.stub__content-2 {
  height: 116px;
}

.weather__block__now__container,
.weather__block__two__days__container {
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden;

  user-select: none;
  -webkit-user-select: none;

  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.10);
}

.weather__block__now__container {
  width: 100%;
  height: 143px;
  margin-bottom: 10px;
}

.city__temperature__block {
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.name__of__city,
.temperature__information {
  font-size: 35px;
  font-weight: 500;
  color: #fff;
}

.local__time__block {
  width: 100%;
  margin-bottom: 15px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.local__time__title,
.local__time__info {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.70);
}

.min__max__temperature__container {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 90px;
}

.min__temperature__title,
.max__temperature__title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.70);
}

.min__temperature__info,
.max__temperature__info {
  font-size: 20px;
  font-weight: 500;
  color: #fff;
}

.weather__block__two__days__container {
  width: 100%;
  height: 116px;
}

.two__day__forcaste__header,
.day__one__forecaste__block,
.day__two__forecaste__block {
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  box-sizing: border-box;
  padding: 0px 0px 5px 0px;

  border-bottom: 1px solid rgba(217, 217, 217, 0.50);
  margin-bottom: 9px;
}

.day__one__forecaste__block,
.day__two__forecaste__block {
  justify-content: space-between;
}

.day__two__forecaste__block {
  border-bottom: none;
  margin-bottom: none;
}

.two__day__forcaste__title {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.70);
}

.date1,
.date2 {
  width: 90px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-right: 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.min__temperature__title1,
.max__temperature__title1,
.min__temperature__title2,
.max__temperature__title2 {
  width: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.70);  
}

.min__temperature__title1,
.min__temperature__title2 {
  width: 80px;
  margin-right: 15px;
}

.min__temperature__info1,
.max__temperature__info1,
.min__temperature__info2,
.max__temperature__info2 {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}
</style>