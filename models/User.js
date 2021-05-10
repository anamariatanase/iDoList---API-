const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    app_background: String,
    lists: [{
       
            listName: String,
            title: String,
            cards: [{
                id:String,
                content: String
            }]
        

    }],
    listNames:Array
})
module.exports = mongoose.model('Users', UserSchema);
