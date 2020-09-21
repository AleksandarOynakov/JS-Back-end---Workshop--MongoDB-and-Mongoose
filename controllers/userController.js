const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'secret';


module.exports = {
    renRegister: function (req, res) {
        res.render('../views/registerPage.hbs');
    },
    renLogin: function (req, res) {
        res.render('../views/loginPage.hbs');
    },
    verifyLogin: function (req, res) {
        let userLogin = req.body;
        userModel.findUser(userLogin.username)
            .then((userDB) => {
                if (userDB && userModel.verifyUser(userLogin, userDB)) {
                    console.log('logged in!');

                    const accessToken = jwt.sign({ id: userDB._id, role: 1 }, accessTokenSecret);
                    res.cookie('authJWT_cookie', accessToken).redirect('/home');
                    return;
                }
                console.log('Incorrect user or password');
                res.redirect('/login');
            });
    },
    logout: function (req, res) {
        userModel.blacklister.addToBL({ token: req.cookies.authJWT_cookie })
            .then(() => {
                res.clearCookie('authJWT_cookie');
                res.redirect('/');
            });
    },
    newUser: function (req, res) {
        let username = req.body.username;
        userModel.getAll().then((userList) => {
            if (userList.find(x => x.username === username)) {
                console.log(`${username} is already registered!!!`);
                res.redirect('/register');
            } else {
                userModel.hasher(req.body);
                res.redirect('/login');
            }
        })
    },
    isUserlogged: function (req, res, next) {
        if (req.cookies.authJWT_cookie) {
            let data = jwt.verify(req.cookies.authJWT_cookie, accessTokenSecret);
            userModel.blacklister.getAllBLtokens()
                .then((blacklistedTokens) => {
                    let tokenBlacklisted = blacklistedTokens.find(tokenObj => tokenObj.token === req.cookies.authJWT_cookie);
                    if (!tokenBlacklisted) {
                        req.auth = data;
                    } else {
                        console.log(`${tokenBlacklisted.token} is blacklisted!!!`);
                    }
                    next();
                });
        } else {
            next();
        }
    }
}
