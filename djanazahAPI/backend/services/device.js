const DeviceModel = require('../models/Device');
const CountryModel = require('../models/Country');
const ProvinceModel = require('../models/Province');
const SettingModel = require('../models/Setting');

exports.DeviceServices = {
    UpdateFavorite: async (udid, contentId) => {
        const device = await DeviceModel.findOne({ udid: udid });

        const favorites = [...device.favorites];
        const contentIndex = favorites.findIndex(
            (id) => id.toString() === contentId,
        );

        if (contentIndex !== -1) {
            favorites.splice(contentIndex, 1);
        } else {
            favorites.push(contentId);
        }

        const prevLength = device.favorites.length;
        const currentLength = favorites.length;

        device.favorites = favorites;
        await device.save();

        if (prevLength > currentLength) return false;
        return true;
    },
    CheckDevice: async (udid) => {
        const device = await DeviceModel.findOne({ udid: udid });
        if (device) return true;
        return false;
    },
    Create: async (udid) => {
        const defaultSetting = await SettingModel.findOne({ udid: 'default' });
        const device = {
            udid: udid,
            favorites: [],
            setting: defaultSetting._id,
            locationList: [],
        };
        const newDevice = await DeviceModel.create(device);
        return newDevice.udid;
    },
    GetDeviceArea: async (udid) => {
        const device = await DeviceModel.findOne({ udid: udid }).populate(
            'listLocation',
        );

        return device;
    },
    UpdateArea: async (udid, locationList, isCheck) => {
        //#region Pick Location
        let provinceList = [];
        if (isCheck) {
            const tempLocationList = [];
            for (const item of locationList) {
                tempLocationList.push(item.province);
            }
            provinceList = await ProvinceModel.find(
                {
                    name: { $in: tempLocationList },
                },
                '_id',
            );
        }
        const device = await DeviceModel.findOne({ udid: udid });
        device.listLocation =
            provinceList.map((province) => province._id) || [];
        //#endregion

        const result = await device.save();
        return result;
    },
    UpdateFCMToken: async (udid, fcmToken) => {
        const result = await DeviceModel.updateOne(
            { udid: udid },
            { fcmToken: fcmToken },
            { new: true },
        );
        return result;
    },
};
