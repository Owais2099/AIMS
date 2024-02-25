const Student = require('../models/student.model')
const validation = require('../util/validation')
const sessionFlash = require('../util/session-flash')

async function getNewStudentForm(req, res, next) {
  let sessionData = sessionFlash.getSessionData(req)

  if (!sessionData) {
    sessionData = {
      fullname: '',
      date_of_birth: '',
      religion: '',
      disability: '',
      class_id: '',
      guardian_name: '',
      father_name: '',
      cnic: '',
      occupation: '',
      phone_home: '',
      phone_office: '',
      address_home: '',
      address_office: '',
      income: '',
    }
  }

  try {
    const classes = await Student.getClassesList()
    res.render('students/new-student', {
      inputData: sessionData,
      classes: classes,
    })
  } catch (error) {
    next(error)
  }
}

async function addNewStudent(req, res, next) {
  const enteredData = {
    fullname: req.body.fullname,
    date_of_birth: req.body.date_of_birth,
    religion: req.body.religion,
    disability: req.body.disability || "None",
    class_id: req.body.class_id,
    guardian_name: req.body.guardian_name,
    father_name: req.body.father_name,
    cnic: req.body.cnic,
    occupation: req.body.occupation,
    phone_home: req.body.phone_home || "---",
    phone_office: req.body.phone_office || "---",
    address_home: req.body.address_home,
    address_office: req.body.address_office || "---",
    income: req.body.income,
  }

  if (
    !validation.studentDetailsAreValid(enteredData)
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          'Please check your input. Follow the format examples provided when a field is empty.',
        ...enteredData,
      },
      function () {
        res.redirect('/register')
      }
    )
    return
  }

  const student = new Student(enteredData)
  try {
    const existsAlready = await student.existsAlready()
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'Student already registered!',
          ...enteredData,
        },
        async function () {
          const classes = await Student.getClassesList()
          const inputData = req.session.flashedData
          req.session.flashedData = null
          res.render('students/new-student', { inputData, classes })
        }
      )
      return
    }
    await student.saveStudent()
  } catch (error) {
    next(error)
    return
  }

  res.render('students/registration-successful')
}

module.exports = {
  getNewStudentForm: getNewStudentForm,
  addNewStudent: addNewStudent,
}
