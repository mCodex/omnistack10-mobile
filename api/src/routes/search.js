const { Router } = require('express');
const parseStringToArray = require('../utils/parseStringToArray');

const Dev = require('../models/dev');

const router = Router();

router.get('/search', async (req, res) => {
  const { latitude, longitude } = req.query;
  let { techs = '' } = req.query;

  if (techs.length > 0) {
    techs = parseStringToArray(techs);
  }

  const devs = await Dev.find({
    ...(techs.length > 0 && {
      techs: {
        $in: techs
      }
    }),
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000 //10 km
      }
    }
  });

  return res.json(devs);
});

module.exports = router;
