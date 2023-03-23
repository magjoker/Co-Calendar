const router = require('express').Router();
const userRoutes = require('./userRoutes');
const CalendarRoutes = require('./CalendarRoutes');
const ListRoutes = require('./userTableRouter')

router.use('/users', userRoutes);
router.use('/calendar', CalendarRoutes);
router.use('/userList', ListRoutes);

module.exports = router;