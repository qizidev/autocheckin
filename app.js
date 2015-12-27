var autocheckin = require('./modoules/autocheckin.js')();
var timer = require('./modoules/timer.js');

timer('at 08:00 am', function(){
	autocheckin.init();
});