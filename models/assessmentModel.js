const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const assessmentQuestionsSchema = new mongoose.Schema({
  question: {
      type: String,
  },
  type: {
      type: String,
    enum : ['Text','Multiple Choice','Video','Audio'],
  },
  required : {
    type: Boolean,
    default: false
  }
}, {
timestamps: true
})

const assessmentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true
    },
    assessmentQuestions: [assessmentQuestionsSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model("Assessment", assessmentSchema)
module.exports = mongoose.model("AssessmentQuestions", assessmentQuestionsSchema)


const Assessment = mongoose.model('Assessment', assessmentSchema);
const AssessmentQuestions = mongoose.model('AssessmentQuestions', assessmentQuestionsSchema);
module.exports = {
  Assessment,
  AssessmentQuestions
};
