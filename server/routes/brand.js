const Router = require('express');
const brandController = require('../controllers/brand');
const checkRole = require('../middleware/checkRole');
const router = new Router();

// запросы на добавление и получения данных
router.post('/', checkRole('ADMIN'), brandController.createItem);
router.get('/', brandController.getAllItems);

module.exports = router;
