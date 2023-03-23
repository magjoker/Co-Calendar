const router = require('express').Router();
const { Event, Calendar } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all of the users Events
router.get('/', withAuth, async(req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [
                {
                    model: Calendar,
                    attributes: ['name', 'Users']
                }
            ],
            where: {
                user_id: req.session.user_id,
                date: currentDate,
                status: active,
            }
        })
        const events = eventData.map((eventThing) => eventThing.get({plain: true}));
        res.render('homepage', {
            events,
            logged_in: req.session.logged_in
        })
        res.render('calendarPage', {
            events,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get an event by ID
router.get('/:id', withAuth, async(req, res) => {
    try{    const eventData = await Event.findByPk(req.params.id, {
        include: [{
            model: Calendar,
            attributes: ['name']
        }]
    })
    const events = eventData.map((eventThing) => eventThing.get({plain: true}));
    res.render('homepage', {
        events,
        logged_in: req.session.logged_in
    })
    res.render('calendarPage', {
        events,
        logged_in: req.session.logged_in
    })
    } catch (err) {
        res.status(500).json(err);
    }
})

// Create an Event
router.post('/', withAuth, async (req, res) => {
    try {
        const newEvent = await Event.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newEvent)
    } catch (err) {
        res.status(500).json(err);
      }
})


// Update an Event
router.put('/:id', withAuth, async (req, res) => {
    try {
        await Event.update({ title: req.params.title, description: req.params.description}, {
            where: {
                id: req.params.id
            }
        })
    }
    catch (err) {
        res.status(500).json(err);
      }

})

// Delete an Event
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const eventData = await Event.destroy({
          where: {
            id: req.params.id
          },
        });
    
        if (!eventData) {
          res.status(404).json({ message: 'No event found with this id!' });
          return;
        }
    
        res.status(200).json(eventData);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;