const ActiveDirectory = require('activedirectory2')
const fs = require('fs')
const config = require('../../config')


const ad = new ActiveDirectory(config.activeDirectory);

const query = "cn=*"

ad.findUsers(query, true, function(err, users) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }

  if ((! users) || (users.length == 0)) console.log('No users found.');
  else {
    let res = []
    users.forEach(user => {
      delete user.groups
      if(config.branchesDn.includes(user.dn.replace(`CN=${user.displayName},`,''))){
        user.branch = user.dn.replace(/,OU=Account,DC=gencoindustry,DC=com/,"").replace(`CN=${user.displayName},OU=Users,OU=`,'')
        res.push(user)
      }
    });
    fs.writeFileSync(__dirname + '/users.json', JSON.stringify(res, null, 2))
  }
});