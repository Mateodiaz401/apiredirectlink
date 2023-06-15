const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const linksSchema = new Schema({
    longLink: {
        type: String,
        required: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
})

module.exports = model('Link', linksSchema);