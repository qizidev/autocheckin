var request = require('superagent');
var config = require('../config.js');

var headers = config.smzdm.headers;
var data = config.smzdm.data;
var url = config.smzdm.url;

var autosignin = function(){
	this.cookie = {
		value: null
	};
	var that = this;

	var _login = function(){
		request
			.post(url.login)
			.set(headers)
			.type('json')
			.send(data)
			.redirects(0)
			.end(function(err, res){
				if(err) console.log(err);
				var cookie = res.header['set-cookie'].join();
				console.log(cookie);
				that.cookie.value = cookie;
			});
		console.log('login started');
		_checkin();
	};

	var _checkin = function(){
		request
			.get(url.checkin)
			.set('Cookie',that.cookie.value)
			.end(function(err, res){
				if(err) console.log(err);
				console.log(res.body);
				console.log('签到完成');
			})
	};

	return{
		init: _login
	};
};

module.exports = function(){
	return new autosignin();
};
