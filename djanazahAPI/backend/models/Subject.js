const SubjectCategory = require('./SubjectCategory');
const mongoose = require('mongoose');

const Subject = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        categoryId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SubjectCategory',
            },
        ],
    },
    { timestamps: true },
);

Subject.pre('deleteOne', { document: true, query: false }, async function (
    next,
) {
    try {
        const deleteMany = await SubjectCategory.deleteMany({
            _id: { $in: this.categoryId },
        });        
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Subject', Subject);
