const { Router } = require('express');
const axios = require('axios');

const Dev = require('../models/dev');

const parseStringToArray = require('../utils/parseStringToArray');

const { findConnections, sendMessage } = require('../websocket');

const router = Router();

router.get('/devs', async (req, res) => {
  const devs = await Dev.find();

  return res.send(devs);
});

router.post('/devs', async (req, res) => {
  const { githubUsername, techs = '', latitude, longitude } = req.body;

  const checkIfDevExists = await Dev.findOne({ githubUsername });

  if (checkIfDevExists) {
    return res.status(400).send({ message: 'User already exists' });
  }

  const techsArray = parseStringToArray(techs);

  try {
    const usersGithubData = await axios.get(`https://api.github.com/users/${githubUsername}`);

    const { name = login, avatar_url, bio } = usersGithubData.data;

    const location = { type: 'Point', coordinates: [longitude, latitude] };

    const savedDev = await Dev.create({
      githubUsername,
      name,
      avatarUrl: avatar_url,
      bio,
      techs: techsArray,
      location
    });

    // Filtering websocket connections
    const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);

    sendMessage(sendSocketMessageTo, 'newDev', savedDev);

    return res.json(savedDev);
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
