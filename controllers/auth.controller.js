// Gestion des connexions
// Enregistrement des numéros de téléphones et génération des codes d'authentification
// Création de token et ajout du role (coach ou utilisateur)



const User = require('../lib/models').User
const twilio = require('twilio');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;  
const client = new twilio(accountSid, authToken);

exports.user_phone_register = (req, res) => {
    User.findOne({
        where: {
            phone_number: req.body.phone_number
        }
    })
    .then(data => {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }
        // génération du code de connexion
        let code_auth = getRandomInt(10000, 99999);
        
        if(code_auth){
            // définir les données de l'utilisateur
            const updatedUserData = {
                phone_number: req.body.phone_number,
                code_auth: code_auth
            }
            User.create(updatedUserData)      
            .then( userCreated => {
                // envoie de sms a l'utilisateur pour qu'il valide son compte
                client.messages.create({
                    body: 'vote code de vérification : ' + code_auth,  
                    messagingServiceSid: 'MG6a8390cfeb813b6c3c5e386431598ff9',      
                    to: req.body.phone_number 
                })
                res.status(201).json({message: 'numéro de téléphone et code d\'authentification enregistré'})
            })  
            .catch(err => console.log(err))
        }
    })
}

exports.user_auth_code_verif = (req, res) => {
    User.findOne({
        where: {
            phone_number: req.body.phone_number
        }
    })
    .then(user => {
        if(user.code_auth == req.body.code_auth){
            // si le code est correct, génération du token
            const token = jwt.sign(
                { 
                    code_auth: user.code_auth, 
                    id: user.id
                },
                process.env.SECRET,
                { expiresIn: '24h' }
            )
            console.log(user)
            user.update({auth_token: token})
            res.status(200).json({phone_number: user.phone_number, token})
        }else{
            res.status(400).json({message : 'Mauvais code rentré'})
        }
    })
    .catch(err => res.status(400).json({message : 'Mauvais numéro de téléphone rentré'}))
}


exports.user_role = (req, res) => {
    if(req.body.role){
        // attribution du role utilisateur après la vérification sms
        const userRole = {
            role: req.body.role,
        }
        if(req.headers.authorization && req.headers){
            // récupération du token de l'utilisateur
            let token = req.headers.authorization.split(' ')[1];
            console.log(token);
            try {
                // token décodé
                decodedToken = jwt.verify(token, process.env.SECRET);
            } catch(e){
                res.status(400).json({message : 'Erreur'})
            }
            // recherche de l'utilisateur en fonction de son username
            User.findOne({
                where: {
                    id: decodedToken.id
                }
            })
            // update du role de l'utilisateur 
            .then(user => {
                if(user){
                    user.update(userRole)
                    res.status(200).json({message : 'Role ajouté'})
                }else {
                    res.status(400).json({message : 'Utilisateur introuvable'}) 
                }
            })
        }
    }else{
        res.status(400).json({message : 'Aucun role choisi'}) 
    }

}



exports.user_login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
}