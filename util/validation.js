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

function studentDetailsAreValid(
  fullname,
  date_of_birth,
  religion,
  disability,
  class_id,
  guardian_name,
  father_name,
  cnic,
  occupation,
  phone_home,
  phone_office,
  address_home,
  address_office,
  income
) {
  return (
    !isEmpty(fullname) &&
    !isEmpty(date_of_birth) &&
    date_of_birth.trim().length === 10 &&
    !isEmpty(religion) &&
    !isEmpty(guardian_name) &&
    !isEmpty(father_name) &&
    !isEmpty(cnic) &&
    cnic.trim().length <= 20 &&
    !isEmpty(occupation) &&
    !isEmpty(phone_home) &&
    phone_home.trim().length <= 20 &&
    !isEmpty(phone_office) &&
    phone_office.trim().length <= 20 &&
    !isEmpty(address_home) &&
    !isEmpty(address_office) &&
    !isEmpty(income)
  )
}

module.exports = {
  studentDetailsAreValid: studentDetailsAreValid,
  adminDetailsAreValid: adminDetailsAreValid,
}
