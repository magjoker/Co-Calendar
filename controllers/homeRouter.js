const router = require('express').Router();
const { User, Calendar } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('loginpage', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {

    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/calendar/:id', withAuth, async (req, res) => {
  try {
    const calendarData = await Calendar.findByPk(req.params.id, {
    });

    const calendar = calendarData.get({ plain: true });

    res.render('reuse', {
      ...calendar,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }

})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('loginpage');
});

module.exports = router;
