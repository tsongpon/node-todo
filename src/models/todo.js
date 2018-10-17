'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {}, {
      underscored: true,
      freezeTableName: true,
      tableName: 'todo',
      paranoid: true,
    });
  todo.associate = function (models) {
    // associations can be defined here
  };
  return todo;
};