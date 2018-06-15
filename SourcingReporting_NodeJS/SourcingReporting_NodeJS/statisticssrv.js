module.exports = {
    setup: function (app, db, session, toDate, sendResponse, getDateString) {

        app.post('/statistics/requestsByYear', function (req, res) {
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

        app.post('/statistics/myYear', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(c1.request) as request FROM candidate as c1 WHERE c1.sourcer = ? AND YEAR(c1.research) = ?";
            var telNoticeQuery = "SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = ? AND YEAR(c2.telnotice) = ?";
            var hireQuery = "SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.sourcer = ? AND YEAR(c2.hire) = ?"
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
                                    var result = {
                                        request: rows[0],
                                        telNotice: telRows[0],
                                        hires: hireRows[0]
                                    };
                                    sendResponse(res, true, "", result);
                                }
                            });
                        }
                    });
                }
            });
        });

        app.post('/statistics/myWeek', function (req, res) {
            var message = "";
            var parameter = [req.session.userid];
            var requestQuery = "SELECT COUNT(c1.request) as request " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND WEEK(c1.research) = WEEK(sysdate()) AND request=1";
            var notRequestedQuery = "SELECT COUNT(c1.request) as request " +
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

        app.post('/statistics/overallAnalysis', function (req, res) {
            var message = "";

            var filter_from = getDateString(req.body.filterFrom);
            var filter_to = getDateString(req.body.filterTo);

            var query = "SELECT COUNT(c1.request) as request, " +
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.telnotice >= " + filter_from + " AND c2.telnotice <= " + filter_to + ") telnotice, " +
                "(SELECT COUNT(c2.intern) as intern FROM candidate as c2 WHERE c2.intern >= " + filter_from + " AND c2.intern <= " + filter_to + ") intern, " +
                " (SELECT COUNT(c2.extern) as extern FROM candidate as c2 WHERE c2.extern >= " + filter_from + " AND c2.extern <= " + filter_to + ") extern, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.hire >= " + filter_from + " AND c2.hire <= " + filter_to + ") hires " +
                "FROM candidate as c1 WHERE c1.research >= " + filter_from + " AND c1.research <= " + filter_to + " AND request = 1";
            var parameter = [];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Daten für die Gesamtanalyse! " + err);
                } else {
                    sendResponse(res, true, "", rows[0]);
                }
            });
        });

        app.post('/statistics/overallAnalysisByPlattform', function (req, res) {
            var message = "";

            var filter_from = getDateString(req.body.filterFrom);
            var filter_to = getDateString(req.body.filterTo);
            var filter_source = req.body.source;

            var query = "SELECT COUNT(c1.request) as request, " +
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.telnotice >= " + filter_from + " AND c2.telnotice <= " + filter_to + ") telnotice, " +
                "(SELECT COUNT(c2.intern) as intern FROM candidate as c2 WHERE c2.intern >= " + filter_from + " AND c2.intern <= " + filter_to + ") intern, " +
                " (SELECT COUNT(c2.extern) as extern FROM candidate as c2 WHERE c2.extern >= " + filter_from + " AND c2.extern <= " + filter_to + ") extern, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.hire >= " + filter_from + " AND c2.hire <= " + filter_to + ") hires " +
                "FROM candidate as c1 WHERE c1.research >= " + filter_from + " AND c1.research <= " + filter_to + " AND request = 1";
            var sourceNameQuery = "SELECT name from sources WHERE id = " + req.body.source;
            if (filter_source != false) {
                query = "SELECT COUNT(c1.request) as request, " +
                    "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.telnotice >= " + filter_from + " AND c2.telnotice <= " + filter_to + ") telnotice, " +
                    "(SELECT COUNT(c2.intern) as intern FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.intern >= " + filter_from + " AND c2.intern <= " + filter_to + ") intern, " +
                    " (SELECT COUNT(c2.extern) as extern FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.extern >= " + filter_from + " AND c2.extern <= " + filter_to + ") extern, " +
                    "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.hire >= " + filter_from + " AND c2.hire <= " + filter_to + ") hires " +
                    "FROM candidate as c1 WHERE c1.research >= " + filter_from + " AND c1.research <= " + filter_to + " AND request = 1 AND c1.source_id = ?";
            }
            var sourceQuery = "SELECT id, name FROM sources ORDER BY name";
            var parameter = [req.body.source];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Daten! " + err);
                } else {
                    db.query(sourceQuery, function (serr, srows, sfields) {
                        if (serr) {
                            sendResponse(res, false, "Fehler beim Abfragen der Quellen! " + serr);
                        } else {
                            db.query(sourceNameQuery, function (snerr, snrows, snfields) {
                                if (snerr) {
                                    sendResponse(res, false, "Fehler beim Abfragen des QuellenNamens" + snerr);
                                } else {
                                    var result = {
                                        reqToHireByPlattform: rows[0],
                                        sources: srows,
                                        sourceName: snrows[0]
                                    };
                                    sendResponse(res, true, "", result);
                                }
                            });
                        }
                    });
                }
            });
        });

        app.post('/statistics/hiresByTeams', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(candidate.id) AS anzahl, candidate.team_id, team.name " +
                "FROM candidate " +
                "LEFT OUTER JOIN team ON team.id = candidate.team_id " +
                "WHERE candidate.hire >= ? AND candidate.hire <= ? GROUP BY candidate.team_id";
            var countQuery = "SELECT COUNT(candidate.id) AS anzahl FROM candidate WHERE candidate.hire >= ? AND candidate.hire <= ?";
            var parameter = [req.body.filterFrom, req.body.filterTo];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Besetzungsdaten aus der Datenbank! " + err);
                } else {
                    db.query(countQuery, parameter, function (countErr, countRows, countFields) {
                        if (countErr) {
                            sendResponse(res, false, "Fehler beim Abfragen der Besetzungsanzahl! " + countErr);
                        } else {
                            var result = {
                                hiresInTeams: rows,
                                countHires: countRows[0]
                            };
                            sendResponse(res, true, "", result);
                        }
                    });
                }
            });
        });

        app.post('/statistics/responseRate', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(c1.request) as requests, c1.source_id, sources.name, " +
                "(SELECT COUNT(c2.response) as response FROM candidate as c2 WHERE c2.source_id = c1.source_id AND c2.response = 1) responses " +
                "FROM candidate as c1 " +
                "JOIN sources ON c1.source_id = sources.id AND c1.research >= ? AND c1.research <= ?" +
                "GROUP BY c1.source_id ORDER BY COUNT(c1.request) desc";
            var allResponseRateQuery = "SELECT COUNT(c1.request) as requests, " +
                "(SELECT COUNT(c2.response) as response FROM candidate as c2 WHERE response = 1) responses " +
                "FROM candidate as c1 " +
                "JOIN sources ON c1.source_id = sources.id " +
                "WHERE DATE(research) > (NOW() - INTERVAL 12 MONTH)";
            var parameter = [req.body.filterFrom, req.body.filterTo];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Ansprache-Daten! " + err);
                } else {
                    db.query(allResponseRateQuery, function (allerr, allrows, allfields) {
                        if (allerr) {
                            sendResponse(res, false, "Fehler beim Abfragen der Response-Daten! " + allerr);
                        } else {
                            var result = {
                                responseRates: rows,
                                allResponseRate: allrows[0]
                            };
                            sendResponse(res, true, "", result);
                        }
                    });
                }
            });
        });

        app.post('/statistics/telNoticeOverview', function (req, res) {
            var telNoticeQuery = "SELECT COUNT(c1.telnotice) as telnotice, WEEK(c1.telnotice)+1 as weeknr, users.firstname, c1.sourcer " +
                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "WHERE c1.telnotice IS NOT NULL AND YEAR(c1.telnotice) = ? " +
                "GROUP BY WEEK(c1.telnotice), c1.sourcer ORDER BY users.firstname";
            var researchQuery = "SELECT COUNT(c1.research) as request, WEEK(c1.research)+1 as weeknr, users.firstname, c1.sourcer " +
                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "GROUP BY WEEK(c1.research), c1.sourcer";
            var telNoticeSumQuery = "SELECT COUNT(c1.telnotice) as telnotice, WEEK(c1.telnotice)+1 as weeknr " +
                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "WHERE c1.telnotice IS NOT NULL " +
                "GROUP BY WEEK(c1.telnotice)";
            var parameter = [req.body.yearToFilter];

            db.query(telNoticeQuery, parameter, function (telErr, telRows, telFields) {
                if (telErr) {
                    sendResponse(res, false, "Fehler beim Abfragen der TelefonNotiz-Daten aus der Datenbank! " + telErr);
                } else {
                    db.query(researchQuery, function (resErr, resRows, resFields) {
                        if (resErr) {
                            sendResponse(res, false, "Fehler beim Abfragen der Research-Daten aus der Datenbank!" + resErr);
                        } else {
                            db.query(telNoticeSumQuery, function (telSumErr, telSumRows, telSumFields) {
                                if (telSumErr) {
                                    sendResponse(res, false, "Fehler beim Abfragen der TelefonNotiz-Anzahl aus der Datenbank! " + telSumErr);
                                } else {
                                    var result = {
                                        telNotice: telRows,
                                        reseaches: resRows,
                                        telSum: telSumRows
                                    };
                                    sendResponse(res, true, "", result);
                                }
                            });
                        }
                    });
                }
            });
        });

        app.post('/statistics/hireList', function (req, res) {
            var query = "SELECT candidate.id, candidate.firstname, candidate.lastname, SUBSTRING(candidate.eR,2) as eR, " +
                "CASE WHEN candidate.scoreboard = 0 THEN 'Nein' ELSE 'Ja' END AS scoreboard, " +
                "candidate.hire, team.name " +
                "FROM candidate " +
                "LEFT OUTER JOIN team ON candidate.team_id = team.id " +
                "WHERE candidate.hire >= ? AND candidate.hire <= ? " +
                "ORDER BY candidate.hire desc";
            var eRquery = "SELECT candidate_eR.id, candidate_eR.firstname, candidate_eR.lastname, SUBSTRING(candidate_eR.eR,2) as eR, " +
                "CASE WHEN candidate_eR.scoreboard = 0 THEN 'Nein' ELSE 'Ja' END AS scoreboard, " +
                "candidate_eR.hire, team.name " +
                "FROM candidate_eR " +
                "LEFT OUTER JOIN team ON candidate_eR.team_id = team.id " +
                "WHERE candidate_eR.hire >= ? AND candidate_eR.hire <= ? " +
                "ORDER BY candidate_eR.hire desc";
            var countHiresQuery = "SELECT COUNT(candidate.id) AS anzahl " +
                "FROM candidate " +
                "WHERE candidate.hire >= ? AND candidate.hire <= ?";
            var counteRHiresQuery = "SELECT COUNT(candidate_eR.id) AS anzahl " +
                "FROM candidate_eR " +
                "WHERE candidate_eR.hire >= ? AND candidate_eR.hire <= ?";

            var parameter = [req.body.filterFrom, req.body.filterTo, req.body.scoreboard];
            var message = "";

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der besetzten Kandidaten! " + err);
                } else {
                    db.query(eRquery, parameter, function (eRerr, eRrows, eRfields) {
                        if (eRerr) {
                            sendResponse(res, false, "Fehler beim Abfragen der besetzten eR-Kandidaten! " + eRerr);
                        } else {
                            db.query(countHiresQuery, parameter, function (hireErr, hireRows, hireFields) {
                                if (hireErr) {
                                    sendResponse(res, false, "Fehler beim Abfragen der Anzahl der besetzten Kandidaten! " + hireErr);

                                } else {
                                    db.query(counteRHiresQuery, parameter, function (hireeRErr, hireeRRows, hireeRFields) {
                                        if (hireeRErr) {
                                            sendResponse(res, false, "Fehler beim Abfragen der Anzahl der besetzten eR-Kandidaten!" + hireeRErr);
                                        } else {
                                            var result = {
                                                candidates: rows,
                                                eRcandidates: eRrows,
                                                anzahl: hireRows[0],
                                                anzahleR: hireeRRows[0]
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

        app.post('/statistics/weeklyNumbers', function (req, res) {
            var queryRequest = "SELECT WEEK(research)+1 as KW, COUNT(id) as counts FROM candidate WHERE request = 1 AND YEAR(research) = ? GROUP BY WEEK(research)";
            var queryTelNotice = "SELECT WEEK(telnotice)+1 as KW, COUNT(id) as counts FROM candidate WHERE telnotice IS NOT NULL AND YEAR(telnotice) = ? GROUP BY WEEK(telnotice)";
            var parameter = [req.body.yearToFilter];
            var message = "";

            db.query(queryRequest, parameter, function (errReq, rowsReq, fieldsReq) {
                if (errReq) {
                    sendResponse(res, false, "Fehler beim Abfragen der Ansprache-Daten! " + errReq);
                } else {
                    db.query(queryTelNotice, parameter, function (errTN, rowsTN, fieldsTN) {
                        if (errTN) {
                            sendResponse(res, false, "Fehler beim Abfragen der TelefonNotiz-Daten! " + errTN);
                        } else {
                            var result = {
                                requestsByKW: rowsReq,
                                telnoticeByKW: rowsTN
                            };
                            sendResponse(res, true, "", result);
                        }
                    });
                }
            });
        });

        //Release 1.4 Statistik Response Positiv/Negativ
        app.post('/statistics/responseValues', function (req, res) {
            var query = "SELECT COUNT(*) as response_gesamt, " +
                "(SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE response = 1 AND response_value = 1 AND YEAR(research) >= ? AND YEAR(research) <= ?) as positiveResponse, " +
                "(SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE response = 1 AND response_value = 0 AND YEAR(research) >= ? AND YEAR(research) <= ?) as negativeResponse, " +
                "(SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE request = 1 AND YEAR(research) >= ? AND YEAR(research) <= ?) as ansprachen " +
                "FROM epunkt_Sourcing.candidate " +
                "WHERE response = 1 and research >= ? AND research <= ? LIMIT 1";

            var yearToFilter = req.body.yearToFilter; // Variable löschen und Jahr aus filterFrom/filterTo herausnehmen
            //YearFrom, YearTo, YearFrom, YearTo, YearFrom, YearTo, From, To
            var parameter = [yearToFilter, yearToFilter, yearToFilter, yearToFilter, yearToFilter, yearToFilter, req.body.filterFrom, req.body.filterTo];
            var message = "";

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Response-Werte! " + err);
                } else {
                    sendResponse(res, true, "", rows[0]);
                }
            });
        });

        /* Release 1.4 Statistik Pie-Chart Time-To Telefonnotiz*/
        app.post('/statistics/timeToTelNoticeScattering', function (req, res) {
            var query = " SELECT (SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL) as totalTelNotice, (SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) = 0 ) as iszero, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) >= 1 AND ABS(DATEDIFF(research, telnotice)) <= 2) as oneortwo, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) >= 3 AND ABS(DATEDIFF(research, telnotice)) <= 6) as threetosix, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) >= 7 AND ABS(DATEDIFF(research, telnotice)) <= 9) as seventonine, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) >= 10 AND ABS(DATEDIFF(research, telnotice)) <= 13) as f10t13, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) >= 14 AND ABS(DATEDIFF(research, telnotice)) <= 17) as f14t17, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) >= 18 AND ABS(DATEDIFF(research, telnotice)) <= 25) as f18t25, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) > 25 AND ABS(DATEDIFF(research, telnotice)) <= 50) as f25t50, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) > 50 AND ABS(DATEDIFF(research, telnotice)) <= 100) as f50t100, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE telnotice IS NOT NULL AND ABS(DATEDIFF(research, telnotice)) > 100) as up100 " +
                "FROM epunkt_sourcing.candidate LIMIT 1";

            db.query(query, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Time-To-TelNotize Daten! " + err);
                } else {
                    sendResponse(res, true, "", rows[0]);
                }
            });
        });

        /* Release 1.4 Statistik Pie-Chart Time-To-Intern*/
        app.post('/statistics/timeToInternScattering', function (req, res) {
            var query = "SELECT (SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL) as totalIntern, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) >= 0 AND ABS(DATEDIFF(research, intern)) <= 7) as f0t7, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) >= 8 AND ABS(DATEDIFF(research, intern)) <= 14) as f8t14, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) >= 15 AND ABS(DATEDIFF(research, intern)) <= 21) as f15t21, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) >= 22 AND ABS(DATEDIFF(research, intern)) <= 30) as f22t30, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) > 30 AND ABS(DATEDIFF(research, intern)) <= 60) as f30t60, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) > 60 AND ABS(DATEDIFF(research, intern)) <= 90) as f60t90, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) > 90 AND ABS(DATEDIFF(research, intern)) <= 120) as f90t120, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE intern IS NOT NULL AND ABS(DATEDIFF(research, intern)) > 120) as up120 " +
                "FROM epunkt_sourcing.candidate LIMIT 1";

            db.query(query, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Time-To-Interview Daten! " + err);
                } else {
                    sendResponse(res, true, "", rows[0]);
                }
            });
        });

        /* Release 1.4 Statistik Pie-Chart Time-To-Extern*/
        app.post('/statistics/timeToExternScattering', function (req, res) {
            var query = " SELECT (SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE extern IS NOT NULL) as totalExtern, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE extern IS NOT NULL AND ABS(DATEDIFF(research, extern)) >= 0 AND ABS(DATEDIFF(research, extern)) <= 30) as Monat1, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE extern IS NOT NULL AND ABS(DATEDIFF(research, extern)) > 30 AND ABS(DATEDIFF(research, extern)) <= 60) as Monat2, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE extern IS NOT NULL AND ABS(DATEDIFF(research, extern)) > 60 AND ABS(DATEDIFF(research, extern)) <= 90) as Monat3, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE extern IS NOT NULL AND ABS(DATEDIFF(research, extern)) > 90 AND ABS(DATEDIFF(research, extern)) <= 120) as Monat4, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE extern IS NOT NULL AND ABS(DATEDIFF(research, extern)) > 120) as upMonat4 " +
                "FROM epunkt_sourcing.candidate LIMIT 1";

            db.query(query, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Time-To-Extern Daten! " + err);
                } else {
                    sendResponse(res, true, "", rows[0]);
                }
            });
        });

        /* Release 1.4 Statistik Pie-Chart Time-To-Hire*/
        app.post('/statistics/timeToHireScattering', function (req, res) {
            var query = " SELECT (SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL) as totalHire, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL AND ABS(DATEDIFF(research, hire)) >= 0 AND ABS(DATEDIFF(research, hire)) <= 30) as Monat1, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL AND ABS(DATEDIFF(research, hire)) > 30 AND ABS(DATEDIFF(research, hire)) <= 60) as Monat2, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL AND ABS(DATEDIFF(research, hire)) > 60 AND ABS(DATEDIFF(research, hire)) <= 90) as Monat3, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL AND ABS(DATEDIFF(research, hire)) > 90 AND ABS(DATEDIFF(research, hire)) <= 120) as Monat4, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL AND ABS(DATEDIFF(research, hire)) > 120 AND ABS(DATEDIFF(research, hire)) <= 150) as Monat5, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL AND ABS(DATEDIFF(research, hire)) > 150 AND ABS(DATEDIFF(research, hire)) <= 180) as Monat6, " +
                "(SELECT COUNT(id) FROM epunkt_sourcing.candidate WHERE hire IS NOT NULL AND ABS(DATEDIFF(research, hire)) > 180) as upMonat6 " +
                "FROM epunkt_sourcing.candidate LIMIT 1";

            db.query(query, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Abfragen der Time-To-Besetzung Daten! " + err);
                } else {
                    sendResponse(res, true, "", rows[0]);
                }
            });
        });
    }
}; 