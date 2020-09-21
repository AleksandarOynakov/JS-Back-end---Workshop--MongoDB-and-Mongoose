let { cubeAboutController,
    cubeHomeController,
    cubeCreateController,
    cubeDetailsController,
    cubeCreateAccessoryController,
    cubeAttachController,
    userController
} = require('../controllers/controllers.js');

module.exports = (app) => {
    app.get('/', userController.isUserlogged, cubeHomeController.ren);
    app.post('/', cubeHomeController.search, cubeHomeController.ren);

    app.get('/home', userController.isUserlogged, cubeHomeController.ren);
    app.post('/home', cubeHomeController.search, cubeHomeController.ren);

    app.get('/about', userController.isUserlogged, cubeAboutController.ren);

    app.get('/create', userController.isUserlogged, cubeCreateController.ren);
    app.post('/create', userController.isUserlogged, cubeCreateController.addNewCube, cubeHomeController.ren);

    app.get('/details/:id', userController.isUserlogged, cubeDetailsController.renDetails);

    app.get('/details/:id/edit', userController.isUserlogged, cubeDetailsController.renEditDetails);
    app.post('/details/:id/edit', userController.isUserlogged, cubeDetailsController.editDetails)

    app.get('/details/:id/delete', userController.isUserlogged, cubeDetailsController.renDeleteDetails);
    app.post('/details/:id/delete', userController.isUserlogged, cubeDetailsController.deleteDetails);

    app.get('/create/accessory', cubeCreateAccessoryController.ren);
    app.post('/create/accessory', cubeCreateAccessoryController.addNewAccessory, cubeHomeController.ren);

    app.get('/attach/accessory/:id', cubeAttachController.ren);
    app.post('/attach/accessory/:id', cubeAttachController.attachNewAccessory);

    app.get('/register', userController.renRegister);
    app.post('/register', userController.newUser);

    app.get('/login', userController.renLogin);
    app.post('/login', userController.verifyLogin);

    app.get('/logout', userController.logout);
};