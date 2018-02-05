var crypto = require('crypto');

module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {
        /**
         * WIG Info - NavBar Overview
         */
        app.get('/wig/info', function (req, res) {
            var query = "SELECT COUNT(candidate.id) AS hireThisYear FROM candidate, wig WHERE candidate.hire >= wig.start AND candidate.hire <= wig.end AND wig.active = 1";
            var wigquery = "SELECT wig.start, wig.end, wig.goal FROM wig WHERE wig.active = 1";

            db.query(query, function (err, rows, fields) {
                if (err) throw err;

                db.query(wigquery, function (wigerr, wigrows, wigfields) {
                    if (wigerr) throw wigerr;

                    var result = {
                        hireThisYear: rows[0],
                        wig: wigrows[0]
                    };
                    sendResponse(res, true, "", result);
                });
            });

        });


        /**
         * WIG Get - WIG Übersicht
         */
        app.get('/wig/get', function (req, res) {
            if (req.session.userid && req.session.admin) {
                var query = "SELECT name, start, end, goal from WIG";
                db.query(query, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler mit DB");
                    } else {
                        sendResponse(res, true, "", result);
                    }
                });
                
            } else {
                sendResponse(res, false, "Keine Berechtigung");
            }
        });

        /**
         * WIG save - Save a WIG in Database
         */
        app.post('/wig/save', function (req, res) {
            if (req.session.admin) {
                var message = "";
                var suc = false;

                if (req.body.start == null || req.body.start == "" || req.body.start > req.body.end) {
                    message = "Bitte gültiges Start-Datum eingeben";
                } else if (req.body.end == null || req.body.end == "") {
                    message = "Bitte gültiges End-Datum eingeben!";
                } else if (req.body.goal == null || req.body.goal == "") {
                    message = "Bitte Ziel eingeben!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "INSERT INTO wig(name, start, end, goal) VALUES (?,?,?,?)";
                    var parameters = [req.body.name, req.body.start, req.body.end, req.body.goal];
                    
                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler mit DB";
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Daten wurden gespeicher!");
                        }
                    });
                    
                } else {
                    sendResponse(res, false, message);
                }

            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }

        });
        
    } //end setup-function
}; //end module.exports