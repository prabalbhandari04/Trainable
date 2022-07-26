const router = require('express').Router()
const recruitCtrl = require('../controllers/recruitController')
const auth = require('../middleware/auth')
// register route user 
router.post('/register', recruitCtrl.register)

// user activation route
router.post('/activation', recruitCtrl.activateEmail)

// user login route
router.post('/login',recruitCtrl.login)

// user refresh token
router.post('/refresh_token', recruitCtrl.getAccessToken)

// user forgot password activate route
router.post('/forgot', recruitCtrl.forgotPassword)

// user forgot password reset route
router.post('/reset',auth, recruitCtrl.resetPassword)

router.get('/info', auth, recruitCtrl.getUserInfo)

router.patch('/update', auth, recruitCtrl.updateUser)

router.get('/logout', recruitCtrl.logout)
module.exports = router