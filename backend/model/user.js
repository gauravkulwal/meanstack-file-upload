const mongoose = require('mongoose');

var schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String
    },
    fatherName:{
        type: String
    },
    city:{
        type: String
    },
    mobile:{
        type: String
    },
    image:{
        type: String
    }
})
module.exports = mongoose.model('User' , userSchema);