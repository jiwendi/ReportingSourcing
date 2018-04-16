module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {

        /**
        * Candidates - Kandidatenübersicht
        */
        app.post('/candidatesER/get', function (req, res) {
            if (req.session.userid) {
                var regsuc = false;
                var message = "";

                /**
                SELECT candidate_er.id, candidate_er.firstname, candidate_er.lastname, candidate_er.eR, team.name as teamname, candidate_er.scoreboard,
                candidate_er.hire
                FROM candidate_er
                LEFT JOIN team ON team.id = candidate_er.team_id
                 */
                var candidatequery = "SELECT candidate_er.id, candidate_er.firstname, candidate_er.lastname, SUBSTRING(candidate_er.eR,2) as eR, team.name as teamname, " +
                    "CASE WHEN candidate_er.scoreboard = 0 THEN 'Nein' ELSE 'Ja' END AS scoreboard, " +
                    "candidate_er.hire " +
                    "FROM candidate_er " +
                    "LEFT JOIN team ON team.id = candidate_er.team_id " +
                    "WHERE YEAR(candidate_eR.hire) = 2018";

                var countCandidateQuery = "SELECT COUNT(candidate_eR.id) as countCandidate FROM candidate_eR";

                var parameter = [];
                
                var showScoreboard = req.body.showScoreboard; //true = nur Scoreboard=1
                if (showScoreboard) {
                        candidatequery = candidatequery + " WHERE candidate_eR.scoreboard=1";
                        countCandidateQuery = countCandidateQuery + " WHERE scoreboard=1";
                }


                db.query(candidatequery, parameter, function (candErr, candResult, candFields) {
                    if (candErr) {
                        sendResponse(res, false, "Fehler beim Ausführen des Query (Kandidatenübersicht) - " + candErr);
                        throw candErr;
                    }

                    db.query(countCandidateQuery, parameter, function (countErr, countResult, countFields) {
                        if (countErr) {
                            sendResponse(res, false, "Fehler beim Ausführen des Query (Kandidatenübersicht - Count) - " + countErr);
                            throw countErr;
                        }

                        var result = {
                            candidate: candResult,
                            countCandidate: countResult[0]
                        };

                        sendResponse(res, true, "", result);
                    });
                    
                });
            } else {
                sendResponse(res, false, "Keine Berechtigung! (Session.Userid)");
            }
        }); //end candidates/get

        app.post('/candidateER/data', function (req, res) {
            if (req.session.userid) {
                var teamquery = "SELECT team.id, team.name, team.city_group, city_group.city FROM team " +
                                "LEFT JOIN city_group ON team.city_group = city_group.id " +
                                " WHERE team.active=1";
               

                db.query(teamquery, function (teamerr, teamresults, teamfields) {
                    if (teamerr) throw teamerr;

                  

                        var result = {
                            teams: teamresults
                           
                        };
                        sendResponse(res, true, "", result);

                    
                }); //end teamquery

            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }


        });//end candidate/data

        //Neuen Kandidaten speichern
        app.post('/candidateER/save', function (req, res) {
            if (req.session.userid) {
                var suc = false;

                if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vorname eingeben! - " + req.body.firstname;
                } else if (req.body.lastname == null || req.body.lastname == "") {
                    message = "Bitte Nachname eingeben! - " + req.body.lastname;
                } else if (req.body.eR == null || req.body.eR == "") {
                    message = "Bitte eR-Nummber eingeben! - " + req.body.eR;
                } else if (req.body.hire == null || req.body.hire == "") {
                    message = "Bitte Besetzungs-Datum eingeben! - " + req.body.hire;
                } else if (req.body.team == null || req.body.team == "") {
                    message = "Bitte Team auswählen! - " + req.body.team;
                } else{
                    suc = true;
                }

                if (suc) {
                    var query = "INSERT INTO candidate_eR (firstname, lastname, eR, hire, team_id, scoreboard) " +
                        "VALUES (?,?,?,?,?,?)";


                    var parameters = [req.body.firstname, req.body.lastname, req.body.eR, req.body.hire, req.body.team, req.body.scoreboard];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim speichern in der DB - eR-Kandidat save - " + err.message;
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "eR-Kandidat wurde gespeichert!");
                           
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
          * Candidate delete
          */
        app.post('/candidateER/delete', function (req, res) {
            if (req.session.userid && req.session.admin) {
                var message = "";
                var suc = false;

                if (req.body.id == null || req.body.id == "") {
                    message = "Keine Candidate-id übergeben!!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "DELETE FROM candidate_eR WHERE id = ?";
                    var parameters = [req.body.id];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler mit DB (delete candidate) " + err;
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "eR-Kandidat wurde gelöscht!");

                        }
                    });

                } else {
                    sendResponse(res, false, message);
                }

            } else {
                sendResponse(res, false, "Keine Berechtigung!");
            }

        });
        
        app.post('/candidateER/updateCandidate', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vornamen eingeben!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate_eR SET firstname = ?, lastname = ?, eR = ?, team_id = ?, hire = ?, scoreboard = ? WHERE id = ?",
                        [req.body.firstname, req.body.lastname, req.body.eR, req.body.team, new Date(req.body.hire), req.body.scoreboard, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Daten wurden gespeichert!");
                            }
                        });

                } else {
                    sendResponse(res, false, message);
                }

            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });












        /*
         * Kandidat Infos anzeigen - candidateDetail
         */
        app.post('/candidateER/info', function (req, res) {
            if (req.session.userid) {
                var parameter = [req.body.candidateid];

                var candidatequery = "SELECT candidate_er.id, candidate_er.firstname, candidate_er.lastname, candidate_er.eR, team.name as teamname, candidate_er.scoreboard, " +
                     "CASE WHEN candidate_er.hire = '0000-00-00' THEN null ELSE candidate_er.hire END AS hire " +
                    "FROM candidate_er " +
                    "LEFT JOIN team ON team.id = candidate_er.team_id " + 
                    "WHERE candidate_eR.id = ?";


             
                
               
                var teamquery = "SELECT team.id, team.name, team.city_group, city_group.city FROM team " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    " WHERE team.active=1";
                var cityquery = "SELECT id, city FROM city_group";
                
                    db.query(candidatequery, parameter, function (err, rows, fields) {
                        if (err) throw err;

                        if (rows.length == 0) {
                            sendResponse(res, false, "Kandidat nicht gefunden!");
                        } else {
                           

                                db.query(teamquery, function (teamerr, teamrows, teamfields) {
                                    if (teamerr) throw teamerr;

                                    db.query(cityquery, function (cityerr, cityrows, cityfields) {
                                        if (cityerr) throw cityerr;
                                        
                                            var result = {
                                                candidate: rows[0],
                                                teams: teamrows,
                                                citys: cityrows
                                            };
                                            sendResponse(res, true, "", result); 
                                    });//end cityquery
                                });//end teamquery
                        }//end Kandidat gefunden
                    });//end db.query(candidatequery)
                
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        }); //end candidate/info


    } //end setup-function
}; //end module.exports