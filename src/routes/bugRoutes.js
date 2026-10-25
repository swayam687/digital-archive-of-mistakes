const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');

// Route definitions
router.post('/', bugController.createBug);
router.get('/', bugController.getAllBugs);
router.get('/stats/summary', bugController.getStats); // Must be placed BEFORE /:id
router.get('/:id', bugController.getBugById);
router.put('/:id', bugController.updateBug);
router.patch('/:id', bugController.patchBug);
router.delete('/:id', bugController.deleteBug);

module.exports = router;