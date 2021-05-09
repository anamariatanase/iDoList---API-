const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    app_background: String,
    lists: [{
        id: Number,
        title: String,
        description: String,
    }]
})
module.exports = mongoose.model('Users', UserSchema);
