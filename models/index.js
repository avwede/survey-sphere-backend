const Sequelize = require('sequelize-cockroachdb');
const dotenv = require('dotenv');
dotenv.config();

// Connect to Cockroach DB cloud instance. 
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "survey-sphere"
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import tables.
db.users = require('./users.model.js')(sequelize, Sequelize);
db.survey = require('./survey.model.js')(sequelize, Sequelize);
db.question = require('./question.model.js')(sequelize, Sequelize);
db.answer = require('./answer.model.js')(sequelize, Sequelize);
db.entry = require('./entry.model.js')(sequelize, Sequelize);

module.exports = db;
