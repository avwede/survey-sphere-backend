const db = require("../models");
const Survey = db.survey;

exports.getAllSurveys = (req, res) => {
    Survey.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot get surveys."
            })
        });
};

exports.addSurvey = (req, res) => {
    if (!req.body.userID) {
        res.status(400).send({
            message: "userID cannot be empty."
        });
        return;
    }

    if (!req.body.title) {
        res.status(400).send({
            message: "Survey title cannot be empty."
        });
        return;
    }

    if (!req.body.description) {
        res.status(400).send({
            message: "Survey description cannot be empty."
        });
        return;
    }

    if (!req.body.endDate) {
        res.status(400).send({
            message: "Survey End Date cannot be empty."
        });
        return;
    }

    const survey = {
        userID: req.body.userID,
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate
    }
    
    Survey.create(survey)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error: Cannot add survey."
            });
        });
};

exports.getAllActiveSurveys = (req, res) => {
    Survey.findAll({
        where: {
          status: 'ACTIVE'
        }
      })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
            message: "Error: Cannot get active surveys."
        });
      });
};

exports.getAllClosedSurveys = (req, res) => {
    Survey.findAll({
        where: {
          status: 'CLOSED'
        }
      })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
            message: "Error: Cannot get closed surveys."
        });
      });
};

exports.getSurveysByUser = (req, res) => {
    Survey.findAll({
        where: {
          userID: req.body.userID
        }
      })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
            message: "Error: Cannot get surveys by user."
        });
      });
};

exports.deleteSurvey = (req, res) => {
    Survey.destroy({
        where: {
            surveyID: req.body.surveyID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot delete survey."
        });
    });
};


exports.setSurveyClosed = (req, res) => {
    Survey.update({ status: "CLOSED" }, {
        where: {
            surveyID: req.body.surveyID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot update survey to closed."
        });
    });
};

exports.setSurveyActive = (req, res) => {
    Survey.update({ status: "ACTIVE" }, {
        where: {
            surveyID: req.body.surveyID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot update survey to active."
        });
    });
};

exports.getSurveyStatusByID = (req, res) => {
    Survey.findAll({
        where: {
            surveyID: req.body.surveyID
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: "Error: Cannot get survey status."
        });
    });
};