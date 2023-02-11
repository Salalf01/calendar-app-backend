const {Router} = require('express');
const router = Router();
const {createUser, login, renewToken} = require('../controllers/auth')
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post("/register",[
    check('name', "Name is mandatory").not().isEmpty(),
    check('email', "Must be a valid email").isEmail(),
    check('password', "Password must have at least 6 characters ").isLength({min: 6}),
    validateFields,
    

]
, createUser)

router.post("/", [
    check('email', "Must be a valid email").isEmail(),
    check('password', "Password must have at least 6 characters ").isLength({min: 6}),
    validateFields,
], login)


router.get("/renew", [
    validateJWT
], renewToken)


module.exports = router;