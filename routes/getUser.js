var getUser = function getUser(req, res) {
    if (req.user) {
        var user = {id: req.user._id, email: req.user.email};
        return res.status(200).send(user);
    } else {
        return res.status(403).send();
    }

}

module.exports = getUser;