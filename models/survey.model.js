// This Sequelize Model represents the 'survey' table in 
// our CockroachDB database. Sequelize will automatically
// support our CRUD functions. 
const Users = require('./users.model');

module.exports = surveyModel = (sequelize, Sequelize) => {
    const Survey = sequelize.define("survey", {
        surveyID: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: Users,
                key: 'userID'
            }
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        endDate: {
            type: Sequelize.DATE
        },
    });

    return Survey;
};