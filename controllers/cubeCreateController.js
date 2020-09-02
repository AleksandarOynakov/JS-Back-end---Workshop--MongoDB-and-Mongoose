const cubeModel = require('../models/cube');

module.exports = {
    ren: function (req, res) {
        res.render('../views/create.hbs');
    },
    addNewCube: function (req, res, next) {
        cubeModel.add(req.body, 'Cube')
            .then(() => {
                next();
            });
    }
}