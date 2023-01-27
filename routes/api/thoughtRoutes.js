const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers');

// /api/thoughts

router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id

router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;