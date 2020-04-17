const mongoose = require('../../database');

const DevSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    user:{
        type:String,
        require: true,
    },
    bio:{
        type:String, 
    },
    avatar:{
        type:String,
        require:true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Dev',
    }],
    dislikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Dev',
    }]
},{
    timestamps:true,
});

const Dev = mongoose.model('Dev', DevSchema);
module.exports = Dev;