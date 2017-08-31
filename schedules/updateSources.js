const schedule = require('node-schedule');
const queryNetflix = require('./util').queryNetflix

var scheduleUpdateNetflix = schedule.scheduleJob('45 0 * * *', function () {
    queryNetflix()
});