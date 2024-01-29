const express = require('express')

const adminController = require('../controllers/admin.controller')

const router = express.Router()

router.get('/admin', adminController.getDashboard)

router.get('/admin/new', adminController.getNewAdminForm)

router.post('/admin/new', adminController.addNewAdmin)

router.get('/admin/student/:id/details', adminController.getStudentDetails)

router.get('/admin/student/:id', adminController.getUpdateStudent)

router.post('/admin/student/:id', adminController.updateStudent)

router.delete('/admin/student/:id', adminController.deleteStudent)

module.exports = router
