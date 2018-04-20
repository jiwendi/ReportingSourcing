﻿module.exports = {
    setup: function (app, db, session, toDate, sendResponse, getDateString) {

        /**
         * Ansprache
         */
        app.post('/stat/requestsByYear', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(candidate.id) as requestFromSource, sources.name FROM candidate " +
            "LEFT JOIN sources ON candidate.source_id = sources.id " +
            "WHERE year(candidate.research) = ? " +
                "GROUP BY candidate.source_id";
            var allRequestQuery = "SELECT COUNT(candidate.id) as requests FROM candidate " +
                "LEFT JOIN sources ON candidate.source_id = sources.id " +
                "WHERE year(candidate.research) = ? AND request = 1";
            var parameter = [req.body.yearToFilter];

                db.query(query, parameter, function (err, rows, fields) {
                    if (err) throw err;

                    db.query(allRequestQuery, parameter, function (allerr, allrows, allfields) {
                        if (allerr) throw allerr;

                        var result = {
                            requestsFromSource: rows,
                            allRequests: allrows[0]
                        };

                        sendResponse(res, true, "", result);

                    });

                });
            
        });

        app.post('/stat/myYear', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(c1.request) as request FROM candidate as c1 WHERE c1.sourcer = ? AND YEAR(c1.research) = ?";
            var telNoticeQuery = "SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = ? AND YEAR(c2.telnotice) = ?";
            var hireQuery = "SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.sourcer = ? AND YEAR(c2.hire) = ?"
            var parameter = [req.session.userid, req.body.yearToFilter];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, "Fehler beim Select (myYear) " + err);
                }

                db.query(telNoticeQuery, parameter, function (telErr, telRows, telFields) {
                    if (telErr) {
                        sendResponse(res, false, "Fehler beim Select (myYear) " + telErr);
                    }


                    db.query(hireQuery, parameter, function (hireErr, hireRows, hireFields) {
                        if (hireErr) {
                            sendResponse(res, false, "Fehler beim Select (myYear) " + hireErr);
                        }

                        var result = {
                            request: rows[0],
                            telNotice: telRows[0],
                            hires: hireRows[0]
                        };
                        sendResponse(res, true, "", result);
                    });
                   
                });

                
            });

        });

        app.post('/stat/myWeek', function (req, res) {
            var message = "";
            //altes Query - wurde aufgeteilt - kann gellscht werden
            //ToDo löschen!
            /*
            var query = "SELECT COUNT(c1.request) as request, " + 
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.telnotice != '0000-00-00') telnotice, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.hire != '0000-00-00') hires " + 
                "FROM candidate as c1 WHERE c1.sourcer = ? AND WEEK(research) = WEEK(sysdate())";
            */
            var requestQuery = "SELECT COUNT(c1.request) as request " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND WEEK(c1.research) = WEEK(sysdate())";
            var telnoticeQuery = "SELECT COUNT(c1.telnotice) as telnotice " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND c1.telnotice != '0000-00-00' AND WEEK(c1.telnotice) = WEEK(sysdate())";
            var hireQuery = "SELECT COUNT(c1.hire) as hire " +
                "FROM candidate as c1 WHERE c1.sourcer = ? AND c1.hire != '0000-00-00' AND WEEK(c1.hire) = WEEK(sysdate())";

            var parameter = [req.session.userid];

            db.query(requestQuery, parameter, function (reqErr, reqRows, reqFields) {
                if (reqErr) throw reqErr;

                db.query(telnoticeQuery, parameter, function (telErr, telRows, telFields) {
                    if (telErr) throw telErr;
                    
                    db.query(hireQuery, parameter, function (hireErr, hireRows, hireFields) {
                        if (hireErr) throw hireErr;

                        var result = {
                                request: reqRows[0],
                                telnotice: telRows[0],
                                hires: hireRows[0]
                            };

                        sendResponse(res, true, "", result);
                    });
                });
            });
        });

        //restestToHire
        app.post('/stat/reqToHire', function (req, res) {
            var message = "";

            var filter_from = getDateString(req.body.filterFrom);
            var filter_to = getDateString(req.body.filterTo);

            var query = "SELECT COUNT(c1.request) as request, " +
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.telnotice >= " + filter_from + " AND c2.telnotice <= " + filter_to +") telnotice, " +
                "(SELECT COUNT(c2.intern) as intern FROM candidate as c2 WHERE c2.intern >= " + filter_from + " AND c2.intern <= " + filter_to +") intern, " +
                " (SELECT COUNT(c2.extern) as extern FROM candidate as c2 WHERE c2.extern >= " + filter_from + " AND c2.extern <= " + filter_to +") extern, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.hire >= " + filter_from + " AND c2.hire <= " + filter_to + ") hires " +
                "FROM candidate as c1 WHERE c1.research >= " + filter_from + " AND c1.research <= " + filter_to +" AND request = 1";
           
            
            var parameter = [];
           
            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                sendResponse(res, true, "", rows[0]);
            });
        });

        app.post('/stat/reqToHireByPlattform', function (req, res) {
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

            if (filter_source != false) {
                query = "SELECT COUNT(c1.request) as request, " +
                    "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.telnotice >= " + filter_from + " AND c2.telnotice <= " + filter_to + ") telnotice, " +
                    "(SELECT COUNT(c2.intern) as intern FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.intern >= " + filter_from + " AND c2.intern <= " + filter_to + ") intern, " +
                    " (SELECT COUNT(c2.extern) as extern FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.extern >= " + filter_from + " AND c2.extern <= " + filter_to + ") extern, " +
                    "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.source_id = " + filter_source + " AND c2.hire >= " + filter_from + " AND c2.hire <= " + filter_to + ") hires " +
                    "FROM candidate as c1 WHERE c1.research >= " + filter_from + " AND c1.research <= " + filter_to + " AND request = 1 AND c1.source_id = ?";
            }
            
            var sourceQuery = "SELECT id, name FROM sources";
            var parameter = [req.body.source];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                db.query(sourceQuery, function (serr, srows, sfields) {
                    if (serr) throw serr;

                    var result = {
                        reqToHireByPlattform: rows[0],
                        sources: srows
                    };
                    sendResponse(res, true, "", result);
                });
            });
        });

        /*
        SELECT COUNT(candidate.id) AS anzahl, candidate.team_id, team.name 
        FROM candidate 
        JOIN team ON team.id = candidate.team_id 
        WHERE YEAR(candidate.hire) = 2018 GROUP BY candidate.team_id

        */
        app.post('/stat/hiresInTeams', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(candidate.id) AS anzahl, candidate.team_id, team.name " +
                "FROM candidate " +
                "JOIN team ON team.id = candidate.team_id " +
                "WHERE candidate.hire >= ? AND candidate.hire <= ? GROUP BY candidate.team_id";
            var countQuery = "SELECT COUNT(candidate.id) AS anzahl FROM candidate WHERE candidate.hire >= ? AND candidate.hire <= ?";
            var parameter = [req.body.filterFrom, req.body.filterTo];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                db.query(countQuery, parameter, function (countErr, countRows, countFields) {
                    if (countErr) throw countErr;

                    var result = {
                        hiresInTeams: rows,
                        countHires: countRows[0]
                    };

                sendResponse(res, true, "", result);

                });
            });
        });


        /*
        SELECT COUNT(c1.request) as requests, c1.source_id, sources.name,
                (SELECT COUNT(c2.response) as response FROM candidate as c2 WHERE c2.source_id = c1.source_id AND c2.response = 1) responses
                FROM candidate as c1
                JOIN sources ON c1.source_id = sources.id
                GROUP BY c1.source_id
        */
        app.post('/stat/responseRate', function (req, res) {
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
                if (err) throw err;

                db.query(allResponseRateQuery, function (allerr, allrows, allfields) {
                    if (allerr) throw allerr;

                    var result = {
                        responseRates: rows,
                        allResponseRate: allrows[0]
                    };

                    sendResponse(res, true, "", result);
                });
            });
        });

        app.post('/stat/telNotice', function (req, res) {
            var telNoticeQuery = "SELECT COUNT(c1.telnotice) as telnotice, WEEK(c1.telnotice)+1 as weeknr, users.firstname, c1.sourcer " +
                                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "WHERE c1.telnotice != '0000-00-00' AND YEAR(c1.telnotice) = ? " +
                                "GROUP BY WEEK(c1.telnotice), c1.sourcer";

            var researchQuery = "SELECT COUNT(c1.research) as request, WEEK(c1.research)+1 as weeknr, users.firstname, c1.sourcer " +
                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "GROUP BY WEEK(c1.research), c1.sourcer";

            var telNoticeSumQuery = "SELECT COUNT(c1.telnotice) as telnotice, WEEK(c1.telnotice)+1 as weeknr " +
                            "FROM candidate as c1 " +
                            "JOIN users ON c1.sourcer = users.id " +
                            "WHERE c1.telnotice != '0000-00-00' " +
                "GROUP BY WEEK(c1.telnotice)";

            var parameter = [req.body.yearToFilter];

            db.query(telNoticeQuery, parameter, function (telErr, telRows, telFields) {
                if (telErr) throw telErr;

                db.query(researchQuery, function (resErr, resRows, resFields) {
                    if (resErr) throw resErr;

                    db.query(telNoticeSumQuery, function (telSumErr, telSumRows, telSumFields) {
                        if (telSumErr) throw telSumErr;
                        
                        var result = {
                            telNotice: telRows,
                            reseaches: resRows,
                            telSum: telSumRows
                        };

                        sendResponse(res, true, "", result);

                    });
                });
            });
        });


        /*
        SELECT candidate.firstname, candidate.lastname, candidate.eR, candidate.source_text,
        CASE WHEN candidate.scoreboard = 0 THEN 'Nein' ELSE 'Ja' END as scoreboard,
        candidate.hire, sources.name as source, users.firstname as sourcerName, team.name
        FROM candidate
        JOIN sources ON candidate.source_id = sources.id
        JOIN users ON candidate.sourcer = users.id
        JOIN team ON candidate.team_id = team.id
        WHERE candidate.hire >= '2018-01-01' AND candidate.hire <= '2018-12-31'
        ORDER BY candidate.hire
        */
        app.post('/stat/hireList', function (req, res) {
            var query = "SELECT candidate.id, candidate.firstname, candidate.lastname, SUBSTRING(candidate.eR,2) as eR, " +
                "CASE WHEN candidate.scoreboard = 0 THEN 'Nein' ELSE 'Ja' END AS scoreboard, " +
                "candidate.hire, team.name " +
                "FROM candidate " +
                "JOIN team ON candidate.team_id = team.id " +
                "WHERE candidate.hire >= ? AND candidate.hire <= ? " +
                "ORDER BY candidate.hire";

            var eRquery = "SELECT candidate_eR.id, candidate_eR.firstname, candidate_eR.lastname, SUBSTRING(candidate_eR.eR,2) as eR, " +
                "CASE WHEN candidate_eR.scoreboard = 0 THEN 'Nein' ELSE 'Ja' END AS scoreboard, " +
                "candidate_eR.hire, team.name " +
                "FROM candidate_eR " +
                "JOIN team ON candidate_eR.team_id = team.id " +
                "WHERE candidate_eR.hire >= ? AND candidate_eR.hire <= ? " +
                "ORDER BY candidate_eR.hire";
           
            var countHiresQuery = "SELECT COUNT(candidate.id) AS anzahl " +
                "FROM candidate " +
                "WHERE candidate.hire >= ? AND candidate.hire <= ?";

            var counteRHiresQuery = "SELECT COUNT(candidate_eR.id) AS anzahl " +
                "FROM candidate_eR " +
                "WHERE candidate_eR.hire >= ? AND candidate_eR.hire <= ?";

                var parameter = [req.body.filterFrom, req.body.filterTo, req.body.scoreboard];
                var message = "";

                db.query(query, parameter, function (err, rows, fields) {
                    if (err)
                    {
                        sendResponse(res, false, err);
                        throw err;
                    } 

                    db.query(eRquery, parameter, function (eRerr, eRrows, eRfields) {
                        if (eRerr) {
                            sendResponse(res, false, eRerr);
                            throw eRerr;
                        } 

                    db.query(countHiresQuery, parameter, function (hireErr, hireRows, hireFields) {
                        if (hireErr) {
                            sendResponse(res, false, hireErr);
                            throw hireErr;
                        } 

                        db.query(counteRHiresQuery, parameter, function (hireeRErr, hireeRRows, hireeRFields) {
                            if (hireeRErr) {
                                sendResponse(res, false, hireeRErr);
                                throw hireeRErr;
                            } 

                        var result = {
                            candidates: rows,
                            eRcandidates: eRrows,
                            anzahl: hireRows[0],
                            anzahleR: hireeRRows[0]
                        };

                        sendResponse(res, true, "", result);
                        });
                    });
                    });
                    
                });


        });
        

    } //end setup-function
}; //end module.exports