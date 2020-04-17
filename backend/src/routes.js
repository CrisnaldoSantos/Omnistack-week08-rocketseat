const express = require('express');
const DevController = require('./app/controllers/devController');
const LikeController = require('./app/controllers/likeController');
const DislikeController = require('./app/controllers/dislikeController');

const routes = express.Router();

routes.get('/', (req,res)=>{
    res.status(200).send({message:"Bem-vindo ao back-end do TinDev!"});
});

routes.get('/devs',DevController.index);
routes.post('/devs',DevController.store);
routes.post('/devs/:devId/likes',LikeController.store);
routes.post('/devs/:devId/dislikes',DislikeController.store);

module.exports = routes;