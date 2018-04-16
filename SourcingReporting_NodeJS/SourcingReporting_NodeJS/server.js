'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

var express = require('express');
var mysql = require('mysql');
var bp = require('body-parser');

var session = require('express-session');
var uuid = require('node-uuid');
var moment = require('moment');

var tablesort = require('tablesort');
//tablesort(el, options);

var usersrv = require('./usersrv');
var teamsrv = require('./teamsrv');
var sourcesrv = require('./sourcesrv');
var candidatesrv = require('./candidatesrv');
var wigsrv = require('./wigsrv');
var statisticssrv = require('./statisticssrv');
var candidateersrv = require('./candidate_er_srv');

var app = express();

/**
 *  Database Connection
 */
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'epunkt_sourcing'
});

app.use(express.static('public'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(session({
    genid: function (req) {
        return uuid.v4(); // generate a v4 random ID
    },
    resave: false,
    saveUninitialized: false,
    secret: '3009'
}));

var sendResponse = function (res, suc, mes, data) {
    res.json({ success: suc, message: mes, data: data });
};

var toDate = function (dateString) {
    return moment.utc(dateString).toDate();
};

var auth = function (req, res, next) {
    if (req.session && req.session.userid) {
        return next();
    } else {
        res.redirect('login.html');
    }
};

app.get('/dashboard', auth, function (req, res) {
    res.sendFile(__dirname + '/dashboard.html');
});

/**
 *  Servers
 */
usersrv.setup(app, db, session, toDate, sendResponse);

teamsrv.setup(app, db, session, toDate, sendResponse);

sourcesrv.setup(app, db, session, toDate, sendResponse);

candidatesrv.setup(app, db, session, toDate, sendResponse);

candidateersrv.setup(app, db, session, toDate, sendResponse);

wigsrv.setup(app, db, session, toDate, sendResponse);

statisticssrv.setup(app, db, session, toDate, sendResponse);

app.listen(8081, function () {
    console.log('Sourcing App listening on port 8081!');
});
