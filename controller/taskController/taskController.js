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
        const tasks = await Task.find({ uid });
        res.status(200).json({
            message: 'Tasks fetched',
            tasks,
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
}