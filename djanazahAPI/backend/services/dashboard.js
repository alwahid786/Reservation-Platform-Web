const DeviceModel = require('../models/Device');
const AnnouncementModel = require('../models/Announcement');
const AdvertisementModel = require('../models/Advertisement');
const AdmobModel = require('../models/Admob');
const Response = require('../ulti/response');

exports.DashboardServices = {
    GetDashboardInfo: async () => {
        const response = new Response();
        const devices = await DeviceModel.countDocuments();
        const announcements = await AnnouncementModel.countDocuments();
        const ads = await AdvertisementModel.countDocuments();
        const admobs = await AdmobModel.countDocuments();

        const activeAds = await AdvertisementModel.where({
            isActive: true,
        }).countDocuments();
        const activeAdmobs = await AdmobModel.where({
            isActive: true,
        }).countDocuments();

        const latestDevices = await DeviceModel.find({}, 'udid')
            .sort('-createdAt')
            .limit(5);
        const latestAnnouncements = await AnnouncementModel.find({})
            .populate(
                'deceasedDetails.gender janazahDetails.country janazahDetails.province',
            )
            .sort('-createdAt')
            .limit(5);

        const dashboard = {
            devices: devices,
            announcements: announcements,
            totalAds: ads + admobs,
            activeAds: activeAds + activeAdmobs,
            latestDevices: latestDevices,
            latestAnnouncements: latestAnnouncements,
        };
        response.setSuccess(200, dashboard);
        return response;
    },
};
