const taskModel = require("../models/taskModel");

const createTask = (req, res) => {

    const { title, description, user_id } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    taskModel.createTask(title, description, user_id, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        return res.status(201).json({
            message: "Task created successfully",
            taskId: result.insertId
        });

    });
};

const getTasks = (req, res) => {

    const { status, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const formattedStatus = status ? String(status).toUpperCase() : null;

    taskModel.getTasks(formattedStatus, limitNumber, offset, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        return res.status(200).json(results);
    });
};

const updateTask = (req, res) => {

    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({
            error: "Title, Description & Status are required"
        });
    }

    const formattedStatus = status ? String(status).toUpperCase() : "PENDING";

    taskModel.updateTask(id, title, description, formattedStatus, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully"
        });
    });
};

const deleteTask = (req, res) => {

    const { id } = req.params;

    taskModel.deleteTask(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully"
        });
    });
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};