let cubeModel = require('../models/cube');
let userModel = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
    renDetails: function (req, res) {
        if (req.auth) {
            cubeModel.getOne(mongoose.models.Cube, req.params.id)
                .then((cube) => {
                    userModel.getOne(mongoose.models.User, req.auth.id)
                        .then((user) => {
                            let creator = user.created.find(x => x = req.auth.id);
                            console.log(creator, user._id, req.auth.id)
                            res.render('../views/details.hbs', { cube, user: req.auth, creator });
                        })
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            cubeModel.getOne(mongoose.models.Cube, req.params.id)
                .then((cube) => {
                    res.render('../views/details.hbs', { cube });
                });
        }
    },
    renEditDetails: function (req, res) {
        if (req.auth) {
            cubeModel.getOne(mongoose.models.Cube, req.params.id)
                .then((cube) => {
                    res.render('../views/editCubePage.hbs', { cube, user: req.auth });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            res.send('You are not logged in!');
        }
    },
    editDetails: function (req, res) {
        if (req.auth) {
            cubeModel.findAndUpdate(mongoose.models.Cube, req.params.id, {
                "name": req.body.name,
                "description": req.body.description,
                "imageUrl": req.body.imageUrl,
                "difficultyLevel": req.body.difficultyLevel
            })
                .then(() => res.redirect(`/details/${req.params.id}`));
        } else {
            res.send('You are not logged in!');
        }
    },
    renDeleteDetails: function (req, res) {
        if (req.auth) {
            cubeModel.getOne(mongoose.models.Cube, req.params.id)
                .then((cube) => {

                    res.render('../views/deleteCubePage.hbs', { cube, user: req.auth });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            res.send('You are not logged in!');
        }
    },
    deleteDetails: function (req, res) {
        if (req.auth) {
            cubeModel.findAndDelete(mongoose.models.Cube, req.params.id)
                .then(() => res.redirect('/'));
        } else {
            res.send('You are not logged in!');
        }
    }
}