const Availability = require('../lib/models').Availability
const jwt = require('jsonwebtoken');

exports.availability_list = (req, res, next) => {
   
    
}

exports.availability_add = (req, res, next) => {
    // récupération de l'utilisateur connecté
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET);

    // SELECT * FROM `availabilities` where id_user = 2 
    // Availability.findAll({
    //     where: {
    //         id_user: user.id
    //     }
    // })
    // .then(data => {
    //     console.log("data : " , data.id)
    // })
    // Création de l'object 
    const availability = {
        day: req.body.day,
        hour: req.body.hour,
        id_user: user.id,
        isChecked: req.body.isChecked
    }

    // vérification si la case est coché coté app
    // si coché -> enregistrement en bdd
    // si pas coché -> suppression en bdd
    if(req.body.isChecked == true){
        if(req.body.hour != user.hour && req.body.day != user.day){
            Availability.create(availability)
            res.status(201).json({message : 'Avalability enregistré'})
        }else {
            console.log('Deja enregistré')
            res.status(400).json({message : 'deja enregistré'})

        }
        
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