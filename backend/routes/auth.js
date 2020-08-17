express = require('express');
router = express.Router();

const { check, validationResult } = require('express-validator');

const { signup, signin, signout, encryptPassword } = require('../controllers/auth');

router.post('/signup', [
    check("fname", "Name should be atleast 3 character long").isLength({min: 3}),
    check("email", "Invalid email").isEmail(),
    check("mobileno", "Invalid mobile number").isMobilePhone(),
    check("password", "password should contain minimum 4 characters").isLength({min: 4})
], encryptPassword, signup);

router.post('/signin', [
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").isLength({min: 4})
], signin);

router.post('/signout', signout)


module.exports = router;

