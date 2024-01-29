const db = require('../data/database')

class Student {
  constructor(studentData) {
    if (studentData.id) {
      this.id = +studentData.id
    }
    this.fullname = studentData.fullname
    this.date_of_birth = studentData.date_of_birth
    this.religion = studentData.religion
    if (studentData.disability) {
      this.disability = studentData.disability
    } else {
      this.disability = ''
    }
    if (studentData.class_id) {
      this.class_id = +studentData.class_id
    }
    if (studentData.grade) {
      this.grade = studentData.grade
    }
    this.guardian_name = studentData.guardian_name
    this.father_name = studentData.father_name
    this.cnic = studentData.cnic
    this.occupation = studentData.occupation
    this.phone_home = studentData.phone_home
    this.phone_office = studentData.phone_office
    this.address_home = studentData.address_home
    this.address_office = studentData.address_office
    this.income = +studentData.income
    if (studentData.registered_at) {
      this.registered_at = studentData.registered_at
    }
  }

  static async getClassesList() {
    const classes = await db.query('SELECT * FROM class;')
    return classes.rows
  }

  getStudentWithSameDetails() {
    const query = `SELECT * FROM students WHERE fullname = $1 AND date_of_birth = $2 AND father_name = $3;`
    return db.query(query, [
      this.fullname,
      this.date_of_birth,
      this.father_name,
    ])
  }

  async existsAlready() {
    const existingStudent = await this.getStudentWithSameDetails()
    if (existingStudent.rows[0]) {
      return true
    }
    return false
  }

  static async findStudentById(studentId) {
    const query = `
      SELECT students.*, class.title AS grade
      FROM students INNER JOIN class ON students.class_id = class.id 
      WHERE students.id = $1;`
    const student = await db.query(query, [studentId])

    if (!student.rows[0]) {
      const error = new Error('Could not find student with provided id.')
      error.code = 404
      throw error
    }
    return new Student(student.rows[0])
  }

  static async findAllStudents() {
    const query = `
      SELECT students.*, class.title AS grade
      FROM students INNER JOIN class ON students.class_id = class.id;
    `
    const students = await db.query(query)

    return students.rows.map(function (student) {
      return new Student(student)
    })
  }

  async saveStudent() {
    const studentData = [
      this.fullname,
      this.date_of_birth,
      this.religion,
      this.disability,
      this.class_id,
      this.guardian_name,
      this.father_name,
      this.cnic,
      this.occupation,
      this.phone_home,
      this.phone_office,
      this.address_home,
      this.address_office,
      this.income,
    ]

    let studentQuery

    if (this.id) {
      studentQuery = `UPDATE students SET fullname=$1, date_of_birth=$2, religion=$3, disability=$4, class_id=$5, guardian_name=$6, father_name=$7, cnic=$8, occupation=$9, phone_home=$10, phone_office=$11, address_home=$12, address_office=$13, income=$14 WHERE id=$15;`
      await db.query(studentQuery, studentData.concat(this.id))
    } else {
      studentQuery = `
      INSERT INTO students (
        fullname, date_of_birth, religion, disability, class_id, guardian_name, father_name, cnic, occupation, phone_home, phone_office, address_home, address_office, income) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
      `
      await db.query(studentQuery, studentData)
    }
  }

  removeStudent() {
    const query = 'DELETE FROM students WHERE id=$1;'
    return db.query(query, [this.id])
  }
}

module.exports = Student
