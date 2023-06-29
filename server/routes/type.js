const Router = require('express');
const typeController = require('../controllers/type');
const router = new Router();
const checkRole = require('../middleware/checkRole');

// запросы на добавление и получения данных
router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAllItems);

module.exports = router;
