const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    rating : {
        type : Number,
        min : 0, 
        max : 5
    },
    comment : {
        type : String,
        trim : true,
        required : true
    }
}, {timestamps : true});


let Review = mongoose.model('Review', reviewSchema);

module.exports = Review;