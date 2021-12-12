const jwt = require('jsonwebtoken');

var data = { username: 'dat' }
var secret = 'dat2409'
const token = jwt.sign(data, secret);
console.log(token)

const result = jwt.verify(token, secret)
console.log(result)
