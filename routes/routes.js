const verifyToken = require('../Middleware/verifyJwt');
const { addTask, getTasks, updateTask, deleteTask } = require('../controller/taskController/taskController');
const { createToken } = require('../controller/token/token');


const routes = require('express').Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
routes.route('/task').get(verifyToken, getTasks).post(verifyToken, addTask);
routes.route('/task/:id').put(verifyToken, updateTask).delete(verifyToken, deleteTask);


// token
routes.route('/token').get().post(createToken);



module.exports = routes;