const location = require('../lib/models').location


exports.location_list = (req, res, next) => {
    location.findAll({
        attributes: ['id', 'longitude', 'latitude', 'name', 'adress', 'city', 'createdAt', 'updatedAt']
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err))
}

exports.location_add = (req, res) => {
    location.create(req.body)
    .then(data => {
        res.status(201).json({message : 'location enregistré'})
    })
    .catch(err => console.log(err))
}