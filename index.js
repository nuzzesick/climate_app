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
        const placeSelected = places.find((p) => p.id === id);
        const { name, lat, lng } = placeSelected;
        // Weather
        // Show results
        console.log('\nInformation of the city\n'.green);
        console.log('\nCity:\n', name);
        console.log('\nLat:\n', lat);
        console.log('\nLng:\n', lng);
        console.log('\nTemperature:\n', );
        console.log('\nMin:\n', );
        console.log('\nMax:\n', );
      break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
  console.clear();
};

main();