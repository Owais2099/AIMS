const bcrypt = require('bcryptjs')

const db = require('../data/database')

class Admin {
  constructor(adminData) {
    this.email = adminData.email
    this.password = adminData.password
  }

  getAdminWithSameEmail() {
    const query = 'SELECT * FROM admins WHERE email = $1'
    return db.query(query, [this.email])
  }

  async existsAlready() {
    const existingAdmin = await this.getAdminWithSameEmail()
    if (existingAdmin.rows[0]) {
      return true
    }
    return false
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword)
  }

  async registerAdmin() {
    const hashedPassword = await bcrypt.hash(this.password, 12)

    const adminData = [this.email, hashedPassword]
    const adminQuery = `INSERT INTO admins (email, password) VALUES ($1, $2)`
    await db.query(adminQuery, adminData)
  }
}

module.exports = Admin
