import { Seeder } from 'mongoose-data-seed';
import Model from '../models/branch';
import users from './data/users.json'

function uniqueByKey(array, key) {
  return [...new Map(array.map((x) => [x[key], x])).values()];
}

let uniqueBranches = uniqueByKey(users, "branch")
const data = []

uniqueBranches.forEach(branch => {
  data.push(
    {
      "name": branch.branch,
      "location": `${branch.l}, ${branch.streetAddress}`
    }
  )
})

class BranchesSeeder extends Seeder {

  async shouldRun() {
    return Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Model.create(data);
  }
}

export default BranchesSeeder;
