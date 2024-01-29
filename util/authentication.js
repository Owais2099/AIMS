function createAdminSession(req, admin, action) {
  req.session.uid = admin.id.toString()
  req.session.isAdmin = admin.isAdmin
  req.session.save(action)
}

function destroyAdminAuthSession(req, callback) {
  req.session.destroy(function (err) {
    if (callback) {
      callback(err)
    }
  })
}

module.exports = {
  createAdminSession: createAdminSession,
  destroyAdminAuthSession: destroyAdminAuthSession,
}
