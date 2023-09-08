const { Router } = require('express');
const controller = require('../controllers/device');
const route = Router();

exports.deviceRoutes = (app) => {
    app.use('/device', route);

    route.get('/:udid', controller.checkDevice);
    route.get('/area/:udid', controller.getDeviceArea);
    route.put('/favorite/update', controller.updateFavorite);
    route.put('/area', controller.updateDeviceArea);
    route.put('/fcm-token', controller.updateFCMToken);
};
