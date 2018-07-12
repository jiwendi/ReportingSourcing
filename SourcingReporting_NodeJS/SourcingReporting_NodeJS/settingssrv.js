module.exports = {
    setup: function (app, db, session, toDate, sendResponse, getDateString) {

        app.post('/candidates/showCandidateToAnonymizeOverview', function (req, res) {
            if (req.session.userid) {
                var regsuc = false;
                var message = "";
                var researchBeforeDate = req.body.from_research;
                var daysSinceLastAction = req.body.lastActivity;

                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname, candidate.lastname, sources.name as source, " +
                    "candidate.source_text, SUBSTRING(candidate.eR, 2) as eR, candidate.hire, candidate.intern, candidate.extern, candidate.telnotice, " +
                    "candidate.research, users.firstname as sourcerName FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT OUTER JOIN users ON candidate.sourcer = users.id " +
                    "WHERE candidate.research <= '" + researchBeforeDate + "' AND " +
                    "(ABS(DATEDIFF(candidate.research, candidate.telnotice)) > " + daysSinceLastAction + " OR " +
                    "ABS(DATEDIFF(candidate.research, candidate.intern)) > " + daysSinceLastAction + " OR " +
                    "ABS(DATEDIFF(candidate.research, candidate.extern)) > " + daysSinceLastAction + " OR " +
                    "ABS(DATEDIFF(candidate.research, candidate.hire)) > " + daysSinceLastAction + ")";
                var countCandidateQuery = "SELECT COUNT(candidate.id) as countCandidate FROM candidate " +
                    "WHERE candidate.research <= '" + researchBeforeDate + "' AND " +
                    "(ABS(DATEDIFF(candidate.research, candidate.telnotice)) > " + daysSinceLastAction + " OR " +
                    "ABS(DATEDIFF(candidate.research, candidate.intern)) > " + daysSinceLastAction + " OR " +
                    "ABS(DATEDIFF(candidate.research, candidate.extern)) > " + daysSinceLastAction + " OR " +
                    "ABS(DATEDIFF(candidate.research, candidate.hire)) > " + daysSinceLastAction + ")";
                
                var parameter = [];
                var moreParameter = false;
                
                db.query(candidatequery, parameter, function (candErr, candResult, candFields) {
                    if (candErr) {
                        sendResponse(res, false, "Fehler beim Abfragen der Kandidaten aus der Datenbank! " + candErr);
                    }

                    db.query(countCandidateQuery, parameter, function (countErr, countResult, countFields) {
                        if (countErr) {
                            sendResponse(res, false, "Fehler beim Abfragen der Kandidatenanzahl aus der Datenbank! " + countErr);
                        }

                        var result = {
                            candidate: candResult,
                            countCandidate: countResult[0]
                        };
                        sendResponse(res, true, "", result);
                    });
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt! ");
            }
        });


    }
};