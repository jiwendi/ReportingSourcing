module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        /**
         * User Login
         */
        app.post('/user/login', function (req, res) {
            
            db.query('SELECT id, active, admin from users where email=? AND password=?', [req.body.email, req.body.passwd], function (err, rows, fields) {
                if (err) throw err;
                var suc = false;

                if (rows.length > 0 && rows[0].active == 1) {
                    req.session.userid = rows[0].id;
                    req.session.admin = rows[0].admin;
                    suc = true;
                }
                sendResponse(res, suc, "");
            });
        }); //end login

        /**
         * User Logout
         */
        app.post('/user/logout', function (req, res) {
            req.session.destroy();
            sendResponse(res, true);
        }); //end logout

       
        
        /**
         * Users Get - Mitarbeiterübersicht
         */
        app.get('/users/get', function (req, res) {
            if (req.session.userid && req.session.admin) {
                var regsuc = false;
                var message = "";
                //SELECT id, firstname, lastname, email, active, admin from users
                db.query('SELECT id, firstname, lastname, email, CASE WHEN active = 1 THEN "Ja" ELSE "Nein" END AS active, CASE WHEN admin = 1 THEN "Ja" ELSE "Nein" END AS admin from users', function (err, result, fields) {
                    if (err) {
                        message = "Fehler mit DB";
                        sendResponse(res, false, message);
                    } else {
                        sendResponse(res, true, "", result)
                    }
                });
           } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }
        }); //end users/get

        /**
         * User Info
         */
        app.post('/user/info', function (req, res) {
            if (req.session.userid) {
                var parameter = [];
                var suc = false;

                if (req.body.userid) {
                    if (req.session.admin) {
                        parameter = [req.body.userid];
                        suc = true;
                    } else {
                        sendResponse(res, false, "Keine Berechtigung!");
                    }
                } else {
                    parameter = [req.session.userid];
                    suc = true;
                }

                if (suc) {
                    db.query('SELECT id, firstname, lastname, email, active, admin from users where id=?', parameter, function (err, rows, fields) {
                        if (err) throw err;

                        if (rows.length == 0) {
                            sendResponse(res, false, "Benutzer nicht gefunden!");
                        } else {
                            var user = rows[0];

                            user.isloggedinUser = !req.body.userid || req.body.userid == req.session.userid;
                            
                            sendResponse(res, true, "", user);
                        }
                    });
                }
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        }); //end users/info

        app.post('/user/update', function (req, res) {
            if (req.session.userid && (!req.body.userid || req.body.userid == req.session.userid || req.session.admin)) {
                var suc = false;
                var message = "";
                var update = "";
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
                } else if (req.body.password != null && req.body.password != "" && req.body.password2 != "") {
                    if (req.body.password == req.body.password2) {
                        suc = true;
                        
                        update = "UPDATE users SET firstname=?, lastname=?, email=?, password=?, admin=?, active=? where id=?";
                        parameters = [req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.admin, req.body.active, userid];
                    } else {
                        message = "Passwörter müssen übereinstimmen";
                    }
                } else {
                    suc = true;
                    update = "UPDATE users SET firstname=?, lastname=?, email=?, admin=?, active=? where id=?";
                    parameters = [req.body.firstname, req.body.lastname, req.body.email, req.body.admin, req.body.active, userid];
                }

                if (suc) {
                   // console.log('parameters : ' + parameters)
                    db.query(update, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim ausführen des UPDATE-Querys";
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
        }); //end user/update

        /**
         * User Save
         */
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
                } else if (req.body.password == null || req.body.password == "" || req.body.password2 == "" || req.body.password != req.body.password2) {
                    message = "Bitte zweimal das gleiche Passwort eingeben!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query('SELECT email from users where email=?', [req.body.email], function (emerr, emrows, emfields) {
                        if (emerr) {
                            sendResponse(res, false, "Fehler mit DB");
                        } else {
                            if (emrows.length > 0) {
                                sendResponse(res, false, "Email schon vorhanden!");
                            } else {
                                var query = "INSERT INTO users (firstname, lastname, email, password, admin, active) VALUES (?,?,?,?,?,?)";
                                var parameters = [req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.admin == 1, req.body.active == 1];

                                db.query(query, parameters, function (err, result, fields) {
                                    if (err) {
                                        message = "Fehler mit DB";
                                        sendResponse(res, false, message);
                                    } else {
                                        sendResponse(res, true, "Daten wurden gespeicher!");
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
        }); //end User Save

    } //end setup-function
}; //end module.exports