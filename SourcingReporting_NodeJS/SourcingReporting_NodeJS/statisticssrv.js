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
            var query = "SELECT COUNT(c1.request) as request, " + 
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.telnotice != '0000-00-00') telnotice, " +
                "(SELECT COUNT(c2.hire) as hire FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.hire != '0000-00-00') hires " + 
                "FROM candidate as c1 WHERE c1.sourcer = ? AND WEEK(research) = WEEK(sysdate())";
            var parameter = [req.session.userid];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                sendResponse(res, true, "", rows[0]);
            });

        });

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

      
        

    } //end setup-function
}; //end module.exports