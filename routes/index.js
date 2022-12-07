const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => res.send('welcome to the SurveySphere API!'));

// User Routes
const users = require('../controllers/users.controller.js');
router.get('/users/getAll', users.getAllUsers);
router.get('/user/getEmails', users.getUserEmails);
router.post('/users/add', users.addUser);
router.post('/users/auth', users.login);
router.delete('/users/delete', users.deleteUser);
router.delete('/users/me', users.getUserInfo);

// Survey Routes
const survey = require('../controllers/survey.controller.js');
router.get('/survey/getAll', survey.getAllSurveys);
router.get('/survey/getAllActive', survey.getAllActiveSurveys);
router.get('/survey/getAllClosed', survey.getAllClosedSurveys);
router.get('/survey/getSurveyByUser', survey.getSurveysByUser);
router.get('/survey/getStatusByID', survey.getSurveyStatusByID);
router.post('/survey/add', survey.addSurvey);
router.delete('/survey/delete', survey.deleteSurvey);
router.put('/survey/setSurveyClosed', survey.setSurveyClosed);
router.put('/survey/setSurveyActive', survey.setSurveyActive);

// Question Routes
const question = require('../controllers/question.controller.js');
router.get('/question/getAll', question.getAllQuestions);
router.get('/question/getAllSurveyQuestions', question.getAllSurveyQuestions);
router.post('/question/add', question.addQuestion);
router.delete('/question/delete', question.deleteQuestion);

// Entry Routes
const entry = require('../controllers/entry.controller.js');
router.get('/entry/getAll', entry.getAllEntries);
router.get('/entry/getAllBySurvey', entry.getAllEntriesBySurvey);
router.post('/entry/add', entry.addEntry);
router.delete('/entry/delete', entry.deleteEntry);

// Answer Routes
const answer = require('../controllers/answer.controller.js');
router.get('/answer/getAll', answer.getAllAnswers);
router.get('/answer/getAllBySurvey', answer.getAllAnswersBySurvey);
router.post('/answer/add', answer.addAnswer);
router.delete('/answer/delete', answer.deleteAnswer);

module.exports = router;