const { Brand } = require('../models/models');

class brandController {
  async createItem(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
  async getAllItems(req, res) {
    const brand = await Brand.findAll();
    return res.json(brand);
  }
}
module.exports = new brandController();
