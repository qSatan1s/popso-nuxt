const {Router} = require('express')
const {getAll} = require('../controllers/profile.controller')
const router = Router()

router.get('/', getAll)

module.exports = router
