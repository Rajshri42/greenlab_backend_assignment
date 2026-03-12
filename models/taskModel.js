const db = require("../config/db");

const createTask = (title, description, user_id, callback) => {
    const sql = `INSERT INTO TASKS (TITLE, DESCRIPTION, USER_ID) VALUES (?, ?, ?)`;
    db.query(sql, [title, description, user_id], callback);
};

const getTasks = (status, limit, offset, callback) => {

    let sql = "SELECT * FROM TASKS";
    let params = [];

    if (status) {
        sql += " WHERE STATUS = ?";
        params.push(status);
    }

    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    db.query(sql, params, callback);
};

const updateTask = (id, title, description, status, callback) => {

    const sql = `
        UPDATE TASKS
        SET TITLE = ?, DESCRIPTION = ?, STATUS = ?
        WHERE ID = ?
    `;

    db.query(sql, [title, description, status, id], callback);
};

const deleteTask = (id, callback) => {

    const sql = "DELETE FROM TASKS WHERE ID = ?";

    db.query(sql, [id], callback);
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};