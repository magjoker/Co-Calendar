const User = require('./User');
const Calendar = require('./Calendar');
const Event = require('./Event');
const UserList = require('./UserList');

// User Relationships
User.belongsTo(UserList, {
  foreignKey: 'userlist_id',
  onDelete: 'CASCADE'
});

// UserList Relationships
UserList.belongsTo(Calendar, {
    foreignKey: 'calendar_id',
});

// Calendar Relationships
Calendar.hasMany(Event, {
    foreignKey: 'event_id'
});

// Event Relationships
Event.belongsTo(Calendar, {
    foreignKey: 'calendar_id'
});

module.exports = { User, UserList, Calendar, Event };
