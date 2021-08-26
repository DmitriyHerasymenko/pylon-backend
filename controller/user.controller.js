const db = require('../db');

class UserController {
    async createUser (req, res) {
        const {name, mail} = req.body
        const newUser = await db.query(`INSERT INTO users(name, mail)  values($1, $2) RETURNING *`, [name, mail]);
        res.json(newUser.rows[0])
    }
    async getUsers (req, res) {
        const users = await db.query(`SELECT * FROM users`);
        res.json(users.rows)
    }
    async getUser (req, res) {
        const id = req.params.id;
        const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
        res.json(user.rows[0]);
    }
    async updateUser (req, res) {

    }
    async deleteUser (req, res) {

    }
}

module.exports = new UserController();