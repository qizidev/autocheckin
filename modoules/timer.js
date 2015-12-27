var later = require('later');

module.exports = function(time, fn){
	var textSched = later.parse.text(time);
	later.date.localTime();
	later.setInterval(fn, textSched);
	console.log('start timer');
};