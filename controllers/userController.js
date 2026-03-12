const userModel = require("../models/userModel");

const createUser = (req, res) => {

    const { name, email } = req.body;

    if (!email || !name) {
        return res.status(400).json({
            error: "Name & Email are required"
        });
    }

    userModel.createUser(name, email, (err, result) => {

        if (err && err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                error: "Email already exists"
            });
        }

        if (err) {
            return res.status(500).json({
                error: err.message  
            });
        }

        return res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });
    });
};

const getUsers = (req, res) => {

    userModel.getAllUsers((err, results) => {

        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        return res.status(200).json(results);
    });
};

const getTasksByUser = (req, res) => {

    const { id } = req.params;

    userModel.getTasksByUserId(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        return res.status(200).json(results);
    });
};

module.exports = {
    createUser,
    getUsers,
    getTasksByUser
};