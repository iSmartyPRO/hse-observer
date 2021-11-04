const Model = require("../models/role")
const User = require("../models/user")

module.exports.getAll = (req, res, next) => {
  try {
    Model.find()
      .select("_id name description")
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

module.exports.get = (req, res, next) => {
  let {id} = req.params
  try{
    Model.findById(id)
      .select("_id name description")
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

module.exports.save = async (req, res, next) => {
  let d = req.body
  await new Model(d).save((err, data) => {
    if(err) console.log(err)
    res.status(201).json(
      {
        message: "Your data is saved!",
        data
      }
    )
  })
}
module.exports.update = (req, res, next) => {
  let {id} = req.params
  let {body} = req
  Model.findByIdAndUpdate(id, body, {new: true}, (err, data) => {
    if(err) console.log(err)
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


}
module.exports.delete = async (req, res, next) => {
  let {id} = req.params
  let checkDependency = await User.find({roles: id})
  console.log(checkDependency)
  if(!checkDependency.length){
    Model.findByIdAndDelete(id, (err, data) => {
      if(err) console.log(err)
      if(data){
        res.status(200).json({
          message: `Удалена роль: ${data.name}`,
          data
        })
      } else {
        res.status(404).json({
          message: `Не найдена роль ID: ${id}`,
        })
      }
    })
  } else {
    res.status(409).json({
      message: `Нельзя удалить. Имеются зависимости.`,
      dependencies: checkDependency.map(item => {return item.name})
    })
  }

}
