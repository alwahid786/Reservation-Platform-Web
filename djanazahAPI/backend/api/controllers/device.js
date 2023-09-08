const { DeviceServices } = require('../../services/device');
const { AnnouncementServices } = require('../../services/announcement');

const deviceController = {
    updateFavorite: async (req, res, next) => {
        try {
            const { udid, id } = req.body;

            const result = await DeviceServices.UpdateFavorite(udid, id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    checkDevice: async (req, res, next) => {
        try {
            const { udid } = req.params;
            const isDeviceExist = await DeviceServices.CheckDevice(udid);

            if (isDeviceExist) return res.status(200).json(udid);

            const result = await DeviceServices.Create(udid);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },
    getDeviceArea: async (req, res, next) => {
        try {
            const { udid } = req.params;
            const result = await DeviceServices.GetDeviceArea(udid);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    updateDeviceArea: async (req, res, next) => {
        try {
            const { udid, locationList, isCheck } = req.body;
            const result = await DeviceServices.UpdateArea(
                udid,
                locationList,
                isCheck,
            );
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    updateFCMToken: async (req, res, next) => {
        try {
            const { fcmToken, udid } = req.body;
            const result = await DeviceServices.UpdateFCMToken(udid, fcmToken);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};
module.exports = deviceController;
