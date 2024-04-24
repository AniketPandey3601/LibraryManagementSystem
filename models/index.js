const Sequelize = require('sequelize');
const sequelize = new Sequelize('books','root', 'An12Pa99@', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require('./book.js')(sequelize);

module.exports = db;