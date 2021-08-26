const db = require('../db');

class UserController {
    async createUser (req, res) {
        const {name, mail} = req.body
        const newUser = await db.query(`INSERT INTO users(name, mail)  values($1, $2) RETURNING *`, [name, mail]);
        res.json(newUser.rows[0])
    }
    async getUsers (req, res) {
        const newUser = await db.query(`SELECT * FROM users`);
        res.json(newUser.rows)
    }
    async getUser (req, res) {

    }
    async updateUser (req, res) {

    }
    async deleteUser (req, res) {

    }
}

module.exports = new UserController();