const schedule = require('node-schedule');
const queryNetflix = require('./util').queryNetflix

var scheduleUpdateNetflix = schedule.scheduleJob('0 23 * * *', function () {
    queryNetflix()
});