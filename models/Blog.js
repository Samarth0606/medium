const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    org: {
        type : String,
        // required : true,
        trim : true
    },
    headline : {
        type : String,
        required : true,
        trim : true
    },
    text : {
        type : String,
        trim : true
    },
    date : {
        type : String,
        required : true,
        trim : true
    },
    img : {
        type : String,
        required : true,
        trim : true
    },
    comment : {
        required : true,
        type : String,
        trim : true
    },
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }]
});

let Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog;













