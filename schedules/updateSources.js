const schedule = require('node-schedule');
const updateNetflix = require('./util').updateNetflix

var scheduleUpdateNetflix = schedule.scheduleJob('0 23 * * *', function () {
    updateNetflix()
});