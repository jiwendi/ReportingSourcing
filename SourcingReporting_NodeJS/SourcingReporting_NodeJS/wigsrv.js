module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        app.get('/wig/showWigInHeader', function (req, res) {
            var query = "SELECT COUNT(candidate.id) AS hireThisYear FROM candidate, wig WHERE candidate.hire >= wig.start AND candidate.hire <= wig.end AND wig.active = 1";
            var eRquery = "SELECT COUNT(candidate_eR.id) AS hireThisYear FROM candidate_eR, wig WHERE candidate_eR.hire >= wig.start AND candidate_eR.hire <= wig.end AND wig.active = 1";
            var wigquery = "SELECT wig.start, wig.end, wig.goal FROM wig WHERE wig.active = 1";

            db.query(query, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der WIGs aus der DB " + err);
                } else {
                    db.query(eRquery, function (eRerr, eRrows, eRfields) {
                        if (eRerr) {
                            sendResponse(res, false, "Fehler beim Abfragen der WIGs aus der DB " + eRerr);
                        } else {
                            db.query(wigquery, function (wigerr, wigrows, wigfields) {
                                if (wigerr) {
                                    sendResponse(res, false, "Fehler beim Abfragen der WIGs aus der DB " + wigerr);
                                } else {
                                    var result = {
                                        hireThisYear: rows[0],
                                        hireThisYeareR: eRrows[0],
                                        wig: wigrows[0]
                                    };
                                    sendResponse(res, true, "", result);
                                } 
                            });
                        }
                    });
                }
            });
        });

        /* Release 1.6 Show Weekly Numbers in Header */
        app.get('/wig/weeklyNumbersInHeader', function (req, res) {
            var queryTelnotice = "SELECT COUNT(telnotice) as telnotice_week FROM candidate WHERE WEEK(telnotice) = WEEK(sysdate()) AND YEAR(telnotice) = YEAR(sysdate())";
            var queryRequests = "SELECT COUNT(id) as requests_week FROM candidate WHERE WEEK(research) = WEEK(sysdate()) AND YEAR(research) = YEAR(sysdate()) AND request= 1";

            db.query(queryTelnotice, function (errTN, rowsTN, fieldsTN) {
                if (errTN) {
                    sendResponse(res, false, "Fehler beim Abfragen der Weekly-Telefonnotizen aus der DB " + eRerr);
                } else {
                    db.query(queryRequests, function (errReq, rowsReq, fieldsReq) {
                        if (errReq) {
                            sendResponse(res, false, "Fehler beim Abfragen der Weekly-Ansprachen aus der DB " + eRerr);
                        } else {
                            var result = {
                                weekly_telnotice: rowsTN[0],
                                weekly_requests: rowsReq[0]
                            };
                            sendResponse(res, true, "", result);
                        }
                    });
                }
            });
        });

        app.get('/wig/showWigOverview', function (req, res) {
            var query = "SELECT DISTINCT w.id, w.name, w.start, w.end, w.goal, w.active, (x.hireThisYear + er.hireThisYear) AS hireThisYear  " +
                "FROM epunkt_sourcing.wig w LEFT JOIN (" +
                "SELECT wig.id, count(candidate.id) as hireThisYear  " +
                "FROM epunkt_sourcing.candidate, epunkt_sourcing.wig " +
                "WHERE candidate.hire >= wig.start AND candidate.hire <= wig.end  " +
                "GROUP BY wig.id) x  " +
                "ON w.id = x.id " +
                "LEFT JOIN (" +
                "SELECT wig.id, count(candidate_eR.id) as hireThisYear  " +
                "FROM epunkt_sourcing.candidate_eR, epunkt_sourcing.wig " +
                "WHERE candidate_eR.hire >= wig.start AND candidate_eR.hire <= wig.end  " +
                "GROUP BY wig.id " +
                ") er ON w.id = er.id " +
                "WHERE w.id IS NOT NULL  " +
                "ORDER BY w.id ";

            db.query(query, function (err, result, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der WIG's aus der Datenbank! " + err);
                } else {
                    sendResponse(res, true, "", result);
                }
            });
        });

        app.post('/wig/showDetailsForSelectedWig', function (req, res) {
            if (req.session.userid && req.session.admin) {
                var query = "SELECT id, name, start, end, goal, active FROM wig WHERE id = ?";
                var parameter = [req.body.id];

                db.query(query, parameter, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Laden der WIG-Details! " + err);
                    } else {
                        sendResponse(res, true, "", result[0]);
                    }
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung! (Bitte wende dich an einen Admin!)");
            }
        });
        
        app.post('/wig/save', function (req, res) {
            if (req.session.userid && req.session.admin) {
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
                            message = "Fehler beim Einfügen in die Datenbank! " + err;
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Daten wurden gespeichert!");
                        }
                    });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Keine Berechtigung! (Bitte wende dich an einen Admin!)");
            }
        });

        app.post('/wig/update', function (req, res) {
            if (req.session.userid && req.session.admin) {
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
                            message = "Fehler beim Aktualisieren des WIGs! " + err;
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

        app.post('/wig/delete', function (req, res) {
            if (req.session.userid && req.session.admin) {
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
                            message = "Fehler beim Löschen des WIGs! " + err;
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
    } 
};