// This Sequelize Model represents the 'question' table in 
// our CockroachDB database. Sequelize will automatically
// support our CRUD functions. 
const Survey = require('./survey.model');

module.exports = questionsModel = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
        questionID: {
            type: Sequelize.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        surveyID: {
            type: Sequelize.INTEGER,
            references: {
                model: Survey,
                key: 'surveyID'
            }
        },
        title: {
            type: Sequelize.STRING
        },
        options: {
            type: Sequelize.STRING
        },
        questionType: {
            type: Sequelize.STRING
        }
    });

    return Question;
};