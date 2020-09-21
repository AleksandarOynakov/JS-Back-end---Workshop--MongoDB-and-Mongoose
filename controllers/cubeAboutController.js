module.exports = {
    ren: function (req, res) {
        res.render('../views/about.hbs', { user: req.auth });
    }
}