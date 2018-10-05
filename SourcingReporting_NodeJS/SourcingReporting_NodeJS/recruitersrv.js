module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        app.get('/recruiter/getData', function (req, res) {
            if (req.session.userid) {
                var query = "SELECT recruiter.id, recruiter.firstname, recruiter.lastname, recruiter.teamid, team.name FROM recruiter LEFT OUTER JOIN team ON team.id = recruiter.teamid ORDER BY recruiter.firstname";
                db.query(query, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen der Recruiter-Daten! " + err);
                    } else {
                        sendResponse(res, true, "", result);
                    }
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }
        });

        app.get('/recruiter/showRecruiterOverview', function (req, res) {
            if (req.session.userid) {
                var userQuery = 'SELECT recruiter.id, recruiter.firstname, recruiter.lastname, recruiter.teamid, team.name ' +
                    'FROM recruiter LEFT JOIN team ON team.id = recruiter.teamid ORDER BY recruiter.firstname';
                db.query(userQuery, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen der Daten! " + err);
                    } else {
                        sendResponse(res, true, "", result)
                    }
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }
        });

        app.post('/recruiter/showRecruiterDetails', function (req, res) {
            var parameter = [req.body.recruiterid];
            var recruiterDetailQuery = "SELECT id, firstname, lastname, teamid FROM recruiter WHERE id=?";
            db.query(recruiterDetailQuery, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Recruiter-Details! " + err);
                } else {
                    if (rows.length == 0) {
                        sendResponse(res, false, "Recruiter nicht gefunden!");
                    } else {
                        var recruiter = rows[0];
                        sendResponse(res, true, "", recruiter);
                    }
                }
             }); 
        });

        app.post('/recruiter/update', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var updateQuery = "";
                var parameters = [];
                var userid = req.session.userid;
                console.log('Update Recruiter: ' + req.body.id + ' ' + req.body.firstname + ' ' + req.body.lastname + ' ' + req.body.teamid);
                
                if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vorname eingeben!";
                } else if (req.body.lastname == null || req.body.lastname == "") {
                    message = "Bitte Nachname eingeben";
                } else if (req.body.teamid == null || req.body.teamid == "") {
                    message = "Bitte Team auswählen! " + req.body.teamid;
                } else {
                    suc = true;
                    updateQuery = "UPDATE recruiter SET firstname=?, lastname=?, teamid=? WHERE id=?";
                    parameters = [req.body.firstname, req.body.lastname, req.body.teamid, req.body.id];
                }

                if (suc) {
                    db.query(updateQuery, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim ausführen des UPDATE-Querys! " + err;
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

        app.post('/recruiter/save', function (req, res) {
            if (req.session.admin) {
                var suc = false;
                var message = "";

                if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vorname eingeben!";
                } else if (req.body.lastname == null || req.body.lastname == "") {
                    message = "Bitte Nachname eingeben!";
                } else if (req.body.teamid == null || req.body.teamid == "") {
                    message = "Bitte Team auswählen!";
                } else {
                    suc = true;
                }

                if (suc) {    
                    var insertRecruiterQuery = "INSERT INTO recruiter (firstname, lastname, teamid) VALUES (?,?,?)";
                    var insertParameters = [req.body.firstname, req.body.lastname, req.body.teamid];

                    db.query(insertRecruiterQuery, insertParameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim Speichern in die Datenbank! " + err;
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
    }
}; 