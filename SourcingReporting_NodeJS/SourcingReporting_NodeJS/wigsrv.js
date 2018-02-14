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
                /*
                var query = "SELECT wig.id, wig.name, wig.start, wig.end, wig.goal, " +
                    "CASE WHEN wig.active=1 THEN 'Ja' ELSE 'Nein' END AS active, " +
                    " COUNT(candidate.id) AS hireThisYear " +
                    " FROM candidate, wig WHERE candidate.hire >= wig.start AND candidate.hire <= wig.end GROUP BY wig.id";
                */
                var query = "SELECT DISTINCT w.id, w.name, w.start, w.end, w.goal, " +
                    "CASE WHEN w.active = 1 THEN 'Ja' ELSE 'Nein' END AS active, " +
                    "CASE WHEN x.hireThisYear IS NULL THEN '-' ELSE x.hireThisYear END as hireThisYear " +
                    "FROM wig w LEFT JOIN (SELECT wig.id, count(candidate.id) as hireThisYear FROM candidate, wig " +
                    "WHERE candidate.hire >= wig.start AND candidate.hire <= wig.end GROUP BY wig.id) x " +
                    "ON w.id = x.id  WHERE w.id IS NOT NULL ORDER BY w.id";


                db.query(query, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler mit DB");
                    } else {
                        sendResponse(res, true, "", result);
                    }
                });
                
          
        });

     
        /**
          * WIG Info for WIGdetail (update or delete) WIG
          */
        app.post('/wig/detailinfo', function (req, res) {
            if (req.session.userid && req.session.admin) {
                var query = "SELECT id, name, start, end, goal, active FROM wig WHERE id = ?";
                var parameter = [req.body.id];

                db.query(query, parameter, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler mit DB");
                    } else {
                        sendResponse(res, true, "", result[0]);
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

        /**
          * WIG update - Update a WIG in Database
          */
        app.post('/wig/update', function (req, res) {
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
                    var query = "UPDATE wig SET name = ?, start = ?, end = ?, goal = ?, active = ? WHERE id = ?";
                    var parameters = [req.body.name, req.body.start, req.body.end, req.body.goal, req.body.active, req.body.id];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler mit DB";
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Daten wurden gespeichert!");
                        }
                    });

                } else {
                    sendResponse(res, false, message);
                }

            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }

        });

        /**
          * WIG delete - Delete a WIG from Database
          */
        app.post('/wig/delete', function (req, res) {
            if (req.session.admin) {
                var message = "";
                var suc = false;

                if (req.body.id == null || req.body.id == "") {
                    message = "Keine WIG-id übergeben!!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "DELETE FROM wig WHERE id = ?";
                    var parameters = [req.body.id];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler mit DB";
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "WIG wurde gelöscht!");
                            
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