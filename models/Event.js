const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    start: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    end: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    calendar_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'calendar',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
  }
);

module.exports = Event;
