const Model = require("../models/observer")
const User = require("../models/user")

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)


module.exports.getAll = (req, res, next) => {
  try {
    console.log(res.userData.uId)
    Model.find()
      .select("_id userObserver departmentObserver branchObserver dateTime isRisk departmentObservable")
      .exec()
      .then((data) => {
        if(data.length > 0){
          res.status(200).json({message: "Get all data", data})
        } else {
          res.status(404).json({message: "Data not found"})
        }
      })
      .catch(err => console.log(err))
  } catch(errorCatch) {
    console.log(errorCatch)
    res.status(500).json({message: "Error in catch block", errorCatch})
  }
}

module.exports.get = (req, res, next) => {
  let {id} = req.params
  try{
    Model.findById(id)
      //.select("_id name email branch department position")
      .exec()
      .then((data) => {
        res.status(200).json({message: `Getting data by id: ${id}`,data})
      })
      .catch(err => console.log(err))
  } catch(error){
    console.log(error)
    res.status(500).json({message:"Error in catch block", error})
  }
}



module.exports.save = async (req, res, next) => {
  let { body, files } = req
  let d = {}
  // переназначение строковых параметров false и true в boolean
  for(item in body){
    if(body[item].toLowerCase() === 'false'){
       d[item] = false
    } else if(body[item].toLowerCase() === 'true'){
      d[item] = true
    } else {
      d[item] = body[item]
    }
  }

  if(files.length){
    // если имеется фотографии то объединить с информацию о фотографии в общий запрос
    Object.assign(d, {photos: files})
  }
  console.log(d)
  // Проверяем обязательные условия
  // проверяем обязательные входные данные
  if(d.branchObserver && d.departmentObservable && d.userObservable) {
    // если входной параметр isRisk равен true, тогда добавить проверку дополнительных обязательных параметров
    if(d.isRisk) {
      // проверка обязательных входных праметров
      if(!d.userObservable || !d.departmentController || !d.userController || !d.descriptionController){
        return res.status(422).json({message: "Your record type is risked, there should be other required params included into request"})
      }
    }

    let uData = await User.findById(res.userData.uId).populate("department")
    let userData = {
      userInitiator: res.userData.uId,
      userObserver: uData.name,
      departmentObserver: uData.department.name,
    }
    let observedData = Object.assign(userData, d)
    try {
      await new Model(observedData)
        .save()
        .then(data => {
          res.status(201).json({message: "Observe Data is Saved", data})
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({message: "Error occur during save observe data", error: err.message})
        })
      }
    catch (err) {
      console.log(err)
      res.status(500).json({message: "Error occur during save observe data", error: err})
    }
  } else {
    res.status(422).json({message:"Missing required parameters"})
  }

}
module.exports.update = (req, res, next) => {
  let {id} = req.params
  let {body, files} = req
  body = JSON.parse(JSON.stringify(body))
  if(body || files) {
    Model.findById(id, (err, d) => {
      if(err) console.log(err)
      if(files.length){
        // если имеется фотографии то объединить с информацию о фотографии в общий запрос
        let photos = d.photos.concat(files)
        Object.assign(body, {photos})
      }

      Model.findByIdAndUpdate(id, body, {new: true}, (err, data) => {
        if(data){
          res.status(200).json({
            message: `Your data is updated by id: ${id}`,
            data
          })
        } else {
          res.status(404).json({
            message: `Data for ID: ${id} is not found, can't be updated!`,
          })
        }
      })
    })

  } else {
    res.status(500).json({message: `Missing data in request, such as body or files`})
  }
}

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



// Observer photos
module.exports.deletePhoto = (req, res, next) => {
  let {id, filename} = req.params
  Model.findById(id, (err, d) => {
    if(err) console.log(err)
    if(d) {
      let deletedPhoto = d.photos.filter(photo => {
        return photo.filename !== filename
      })
      Model.findByIdAndUpdate(id, {photos: deletedPhoto},{new: true},(err, data) => {
        if(err) console.log(err)
        unlinkAsync(`uploads/${filename}`)
        res.status(200).json({message: `Photo for observer id ${id}, filename: ${filename} is deleted`, data})
      })
    } else {
      res.status(404).json({message: `Not found`})
    }
  })
}

module.exports.getAllPhotos = (req, res, next) => {
  Model.find({photos: {$ne: []}})
    .select('id photos')
    .exec()
    .then(data => {
      res.json(data)
      })
    .catch(err => console.log(err))
}