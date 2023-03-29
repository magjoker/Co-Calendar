const router = require('express').Router();
const { Event, Calendar } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/calendar_id/:id', async(req, res) => {
    try {
        console.log(req.params)
        const eventData = await Event.findAll({
            where: {
                calendar_id: req.params.id
            }, 
            attributes: {
                exclude: ['id', 'calendar_id', 'event_id']
            }
        });

        res.status(200).json(eventData);

    } catch (err) {
        console.log("Fail")
        res.status(500).json(err);
    }

})

// Create an Event
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const newEvent = await Event.create({
            ...req.body,
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