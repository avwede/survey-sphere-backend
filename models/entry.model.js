// This Sequelize Model represents the 'entry' table in 
// our CockroachDB database. Sequelize will automatically
// support our CRUD functions. 
const Survey = require('./survey.model');
const Users = require('./users.model');

module.exports = entryModel = (sequelize, Sequelize) => {
    const Entry = sequelize.define("entry", {
        surveyID: {
            type: Sequelize.INTEGER, 
            references: {
                model: Survey,
                key: 'surveyID'
            }
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: Users,
                key: 'userID'
            }
        },
        answers:{
            type: Sequelize.STRING
        }
    });

    return Entry;
};