module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        /**
         * Ansprache
         */
        app.post('/stat/rfe', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(candidate.id) as requestFromSource, sources.name FROM candidate " +
            "LEFT JOIN sources ON candidate.source_id = sources.id " +
            "WHERE year(candidate.research) = ? " +
                "GROUP BY candidate.source_id";
            var allRequestQuery = "SELECT COUNT(candidate.id) as requests FROM candidate " +
                "LEFT JOIN sources ON candidate.source_id = sources.id " +
                "WHERE year(candidate.research) = ? ";
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
            var query = "SELECT COUNT(c1.request) as request, " +
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.telnotice != '0000-00-00') telnotice, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.hire != '0000-00-00') hires " + 
                "FROM candidate as c1 WHERE c1.sourcer = ? AND YEAR(c1.research) = ?";
            var parameter = [req.session.userid, req.body.yearToFilter];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                sendResponse(res, true, "", rows[0]);
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
        app.post('/stat/allData', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(c1.request) as request, " +
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.telnotice != '0000-00-00') telnotice, " +
                "(SELECT COUNT(c2.intern) as intern FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.intern != '0000-00-00') intern, " +
                "(SELECT COUNT(c2.extern) as extern FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.extern != '0000-00-00') extern, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.hire != '0000-00-00') hires " +
                "FROM candidate as c1 WHERE c1.research >= ? AND c1.research <= ?";
            var parameter = [req.body.filterFrom, req.body.filterTo];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                sendResponse(res, true, "", rows[0]);
            });
        });

        app.post('/stat/allDataPlattform', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(c1.request) as request, " +
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.telnotice != '0000-00-00') telnotice, " +
                "(SELECT COUNT(c2.intern) as intern FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.intern != '0000-00-00') intern, " +
                "(SELECT COUNT(c2.extern) as extern FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.extern != '0000-00-00') extern, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.hire != '0000-00-00') hires " +
                "FROM candidate as c1 WHERE c1.research >= ? AND c1.research <= ? AND c1.source_id = ?";
            var sourceQuery = "SELECT id, name FROM sources";
            var parameter = [req.body.filterFrom, req.body.filterTo, req.body.source];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                db.query(sourceQuery, function (serr, srows, sfields) {
                    if (serr) throw serr;

                    var result = {
                        allData: rows[0],
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
            var parameter = [req.body.filterFrom, req.body.filterTo];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                sendResponse(res, true, "", rows);
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
                "JOIN sources ON c1.source_id = sources.id " +
                "GROUP BY c1.source_id";

            var allResponseRateQuery = "SELECT COUNT(c1.request) as requests, " +
                "(SELECT COUNT(c2.response) as response FROM candidate as c2 WHERE response = 1) responses " +
                "FROM candidate as c1 " +
                "JOIN sources ON c1.source_id = sources.id";

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
                "WHERE c1.telnotice != '0000-00-00' " +
                                "GROUP BY WEEK(c1.telnotice), c1.sourcer";

            var researchQuery = "SELECT COUNT(c1.research) as request, WEEK(c1.research)+1 as weeknr, users.firstname, c1.sourcer " +
                "FROM candidate as c1 " +
                "JOIN users ON c1.sourcer = users.id " +
                "GROUP BY WEEK(c1.research), c1.sourcer";

            db.query(telNoticeQuery, function (telErr, telRows, telFields) {
                if (telErr) throw telErr;

                db.query(researchQuery, function (resErr, resRows, resFields) {
                    if (resErr) throw resErr;

                    var result = {
                        telNotice: telRows,
                        reseaches: resRows
                    };

                    sendResponse(res, true, "", result);

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
            var query = "SELECT candidate.id, candidate.firstname, candidate.lastname, SUBSTRING(candidate.eR,2) as eR, candidate.source_text, " +
                "CASE WHEN candidate.scoreboard = 0 THEN 'Nein' ELSE 'Ja' END AS scoreboard, " +
                "candidate.hire, sources.name as source, users.firstname as sourcerName, team.name " +
                "FROM candidate " +
                "JOIN sources ON candidate.source_id = sources.id " +
                "JOIN users ON candidate.sourcer = users.id " +
                "JOIN team ON candidate.team_id = team.id " +
                "WHERE candidate.hire >= ? AND candidate.hire <= ? " +
                "ORDER BY candidate.hire";

            var countHiresQuery = "SELECT COUNT(candidate.id) AS anzahl " +
                "FROM candidate " +
                "WHERE candidate.hire >= '2018-01-01' AND candidate.hire <= '2018-12-31'";

                var parameter = [req.body.filterFrom, req.body.filterTo];
                var message = "";

                db.query(query, parameter, function (err, rows, fields) {
                    if (err)
                    {
                        sendResponse(res, false, err);
                        throw err;
                    } 

                    db.query(countHiresQuery, parameter, function (hireErr, hireRows, hireFields) {
                        if (hireErr) {
                            sendResponse(res, false, hireErr);
                            throw hireErr;
                        } 

                        var result = {
                            candidates: rows,
                            anzahl: hireRows[0]
                        };

                        sendResponse(res, true, "", result);
                    });

                    
                });


        });
        

    } //end setup-function
}; //end module.exports