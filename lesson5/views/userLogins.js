const router = require('express').Router();
const controllers = require('../controlers');

router.route('/userlogins')
    .post(controllers.LoginUserController.createUserLogin);

module.exports = router;