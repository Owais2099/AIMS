const Admin = require('../models/admin.model')
const authUtil = require('../util/authentication')
const sessionFlash = require('../util/session-flash')

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req)

  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    }
  }

  res.render('admin/login', { inputData: sessionData })
}

async function login(req, res, next) {
  const inputData = { email: req.body.email, password: req.body.password }
  const admin = new Admin(inputData)
  let existingAdmin
  try {
    existingAdmin = await admin.getAdminWithSameEmail()
  } catch (error) {
    next(error)
    return
  }

  const sessionErrorData = {
    errorMessage:
      'Invalid Credentials! - Please double-check your email and password!',
    inputData: inputData,
  }

  if (!existingAdmin.rows[0]) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login')
    })
    return
  }

  const passwordIsCorrect = await admin.hasMatchingPassword(
    existingAdmin.rows[0].password
  )

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login')
    })
    return
  }

  authUtil.createAdminSession(req, existingAdmin.rows[0], function () {
    res.redirect('/admin')
  })
}

function logout(req, res) {
  authUtil.destroyAdminAuthSession(req, function (error) {
    if (error) {
      res.status(500).render('shared/500')
    } else {
      res.redirect('/')
    }
  })
}

module.exports = {
  getLogin: getLogin,
  login: login,
  logout: logout,
}
