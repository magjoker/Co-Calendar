const router = require('express').Router();
const userRoutes = require('./userRoutes');
const CalendarRoutes = require('./CalendarRoutes');
const ListRoutes = require('./userTableRouter')
const EventRoutes = require('./EventsRouter')

router.use('/users', userRoutes);
router.use('/calendar', CalendarRoutes);
router.use('/userList', ListRoutes);
router.use('/events', EventRoutes);

module.exports = router;