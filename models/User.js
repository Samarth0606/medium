const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


let userSchema = new mongoose.Schema({
    email : {
        type : String,
        Required : true,
        trim : true
    }
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', userSchema);

module.exports = User;