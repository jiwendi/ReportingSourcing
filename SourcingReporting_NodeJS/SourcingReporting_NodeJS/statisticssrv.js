module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        /**
         * Ansprache
         */
        
        app.post('/stat/rfe', function (req, res) {
            var message = "";
            var query = "SELECT COUNT(candidate.id) as requestFromSource, sources.name FROM candidate " +
            "LEFT JOIN sources ON candidate.source_id = sources.id " +
            "WHERE year(candidate.research) = 2018 " +
                "GROUP BY candidate.source_id";
            var allRequestQuery = "SELECT COUNT(candidate.id) as requests FROM candidate " +
                "LEFT JOIN sources ON candidate.source_id = sources.id " +
                "WHERE year(candidate.research) = 2018 ";

                db.query(query, function (err, rows, fields) {
                    if (err) throw err;

                    db.query(allRequestQuery, function (allerr, allrows, allfields) {
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
                "(SELECT COUNT(c2.telnotice) as telnotice FROM candidate as c2 WHERE c2.sourcer = c1.sourcer AND c2.telnotice != '0000-00-00') telnotice " +
                "FROM candidate as c1 WHERE c1.sourcer = ?";
            var parameter = [req.session.userid];

            db.query(query, parameter, function (err, rows, fields) {
                if (err) throw err;

                sendResponse(res, true, "", rows[0]);
            });

        });
        

    } //end setup-function
}; //end module.exports