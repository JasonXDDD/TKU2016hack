var config = {}
module.exports = config;

config.listen = {}
config.listen.address = '0.0.0.0'
config.listen.port = 3080;

// Margan is used to be logger, visit here to get more info:
// https://github.com/expressjs/morgan
config.logType = 'combined';

config.trust_proxy = 'loopback, uniquelocal';