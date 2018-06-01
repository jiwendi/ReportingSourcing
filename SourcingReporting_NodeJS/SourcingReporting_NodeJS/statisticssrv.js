module.exports = {
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


        /*
        SELECT WEEK(research)+1 as KW, COUNT(id)
        FROM candidate
        WHERE request = 1 AND YEAR(research) = ?
        GROUP BY WEEK(research)
        */
        app.post('/stat/weeklyNumbers', function (req, res) {
            var queryRequest = "SELECT WEEK(research)+1 as KW, COUNT(id) as counts FROM candidate WHERE request = 1 AND YEAR(research) = ? GROUP BY WEEK(research)";
            var queryTelNotice = "SELECT WEEK(telnotice)+1 as KW, COUNT(id) as counts FROM candidate WHERE telnotice != '0000-00-00' AND YEAR(telnotice) = ? GROUP BY WEEK(telnotice)";
            var parameter = [req.body.yearToFilter];
            var message = "";

            db.query(queryRequest, parameter, function (errReq, rowsReq, fieldsReq) {
                if (errReq) {
                    sendResponse(res, false, errReq);
                    throw errReq;
                }

                db.query(queryTelNotice, parameter, function (errTN, rowsTN, fieldsTN) {
                    if (errTN) {
                        sendResponse(res, false, errTN);
                        throw errTN;
                    }

                    var result = {
                        requestsByKW: rowsReq,
                        telnoticeByKW: rowsTN
                    };

                    sendResponse(res, true, "", result);

                });
               

            });
        });

        //ToDO: Release 1.4 Statistik Response Positiv/Negativ
        /*
        SELECT COUNT(*) as response_gesamt,
        (SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE response = 1 AND response_value = 1 AND YEAR(research)=2018) as positiveResponse,
        (SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE response = 1 AND response_value = 0 AND YEAR(research)=2018) as negativeResponse,
        (SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE request = 1 AND YEAR(research)=2018) as ansprachen
        FROM epunkt_Sourcing.candidate
        WHERE response = 1 and research >= '2018-01-01' AND research <= '2018-12-31'
        */
        
        app.post('/stat/responseValues', function (req, res) {
            var query = "SELECT COUNT(*) as response_gesamt, " +
                "(SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE response = 1 AND response_value = 1 AND YEAR(research) = ?) as positiveResponse, " +
                "(SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE response = 1 AND response_value = 0 AND YEAR(research) = ?) as negativeResponse, " +
                "(SELECT COUNT(*) FROM epunkt_Sourcing.candidate WHERE request = 1 AND YEAR(research)=?) as ansprachen " +
                "FROM epunkt_Sourcing.candidate " +
                "WHERE response = 1 and research >= ? AND research <= ? LIMIT 1";

            var yearToFilter = req.body.yearToFilter; // Variable löschen und Jahr aus filterFrom/filterTo herausnehmen

            var parameter = [yearToFilter, yearToFilter, yearToFilter, req.body.filterFrom, req.body.filterTo];
            var message = "";

            db.query(query, parameter, function (err, rows, fields) {
                if (err) {
                    sendResponse(res, false, err);
                    throw err;
                }
                
                sendResponse(res, true, "", rows[0]);

            });
        });

        /* toDo Release 1.4 Statistik Pie Time-To Telefonnotiz*/
        /*


 SELECT (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00') as totalTelNotice,
		(SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) = 0 ) as iszero,
   (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) >= 1
        AND ABS(DATEDIFF(research, telnotice)) <=2) as oneortwo,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) >= 3
        AND ABS(DATEDIFF(research, telnotice)) <=6) as threetosix,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) >= 7
        AND ABS(DATEDIFF(research, telnotice)) <=9) as seventonine,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) >= 10
        AND ABS(DATEDIFF(research, telnotice)) <=13) as f10t13,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) >= 14
        AND ABS(DATEDIFF(research, telnotice)) <=17) as f14t17,
         (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) >= 18
        AND ABS(DATEDIFF(research, telnotice)) <=25) as f18t25,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) > 25
        AND ABS(DATEDIFF(research, telnotice)) <=50) as f25t50,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) > 50
        AND ABS(DATEDIFF(research, telnotice)) <=100) as f50t100,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE telnotice != '0000-00-00'
        AND ABS(DATEDIFF(research, telnotice)) > 100) as up100
FROM epunkt_sourcing.candidate
LIMIT 1

        */



        /*ToDo Release 1.4 Time-To-Intern*/

        /*

 SELECT (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00') as totalIntern,
   (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) >= 0
        AND ABS(DATEDIFF(research, intern)) <=7) as f0t7,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) >= 8
        AND ABS(DATEDIFF(research, intern)) <=14) as f8t14,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) >= 15
        AND ABS(DATEDIFF(research, intern)) <=21) as f15t21,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) >= 22
        AND ABS(DATEDIFF(research, intern)) <=30) as f22t30,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) > 30
        AND ABS(DATEDIFF(research, intern)) <=60) as f30t60,
         (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) > 60
        AND ABS(DATEDIFF(research, intern)) <=90) as f60t90,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) > 90
        AND ABS(DATEDIFF(research, intern)) <=120) as f90t120,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE intern != '0000-00-00'
        AND ABS(DATEDIFF(research, intern)) > 120) as up120
FROM epunkt_sourcing.candidate
LIMIT 1


        */


        /*ToDo Release 1.4 Time-To-Extern*/

        /*

 SELECT (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE extern != '0000-00-00') as totalExtern,
   (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE extern != '0000-00-00'
        AND ABS(DATEDIFF(research, extern)) >= 0
        AND ABS(DATEDIFF(research, extern)) <=30) as Monat1,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE extern != '0000-00-00'
        AND ABS(DATEDIFF(research, extern)) > 30
        AND ABS(DATEDIFF(research, extern)) <=60) as Monat2,
         (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE extern != '0000-00-00'
        AND ABS(DATEDIFF(research, extern)) > 60
        AND ABS(DATEDIFF(research, extern)) <=90) as Monat3,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE extern != '0000-00-00'
        AND ABS(DATEDIFF(research, extern)) > 90
        AND ABS(DATEDIFF(research, extern)) <=120) as Monat4,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE extern != '0000-00-00'
        AND ABS(DATEDIFF(research, extern)) > 120) as upMonat4
FROM epunkt_sourcing.candidate
LIMIT 1


        */

        /*ToDo Release 1.4 Time To Hire*/
        /*

 SELECT (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00') as totalHire,
   (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00'
        AND ABS(DATEDIFF(research, hire)) >= 0
        AND ABS(DATEDIFF(research, hire)) <=30) as Monat1,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00'
        AND ABS(DATEDIFF(research, hire)) > 30
        AND ABS(DATEDIFF(research, hire)) <=60) as Monat2,
         (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00'
        AND ABS(DATEDIFF(research, hire)) > 60
        AND ABS(DATEDIFF(research, hire)) <=90) as Monat3,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00'
        AND ABS(DATEDIFF(research, hire)) > 90
        AND ABS(DATEDIFF(research, hire)) <=120) as Monat4,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00'
        AND ABS(DATEDIFF(research, hire)) > 120
        AND ABS(DATEDIFF(research, hire)) <=150) as Monat5,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00'
        AND ABS(DATEDIFF(research, hire)) > 150
        AND ABS(DATEDIFF(research, hire)) <=180) as Monat6,
        (SELECT COUNT(id)
		FROM epunkt_sourcing.candidate
		WHERE hire != '0000-00-00'
        AND ABS(DATEDIFF(research, hire)) > 180) as upMonat6
FROM epunkt_sourcing.candidate
LIMIT 1

        */


    } //end setup-function
}; //end module.exports