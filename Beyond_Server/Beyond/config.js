var path = require('path');
var config = {}
module.exports = config;

config.active_modules = {
    staticFile: {
        route: '/assets'  
    },
    user: {
        route: '/user'
    },
    timetable: {
        route: '/timetable'
    },
    exam: {
        route: '/exam'
    },
    homework: {
        route: '/homework'  
    },
    restaurant: {
        route: '/restaurant'
    }
}

config.sessionStore = {
    host: 'local.docker',
    port: 6379
}

config.session = {
    secret: "beyond",
    resave: false,
    saveUninitialized: true,
    cookie: {},
    name: 'beyond-session',
}

config.database = {};
config.database.sql = {
    type: 'mysql',
    host: 'local.docker',
    port: 3306,
    username: 'root',
    password: '123456@',
    dbname: 'beyond'
}
config.database.nosql = {
    host: 'local.docker',
    port: 27017,
    dbname: 'beyond',
    username: undefined,
    password: undefined,
    connectionUri: undefined
}

config.staticStorage = path.normalize(path.join(__dirname, 'assets'));

config.renderPagePath = path.join(__dirname, 'pages');

// if(process.env.NODE_ENV === 'production'){
//     config.session.cookie.secure = true;
// }
    