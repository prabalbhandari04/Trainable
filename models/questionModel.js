const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true
    },
    type: {
        type: String,
      enum : ['Text','Multiple Choice','Video','Audio'],
      default: 'user'
    },
    required : {
      type: Boolean,
      default: false
    }
}, {
  timestamps: true
})

module.exports = mongoose.model("Question", questionSchema)


const Question = mongoose.model('Question', questionSchema);
module.exports = {
  Question
};
