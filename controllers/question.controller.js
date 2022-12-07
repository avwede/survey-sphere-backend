const db = require("../models");
const Question = db.question;

exports.getAllQuestions = (req, res) => {
    Question.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ?? "Error: Cannot get questions."
            })
        });
};


exports.addQuestion = (req, res) => {
    if (!req.body.surveyID) {
        res.status(400).send({
            message: "Survey ID cannot be empty."
        });
        return;
    }

    if (!req.body.title) {
        res.status(400).send({
            message: "Question title cannot be empty."
        });
        return;
    }

    if (!req.body.questionType) {
        res.status(400).send({
            message: "Question type cannot be empty."
        });
        return;
    }

    const question = {
        surveyID: req.body.surveyID,
        title: req.body.title,
        questionType: req.body.questionType,
    }
    
    Question.create(question)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot add question."
            });
        });
};

exports.getAllSurveyQuestions = (req, res) => {
    Question.findAll({
        where: {
          surveyID: req.body.surveyID
        }
      })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
            message: "Error: Cannot get all survey questions."
        });
      });
};

exports.deleteQuestion = (req, res) => {
    Question.destroy({
        where: {
            questionID: req.body.questionID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot delete question."
        });
    });
};