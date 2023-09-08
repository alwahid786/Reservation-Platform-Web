const mongoose = require('mongoose');

const FaqContent = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('FaqContent', FaqContent);
