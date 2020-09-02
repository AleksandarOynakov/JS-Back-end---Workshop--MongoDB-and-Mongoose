let cubeModel = require('../models/cube.js');
const mongoose = require('mongoose');

module.exports = {
    ren: function (req, res) {
        cubeModel.getOne(mongoose.models.Cube, req.params.id)
            .then((cube) => {
                res.render('../views/details.hbs', cube)
            })
            .catch((err) => {
                console.error(err);
            })
    }
}