const db = require("../config/db");

const createUser = (name, email, callback) => {
    const sql = "INSERT INTO USERS (NAME, EMAIL) VALUES (?, ?)";
    db.query(sql, [name, email], callback);
};

const getAllUsers = (callback) => {
    const sql = "SELECT * FROM USERS";
    db.query(sql, callback);
};

const getTasksByUserId = (userId, callback) => {
    const sql = `SELECT * FROM TASKS WHERE USER_ID = ?`;
    db.query(sql, [userId], callback);
};

module.exports = {
    createUser,
    getAllUsers,
    getTasksByUserId
};