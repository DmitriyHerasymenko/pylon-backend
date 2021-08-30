const db = require('../db');

class AuthController {
    async registration(name, mail, hashPassword) {
        return await db.query(`INSERT INTO users(name, mail, password)  values($1, $2, $3) RETURNING *`, [name, mail, hashPassword]);
    }
}

module.exports = new AuthController();