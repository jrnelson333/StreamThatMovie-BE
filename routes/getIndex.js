var path = require('path');
var getIndex = function getIndex(req, res) {
    res.sendfile(path.resolve('public/index.html'));
}

module.exports = getIndex;