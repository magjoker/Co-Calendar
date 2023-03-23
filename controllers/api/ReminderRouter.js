const router = require('express').Router();
const { Reminder, Calendar } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async(req, res) => {
    try {
        const reminderData = await Reminder.findAll({
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
        const reminders = reminderData.map((reminder) => reminder.get({plain: true}));
        res.render('homepage', {
            reminders,
            logged_in: req.session.logged_in
        })
        res.render('calendarPage', {
            reminders,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', withAuth, async(req, res) => {
    try {const reminderData = await Event.findByPk(req.params.id, {
            include: [{
                model: Calendar,
                attributes: ['name']
            }]
        })
        const reminders = reminderData.map((reminder) => reminder.get({plain: true}));
        res.render('homepage', {
            reminders,
            logged_in: req.session.logged_in
        })
        res.render('calendarPage', {
            reminders,
            logged_in: req.session.logged_in
        })
    } 
    catch (err) {
        res.status(500).json(err);
    }

})

// Create an Reminder
router.post('/', withAuth, async (req, res) => {
    try {
        const newRemidner = await Reminder.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newRemidner)
    } catch (err) {
        res.status(500).json(err);
      }
})

// Update an Reminder
router.put('/:id', withAuth, async (req, res) => {
    try {
        await Reminder.update({ title: req.params.title, description: req.params.description}, {
            where: {
                id: req.params.id
            }
        })
    }
    catch (err) {
        res.status(500).json(err);
      }

})

// Delete an Reminder
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const reminderData = await Reminder.destroy({
          where: {
            id: req.params.id
          },
        });
    
        if (!reminderData) {
          res.status(404).json({ message: 'No reminder found with this id!' });
          return;
        }
    
        res.status(200).json(reminderData);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;