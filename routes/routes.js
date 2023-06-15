const { addTask, getTasks } = require('../controller/taskController/taskController');
const { createToken } = require('../controller/token/token');


const routes = require('express').Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
routes.route('/task').get(getTasks).post(addTask);
routes.route('/task/:id').get().put().delete();

routes.route('/user').get().post();
routes.route('/user/:id').get().put().delete();

// token
routes.route('/token').get().post(createToken);



module.exports = routes;