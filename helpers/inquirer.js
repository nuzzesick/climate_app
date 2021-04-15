const inquirer = require('inquirer');
require('colors');

const menuOpts = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search city`,
      },
      {
        value: 2,
        name: `${'2.'.green} History`,
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`,
      },
    ],
  },
  {
    type: 'input',
    name: 'key',
    message: `Press ${'ENTER'.green} to continue`
  }
]

const inquirerMenu = async () => {
  const { option } = await inquirer.prompt(menuOpts[0]);
  return option;
};

const pause = async () => {
  const { key } = await inquirer.prompt(menuOpts[1]);
  return key;
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) return 'Please enter a value';
        else return true;
      }
    }
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}.`.green; 
    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel',
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a place:',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
}

const showChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green; 
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completedIn ? true : false,
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
}

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showChecklist,
};