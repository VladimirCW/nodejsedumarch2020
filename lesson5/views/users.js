const router = require('express').Router();
const controlers = require('../controlers');

router.route('/users')
    .get(controlers.UserControler.getAllUsers)
    .post(controlers.UserControler.createUser);

router.route('/users/:id')
    .get(controlers.UserControler.getUser)
    .put(controlers.UserControler.findUser)
    .delete(controlers.UserControler.deleteUser);


module.exports = router;