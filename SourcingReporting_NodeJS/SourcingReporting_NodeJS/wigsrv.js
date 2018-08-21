module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        app.get('/wig/showWigOverview', function (req, res) {
            var query = "SELECT DISTINCT w.id, w.name, w.start, w.end, w.goal, " +
                "CASE WHEN w.active = 1 THEN 'aktiv' ELSE '' END AS active, (x.hireThisYear + er.hireThisYear) AS hireThisYear  " +
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
                    var parameters = [req.body.name, new Date(req.body.start), new Date(req.body.end), req.body.goal];

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
                    var parameters = [req.body.name, new Date(req.body.start), new Date(req.body.end), req.body.goal, req.body.active, req.body.id];

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