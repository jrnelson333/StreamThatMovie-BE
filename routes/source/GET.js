const Source = require('../../models/Source');

var getSource = function getSource(req, res, next) {

    const query = {
        id: req.params.id,
    }

    const callback = function callback(err, obj) {
        if (err) { 
            return next(err);
        } else if (obj) {
            res.status(200).send(obj);
        } else {
            res.status(404).send();
        }
    }

    Source.findOne(query, callback)

}

module.exports = getSource;