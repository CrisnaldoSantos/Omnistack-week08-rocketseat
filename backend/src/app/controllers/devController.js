const axios = require('axios');
const Dev = require('../models/dev');

module.exports = {
    async index(req,res){
        const {user} = req.headers;
        try{
            const loggedDev = await Dev.findById(user);
            const users = await Dev.find({
                $and:[
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedDev.likes } },
                    { _id: { $nin: loggedDev.dislikes } },
                ],
            })
    
            return res.send(users);
        } catch(err){
            return res.status(500).send({error:"Usuário não existe"});
        }

        
    },
    async store(req,res){
        const {username} = req.body;
        const userExists = await Dev.findOne({user : username});
        if(userExists){
            return res.send(userExists);
        }

        try{
            const response = await axios.get(`https://api.github.com/users/${username}`);
            if(!response){
                return res.status(500).send({error:"Usuário não existe"});
            }
            const { name, bio, avatar_url:avatar} = response.data;
            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            });

            return res.send(dev);

        }catch(err){
            return res.status(404).send({error:"Usuário não encontrado!"})
        }
        
    }
}