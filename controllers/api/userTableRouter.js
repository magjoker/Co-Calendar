const router = require('express').Router();
const { User, Table } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const userData = await Table.create(req.body);
        res.status(200).json(userData);
      
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/:id', async (req, res) => {
    try {
    const userData = await Table.create({
        user_id: req.session.user_id,
    });
    res.status(200).json(userData)
    }
    catch (err) {
        res.status(400).json(err);
      }

  })

  module.exports = router;
