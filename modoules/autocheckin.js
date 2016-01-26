var request = require('superagent');
var config = require('../config.js');

var headers = config.smzdm.headers;
var data = config.smzdm.data;
var url = config.smzdm.url;

var postData = "username=" + encodeURIComponent(data.username)
					+"&password=" + encodeURIComponent(data.password)
					+"&rememberme=" + ""
					+"&captcha=" + "";

var autosignin = function(){
	this.cookie = {
		value: null
	};
	var that = this;

	var _login = function(){
		console.log("login started");
		request
			.post(url.login)
			.set(headers)
			.type('json')
			.send(postData)
			.redirects(0)
			.end(function(err, res){
				if(err) console.log(err);
				var cookie = res.header['set-cookie'].join();
				console.log("cookie = " + cookie);
				that.cookie.value = cookie;
				console.log('login finished');
				_checkin();
			});
	};

	var _checkin = function(){
		console.log("checkin start");
		request
			.get(url.checkin + 'callback=callback')
			.set('Cookie',that.cookie.value)
			.end(function(err, res){
				if(err) console.log(err);
				console.log("res.body = " + res.body);
				console.log('checkin finish');
			})
	};

	return{
		init: _login
	};
};

module.exports = function(){
	return new autosignin();
};
