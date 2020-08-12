const dbcon = require('./dbcon');

module.exports = {
	query: ()=> {
		dbcon.connect();
	}
}
