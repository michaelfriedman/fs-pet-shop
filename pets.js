'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const index = process.argv[3];
    const pets = JSON.parse(data);
    if (index === undefined) {
      console.log(pets)
    }
    else {
      console.log(pets[index]);
    }
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data);
    const pet = {age: parseInt(process.argv[3]), kind: process.argv[4], name: process.argv[5]};

    if (process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined) {
      console.error('Usage: node pets.js create AGE KIND NAME')
      process.exit(1);
    }

    pets.push(pet);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet)
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
