const Availability = require('../lib/models').Availability

exports.availability_list = (req, res, next) => {
   
    
}

exports.availability_add = (req, res, next) => {
    const availability = {
        day: req.body.day,
        hour: req.body.hour,
        id_user: req.body.id_user,
        isChecked: req.body.isChecked
    }

    if(req.body.isChecked == true){
        Availability.create(availability)
        res.status(201).json({message : 'Avalability enregistré'})
    }else {
        Availability.destroy({
            where: {
                day: req.body.day,
                hour: req.body.hour,
                id_user: req.body.id_user
            }
        })
        .then(data => {
            res.status(200).json({message : 'Supprimé'})
            })
        .catch(err => res.status(200).json({message : 'Suppression impossible'}))
    } 
}