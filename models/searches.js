const axios = require('axios');

class Searches {
  history = [];
  constructor() {
  }
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      cachebuster: 1618437637983,
      autocomplete: true,
      limit: 5,
      language: 'en',
    };
  };
  paramsOpenWeatherMap(lat, lng) {
    return {
      lat,
      lon: lng,
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'en',
    };
  };
  async cities(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const res = await instance.get();
      return res.data.features.map((p) => ({
        id: p.id,
        name: p.place_name,
        lng: p.center[0],
        lat: p.center[1],
      }));
    } catch (error) {
      return [];
    };
  };
  async placeWeather(lat, lng) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: this.paramsOpenWeatherMap(lat, lng),
      });
      const res = await instance.get();
      const { data } = await res;
      const { main, weather } = await data;
      return {
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
        desc: weather[0].description,
      };
    } catch (error) {
      console.log(error);
    };
  };
};

module.exports = { Searches };