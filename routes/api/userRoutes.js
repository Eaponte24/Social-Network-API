const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
} = require('../../controllers/userControllers');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getSingleUser);

module.exports = router;