const { Router } = require('express');
const controller = require('../controllers/contact');
const isAuth = require('../../middleware/auth');
const { contact } = require('../../middleware/validator');
const route = Router();

exports.contactRoutes = (app) => {
    app.use('/contact', route);

    route.get('/all', isAuth, controller.getContact);
    route.put('/update', contact(), isAuth, controller.update);
};
