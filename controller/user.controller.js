const db = require('../db');

class UserController {
    async createUser (name, mail) {
        return await db.query(`INSERT INTO users(name, mail)  values($1, $2) RETURNING *`, [name, mail]);
    }

    async getUsers () {
        return await db.query(`SELECT * FROM users`);
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