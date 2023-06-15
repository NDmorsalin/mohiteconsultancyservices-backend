const Task = require("../../Models/TaskModels/TaskModels");

const addTask = async (req, res, next) => {
    const {
        title,
        description,
        status,
        // uid,
    } = req.body;
    const uid = req.headers.uid
    console.log('uid', uid);
    try {
        const task = await Task({
            title,
            description,
            status,
            uid,
        });

        await task.save()

        res.status(201).json({
            message: 'Task created',
            task,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            error,
        });
    }
}

const getTasks = async (req, res, next) => {
    const uid = req.headers.uid
    
    try {
        const tasks = await Task.find({uid});
        // console.log('tasks all', tasks);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong.',
            error,
        });
    }
}

// update task

const updateTask = async (req, res, next) => {
    const {
        title,
        description,
        status,
    } = req.body;
    const taskId = req.params.id
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            $set: {

                title,
                description,
                status,
            }
        }, {
            new: true,
        });


        res.status(201).json({
            message: 'Task created',
            updatedTask,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong.',
            error,
        });
    }
}


// delete task
const deleteTask = async (req, res, next) => {
    const taskId = req.params.id
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        res.status(201).json({
            message: 'Task deleted',
            deletedTask,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong.',
            error,
        });
    }
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}