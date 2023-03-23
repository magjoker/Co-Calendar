const User = require('./User');
const Calendar = require('./Calendar');
const Event = require('./Event');
const Reminder = require('./Reminder');
const Task = require('./Task');
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
Calendar.belongsTo(UserList, {
    foreignKey: 'userlist_id',
});

Calendar.hasMany(Event, {
    foreignKey: 'event_id'
});

Calendar.hasMany(Reminder, {
    foreignKey: 'reminder_id'
});

Calendar.hasMany(Task, {
    foreignKey: 'task_id'
});

// Event Relationships
Event.belongsTo(Calendar, {
    foreignKey: 'calendar_id'
});

// Reminder Relationships
Reminder.belongsTo(Calendar, {
    foreignKey: 'calendar_id'
});

// Task Relationships
Task.belongsTo(Calendar, {
    foreignKey: 'calendar_id'
});

module.exports = { User, UserList, Calendar, Event, Reminder, Task };
