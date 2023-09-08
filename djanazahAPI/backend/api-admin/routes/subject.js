const { Router } = require('express');
const controller = require('../controllers/subject');
const isAuth = require('../../middleware/auth');
const { subject } = require('../../middleware/validator');
const route = Router();

exports.subjectRoutes = (app) => {
    app.use('/subject', route);

    route.get('/all', isAuth, controller.getSubjectList);
    route.get('/category/:id', isAuth, controller.getSubjectCategory);
    route.post('/create', subject(), isAuth, controller.create);
    route.put('/update', subject(), isAuth, controller.update);
    route.delete('/delete/:id', isAuth, controller.delete);
};
