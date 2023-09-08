const mongoose = require('mongoose');

const Device = new mongoose.Schema(
    {
        udid: {
            type: String,
            required: true,
        },
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubjectCategory',
                required: true,
            },
        ],
        setting: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Setting',
            required: true,
        },
        listLocation: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Province' },
        ],
        fcmToken: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Device', Device);
