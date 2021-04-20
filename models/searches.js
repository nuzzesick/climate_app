const fs = require('fs');
const axios = require('axios');

class Searches {
  dbPath = './db/database.json';
  history =  [];
  constructor() {
    const file = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
    this.history = file.history;
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
  async addToHistory(place = '') {
    if (this.history.includes(place.toLowerCase())) {
      return;
    }
    this.history.unshift(place);
    this.saveDB();
  };
  saveDB() {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }
};

module.exports = { Searches };