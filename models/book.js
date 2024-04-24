const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    purchaseTime: DataTypes.DATE,
    returnTime: DataTypes.DATE,
    fine: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return Book;
};
