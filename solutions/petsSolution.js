#!/usr/bin/env node

/* eslint-disable no-console */

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

    const index = Number.parseInt(process.argv[3]);
    const pets = JSON.parse(data);

    if (Number.isNaN(index)) {
      console.log(pets);
      process.exit();
    }

    if (index < 0 || index >= pets.length) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    console.log(pets[index]);
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const pets = JSON.parse(data);
    const age = Number.parseInt(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];

    if (Number.isNaN(age) || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    const pet = { age, kind, name };

    pets.push(pet);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else if (cmd === 'update') {
  // eslint-disable-next-line max-statements
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const index = Number.parseInt(process.argv[3]);
    const pets = JSON.parse(data);

    if (Number.isNaN(index) || index < 0 || index >= pets.length) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    const age = Number.parseInt(process.argv[4]);
    const kind = process.argv[5];
    const name = process.argv[6];

    if (Number.isNaN(age) || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    const pet = { age, kind, name };

    pets[index] = pet;

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }

    const index = Number.parseInt(process.argv[3]);
    const pets = JSON.parse(data);

    if (Number.isNaN(index) || index < 0 || index >= pets.length) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    const pet = pets.splice(index, 1)[0];
    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
