function isEmpty(value) {
  return !value || value.trim() === ''
}

function adminDetailsAreValid(email, password) {
  return (
    !isEmpty(email) &&
    email.includes('@') &&
    !isEmpty(password) &&
    password.trim().length >= 6
  )
}

function studentDetailsAreValid(enteredData) {
  return (
    !isEmpty(enteredData.fullname) &&
    !isEmpty(enteredData.date_of_birth) &&
    enteredData.date_of_birth.trim().length === 10 &&
    !isEmpty(enteredData.religion) &&
    !isEmpty(enteredData.guardian_name) &&
    !isEmpty(enteredData.father_name) &&
    !isEmpty(enteredData.cnic) &&
    enteredData.cnic.trim().length <= 20 &&
    !isEmpty(enteredData.occupation) &&
    !isEmpty(enteredData.phone_home) &&
    enteredData.phone_home.trim().length <= 20 &&
    !isEmpty(enteredData.phone_office) &&
    enteredData.phone_office.trim().length <= 20 &&
    !isEmpty(enteredData.address_home) &&
    !isEmpty(enteredData.address_office) &&
    !isEmpty(enteredData.income)
  )
}

module.exports = {
  studentDetailsAreValid: studentDetailsAreValid,
  adminDetailsAreValid: adminDetailsAreValid,
}
