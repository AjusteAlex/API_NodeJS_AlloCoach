const jwt = require('jsonwebtoken');

module.exports = () => {
    return (req, res, next) => {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            try {
                if(jwt.verify(token, process.env.SECRET)){
                    res.locals.user = jwt.verify(token, process.env.SECRET)
                    next();
                }else{
                    res.status(401).json({message: 'Pas le droit d\'être la'})
                }
            }catch (error){
                res.status(401).json({message: 'Pas le droit d\'être la'})
            }
        }
        else {
            res.status(401).json({message: 'Pas le droit d\'être la'})
        }
    }
}