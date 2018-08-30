module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        app.get('/personalDashboard/getAllBirthdays', function (req, res) {
            if (req.session.userid) {
                var birthdayQuery = "SELECT id, firstname, birthday from users WHERE active = 1 AND MONTH(birthday) = MONTH(sysdate()) AND DAY(birthday) = DAY(sysdate())";

                db.query(birthdayQuery, function (err, result, fields) {
                    if (err) {
                        message = "Fehler beim Abfragen der Geburtstags-Daten! " + err;
                        sendResponse(res, false, message);
                    } else {
                        sendResponse(res, true, "", result);
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });




        app.post('/personalDashboard/myRememberMeListThisMonth', function (req, res) {
            if (req.session.userid) {
                var regsuc = false;
                var message = "";

                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname, candidate.rememberMe, candidate.infos, " +
                    "CASE WHEN candidate.lastname IS NULL THEN '' ELSE candidate.lastname END AS lastname," +
                    "sources.name as source, candidate.source_text, SUBSTRING(candidate.eR,2) as eR," +
                    "CASE WHEN candidate.telnotice IS NULL THEN '-' ELSE candidate.telnotice END AS telnotice," +
                    "CASE WHEN candidate.response_value = NULL THEN 'none' ELSE CASE WHEN candidate.response_value = 1 THEN 'pos.' ELSE CASE WHEN candidate.response_value = 0 THEN 'neg.' ELSE ' ' END END END AS response_value," +
                    "CASE WHEN candidate.tracking = 1 THEN 'ja' ELSE 'nein' END AS tracking," +
                    "CASE WHEN candidate.response = 1 THEN 'ja |' ELSE 'nein' END AS response," +
                    "candidate.research, users.firstname as sourcerName, candidate.sourcer " +
                    "FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT JOIN users ON candidate.sourcer = users.id " +
                    "WHERE candidate.rememberMe IS NOT NULL AND candidate.sourcer = " + req.session.userid + " AND MONTH(candidate.rememberme) <= MONTH(sysdate()) AND YEAR(candidate.rememberme) <= YEAR(sysdate()) " +
                    "ORDER BY candidate.rememberMe";

                db.query(candidatequery, function (candErr, candResult, candFields) {
                    if (candErr) {
                        sendResponse(res, false, "Fehler beim Abfragen der Kandidaten aus der Datenbank! " + candErr);
                    } else {
                        sendResponse(res, true, "", candResult);
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });


        app.post('/personalDashboard/requestsByYear', function (req, res) {
            var message = "";
            var allRequestQuery = "SELECT COUNT(candidate.id) as requests FROM candidate " +
                "LEFT JOIN sources ON candidate.source_id = sources.id " +
                "WHERE year(candidate.research) = ? AND request = 1";
            var parameter = [req.body.yearToFilter];

            db.query(allRequestQuery, parameter, function (allerr, allrows, allfields) {
                if (allerr) {
                    sendResponse(res, false, "Fehler beim Abfragen der Ansprachenanzahl (Gesamt)! " + allerr);
                } else {
                    var result = {
                        allRequests: allrows[0]
                    };
                    sendResponse(res, true, "", result);
                }
            });
        });

        app.post('/personalDashboard/myYear', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(request) as request FROM candidate WHERE sourcer = ? AND YEAR(research) = ?";
            var telNoticeQuery = "SELECT COUNT(telnotice) as telnotice FROM candidate WHERE sourcer = ? AND YEAR(telnotice) = ?";
            var hireQuery = "SELECT COUNT(hire) as hire FROM candidate WHERE sourcer = ? AND YEAR(hire) = ?"
            var internQuery = "SELECT COUNT(intern) as intern FROM candidate WHERE sourcer = ? AND YEAR(intern) = ?";
            var requests = "SELECT COUNT(id) as response FROM candidate WHERE sourcer = ? AND response = 1 AND YEAR(research) = ?";
            var requestPositiv = "SELECT COUNT(id) as response_positiv FROM candidate WHERE sourcer = ? AND response = 1 AND response_value = 1 AND YEAR(research) = ?";
            var requestNegativ = "SELECT COUNT(id) as response_negativ FROM candidate WHERE sourcer = ? AND response = 1 AND response_value = 0 AND YEAR(research) = ?";
            var parameter = [req.session.userid, req.body.yearToFilter];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der (mein Jahr) Ansprachen! " + err);
                } else {
                    db.query(telNoticeQuery, parameter, function (telErr, telRows, telFields) {
                        if (telErr) {
                            sendResponse(res, false, "Fehler beim Abfragen der (mein Jahr) TelefonNotizen! " + telErr);
                        } else {
                            db.query(hireQuery, parameter, function (hireErr, hireRows, hireFields) {
                                if (hireErr) {
                                    sendResponse(res, false, "Fehler beim Abfragen der (mein Jahr) Besetzungen! " + hireErr);
                                } else {
                                    db.query(requests, parameter, function (reqErr, reqRows, reqFields) {
                                        if (reqErr) {
                                            sendResponse(res, false, "Fehler beim Abfragen der (mein Jahr) Response! " + reqErr);
                                        } else {
                                            db.query(requestPositiv, parameter, function (posErr, posRows, posFields) {
                                                if (posErr) {
                                                    sendResponse(res, false, "Fehler beim Abfragen der (mein Jahr) Response (positiv)! " + posErr);
                                                } else {
                                                    db.query(requestNegativ, parameter, function (negErr, negRows, negFields) {
                                                        if (negErr) {
                                                            sendResponse(res, false, "Fehler beim Abfragen der (mein Jahr) Response (negativ)! " + negErr);
                                                        } else {
                                                            db.query(internQuery, parameter, function (internErr, internRows, internFields) {
                                                                if (internErr) {
                                                                    sendResponse(res, false, "Fehler beim Abfragen der (mein Jahr) Internen Gespräche! " + internErr);
                                                                } else {
                                                                    var result = {
                                                                        request: rows[0],
                                                                        telNotice: telRows[0],
                                                                        hires: hireRows[0],
                                                                        requests: reqRows[0],
                                                                        requestsPositiv: posRows[0],
                                                                        requestsNegativ: negRows[0],
                                                                        intern: internRows[0]
                                                                    };
                                                                    sendResponse(res, true, "", result);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        app.post('/personalDashboard/myWeek', function (req, res) {
            var message = "";
            var parameter = [req.session.userid];
            var requestQuery = "SELECT COUNT(c1.request) as request " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND WEEK(c1.research) = WEEK(sysdate()) AND request=1";
            var notRequestedQuery = "SELECT COUNT(c1.request) as notRequested " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND WEEK(c1.research) = WEEK(sysdate()) AND request=0";
            var telnoticeQuery = "SELECT COUNT(c1.telnotice) as telnotice " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND c1.telnotice IS NOT NULL AND WEEK(c1.telnotice) = WEEK(sysdate())";
            var hireQuery = "SELECT COUNT(c1.hire) as hire " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND c1.hire IS NOT NULL AND WEEK(c1.hire) = WEEK(sysdate())";

            db.query(requestQuery, parameter, function (reqErr, reqRows, reqFields) {
                if (reqErr) {
                    sendResponse(res, false, "Fehler beim Abfragen der (meine Woche) Ansprachen! " + reqErr);
                } else {
                    db.query(notRequestedQuery, parameter, function (notReqErr, notReqRows, notReqFields) {
                        if (notReqErr) {
                            sendResponse(res, false, "Fehler beim Abfragen der (meine Woche) Ansprachen (nicht angesprochen)! " + notReqErr);
                        } else {
                            db.query(telnoticeQuery, parameter, function (telErr, telRows, telFields) {
                                if (telErr) {
                                    sendResponse(res, false, "Fehler beim Abfragen der (meine Woche) TelefonNotizen! " + telErr);
                                } else {
                                    db.query(hireQuery, parameter, function (hireErr, hireRows, hireFields) {
                                        if (hireErr) {
                                            sendResponse(res, false, "Fehler beim Abfragen der (meine Woche) Besetzungen! " + hireErr);
                                        } else {
                                            var result = {
                                                request: reqRows[0],
                                                notRequested: notReqRows[0],
                                                telnotice: telRows[0],
                                                hires: hireRows[0]
                                            };
                                            sendResponse(res, true, "", result);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        /*Release 1.5 myDashboard myTelnotice-This-Week*/
        app.get('/personalDashboard/telnoticeThisWeek', function (req, res) {
            var query = "SELECT id, firstname, lastname, SUBSTRING(candidate.eR,2) as eR, telnotice, infos FROM candidate " +
                "WHERE sourcer = " + req.session.userid + " AND WEEK(telnotice) = WEEK(sysdate()) AND YEAR(telnotice) = YEAR(sysdate()) ORDER BY telnotice";

            db.query(query, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Telefonnotizen dieser Woche" + err);
                } else {
                    sendResponse(res, true, "", rows);
                }
            });

        });

        /* Release 1.6 Personal Overview Telnotice */
        app.post('/personalDashboard/telnoticeBySourcer', function (req, res) {
            var query = "SELECT WEEK(telnotice)+1 as weeknr, COUNT(telnotice) as count_telnotice " +
                "FROM candidate " +
                "WHERE sourcer = " + req.session.userid + " AND YEAR(telnotice) = " + req.body.yearToFilter + " " +
                "GROUP BY WEEK(telnotice) + 1";

            db.query(query, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Telefonnotizen-Jahresübersicht" + err);
                } else {
                    sendResponse(res, true, "", rows);
                }
            });

        });


    }
};