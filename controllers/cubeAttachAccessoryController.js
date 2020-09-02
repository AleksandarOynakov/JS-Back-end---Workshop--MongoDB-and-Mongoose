const cubeModel = require('../models/cube');
const mongoose = require('mongoose');



module.exports = {
    ren: function (req, res) {
        cubeModel.getOne(mongoose.models.Cube, req.params.id)
            .then((cube) => {
                cubeModel.getAll(mongoose.models.Accessory)
                    .then((accessories) => {
                        cube.accessories = accessories.filter((x) => !x.cubes.map((id) => String(id)).includes(String(cube._id)));
                        res.render('../views/attachAccessory.hbs', cube);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    },
    attachNewAccessory: function (req, res) {
        cubeModel.findAndUpdate(mongoose.models.Cube, req.params.id, { 'accessory': req.body.accessory })
            .then(() => cubeModel.findAndUpdate(mongoose.models.Accessory, req.body.accessory, { 'cubes': req.params.id })
                .then(() => res.redirect('/home')))
            .catch((err) => {
                console.error(err);
            });
    }
}
