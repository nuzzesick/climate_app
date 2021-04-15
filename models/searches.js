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
  async city(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const res = await instance.get();
      console.log(res.data);
    } catch (error) {
      return [];
    }
  }
};

module.exports = { Searches };