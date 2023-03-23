const router = require('express').Router();
const { Task, Calendar } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async(req, res) => {
    try {
        const taskData = await Task.findAll({
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
        const tasks = taskData.map((task) => task.get({plain: true}));
        res.render('homepage', {
            tasks,
            logged_in: req.session.logged_in
        })
        res.render('calendarPage', {
            tasks,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', withAuth, async(req, res) => {
    try{    
        const taskData = await Task.findByPk(req.params.id, {
        include: [{
            model: Calendar,
            attributes: ['name']
        }]
    })
    const tasks = taskData.map((task) => task.get({plain: true}));
    res.render('homepage', {
        tasks,
        logged_in: req.session.logged_in
    })
    res.render('calendarPage', {
        tasks,
        logged_in: req.session.logged_in
    })
    } catch (err) {
        res.status(500).json(err);
    }
})

// Create an Task
router.post('/', withAuth, async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newTask)
    } catch (err) {
        res.status(500).json(err);
      }
})

// Update an Task
router.put('/:id', withAuth, async (req, res) => {
    try {
        await Task.update({ title: req.params.title, description: req.params.description}, {
            where: {
                id: req.params.id
            }
        })
    }
    catch (err) {
        res.status(500).json(err);
      }

})

// Delete an Task
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const taskData = await Task.destroy({
          where: {
            id: req.params.id
          },
        });
    
        if (!taskData) {
          res.status(404).json({ message: 'No task found with this id!' });
          return;
        }
    
        res.status(200).json(taskData);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;