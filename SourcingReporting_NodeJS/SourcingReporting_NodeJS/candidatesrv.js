module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        /**
        * Candidates - Kandidatenübersicht
        */
        app.post('/candidates/get', function (req, res) {
            if (req.session.userid) {
                var regsuc = false;
                var message = "";
                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname," +
                    "CASE WHEN candidate.lastname IS NULL THEN '' ELSE candidate.lastname END AS lastname,"+
                    "sources.name as source, candidate.source_text, SUBSTRING(candidate.eR,2) as eR," +
                    "CASE WHEN candidate.intern = '0000-00-00' THEN '-' ELSE candidate.intern END AS intern," + 
                    "CASE WHEN candidate.extern = '0000-00-00' THEN '-' ELSE candidate.extern END AS extern," + 
                    "CASE WHEN candidate.hire = '0000-00-00' THEN '-' ELSE candidate.hire END AS hire, candidate.scoreboard, " + 
                    "CASE WHEN candidate.telnotice = '0000-00-00' THEN '-' ELSE candidate.telnotice END AS telnotice," + 
                    "CASE WHEN candidate.response_value = null THEN '-' ELSE CASE WHEN candidate.response_value = 1 THEN '+' ELSE '-' END END AS response_value," +
                    "CASE WHEN candidate.tracking = 1 THEN '+' ELSE '-' END AS tracking," + 
                    "CASE WHEN candidate.request = 1 THEN '+' ELSE '-' END AS request," +
                    "CASE WHEN candidate.response = 1 THEN '+' ELSE '-' END AS response," +
                    "candidate.infos, " +
                    "city_group.city, team.name as teamname, candidate.research, candidate.date, users.firstname as sourcerName, candidate.sourcer " +
                    "FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT JOIN team ON team.id = candidate.team_id " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    "LEFT JOIN users ON candidate.sourcer = users.id";
                var parameters = [];
                var showusercandidates = req.body.showusercandidates; //true= nur meine kandidate, false= alle
                
                if (showusercandidates) {
                    candidatequery = candidatequery + " WHERE candidate.sourcer=?";
                    parameters = [req.session.userid];
                }

                db.query(candidatequery, parameters, function (canderr, candresult, candfields) {
                    if (canderr) throw canderr;
                    

                    sendResponse(res, true, "", candresult);
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung! (Session.Userid)");
            }
        }); //end candidates/get

        app.post('/candidate/data', function (req, res) {
            if (req.session.userid) {
                var teamquery = "SELECT team.id, team.name, team.city_group, city_group.city FROM team " +
                                "LEFT JOIN city_group ON team.city_group = city_group.id " +
                                " WHERE team.active=1";
                var sourcequery = "SELECT id, name from sources where active=1";

                db.query(teamquery, function (teamerr, teamresults, teamfields) {
                    if (teamerr) throw teamerr;

                    db.query(sourcequery, function (sourceerr, sourceresults, sourcefields) {
                        if (sourceerr) throw sourceerr;

                        var result = {
                            teams: teamresults,
                            sources: sourceresults
                        };
                        sendResponse(res, true, "", result);

                    });//end sourcequery;
                }); //end teamquery

            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }


        });//end candidate/data

        //Neuen Kandidaten speichern
        app.post('/candidate/save', function (req, res) {
            if (req.session.userid) {
                var suc = false;

                if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vorname eingeben! - " + req.body.firstname;
                   // message = missingInput.firstname;
                } else if (req.body.source == null || req.body.source == "") {
                    message = "Bitte Quelle auswählen! - " + req.body.source;
                } else if (req.body.research == null || req.body.research == "") {
                    message = "Bitte Research-Datum eingeben! - " + req.body.research;
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "INSERT INTO candidate (firstname, lastname, source_id, source_text, eR, tracking, request, response, " +
                        "response_value, telnotice, intern, extern, hire, team_id, research, scoreboard, sourcer) " +
                        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    var parameters = [req.body.firstname, req.body.lastname, req.body.source, req.body.source_text, req.body.eR,
                        req.body.tracking, req.body.request, req.body.response, req.body.responseVal, req.body.telnotice, req.body.intern,
                        req.body.extern, req.body.hire, req.body.team, req.body.research, req.body.scoreboard, req.session.userid];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim speichern in der DB - Kandidat save - " + err.message;
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Kandidat wurde gespeichert!");
                           
                        }
                    });


                } else {
                    sendResponse(res, false, message);
                }

            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }


        });//end candidate/save

        /**
        * Candidate Time-Infos
        */
        app.get('/candidate/timeinfo', function (req, res) {
            if (req.session.userid) {
                var timequery = "SELECT AVG(ABS(DATEDIFF(research, telnotice))) AS timetocall, " +
                    "AVG(ABS(DATEDIFF(research, intern))) AS timetointerview, " +
                    "AVG(ABS(DATEDIFF(research, extern))) AS timetoextern, " +
                    "AVG(ABS(DATEDIFF(research, hire))) AS timetohire " +
                    "FROM candidate " +
                    "WHERE DATE(research) > (NOW() - INTERVAL 2 MONTH)";

                db.query(timequery, function (err, rows, fields) {
                    if (err) throw err;
                    var timeinfo = rows[0];
                    sendResponse(res, true, "", timeinfo);
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }

        });//end /candidate/timeinfo

        /*
         * Kandidat Infos anzeigen - candidateDetail
         */
        app.post('/candidate/info', function (req, res) {
            if (req.session.userid) {
                var parameter = [req.body.candidateid];
                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname," +
                    "CASE WHEN candidate.lastname IS NULL THEN '' ELSE candidate.lastname END AS lastname," +
                    "sources.name as source, candidate.source_id as source_id, candidate.source_text, candidate.eR," +
                    "CASE WHEN candidate.intern = '0000-00-00' THEN '-' ELSE candidate.intern END AS intern," +
                    "CASE WHEN candidate.extern = '0000-00-00' THEN '-' ELSE candidate.extern END AS extern," +
                    "CASE WHEN candidate.hire = '0000-00-00' THEN '-' ELSE candidate.hire END AS hire, candidate.infos, " +
                    "CASE WHEN candidate.telnotice = '0000-00-00' THEN '-' ELSE candidate.telnotice END AS telnotice," +
                    "CASE WHEN candidate.response_value = null THEN '-' ELSE candidate.response_value END AS response_value," +
                    "candidate.tracking, candidate.request, candidate.response, candidate.scoreboard," +
                    "ABS(DATEDIFF(candidate.research, candidate.telnotice)) AS timeToCall, ABS(DATEDIFF(candidate.research, candidate.intern)) AS timeToInterview, " +
                    "ABS(DATEDIFF(candidate.research, candidate.extern)) AS timeToExtern, ABS(DATEDIFF(candidate.research, candidate.hire)) AS timeToHire," +
                    "city_group.city, team.name as teamname, candidate.team_id as team_id, candidate.research, candidate.date, users.firstname as sourcerName, candidate.sourcer " +
                    "FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT JOIN team ON team.id = candidate.team_id " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    "LEFT JOIN users ON candidate.sourcer = users.id " +
                    "WHERE candidate.id = ?";
                
                var sourcequery = "SELECT id, name FROM sources WHERE active=1";
                var teamquery = "SELECT team.id, team.name, team.city_group, city_group.city FROM team " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    " WHERE team.active=1";
                var cityquery = "SELECT id, city FROM city_group";
                var userquery = "SELECT id, firstname, lastname FROM users WHERE active=1";
                
                    db.query(candidatequery, parameter, function (err, rows, fields) {
                        if (err) throw err;

                        if (rows.length == 0) {
                            sendResponse(res, false, "Kandidat nicht gefunden!");
                        } else {
                            db.query(sourcequery, function (sourceerr, sourcerows, sourcefields) {
                                if (sourceerr) throw sourceerr;

                                db.query(teamquery, function (teamerr, teamrows, teamfields) {
                                    if (teamerr) throw teamerr;

                                    db.query(cityquery, function (cityerr, cityrows, cityfields) {
                                        if (cityerr) throw cityerr;

                                        db.query(userquery, function (usererr, userrows, userfields) {
                                            if (usererr) throw usererr;
                                            
                                            var result = {
                                                candidate: rows[0],
                                                sources: sourcerows,
                                                teams: teamrows,
                                                citys: cityrows,
                                                sourcer: userrows
                                            };

                                            sendResponse(res, true, "", result); 
                                            
                                        });//end userquery
                                    });//end cityquery
                                });//end teamquery
                            });//end sourcequery  
                        }//end Kandidat gefunden
                    });//end db.query(candidatequery)
                
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        }); //end candidate/info


    } //end setup-function
}; //end module.exports