const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(express.static(_projectDir + '/static'));

    app.set('view engine', '.hbs');

    app.engine('.hbs', handlebars({
        defaultLayout: false,
        partialsDir: _projectDir + '/views/partials/',
        extname: '.hbs'
    }));

    app.use(bodyParser.urlencoded({ extended: false }));

    //TODO: Setup the static files

};