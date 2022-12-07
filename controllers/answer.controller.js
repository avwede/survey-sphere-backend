const db = require("../models");
const Answer = db.answer;
const Survey = require("./survey.controller");

exports.getAllAnswers = (req, res) => {
    Answer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ?? "Error: Cannot get answers."
            })
        });
};

exports.getAllAnswersBySurvey = (req, res) => {
    Answer.findAll({
        where: {
            surveyID: req.body.surveyID
        }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ?? "Error: Cannot get answers from surveyID."
            })
        });
};

exports.addAnswer = (req, res) => {
    let surveyStatus = Survey.getSurveyStatusByID(req.body.surveyID);

    if (surveyStatus !== 'ACTIVE') {
        res.status(400).send({
            message: "This survey is closed. Cannot add answer."
        });
        return;
    }

    const answer = {
        surveyID: req.body.surveyID,
        questionID: req.body.questionID,
        answer: req.body.answer,
    }
    
    Answer.create(answer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot add answer."
            });
        });
};

exports.deleteAnswer = (req, res) => {
    Answer.destroy({
        where: {
            answerID: req.body.answerID,
            surveyID: req.body.surveyID,
            questionID: req.body.questionID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot delete answer."
        });
    });
};