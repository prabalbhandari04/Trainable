const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;





const recruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Recruiters", recruitSchema)


const Recruiters = mongoose.model('Recruiters', recruitSchema);
module.exports = {
    Recruiters
};

