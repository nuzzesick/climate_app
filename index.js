require('dotenv').config();
const { inquirerMenu, pause, readInput, listPlaces } = require('./helpers/inquirer');
const { Searches } = require('./models/searches');

const main = async () => {
  const searches = new Searches();
  let opt;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Show message
        const place = await readInput('Place: ');
        // Search places
        const places = await searches.cities(place);
        // Select a place
        const id = await listPlaces(places);
        if (id === '0') continue;
        //Save in DB
        const placeSelected = places.find((p) => p.id === id);
        searches.addToHistory(placeSelected.name);
        const { name, lat, lng } = placeSelected;
        // Weather
        const weather = await searches.placeWeather(lat, lng);
        const { temp, min, max, desc } = await weather;
        // Show results
        console.log('\nInformation of the city\n'.green);
        console.log('\nCity:\n', name);
        console.log('\nLat:\n', lat);
        console.log('\nLng:\n', lng);
        console.log('\nTemperature:\n', temp);
        console.log('\nMin:\n', min);
        console.log('\nMax:\n', max);
        console.log('\nWeather:\n', desc);
      break;
      case 2:
        console.log(searches.history.forEach((e, i) => {
          console.log(`${i + 1}. ${e}`);
        }));
      break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
  console.clear();
};

main();