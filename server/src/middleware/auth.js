const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

class Auth {
  async requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Unauthorized!')
    }

    await jwt.verify(
      req.cookies.token,
      process.env.JWTSECRET,
      async function (err, decoded) {
        if (decoded == undefined) {
          res.status(401).send('Unauthorized!');
        }
        else {
          user.findUnique({
            where: {
              id: decoded.user_id
            }
          })
            .then(user => {
              req.currentUser = user;
              next();
            })
        }
      }
    );
  }

  isStaff(req, res, next) {
    const role = req.currentUser.role;
    console.log(role);
    if (role === "STAFF" || role === "MANAGER") {
      next();
      return;
    }
    res.status(403).send('No permission.')
  }

  isManager(req, res, next) {
    const role = req.currentUser.role;
    console.log(role);
    if (role === "MANAGER") {
      next();
      return;
    }
    res.status(403).send('No permission.')
  }
}

module.exports = new Auth();
