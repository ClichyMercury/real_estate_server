// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '$6ZK{NWgW#9L9a&2)5Z[7hn}<A28D)3p:b75xf6CiRcR?5)sByD22kd8a$*F>b:fAN[8r2'


// Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
      return jwt.sign({
        userId: userData.id,
        isAdmin: userData.isAdmin
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      })
    },
    parseAuthorization: function(authorization) {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
      var userId = -1;
      var token = module.exports.parseAuthorization(authorization);
      if(token != null) {
        try {
          var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
          if(jwtToken != null)
            userId = jwtToken.userId;
        } catch(err) { }
      }
      return userId;
    }
  }