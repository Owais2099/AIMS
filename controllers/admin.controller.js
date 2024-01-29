const Student = require('../models/student.model')
const Admin = require('../models/admin.model')
const validation = require('../util/validation')
const sessionFlash = require('../util/session-flash')

async function getDashboard(req, res, next) {
  try {
    const students = await Student.findAllStudents()
    const classes = await Student.getClassesList()
    res.render('admin/dashboard', {
      students: students,
      classes: classes,
    })
  } catch (error) {
    next(error)
    return
  }
}

async function getStudentDetails(req, res, next) {
  try {
    const classes = await Student.getClassesList()
    const student = await Student.findStudentById(req.params.id)
    res.render('students/student-details', {
      student: student,
      classes: classes,
    })
  } catch (error) {
    next(error)
  }
}

async function getUpdateStudent(req, res, next) {
  try {
    const classes = await Student.getClassesList()
    const student = await Student.findStudentById(req.params.id)
    res.render('students/update-student', {
      student: student,
      classes: classes,
    })
  } catch (error) {
    next(error)
  }
}

async function updateStudent(req, res, next) {
  let student
  try {
    student = await Student.findStudentById(req.params.id)
  } catch (error) {
    next(error)
    return
  }

  student = new Student({
    ...req.body,
    id: req.params.id,
  })

  try {
    await student.saveStudent()
  } catch (error) {
    next(error)
    return
  }

  res.redirect('/admin')
}

async function deleteStudent(req, res, next) {
  let student
  try {
    student = await Student.findStudentById(req.params.id)

    await student.removeStudent()
  } catch (error) {
    return next(error)
  }

  res.json({ message: 'Deleted Student!' })
}

async function getNewAdminForm(req, res, next) {
  let sessionData = sessionFlash.getSessionData(req)

  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    }
  }
  try {
    res.render('admin/register-admin', {
      inputData: sessionData,
    })
  } catch (error) {
    next(error)
  }
}

async function addNewAdmin(req, res, next) {
  const enteredData = {
    email: req.body.email,
    password: req.body.password,
  }

  if (!validation.adminDetailsAreValid(req.body.email, req.body.password)) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: 'Please check your input.',
        ...enteredData,
      },
      function () {
        res.redirect('/admin/new')
      }
    )
    return
  }

  const admin = new Admin(enteredData)
  try {
    const existsAlready = await admin.existsAlready()
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'Admin already registered!',
          ...enteredData,
        },
        async function () {
          const inputData = req.session.flashedData
          req.session.flashedData = null
          res.render('admin/register-admin', { inputData })
        }
      )
      return
    }
    await admin.registerAdmin()
  } catch (error) {
    next(error)
    return
  }

  res.redirect('/admin')
}

module.exports = {
  getDashboard: getDashboard,
  getStudentDetails: getStudentDetails,
  getUpdateStudent: getUpdateStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
  getNewAdminForm: getNewAdminForm,
  addNewAdmin: addNewAdmin,
}
