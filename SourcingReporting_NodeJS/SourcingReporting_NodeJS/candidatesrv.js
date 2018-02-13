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
                    "CASE WHEN candidate.telnotice = '0000-00-00' THEN '-' ELSE candidate.telnotice END AS telnotice," + 
                    "CASE WHEN candidate.response_value = NULL THEN 'none' ELSE CASE WHEN candidate.response_value = 1 THEN 'pos.' ELSE CASE WHEN candidate.response_value = 0 THEN 'neg.' ELSE ' ' END END END AS response_value," +
                    "CASE WHEN candidate.tracking = 1 THEN 'ja' ELSE 'nein' END AS tracking," + 
                    "CASE WHEN candidate.response = 1 THEN 'ja |' ELSE 'nein' END AS response," +
                    "candidate.research, users.firstname as sourcerName, candidate.sourcer " +
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
                        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?)";
                    var parameters = [req.body.firstname, req.body.lastname, req.body.source, req.body.source_text, req.body.eR,
                        req.body.tracking, req.body.request, req.body.response, req.body.responseVal, req.body.telnotice, req.body.intern,
                        req.body.extern, req.body.hire, req.body.team, req.body.research, req.session.userid];

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

        app.post('/candidate/updateCandidate', function (req, res) {
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
                    db.query("UPDATE candidate SET firstname = ?, lastname = ?, source_text = ?, eR = ?, infos = ? WHERE id = ?",
                        [req.body.firstname, req.body.lastname, req.body.source_text, req.body.eR, req.body.infos, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate!";
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

        app.post('/candidate/updateSource', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else if (req.body.source == null || req.body.source == "") {
                    message = "Bitte Quelle auswählen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET source_id = ? WHERE id = ?",
                        [req.body.source, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Source)!";
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

        app.post('/candidate/updateTeam', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else if (req.body.team == null || req.body.team == "") {
                    message = "Bitte Team auswählen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET team_id = ? WHERE id = ?",
                        [req.body.team, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Team)!";
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

        app.post('/candidate/updateResearch', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET research = ? WHERE id = ?",
                        [req.body.research, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Research)!";
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

        app.post('/candidate/updateTelnotice', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET telnotice = ? WHERE id = ?",
                        [req.body.telnotice, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (TelNotice)!";
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

        app.post('/candidate/updateIntern', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET intern = ? WHERE id = ?",
                        [req.body.intern, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Intern)!";
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

        app.post('/candidate/updateExtern', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET extern = ? WHERE id = ?",
                        [req.body.extern, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Extern)!";
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

        app.post('/candidate/updateHire', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET hire = ? WHERE id = ?",
                        [req.body.hire, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Hire)!";
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

        app.post('/candidate/updateScoreboard', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET scoreboard = ? WHERE id = ?",
                        [req.body.scoreboard, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Scoreboard)!";
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

        app.post('/candidate/updateSourcer', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET sourcer = ? WHERE id = ?",
                        [req.body.sourcer_id, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate (Sourcer)!" + err;
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

        /**
         * Candidate Detail Update 
         */
        app.post('/candidate/update', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";
                var parameters = [];

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vornamen eingeben!";
                } else if (req.body.lastname == null || req.body.lastname == "") {
                    message = "Bitte Lastname eingeben!";
                } else {
                    suc = true;
                }

                if (suc) {
                    db.query("UPDATE candidate SET firstname = ?, lastname = ?, source_id = ?, source_text = ?, research = ?, intern = ?, extern = ?, hire = ? WHERE id = ?",
                        [req.body.firstname, req.body.lastname, req.body.source, req.body.sourceText, req.body.research, req.body.intern, req.body.extern, req.body.hire, req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim UPDATE-Candidate!";
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Daten wurden gespeichert!");
                            }
                        });
                    
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }



            /*
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";
                var parameters = [];

                if (req.body.id == null) {
                    message = "Keine ID übergeben!";
                } else
                if (req.body.firstname == null || req.body.firstname == "") {
                    message = "Bitte Vornamen eingeben! - 'unbekannt' bitte bei 'Vorname' eingeben!";
                } else if (req.body.source == null || req.body.source == "") {
                    message = "Bitte Quelle auswählen! - " + req.body.source;
                } else if (req.body.research == null || req.body.research == "") {
                    message = "Bitte Research-Datum eingeben! - " + req.body.research;
                } else {
                    suc = true;
                }

                if (suc) {
                    update = "UPDATE candidate SET firstname = ?, lastname = ?, source_id = ?, source_text = ?, " +
                        "eR = ?, tracking = ?, request = ?, response = ?, response_Value = ?, telnotice = ?, " +
                        "intern = ?, extern = ?, hire = ?, team_id = ?, scoreboard = ?, sourcer = ?, infos = ?, research = ?" +
                        "WHERE id = ? ";
                    parameters = [req.body.firstname, req.body.lastname, req.body.source, req.body.source_text,
                        req.body.eR, req.body.tracking, req.body.request, req.body.response, req.body.responseVal, req.body.telnotice,
                        req.body.intern, req.body.extern, req.body.hire, req.body.team, req.body.scoreboard, req.body.sourcer, 
                        req.body.infos, req.body.research, req.body.id];
                    
                        db.query(update, parameters, function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim ausführen des UPDATE-Querys";
                                sendResponse(res, false, message);
                            } 
                                sendResponse(res, true, "Kandidaten-Daten wurden gespeichert!");
                            
                        });
                    
                }else {
                        sendResponse(res, false, message);
                    }

            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
            */

        });

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
                    "CASE WHEN candidate.intern = '0000-00-00' THEN null ELSE candidate.intern END AS intern," +
                    "CASE WHEN candidate.extern = '0000-00-00' THEN null ELSE candidate.extern END AS extern," +
                    "CASE WHEN candidate.hire = '0000-00-00' THEN null ELSE candidate.hire END AS hire, candidate.infos, " +
                    "CASE WHEN candidate.telnotice = '0000-00-00' THEN null ELSE candidate.telnotice END AS telnotice," +
                    "CASE WHEN candidate.response_value = null THEN null ELSE candidate.response_value END AS response_value," +
                    "candidate.tracking, candidate.request, candidate.response, candidate.scoreboard," +
                    "CASE WHEN candidate.scoreboard = 1 THEN 'Ja' ELSE 'Nein' END as scoreboard_text, " +
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