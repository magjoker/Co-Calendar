const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Calendar, UserList, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async(req, res) => {
  try {
      console.log(req.params)
      const calID = await Calendar.findAll({
        where: {
          code: req.params.id
        },
        attributes: {
          exclude: ['title', 'code']
      }
      });

      res.status(200).json(calID);

  } catch (err) {
      console.log("Fail")
      res.status(500).json(err);
  }

})

router.get('/code/:id', async(req, res) => {
  try {
      console.log(req.params)
      const calID = await Calendar.findAll({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ['title, id']
      }
      });

      res.status(200).json(calID);

  } catch (err) {
      console.log("Fail")
      res.status(500).json(err);
  }

})

router.post('/',  async (req, res) => {
    try {
      console.log(req.body)
      const newCalendar = await Calendar.create({
        title: req.body.title,
        code: req.body.code
      })

      res.status(200).json(newCalendar);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;
  