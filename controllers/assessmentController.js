const {Assessment,AssessmentQuestions} = require('../models/assessmentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const { json } = require('express')
const mongoose = require('mongoose')



const assessmentCtrl = {

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

    findall : async (req, res) => {
        try {
            const assessments = await Assessment.find()
            res.json(assessments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    find : async (req, res) => {
        try {
            const {id} = req.params
            const assessments = await Assessment.findById(id)
            res.json(assessments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
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
};






module.exports = assessmentCtrl