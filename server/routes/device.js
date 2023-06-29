const Router = require('express');
const deviceController = require('../controllers/device');
const checkRole = require('../middleware/checkRole');
const router = new Router();

// запросы на добавление и получения данных

router.post('/', checkRole('ADMIN'), deviceController.create);
router.get('/', deviceController.getAllItems);
router.get('/:id', deviceController.getItemById);

module.exports = router;
