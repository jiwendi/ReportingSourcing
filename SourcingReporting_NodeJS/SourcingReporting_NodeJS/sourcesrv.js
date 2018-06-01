module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        app.get('/sources/showSourceOverview', function (req, res) {
            if (req.session.admin) {
                var regsuc = false;
                var message = "";
                var sourcequery = "SELECT id, name, CASE WHEN active = 1 THEN 'Ja' ELSE 'Nein' END AS active from sources ORDER BY name";

                db.query(sourcequery, function (sourceerr, sourceresult, sourcefields) {
                    if (sourceerr) {
                        sendResponse(res, false, "Fehler beim Abfragen der Quellen aus der Datenbank! " + sourceerr);
                    } else {
                        sendResponse(res, true, "", sourceresult);
                    }
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }
        });

        app.post('/source/showDetailsFromSelectedSource', function (req, res) {
            if (req.session.admin) {
                var regsuc = false;
                var message = "";
                var sourcequery = "SELECT id, name, active from sources WHERE id = ?";
                var parameter = [req.body.id];

                db.query(sourcequery, parameter, function (sourceerr, sourceresult, sourcefields) {
                    if (sourceerr) {
                        sendResponse(res, false, "Fehler beim Abfragen der Detail-Daten! " + sourceerr);
                    } else {
                        sendResponse(res, true, "", sourceresult[0]);
                    }
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung! (Bitte wende dich an einen Admin!)");
            }
        });

        app.post('/source/update', function (req, res) {
            if (req.session.admin) {
                var message = "";
                var suc = false;

                if (req.body.name == null || req.body.name == "") {
                    message = "Bitte gültigen Namen eingeben";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "UPDATE sources SET name = ?, active = ? WHERE id = ?";
                    var parameters = [req.body.name, req.body.active, req.body.id];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim Aktualisieren der Quelle in der Datenbank! " + err;
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

        app.post('/source/save', function (req, res) {
            if (req.session.admin) {
                var suc = false;
                var message = "";

                if (req.body.sourcename == null || req.body.sourcename == "") {
                    message = "Bitte Namen der Quelle eingeben!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "INSERT INTO sources (name) VALUES (?)";
                    var parameters = [req.body.sourcename];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim Einfügen der Quelle in die Datenbank! " + err;
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Daten wurden gespeichert!");
                        }
                    });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Keine Admin-Rechte!");
            }
        });
    }
};