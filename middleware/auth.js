const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const code_auth = decodedToken.code_auth;

    if (code_auth) {
        // si j'ai un token je continue
        next();
    } else {
        res.json({message : 'Identifiant incorrect'})
    }
  } catch {
    res.status(401).json({
        message : 'Erreur de token'
    });
  }
};