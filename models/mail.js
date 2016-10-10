var mongoose = require('mongoose');

module.exports = mongoose.model('Mail',{
	name: String,
	email: String,
	hpno: String,
	msg: String,
	created:  { type: Date, default: Date.now },
});