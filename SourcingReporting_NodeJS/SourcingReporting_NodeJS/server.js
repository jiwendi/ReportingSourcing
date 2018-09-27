'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

var express = require('express');
var mysql = require('mysql');
var bp = require('body-parser');

var session = require('express-session');
var uuid = require('node-uuid');
var moment = require('moment');
var multer = require('multer');

var tablesort = require('tablesort');

var candidatesrv = require('./candidatesrv');
var candidateersrv = require('./candidate_er_srv');
var dashboardsrv = require('./dashboardsrv');
var jobsrv = require('./jobsrv');
var navigationsrv = require('./navigationsrv');
var recruitersrv = require('./recruitersrv');
var settingssrv = require('./settingssrv');
var sourcesrv = require('./sourcesrv');
var statisticssrv = require('./statisticssrv');
var teamsrv = require('./teamsrv');
var usersrv = require('./usersrv');
var wigsrv = require('./wigsrv');

var app = express();

/**
 *  Database Connection
 */
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'e.Hallo!', //e.Hallo!
    database: 'epunkt_sourcing'
});

app.use(express.static('public'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(session({
    genid: function (req) {
        return uuid.v4();
    },
    resave: false,
    saveUninitialized: false,
    secret: '3009'
}));

//--------------------
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images/SourcingHelden");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).single("photo");

app.post('/uploadUserImg', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            sendResponse(res, false, "Upload fehlgeschlagen");
        } else {
            sendResponse(res, true, "Upload okay");
        }
    });
});


//--------------------

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

var getDateString = function (date) {
    return "'" + new Date(date).toLocaleDateString("de-de") + "'";
};

app.get('/dashboard', auth, function (req, res) {
    res.sendFile(__dirname + '/dashboard.html');
});

/**
 *  include all Servers
 */
usersrv.setup(app, db, session, toDate, sendResponse);

teamsrv.setup(app, db, session, toDate, sendResponse);

sourcesrv.setup(app, db, session, toDate, sendResponse);

candidatesrv.setup(app, db, session, toDate, sendResponse, getDateString);

candidateersrv.setup(app, db, session, toDate, sendResponse);

wigsrv.setup(app, db, session, toDate, sendResponse);

statisticssrv.setup(app, db, session, toDate, sendResponse, getDateString);

settingssrv.setup(app, db, session, toDate, sendResponse, getDateString);

dashboardsrv.setup(app, db, session, toDate, sendResponse);

navigationsrv.setup(app, db, session, toDate, sendResponse);

recruitersrv.setup(app, db, session, toDate, sendResponse);

jobsrv.setup(app, db, session, toDate, sendResponse);

app.listen(8081, function () {
    console.log('Sourcing App listening on port 8081!');
});