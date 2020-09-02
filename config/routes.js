let { cubeAboutController,
    cubeHomeController,
    cubeCreateController,
    cubeDetailsController,
    cubeCreateAccessoryController,
    cubeAttachController
} = require('../controllers/controllers.js');

module.exports = (app) => {
    app.get('/', cubeHomeController.ren);
    app.post('/', cubeHomeController.search, cubeHomeController.ren);
    app.get('/home', cubeHomeController.ren);
    app.post('/home', cubeHomeController.search, cubeHomeController.ren);

    app.get('/about', cubeAboutController.ren);

    app.get('/create', cubeCreateController.ren);
    app.post('/create', cubeCreateController.addNewCube, cubeHomeController.ren);

    app.get('/details/:id', cubeDetailsController.ren);

    app.get('/create/accessory', cubeCreateAccessoryController.ren);
    app.post('/create/accessory', cubeCreateAccessoryController.addNewAccessory, cubeHomeController.ren);

    app.get('/attach/accessory/:id', cubeAttachController.ren);
    app.post('/attach/accessory/:id', cubeAttachController.attachNewAccessory);
};