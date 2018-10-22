var router = require('express').Router();
const controller = require('../controllers/todoController')
 
// GET todo listing
router.get('/', controller.listAll)

// get todo by id
router.get('/:id', controller.findById)

// POST todo. 
router.post('/', controller.create)
 
/* update todo. */
router.put('/:id', controller.update)
 
/* GET todo listing. */
router.delete('/:id', controller.delete)
 
module.exports = router;