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
    }
  }
};

module.exports = { Searches };