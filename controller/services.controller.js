const db = require('../db');

class ServicesController {
    async createService(name, apikey, user_id) {
        return await db.query(`INSERT INTO services(name, apikey, user_id)  values($1, $2, $3) RETURNING *`, [name, apikey, user_id]);
    }

    async getServicesByUserId(id) {
        return await db.query(`SELECT * from services WHERE user_id = ${id}`)
    }
    async getServices() {
        return await db.query(`SELECT * from services`)
    }
    async getServicesByName(name) {
      return await db.query(`SELECT * from services WHERE "name" = '${name}'`)

    }
}

module.exports = new ServicesController();