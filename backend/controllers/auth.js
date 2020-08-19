const { check, validationResult } = require('express-validator');
const connection = require('../dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

exports.signup = (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            msg: errors.array()[0].msg
        });
    }
    let {fname, lname, email, mobileno, password} = req.body;

    var sql = `INSERT INTO users(fname,lname,email,mobileno,password,created_at)\
    VALUES('${fname}','${lname}','${email}','${mobileno}','${password}','${new Date().toDateString()}');`;

    connection.query(sql, (err, result) => {
        if(err || result.rowCount != 1){
            console.log(`ERROR: ${err}`);
            return res.status(400).json({
                msg: "Unable to register the user",
                description: err.error
            });
        }
        return res.status(200).json({
            msg: "Signed up successfully!!"
        });
    });
}

exports.signin = (req, res) => {
    let {email, password} = req.body;

    var sql = `SELECT * FROM users WHERE email='${email}'`;

    connection.query(sql, (err, result) => {
        if(err || result.rowCount != 1){
            console.log(`ERROR: ${err}`);
            return res.status(400).json({
                msg: "User not exits"
            });
        }
        bcrypt.compare(password, result.rows[0].password, (err, passwordMatched) => {
            if (err) {
                console.log("UNABLE TO MATCH PASSWORD");
            }
            if(!passwordMatched){
                return res.status(401).json({
                    msg: "Wrong password!"
                });
            }
            // Token creation
            const token = jwt.sign({ _id: result.rows[0].id }, 'shhhhh');
            // Putting token in cookie
            res.cookie("tokan", token, { expire: new Date() + 600000 }); //Expires after 10 minutes
            // Hiding password from from frontend
            result.rows[0].password = undefined;
            return res.status(200).json({ token, user: result.rows[0] });
        });
    });
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.json({
        msg: "Successfully signed out!"
    });
}

// Middile to ensure user signed-in
exports.isSignedIn = expressjwt({
    secret: 'shhhhh',
    userProperty: "auth"
})

// Custom middlewares

// exports.isAuthenticated = (req, res, next) => {
//     let verified = req.profile && req.auth && req.profile.id == req.auth.id;
//     if(!verified){
//         return res.status(550).json({
//             msg: "Access Denied !!"
//         });
//     }
//     next();
// }

exports.isAuthenticated = (req, res, next) => {
    let verified = req.params && req.auth && req.params.userId == req.auth._id;
    if (!verified) {
        return res.status(550).json({
            err: "Access denied!!"
        });
    }
    next();
}


exports.encryptPassword = (req, res, next) => {
    let {password} = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log("CAN'T HASH PASSWORD");
            return res.status(503);
        }
        req.body.password = hash;
        next();
    });
}