const db = require("../models");
const Survey = require("./survey.controller");
const Entry = db.entry;

exports.getAllEntries = (req, res) => {
    Entry.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot get entries."
            })
        });
};

exports.getAllEntriesBySurvey = (req, res) => {
    Entry.findAll({
        where: {
            surveyID: req.body.surveyID
        }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot get entries from surveyID."
            })
        });
};

exports.addEntry = (req, res) => {
    let surveyStatus = Survey.getSurveyStatusByID(req.body.surveyID);

    if (surveyStatus !== 'ACTIVE') {
        res.status(400).send({
            message: "This survey is closed. Cannot add entry."
        });
        return;
    }

    const entry = {
        surveyID: req.body.surveyID,
        userID: req.body.userID,
        answers: req.body.answers,
    }
    
    Entry.create(entry)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot add entry."
            });
        });
};

exports.deleteEntry = (req, res) => {
    Entry.destroy({
        where: {
            surveyID: req.body.surveyID,
            userID: req.body.userID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot delete entry."
        });
    });
};