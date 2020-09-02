const cubeModel = require('../models/cube');

module.exports = {
    ren: function (req, res) {
        res.render('../views/createAccessory.hbs');
    },
    addNewAccessory: function (req, res, next) {
        cubeModel.add(req.body, 'Accessory')
            .then(() => {
                next();
            });
    }
}