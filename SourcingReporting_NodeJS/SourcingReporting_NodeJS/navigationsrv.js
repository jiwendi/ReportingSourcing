module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        app.get('/navbar/showWigInHeader', function (req, res) {
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
        app.get('/navbar/weeklyNumbersInHeader', function (req, res) {
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
        
        /* Release 1.7 Show WeeklyNumbers By Sourcer */
        app.get('/navbar/weeklyNumbersBySourcer', function (req, res) {
            var telNoticeQuery = "SELECT COUNT(c1.telnotice) as telnotice, WEEK(c1.telnotice)+1 as weeknr, users.firstname, c1.sourcer " +
                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "WHERE c1.telnotice IS NOT NULL AND YEAR(c1.telnotice) = YEAR(sysdate()) AND WEEK(c1.telnotice) = WEEK(sysdate()) " +
                "GROUP BY WEEK(c1.telnotice), c1.sourcer ORDER BY users.firstname";
            var requestQuery = "SELECT COUNT(c1.research) as ansprache, WEEK(c1.research)+1 as weeknr, users.firstname, c1.sourcer " +
                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "WHERE YEAR(c1.research) = YEAR(sysdate()) AND WEEK(c1.research) = WEEK(sysdate()) " +
                "GROUP BY WEEK(c1.research), c1.sourcer ORDER BY users.firstname";

            db.query(telNoticeQuery, function (errTN, rowsTN, fieldsTN) {
                if (errTN) {
                    sendResponse(res, false, "Fehler beim Abfragen der Telefonnotizen dieser Woche! " + errTN);
                } else {
                    db.query(requestQuery, function (errReq, rowsReq, fieldsReq) {
                        if (errReq) {
                            sendResponse(res, false, "Fehler beim Abfragen der Ansprachen dieser Woche! " + errReq);
                        } else {
                            var result = {
                                telNotice: rowsTN,
                                requests: rowsReq
                            };
                            sendResponse(res, true, "", result);
                        }
                    });
                }
            });
        });

        app.get('/sidebar/showTimeInfosInSideBar', function (req, res) {
            if (req.session.userid) {
                var timequery = "SELECT AVG(ABS(DATEDIFF(research, telnotice))) AS timetocall, " +
                    "AVG(ABS(DATEDIFF(research, intern))) AS timetointerview, " +
                    "AVG(ABS(DATEDIFF(research, extern))) AS timetoextern, " +
                    "AVG(ABS(DATEDIFF(research, hire))) AS timetohire " +
                    "FROM candidate " +
                    "WHERE DATE(research) > (NOW() - INTERVAL 6 MONTH)";

                db.query(timequery, function (err, rows, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen der Time-Infos für die Sidebar! " + err);
                    } else {
                        var timeinfo = rows[0];
                        sendResponse(res, true, "", timeinfo);
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

        app.post('/navbar/searchCandidate', function (req, res) {
            var searchString = req.body.searchString;
            var query = "SELECT id, firstname, lastname FROM candidate WHERE eR like '%" + searchString + "%' OR source_text like '%" + searchString + "%' OR CONCAT(firstname,' ',lastname) LIKE '%" + searchString + "%'";
            if (req.session.userid) {
                db.query(query, function (err, rows, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen des LiveSearch-Anfrage! " + err);
                    } else {
                        var data = "";
                        for (var i = 0; i < rows.length; i++) {
                            data = data + '<a href="#!candidatedetail/' + rows[i].id + '">' + rows[i].firstname + ' ' + rows[i].lastname + '</a><br />';
                        }
                        sendResponse(res, true, "", data);
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });


    }
};