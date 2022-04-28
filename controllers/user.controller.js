const User = require('../lib/models').User

exports.user_list = (req, res, next) => {
    User.findAll({
        attributes: ['id', 'name','lastname','username','phone_number' ,'email', 'role', 'bpjeps_name', 'total_credit', 'createdAt']
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err))
}

exports.user_detail = (req, res, next) => {
    User.findOne({
        where: {id: req.params.id},
    })
    .then((data) => {
        res.status(200).json({data})
    })
    .catch(err => console.log(err))
}
