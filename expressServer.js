/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');

const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.post('pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack);

      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    const pet = req.body.name;

    if (!pet) {
      return res.sendStatus(400);
    }
    pets.push(pet);
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
      res.set('Content-Type', 'text/plain');
      res.send(pet);
    });
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'text/plain');
    res.send(pets[id]);
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
