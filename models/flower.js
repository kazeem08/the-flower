const { Schema, mongoose } = require('./base');

const flowerSchema = new Schema({
    flower: {
        type: Object,
        required: true
    },
    counter: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
        required: true
    }
});

const FlowerModel = new mongoose.model('flowers', flowerSchema);

module.exports = FlowerModel;