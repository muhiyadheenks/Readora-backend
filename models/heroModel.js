const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({

    title: {
        type: String
    },

    image: {
        type: String
    },

    description: {
        type: String
    }

});

module.exports = mongoose.model("hero", heroSchema);