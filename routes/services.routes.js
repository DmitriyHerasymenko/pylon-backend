const Router = require('express');
const router = new Router();
const servicesController = require('../controller/services.controller');
const authMiddleware = require('../middlewaree/authMiddlewaree');
const uuidAPIKey = require('uuid-apikey');
const {check, validationResult} = require("express-validator");

const createServices = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.errors[0].msg})
        }
        const {name, user_id} = req.body;
        const apikey = uuidAPIKey.create();
        const services = await servicesController.getServicesByName(name);
        if(services.rows.length !== 0) return res.status(400).json({message: 'this services name already exist'})
        const newServices = await servicesController.createService(name, apikey.apiKey, user_id);
        res.json(newServices.rows)

    }
    catch (e) {
        console.log(e)
        res.status(400).json({message: 'Registration error'})
    }

}
const getServicesByUserId = async (req, res) => {
    const id = req.query.id;
    const getServices = await servicesController.getServicesByUserId(id);
    res.json(getServices.rows)
}

router.post('/services',authMiddleware, [
    check('name', 'Services did not empty').notEmpty(),
], createServices);
router.get('/services',authMiddleware, getServicesByUserId);


module.exports = router