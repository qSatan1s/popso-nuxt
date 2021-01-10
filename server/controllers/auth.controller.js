const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })

  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      candidate.password
    )

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          login: candidate.login,
          userId: candidate._id,
        },
        keys.JWT,
        { expiresIn: 60 * 60 }
      )
      res.json({ token })
    } else {
      res.status(401).json({ message: 'Пароль неверный' })
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден' })
  }
}

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })

  if (candidate) {
    res.status(409).json({ message: 'Такой login уже занят' })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt),
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
    })

    await user.save()
    res.status(201).json(user)
  }
}

module.exports.updateUser = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.data.FormData.login })
  if (candidate) {
    res.status(409).json({ message: 'Такой login уже занят' })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const $set = {
      login: req.body.data.FormData.login,
      password: bcrypt.hashSync(req.body.data.FormData.password, salt),
      FirstName: req.body.data.FormData.FirstName,
      LastName: req.body.data.FormData.LastName,
    }
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body.id },
        { $set },
        { new: true }
      )
      res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports.FeathUser = async (req, res) => {
  try {
    await User.findById(req.params.id).exec((_err, user) => {
      res.json(
        (user = {
          FirstName: user.FirstName,
          LastName: user.LastName,
          login: user.login,
        })
      )
    })
  } catch (e) {
    res.status(500).json(e)
  }
}
