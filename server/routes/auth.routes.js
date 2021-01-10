const passport = require('passport')
const { Router } = require('express')
const {
  login,
  createUser,
  updateUser,
  FeathUser,
} = require('../controllers/auth.controller')
const router = Router()

router.post('/login', login)

router.post('/create', createUser)

router.put(
  '/update',
  passport.authenticate('jwt', { session: false }),
  updateUser
)

router.get(
  '/FeathUser/:id',
  passport.authenticate('jwt', { session: false }),
  FeathUser
)

module.exports = router
