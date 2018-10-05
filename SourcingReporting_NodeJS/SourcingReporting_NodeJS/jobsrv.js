module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        app.get('/jobprofiles/getData', function (req, res) {
            if (req.session.userid) {
                var query = "SELECT jobprofiles.id, jobprofiles.jobtitle, jobprofiles.kategorie, jobkategorien.titel " +
                    "FROM jobprofiles " +
                    "LEFT OUTER JOIN jobkategorien ON jobprofiles.kategorie = jobkategorien.id " +
                    "ORDER BY jobprofiles.jobtitle";

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

        app.get('/jobprofiles/showJobOverview', function (req, res) {
            if (req.session.userid) {
                var jobprofileQuery = 'SELECT jobprofiles.id, jobprofiles.jobtitle, jobprofiles.kategorie, jobkategorien.titel ' +
                    'FROM jobprofiles LEFT OUTER JOIN jobkategorien ON jobprofiles.kategorie = jobkategorien.id ORDER BY jobprofiles.jobtitle';
                var jobkategoryQuery = 'SELECT id, titel FROM jobkategorien ORDER BY titel';
                db.query(jobprofileQuery, function (errP, resultP, fieldsP) {
                    if (errP) {
                        sendResponse(res, false, "Fehler beim Abfragen der Daten! " + errP);
                    } else {
                        db.query(jobkategoryQuery, function (errK, resultK, fieldsK) {
                            if (errK) {
                                sendResponse(res, false, "Fehler beim Abfragen der Daten! " + errK);
                            } else {
                                var result = {
                                    profiles: resultP,
                                    kategories: resultK
                                };
                                sendResponse(res, true, "", result)
                            }
                        });
                        
                    }
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }
        });

        app.post('/jobprofile/save', function (req, res) {
            if (req.session.userid) {
                var query = "INSERT INTO jobprofiles (jobtitle, kategorie) VALUES(?,?)";
                var parameter = [req.body.jobtitle, req.body.category];

                db.query(query, parameter, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Speichern der Daten! " + err);
                    } else {
                        sendResponse(res, true, "Daten wurden gespeichert!");
                    }
                });

            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }

        });

        app.get('/jobcategory/getDataForSelect', function (req, res) {
            if (req.session.userid) {
                var query = "SELECT id, titel FROM jobkategorien";

                db.query(query, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen der Daten! " + err);
                    } else {
                        sendResponse(res, true, "", result);
                    }
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }
        });

        app.post('/jobcategory/save', function (req, res) {
            if (req.session.userid) {
                var query = "INSERT INTO jobkategorien (titel) VALUES(?)";
                var parameter = [req.body.titel];

                db.query(query, parameter, function (err, result, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Speichern der Daten! " + err);
                    } else {
                        sendResponse(res, true, "Daten wurden gespeichert!");
                    }
                });

            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }
           
        });
    }
};