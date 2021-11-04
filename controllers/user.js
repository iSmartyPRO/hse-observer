const bcrypt = require("bcrypt")
const Model = require("../models/user")
const Branch = require("../models/branch")
const Department = require("../models/department")
const Role = require("../models/role")
const department = require('../models/department')

// Получение списка всех пользователей
module.exports.getAll = (req, res, next) => {
  try {
    Model.find()
      .select("_id name email position")
      .exec()
      .then((data) => {
        res.status(200).json({message: "Get all data", data})
      })
      .catch(err => console.log(err))
  } catch(errorCatch) {
    console.log(errorCatch)
    res.status(500).json({message: "Error in catch block", errorCatch})
  }
}

// Получение информации о пользователи по ID
module.exports.get = (req, res, next) => {
  let {id} = req.params
  try{
    Model.findById(id)
      .select("_id name email branch department position authType roles language")
      .populate("branches", "name")
      .populate("department", "name")
      .populate("roles", "name description")
      .exec()
      .then((data) => {
        if(data){
          res.status(200).json({message: `Getting data by id: ${id}`,data})
        } else {
          res.status(404).json({message: `Data not found by your id: ${id}`})
        }
      })
      .catch(err => console.log(err))
  } catch(error){
    console.log(error)
    res.status(500).json({message:"Error in catch block", error})
  }
}

// Создание пользователя в системе
module.exports.save = async (req, res, next) => {
  let d = req.body
  let checkUser = await Model.findOne({email: d.email})
  if(!checkUser){
    let branchId = await Branch.findOne({name: d.branches}, '_id')
    let departmentId = await Department.findOne({name: d.department}, '_id')
    let rolesArr = await Role.find({name: d.roles}).select('_id')
    console.log(rolesArr)
    // если найдены данные о объекте и отделе то начать процесс сохранения данных
    if(branchId && departmentId && d.password){
      bcrypt.hash(d.password, 10, (err, hashedPassword) => {
        if(err){
          console.log(err)
          return res.status(500).json({message: "Error occur during hashing password", error: err})
        } else {
          let user = new Model({
            name: d.name,
            email: d.email,
            password: hashedPassword,
            position: d.position,
            branches: branchId,
            department: departmentId,
            roles: rolesArr
          })
          user.save()
          .then(data => {
            if(err) console.log(err)
            res.status(201).json(
              {
                message: "Your data is saved!",
                data
              }
            )
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error occur dusring saving data", error: err.message})
          })

        }
      })
    } else {
      res.status(404).json({message: "Can't be created, because branch, department or password not exist"})
    }
  } else {
    res.status(409).json({message: `Cannot create user with email ${d.email}, because it's already exist`})
  }
}


// Обновление информации о пользователе
module.exports.update = async (req, res, next) => {
  let {id} = req.params
  let {body} = req
  if(body.roles) {
    let rolesArr = await Role.find({name: body.roles}).select('_id')
    body.roles = rolesArr
  }
  if(body.department) {
    let departmentData = await Department.findOne({name: body.department}).select('_id')
    body.department = departmentData
  }
  if(body.branches) {
    let branchesArr = await Branch.find({name: body.branches}).select('_id')
    body.branches = branchesArr
  }
  if(body.password) {
    body.password = bcrypt.hashSync(body.password, 10)
  }
  Model.findByIdAndUpdate(id, body, {new: true}, (err, data) => {
    if(err) console.log(err)
    if(data){
      res.status(200).json({
        message: `Your data is updated by id: ${id}`,
        data: {
          name: data.name
        }
      })
    } else {
      res.status(404).json({
        message: `Data for ID: ${id} is not found, can't be updated!`,
      })
    }
  })
}

// Удаление пользователя из системы
module.exports.delete = (req, res, next) => {
  let {id} = req.params
  Model.findByIdAndDelete(id, (err, data) => {
    if(err) console.log(err)
    if(data){
      res.status(200).json({
        message: `Delete your data by id: ${id}`,
        data
      })
    } else {
      res.status(404).json({
        message: `Data for ID: ${id} is not found, can't be deleted!`,
      })
    }
  })
}
