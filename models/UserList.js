const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserList extends Model {}

UserList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    calendar_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'calendar',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userlist',
  }
);

module.exports = UserList;
