const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gearSchema = new Schema({
    gearName: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    gearType: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
   timestamps: true,
});

const Gear = mongoose.model('Gear', gearSchema, 'gear'); // third paramenter bypasses pluarlize

module.exports = Gear;