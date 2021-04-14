const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
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
        console.log(place);
        // Search places
        // Select a place
        // Weather
        // Show results
        console.log('\nInformation of the city\n'.green);
        console.log('\nCity:\n', );
        console.log('\nLat:\n', );
        console.log('\nLng:\n', );
        console.log('\nTemperature:\n', );
        console.log('\nMin:\n', );
        console.log('\nMax:\n', );
      break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();