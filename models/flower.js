const { Schema, mongoose } = require('./base');

const flowerSchema = new Schema({
    level1: {
        type: Array,
        required: true
    },
    level2: {
        type: Array,
        required: true
    },
    level3: {
        type: Array,
        required: true
    },
    level4: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const FlowerModel = new mongoose.model('flowers', flowerSchema);

module.exports = FlowerModel;