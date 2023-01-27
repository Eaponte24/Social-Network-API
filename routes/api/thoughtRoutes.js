const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
} = require('../../controllers/thoughtControllers');

// /api/thoughts

router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id

router.route('/:id').get(getSingleThought).put(updateThought);

module.exports = router;