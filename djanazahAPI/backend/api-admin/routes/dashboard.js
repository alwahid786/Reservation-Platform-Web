const { Router } = require('express');
const controller = require('../controllers/dashboard');
const isAuth = require('../../middleware/auth');
const route = Router();

exports.dashboardRoutes = (app) => {
    app.use('/dashboard', route);

    route.get('/all', isAuth, controller.getDashboard);
};
