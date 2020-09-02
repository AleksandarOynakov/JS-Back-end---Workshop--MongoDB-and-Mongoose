let cubeModel = require('../models/cube.js');
const mongoose = require('mongoose');

module.exports = {
    ren: function (req, res) {
        if (Object.keys(res.locals).includes('dataFiltered')) {
            res.render('../views/index.hbs', { cubes: res.locals.dataFiltered });
        } else {
            cubeModel.getAll(mongoose.models.Cube).then((cubesCollection) => {
                res.render('../views/index.hbs', { cubes: cubesCollection });
            });
        }
    },
    search: function (req, res, next) {
        cubeModel.getAll(mongoose.models.Cube)
            .then((cubes) => {         
                if (req.body.from && req.body.to && req.body.search) {
                    let cubesFiltered = cubes.filter(cube => (
                        cube.difficultyLevel >= +req.body.from &&
                        cube.difficultyLevel <= +req.body.to &&
                        cube.name.toLowerCase().includes(req.body.search.toLowerCase()))
                    );
                    res.locals.dataFiltered = cubesFiltered;
                }
                next();
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
