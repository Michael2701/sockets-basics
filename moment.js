var moment = require('moment');
var now = moment();

//console.log(now.format('MMM Do YYYY, h[:]mm a'));
console.log(now.format('x'));

var timestamp = 1452580718245;
var timestampMoment = moment.utc(timestamp).local().format('h:mm a');
console.log(timestampMoment);