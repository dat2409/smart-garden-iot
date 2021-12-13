const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const bcrypt = require('bcrypt');

class UserController {
  /**
   * [POST]
   * /user/create
   */
  async create(req, res, next) {
    const newUser = req.body;
    console.log(newUser)

    const checkEmailExist = await user.findUnique({
      where: {
        email: newUser.email
      }
    })

    if (checkEmailExist) {
      return res.send('Email has been used!')
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashPassword;
    newUser.dob = new Date(newUser.dob);

    user.create({
      data: newUser
    })
      .then(user => res.send(user))
  }
}

module.exports = new UserController()
