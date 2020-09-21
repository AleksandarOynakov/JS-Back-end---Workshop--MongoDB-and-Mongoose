const cubeModel = require('../models/cube');
const userModel = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
    ren: function (req, res) {
        if (req.auth) {
            res.render('../views/create.hbs', { user: req.auth });
        } else {
            res.redirect('/login');
        }
    },
    addNewCube: function (req, res, next) {
        if (req.auth) {
            cubeModel.add(req.body, 'Cube')
                .then((newAddedCube) => {
                    userModel.findAndUpdate(mongoose.models.User, req.auth.id, { "created": newAddedCube._id }).
                        then(() => next());
                });
        } else {
            res.send('You are not logged in!');
        }
    }
}