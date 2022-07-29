const router = require('express').Router()
const assessmentCtrl = require('../controllers/assessmentController')
const auth = require('../middleware/auth')
// register route user 


// user activation route
router.post('/create', assessmentCtrl.create)
router.get('/findall', assessmentCtrl.findall)
router.get('/find/:id', assessmentCtrl.find)
router.post('/addQuestion/:id', assessmentCtrl.addQuestion)

module.exports = router