module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {
       
        app.post('/user/login', function (req, res) {
            var loginQuery = "SELECT id, active, admin " +
                "FROM users  " +
                "WHERE email=? AND password=?";

            db.query(loginQuery, [req.body.email, req.body.passwd], function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Anmelden! " + err);
                } else {
                    if (rows.length > 0 && rows[0].active == 1) {
                        req.session.userid = rows[0].id;
                        req.session.admin = rows[0].admin;
                    }
                    sendResponse(res, true, "");
                }
            });
        });

        app.post('/user/logout', function (req, res) {
            req.session.destroy();
            sendResponse(res, true);
        });

        app.get('/users/getData', function (req, res) {
            if (req.session.userid) {
                var query = "SELECT id, firstname, lastname FROM users ORDER BY firstname";
            } else {
                sendResponse(res, false, "Keine Berechtigung");
            }
        });

        app.get('/users/showUserOverview', function (req, res) {
            if (req.session.userid) {
                var userQuery = 'SELECT id, firstname, lastname, email, birthday, hero, start, ' +
                    'CASE WHEN active = 1 THEN "Ja" ELSE "Nein" END AS active, ' +
                    'CASE WHEN admin = 1 THEN "Ja" ELSE "Nein" END AS admin, ' + 
                    'CASE WHEN password = "12345" THEN true ELSE false END AS defaultPassword ' +
                    'FROM users ORDER BY firstname';
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

        app.post('/user/showUserDetails', function (req, res) {
            if (req.session.userid) {
                var parameter = [];
                var suc = false;

                if (req.body.userid) {
                    if (req.session.admin) {
                        parameter = [req.body.userid];
                        suc = true;
                    } else {
                        sendResponse(res, false, "Keine Berechtigung! (Bitte wende dich an einen Admin!)");
                    }
                } else {
                    parameter = [req.session.userid];
                    suc = true;
                }

                if (suc) {
                    var userDetailQuery = "SELECT id, firstname, lastname, email, active, admin, birthday, hero, start, heroDescr, imageName FROM users WHERE id=?";
                    db.query(userDetailQuery, parameter, function (err, rows, fields) {
                        if (err) {
                            sendResponse(res, false, "Fehler beim Abfragen der User-Details! " + err);
                        } else {
                            if (rows.length == 0) {
                                sendResponse(res, false, "Benutzer nicht gefunden!");
                            } else {
                                var user = rows[0];
                                user.isloggedinUser = !req.body.userid || req.body.userid == req.session.userid;
                                sendResponse(res, true, "", user);
                            }
                        }
                    });
                }
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

        app.get('/user/showAllUsers', function (req, res) {
            if (req.session.userid) {
                    var userDetailQuery = "SELECT id, firstname, lastname, hero, start, heroDescr, imageName FROM users WHERE active = 1 ORDER BY firstname";
                    db.query(userDetailQuery, function (err, rows, fields) {
                        if (err) {
                            sendResponse(res, false, "Fehler beim Abfragen der Helden! " + err);
                        } else {
                                sendResponse(res, true, "", rows);
                        }
                    });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

        app.post('/user/update', function (req, res) {
            if (req.session.userid && (!req.body.userid || req.body.userid == req.session.userid || req.session.admin)) {
                var suc = false;
                var message = "";
                var updateQuery = "";
                var parameters = [];
                var userid = req.session.userid;

                if (req.body.userid) {
                    userid = req.body.userid;
                }

                if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vorname eingeben!";
                } else if (req.body.lastname == null || req.body.lastname == "") {
                    message = "Bitte Nachname eingeben";
                } else if (req.body.email == null || req.body.email == "") {
                    message = "Bitte gültige E-Mail eingeben!";
                } else if (req.body.birthday == null || req.body.birthday == "") {
                    message = "Bitte Geburtstag eingeben!";
                } if (req.body.password != null && req.body.password != "" && req.body.password2 != "") {
                    if (req.body.password == req.body.password2) {
                        suc = true;

                        updateQuery = "UPDATE users SET firstname=?, lastname=?, email=?, password=?, admin=?, active=?, start=?, birthday=?, hero=?, heroDescr=?, imageName=? WHERE id=?";
                        parameters = [req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.admin, req.body.active, req.body.start, new Date(req.body.birthday), req.body.hero, req.body.heroDescr, req.body.imageName, userid];
                    } else {
                        message = "Passwörter müssen übereinstimmen";
                    }
                } else {
                    suc = true;
                    updateQuery = "UPDATE users SET firstname=?, lastname=?, email=?, admin=?, active=?, start=?, birthday=?, hero=?, heroDescr=?, imageName=? WHERE id=?";
                    parameters = [req.body.firstname, req.body.lastname, req.body.email, req.body.admin, req.body.active, req.body.start, new Date(req.body.birthday), req.body.hero, req.body.heroDescr, req.body.imageName, userid];
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

        app.post('/user/save', function (req, res) {
            if (req.session.admin) {
                var suc = false;
                var message = "";

                if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vorname eingeben!";
                } else if (req.body.lastname == null || req.body.lastname == "") {
                    message = "Bitte Nachname eingeben!";
                } else if (req.body.email == null || req.body.email == "") {
                    message = "Bitte gültige E-Mail eingeben!";
                } else if (req.body.start == null || req.body.start == "") {
                    message = "Bitte Start-Info eingeben!";
                } else if (req.body.birthday == null || req.body.birthday == "") {
                    message = "Bitte Geburtsdatum eingeben!";
                } else { } if (req.body.password == null || req.body.password == "" || req.body.password2 == "" || req.body.password != req.body.password2) {
                    message = "Bitte zweimal das gleiche Passwort eingeben!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var selectUserQuery = "SELECT email from users where email=?";
                    db.query(selectUserQuery, [req.body.email], function (emerr, emrows, emfields) {
                        if (emerr) {
                            sendResponse(res, false, "Fehler beim Speichern in die Datenbank! " + emerr);
                        } else {
                            if (emrows.length > 0) {
                                sendResponse(res, false, "Email schon vorhanden!");
                            } else {
                                var insertUserQuery = "INSERT INTO users (firstname, lastname, email, password, admin, active, start, birthday, hero, heroDescr, imageName) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                                var insertParameters = [req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.admin == 1, req.body.active == 1, req.body.start, new Date(req.body.birthday), req.body.hero, req.body.heroDescr, req.body.imageName];

                                db.query(insertUserQuery, insertParameters, function (err, result, fields) {
                                    if (err) {
                                        message = "Fehler beim Speichern in die Datenbank! " + err;
                                        sendResponse(res, false, message);
                                    } else {
                                        sendResponse(res, true, "Daten wurden gespeichert!");
                                    }
                                });
                            }
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