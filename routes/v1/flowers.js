const express = require('express');
const router = express.Router();

const FlowerController = require('../../controllers/flower');

router.get('/', (req, res) => FlowerController.getFlowers(req, res));

router.get('/:id', (req, res) => FlowerController.getFlowerById(req, res));

router.post('/add-names', (req, res) => FlowerController.addNamesToFlower(req, res));

module.exports = router;
