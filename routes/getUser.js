var getUser = function getUser(req, res) {
    var user = req.user;
    res.json(user);
}

module.exports = getUser;