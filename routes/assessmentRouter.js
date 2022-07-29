const router = require('express').Router()
const assessmentCtrl = require('../src/Assessment/assessmentController')
const auth = require('../middleware/auth')
// register route user 


// user activation route
router.post('/create', assessmentCtrl.create)
router.get('/', assessmentCtrl.findall)
router.get('/:id', assessmentCtrl.find)
router.put('/:id', assessmentCtrl.update)
router.delete('/:id', assessmentCtrl.remove)

// question routes 
router.post('/question/:id', assessmentCtrl.addQuestion)
router.post('/question/find/:id', assessmentCtrl.findOneQuestion)
router.get('/question/:id', assessmentCtrl.findAllQuestion)
router.put('/question/:id', assessmentCtrl.updateQuestion)
router.delete('/question/:id', assessmentCtrl.deleteQuestion)

module.exports = router