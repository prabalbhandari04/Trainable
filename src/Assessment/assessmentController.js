const {Assessment,AssessmentQuestions} = require('../../models/assessmentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../../utils/sendMail')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const { json } = require('express')
const mongoose = require('mongoose')



const assessmentCtrl = {

    // ************************ Assessment ************************

    // create assessment
    create: async (req, res) => {
        try {
            const {name, summary} = req.body

            // validation for name email and password            
            if(!name || !summary )
                return res.status(400).json({msg: "Please fill in all fields."})
            
            const newAssessment = new Assessment({
                name, summary , AssessmentQuestions : new AssessmentQuestions()
            })
            newAssessment.save()            
            res.json({msg: "Assessment Created"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // find all assessment
    findall : async (req, res) => {
        try {
            const assessments = await Assessment.find()
            res.json(assessments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // find assessment
    find : async (req, res) => {
        try {
            const {id} = req.params
            const assessments = await Assessment.findById(id)
            res.json(assessments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // update assessment
    update : async (req, res) => {
        try {
            const {name, summary} = req.body
            const {id} = req.params
            const assessment = await Assessment.findById(id)
            if(!assessment)
                return res.status(404).json({msg: "Assessment not found"})
            assessment.name = name
            assessment.summary = summary
            assessment.save()
            res.json({msg: "Assessment Updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // remove assessment
    remove : async (req, res) => {
        try {
            const {id} = req.params
            const assessment = await Assessment.findById(id)
            assessment.remove()
            res.json({msg: "Assessment Deleted"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    

    // **************************Question**************************


    // add questions
    addQuestion : async (req, res) => {
        try {
            const {id} = req.params
            const {question, type, required} = req.body
            const assessment = await Assessment.findById(id)
            assessment.assessmentQuestions.push({question, type, required})
            await assessment.save()
            res.json({msg: "Question added"})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    // find all questions
    findAllQuestion : async (req, res) => {
        try {
            const {id} = req.params
            const assessment = await Assessment.findById(id)
            res.json(assessment.assessmentQuestions)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // find one question 
    findOneQuestion : async (req, res) => {
        try {
            const {id} = req.params
            const {questionId} = req.body
            const assessment = await Assessment.findById(id)
            const question = assessment.assessmentQuestions.id(questionId)
            res.json(question)
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // update question
    updateQuestion : async (req, res) => {
        try {
            const {id} = req.params
            const {questionId} = req.body
            const {questions, type, required} = req.body
            const assessment = await Assessment.findById(id)
            const question = assessment.assessmentQuestions.id(questionId)
            question.question = questions
            question.type = type
            question.required = required
            await assessment.save()
            res.json({msg: "Question Updated"})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    
    deleteQuestion : async (req, res) => {
        try {
            const {id} = req.params
            const {question} = req.body
            const assessment = await Assessment.findById(id)
            assessment.assessmentQuestions.pull({question})
            await assessment.save()
            res.json({msg: "Question deleted"})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

};






module.exports = assessmentCtrl