const express               = require("express")
const router                = express.Router()
const uploads               = require("../helpers/uploads")

// CONTROLLERS
const controller            = require("../controllers/api")
const controllerObserver    = require("../controllers/observer")
const controllerUser        = require("../controllers/user")
const controllerDepartment  = require("../controllers/department")
const controllerBranch      = require("../controllers/branch")
const controllerAuth        = require("../controllers/auth")
const controllerRole        = require("../controllers/role")

// HELPERS
const {authCheck}           = require('../helpers/auth')

// ========================================================

// PUBLIC AREA
router.get('/', controller.index)

// Auth Routes
router.post('/auth/login', controllerAuth.login)
router.post('/auth/signup', controllerAuth.signup)


// PRIVATE AREA
// Observer Routes
router.get('/observer/', authCheck, controllerObserver.getAll)
router.post('/observer/', authCheck, uploads.array("photos", 12), controllerObserver.save)
router.get('/observer/:id', authCheck, controllerObserver.get)
router.delete('/observer/:id', authCheck, controllerObserver.delete)
router.patch('/observer/:id', authCheck, uploads.array("photos", 12), controllerObserver.update)

// Delete observer photo for observer id
router.get('/observerphoto', authCheck, controllerObserver.getAllPhotos)
router.delete('/observerphoto/:id/:filename', authCheck, controllerObserver.deletePhoto)


// User Routes
router.get('/user/', authCheck, controllerUser.getAll)
router.post('/user/', authCheck, controllerUser.save)
router.get('/user/:id', authCheck, controllerUser.get)
router.delete('/user/:id', authCheck, controllerUser.delete)
router.patch('/user/:id', authCheck, controllerUser.update)

// Branch Routes
router.get('/branch/', authCheck, controllerBranch.getAll)
router.post('/branch/', authCheck, controllerBranch.save)
router.get('/branch/:id', authCheck, controllerBranch.get)
router.delete('/branch/:id', authCheck, controllerBranch.delete)
router.patch('/branch/:id', authCheck, controllerBranch.update)

// Role Routes
router.get('/role/', authCheck, controllerRole.getAll)
router.post('/role/', authCheck, controllerRole.save)
router.get('/role/:id', authCheck, controllerRole.get)
router.delete('/role/:id', authCheck, controllerRole.delete)
router.patch('/role/:id', authCheck, controllerRole.update)

// Department Routes
router.get('/department/', authCheck, controllerDepartment.getAll)
router.post('/department/', authCheck, controllerDepartment.save)
router.get('/department/:id', authCheck, controllerDepartment.get)
router.delete('/department/:id', authCheck, controllerDepartment.delete)
router.patch('/department/:id', authCheck, controllerDepartment.update)

module.exports = router