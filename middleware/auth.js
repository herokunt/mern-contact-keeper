const jwt = require('jsonwebtoken')
const config = require('config') // the package...

module.exports = function(req, res, next){
  // Get token from request header
  const token = req.header('x-auth-token')

  // Check if not token
  if(!token){
    return res.status(401).json({ msg: 'Access denied' })
  }

  try {

    // If successfull they payload will be assigned to decoded
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()

  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: 'Invalid token' })
  }
}
