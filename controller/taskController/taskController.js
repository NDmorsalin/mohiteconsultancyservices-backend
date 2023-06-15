const Task = require("../../Models/TaskModels/TaskModels");

const addTask = async (req, res, next) => {
    const {
        title,
        description,
        status,
        uid,
    } = req.body;
    try {
        const task = await Task({
            title,
            description,
            status,
            uid,
        });

        await task.save()
        console.log('task', task);
        res.status(201).json({
            message: 'Task created',
            task,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong.',
            error,
        });
    }
}

const getTasks = async (req, res, next) => {
    const uid = req.headers.uid
    try {
        const tasks = await Task.find({});
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
        },{
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


module.exports = {
    getTasks,
    addTask,
    updateTask,
}