import { Seeder } from 'mongoose-data-seed';
import Model from '../models/department';
import users from './data/users.json'

const data = []

function uniqueByKey(array, key) {
  return [...new Map(array.map((x) => [x[key], x])).values()]
}

let departments = uniqueByKey(users, "department")
departments.forEach(val => {
  data.push({
    name: val.department
  })
})

class DepartmentsSeeder extends Seeder {

  async shouldRun() {
    return Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Model.create(data);
  }
}

export default DepartmentsSeeder;
