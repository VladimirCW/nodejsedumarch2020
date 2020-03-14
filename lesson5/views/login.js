const router = require('express').Router();
const controlers = require('../controlers');

router.route('/login')
    .post(controlers.LoginController.loginUser);

module.exports = router;