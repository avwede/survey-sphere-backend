// This Sequelize Model represents the 'answer' table in 
// our CockroachDB database. Sequelize will automatically
// support our CRUD functions. 
const Survey = require('./survey.model');
const Question = require('./question.model');

module.exports = answerModel = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answer", {
        answerID: {
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
        questionID: {
            type: Sequelize.INTEGER, 
            references: {
                model: Question,
                key: 'questionID'
            }
        },
        answer: {
            type: Sequelize.STRING
        }
    });

    return Answer;
};