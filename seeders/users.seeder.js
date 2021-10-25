import { Seeder } from 'mongoose-data-seed'
import bcrypt from 'bcrypt'
import Model from '../models/user'
import Department from '../models/department'
import Branch from '../models/branch'
import users from './data/users.json'

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
charactersLength));
 }
 return result;
}


let data = []



class UsersSeeder extends Seeder {

  async shouldRun() {
    return await Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    let branches = await Branch.find()
    let departments = await Department.find()
    for(let i = 0; i < users.length; i++){
      //console.log(users[i].mail ? users[i].mail : `>>>>>>>>>>>>noemail`)
      let plainTextPassword = makeid(12)
      let hashedPassword = await bcrypt.hashSync(plainTextPassword, 10)
      if(users[i].mail) {
        data.push({
          name: users[i].description,
          email: users[i].mail,
          position: users[i].title,
          password: hashedPassword,
          plainTextPassword,
          branches: (branches.find(x => x.name == users[i].branch)._id),
          department: (departments.find(x => x.name == users[i].department)._id)
        })
      }
    }
    //await users.forEach(user => {
      /* let plainTextPassword = makeid(7)
      bcrypt.hash(plainTextPassword, 10, (err, hashedPassword) => {
        console.log(user)
        data.push({
          name: user.description,
          email: user.mail,
          position: user.title,
          password: hashedPassword,
          plainTextPassword,
          branches: (branches.find(x => x.name == user.branch)._id),
          department: (departments.find(x => x.name == user.department)._id)
        })
      }) */
    //})
    return await Model.create(data);
  }
}

export default UsersSeeder;
