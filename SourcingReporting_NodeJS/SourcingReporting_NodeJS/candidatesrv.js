module.exports = {
    setup: function (app, db, session, toDate, sendResponse, getDateString) {

        app.post('/candidates/showCandidateOverview', function (req, res) {
            if (req.session.userid) {
                var regsuc = false;
                var message = "";
                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname," +
                    "CASE WHEN candidate.lastname IS NULL THEN '' ELSE candidate.lastname END AS lastname," +
                    "sources.name as source, candidate.source_text, SUBSTRING(candidate.eR,2) as eR, candidate.hire, " +
                    "CASE WHEN candidate.intern IS NULL THEN '-' ELSE candidate.intern END AS intern," +
                    "CASE WHEN candidate.extern IS NULL THEN '-' ELSE candidate.extern END AS extern," +
                    "CASE WHEN candidate.telnotice IS NULL THEN '-' ELSE candidate.telnotice END AS telnotice," +
                    "CASE WHEN candidate.response_value = NULL THEN 'none' ELSE CASE WHEN candidate.response_value = 1 THEN 'pos.' ELSE CASE WHEN candidate.response_value = 0 THEN 'neg.' ELSE ' ' END END END AS response_value," +
                    "CASE WHEN candidate.tracking = 1 THEN 'ja' ELSE 'nein' END AS tracking," +
                    "CASE WHEN candidate.response = 1 THEN 'ja |' ELSE 'nein' END AS response," +
                    "candidate.research, users.firstname as sourcerName, candidate.sourcer " +
                    "FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT JOIN team ON team.id = candidate.team_id " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    "LEFT JOIN users ON candidate.sourcer = users.id";
                var countCandidateQuery = "SELECT COUNT(candidate.id) as countCandidate FROM candidate";
                var parameter = [];
                var moreParameter = false;

                var showusercandidates = req.body.showusercandidates;
                var showTracking = req.body.showTracking;
                var showRequest = req.body.showRequest;
                var from_telnotice = req.body.from_telnotice;
                var to_telnotice = req.body.to_telnotice;
                var from_intern = req.body.from_intern;
                var to_intern = req.body.to_intern;
                var from_extern = req.body.from_extern;
                var to_extern = req.body.to_extern;
                var from_research = req.body.from_research;
                var to_research = req.body.to_research;
                var from_hire = req.body.from_hire;
                var to_hire = req.body.to_hire;

                if (showusercandidates) {
                    candidatequery = candidatequery + " WHERE candidate.sourcer= ?";
                    countCandidateQuery = countCandidateQuery + " WHERE sourcer= ?";
                    parameter = [req.session.userid];
                    moreParameter = true;
                }

                if (showTracking) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.tracking=1";
                        countCandidateQuery = countCandidateQuery + " AND tracking=1";
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.tracking=1";
                        countCandidateQuery = countCandidateQuery + " WHERE tracking=1";
                        moreParameter = true;
                    }
                }

                if (showRequest) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.request=0";
                        countCandidateQuery = countCandidateQuery + " AND request=0";
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.request=0";
                        countCandidateQuery = countCandidateQuery + " WHERE request=0";
                        moreParameter = true;
                    }
                }

                if (from_telnotice != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.telnotice >= " + getDateString(from_telnotice);
                        countCandidateQuery = countCandidateQuery + " AND telnotice >= " + getDateString(from_telnotice);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.telnotice >= " + getDateString(from_telnotice);
                        countCandidateQuery = countCandidateQuery + " WHERE telnotice >= " + getDateString(from_telnotice);
                        moreParameter = true;
                    }
                }

                if (to_telnotice != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.telnotice <= " + getDateString(to_telnotice);
                        countCandidateQuery = countCandidateQuery + " AND telnotice <= " + getDateString(to_telnotice);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.telnotice <= " + getDateString(to_telnotice);
                        countCandidateQuery = countCandidateQuery + " WHERE telnotice <= " + getDateString(to_telnotice);
                        moreParameter = true;
                    }
                }

                if (from_intern != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.intern >= " + getDateString(from_intern);
                        countCandidateQuery = countCandidateQuery + " AND intern >= " + getDateString(from_intern);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.intern >= " + getDateString(from_intern);
                        countCandidateQuery = countCandidateQuery + " WHERE intern >= " + getDateString(from_intern);
                        moreParameter = true;
                    }
                }

                if (to_intern != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.intern <= " + getDateString(to_intern);
                        countCandidateQuery = countCandidateQuery + " AND intern <= " + getDateString(to_intern);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.intern <= " + getDateString(to_intern);
                        countCandidateQuery = countCandidateQuery + " WHERE intern <= " + getDateString(to_intern);
                        moreParameter = true;
                    }
                }

                if (from_extern != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.extern >= " + getDateString(from_extern);
                        countCandidateQuery = countCandidateQuery + " AND extern >= " + getDateString(from_extern);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.extern >= " + getDateString(from_extern);
                        countCandidateQuery = countCandidateQuery + " WHERE extern >= " + getDateString(from_extern);
                        moreParameter = true;
                    }
                }

                if (to_extern != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.extern <= " + getDateString(to_extern);
                        countCandidateQuery = countCandidateQuery + " AND extern <= " + getDateString(to_extern);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.extern <= " + getDateString(to_extern);
                        countCandidateQuery = countCandidateQuery + " WHERE extern <= " + getDateString(to_extern);
                        moreParameter = true;
                    }
                }

                if (from_research != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.research >= " + getDateString(from_research);
                        countCandidateQuery = countCandidateQuery + " AND research >= " + getDateString(from_research);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.research >= " + getDateString(from_research);
                        countCandidateQuery = countCandidateQuery + " WHERE research >= " + getDateString(from_research);
                        moreParameter = true;
                    }
                }

                if (to_research != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.research <= " + getDateString(to_research);
                        countCandidateQuery = countCandidateQuery + " AND research <= " + getDateString(to_research);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.research <= " + getDateString(to_research);
                        countCandidateQuery = countCandidateQuery + " WHERE research <= " + getDateString(to_research);
                        moreParameter = true;
                    }
                }

                if (from_hire != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.hire >= " + getDateString(from_hire);
                        countCandidateQuery = countCandidateQuery + " AND hire >= " + getDateString(from_hire);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.hire >= " + getDateString(from_hire);
                        countCandidateQuery = countCandidateQuery + " WHERE hire >= " + getDateString(from_hire);
                        moreParameter = true;
                    }
                }

                if (to_hire != false) {
                    if (moreParameter) {
                        candidatequery = candidatequery + " AND candidate.hire <= " + getDateString(to_hire);
                        countCandidateQuery = countCandidateQuery + " AND hire <= " + getDateString(to_hire);
                    } else {
                        candidatequery = candidatequery + " WHERE candidate.hire <= " + getDateString(to_hire);
                        countCandidateQuery = countCandidateQuery + " WHERE hire <= " + getDateString(to_hire);
                        moreParameter = true;
                    }
                }

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

        app.post('/candidate/getSelectData', function (req, res) {
            if (req.session.userid) {
                var teamquery = "SELECT team.id, team.name, team.city_group, city_group.city FROM team " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    " WHERE team.active=1";
                var sourcequery = "SELECT id, name from sources where active=1 ORDER BY name";

                db.query(teamquery, function (teamerr, teamresults, teamfields) {
                    if (teamerr) {
                        sendResponse(res, false, "Fehler beim Abfragen von Team aus der Datenbank! " + teamerr);
                    } else {
                        db.query(sourcequery, function (sourceerr, sourceresults, sourcefields) {
                            if (sourceerr) {
                                sendResponse(res, false, "Fehler beim Abfragen der Quellen aus der Datenbank! " + sourceerr);
                            } else {
                                var result = {
                                    teams: teamresults,
                                    sources: sourceresults
                                };
                                sendResponse(res, true, "", result);
                            }
                        });
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

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
                        "response_value, telnotice, intern, extern, hire, team_id, research, scoreboard, sourcer, infos, rememberme) " +
                        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?,?)";

                    var response_Value_afterCheck;

                    if (req.body.responseVal == 2) {
                        response_Value_afterCheck = null;
                    } else {
                        response_Value_afterCheck = req.body.responseVal;
                    }

                    var parameters = [req.body.firstname, req.body.lastname, req.body.source, req.body.source_text, req.body.eR,
                    req.body.tracking, req.body.request, req.body.response, response_Value_afterCheck, req.body.telnotice, req.body.intern,
                    req.body.extern, req.body.hire, req.body.team, req.body.research, req.session.userid, req.body.infos, req.body.rememberme];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim speichern des Kandidaten in der DB! \n" + err + " \n" + err.message;
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
        });

        app.post('/candidate/delete', function (req, res) {
            if (req.session.userid) {
                var message = "";
                var suc = false;

                if (req.body.id == null || req.body.id == "") {
                    message = "Keine Candidate-id übergeben!!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "DELETE FROM candidate WHERE id = ?";
                    var parameters = [req.body.id];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler beim Löschen des Kandidaten! " + err;
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Kandidat wurde gelöscht!");
                        }
                    });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

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
                                message = "Fehler beim Aktualisieren des Kandidaten! \n" + err + "\n" + err.message;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Basis-Daten wurden gespeichert!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
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
                                message = "Fehler beim Aktualisieren der Quelle! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Quelle wurde gespeichert!");
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
                                message = "Fehler beim Aktualisieren des Teams! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Team wurde gespeichert!");
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
                        [new Date(req.body.research), req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Aktualisieren des Research-Datums! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Research-Datum wurde gespeichert!");
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
                        [new Date(req.body.telnotice), req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Aktualisieren des TelefonNotiz-Datums! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "TelefonNotiz-Datum wurde gespeichert!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.post('/candidate/deleteTelNotice', function (req, res) {
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
                    db.query("UPDATE candidate SET telnotice = NULL WHERE id = ?",
                        [req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Reset des Telefonnotiz-Datums! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Telefonnotiz-Datum wurde zurückgesetzt!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.post('/candidate/updateRememberMe', function (req, res) {
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
                    db.query("UPDATE candidate SET rememberme = ? WHERE id = ?",
                        [new Date(req.body.rememberme), req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Aktualisieren des RememberMe-Datums! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "RememberMe-Datum wurde gespeichert!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.post('/candidate/deleteRememberMe', function (req, res) {
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
                    db.query("UPDATE candidate SET rememberme = NULL WHERE id = ?",
                        [req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Reset des RememberMe-Datums! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "RememberMe-Datum wurde zurückgesetzt!");
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
                        [new Date(req.body.intern), req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Aktualisieren des Datum für das Interne Gespräch! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Internes Gesprächs-Datum wurde gespeichert!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.post('/candidate/deleteIntern', function (req, res) {
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
                    db.query("UPDATE candidate SET intern = NULL WHERE id = ?",
                        [req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Reset des Datums des Internen Gesprächs! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Internes Gesprächs-Datum wurde zurückgesetzt!");
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
                        [new Date(req.body.extern), req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler Aktualisieren des Datums für das Externe Gespräch " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Externes Gesprächs-Datum wurde gespeichert!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.post('/candidate/deleteExterb', function (req, res) {
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
                    db.query("UPDATE candidate SET extern = NULL WHERE id = ?",
                        [req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Reset des Datums des Externen Gesprächs! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Externes Gesprächs-Datum wurde zurückgesetzt!");
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
                        [new Date(req.body.hire), req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Aktualisieren des Besetzungs-Datums! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Besetzungs-Datum wurde gespeichert! (Bitte Team nicht vergessen!)");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.post('/candidate/deleteHire', function (req, res) {
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
                    db.query("UPDATE candidate SET hire = NULL, team_id = NULL WHERE id = ?",
                        [req.body.id],
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Reset der Besetzung und des Teams! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Besetzung und Team wurde zurückgesetzt!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.post('/candidate/updateOptions', function (req, res) {
            if (req.session.userid) {
                var suc = false;
                var message = "";
                var update = "";
                var parameter = [];

                if (req.body.id == null) {
                    message = "Keine KandidatenID übertragen!";
                } else {
                    suc = true;
                }

                if (req.body.response == 0) {
                    parameter = [req.body.tracking, req.body.request, req.body.response, null, req.body.id];
                } else {
                    parameter = [req.body.tracking, req.body.request, req.body.response, req.body.response_value, req.body.id];
                }

                if (suc) {
                    db.query("UPDATE candidate SET tracking = ?, request = ?, response = ?, response_value = ? WHERE id = ?",
                        parameter,
                        function (err, result, fields) {
                            if (err) {
                                message = "Fehler beim Aktualisieren der Tracking-Optionen (beobachen, ansprache, response)! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Tracking-Optionen wurden gespeichert!");
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
                                message = "Fehler beim Aktualisieren des Scoreboards! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Scoreboard wurde gespeichert!");
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
                                message = "Fehler beim Aktualisieren des Sourcers! " + err;
                                sendResponse(res, false, message);
                            } else {
                                sendResponse(res, true, "Sourcer wurde gespeichert!");
                            }
                        });
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Kein User eingeloggt!");
            }
        });

        app.get('/candidate/showTimeInfosInSideBar', function (req, res) {
            if (req.session.userid) {
                var timequery = "SELECT AVG(ABS(DATEDIFF(research, telnotice))) AS timetocall, " +
                    "AVG(ABS(DATEDIFF(research, intern))) AS timetointerview, " +
                    "AVG(ABS(DATEDIFF(research, extern))) AS timetoextern, " +
                    "AVG(ABS(DATEDIFF(research, hire))) AS timetohire " +
                    "FROM candidate " +
                    "WHERE DATE(research) > (NOW() - INTERVAL 6 MONTH)";

                db.query(timequery, function (err, rows, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen der Time-Infos für die Sidebar! " + err);
                    } else {
                        var timeinfo = rows[0];
                        sendResponse(res, true, "", timeinfo);
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

        app.post('/candidate/showDetailForSelectedCandidate', function (req, res) {
            if (req.session.userid) {
                var parameter = [req.body.candidateid];
                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname," +
                    "CASE WHEN candidate.lastname IS NULL THEN '' ELSE candidate.lastname END AS lastname," +
                    "sources.name as source, candidate.source_id as source_id, candidate.source_text, candidate.eR," +
                    "candidate.intern, candidate.extern, candidate.hire, candidate.infos, " +
                    "CASE WHEN candidate.telnotice IS NULL THEN null ELSE candidate.telnotice END AS telnotice," +
                    "CASE WHEN candidate.response_value = null THEN null ELSE candidate.response_value END AS response_value," +
                    "candidate.tracking, candidate.request, candidate.response, candidate.scoreboard," +
                    "candidate.rememberme, " +
                    "CASE WHEN candidate.scoreboard = 1 THEN 'Ja' ELSE 'Nein' END as scoreboard_text, " +
                    "ABS(DATEDIFF(candidate.research, candidate.telnotice)) AS timeToCall, ABS(DATEDIFF(candidate.research, candidate.intern)) AS timeToInterview, " +
                    "ABS(DATEDIFF(candidate.research, candidate.extern)) AS timeToExtern, ABS(DATEDIFF(candidate.research, candidate.hire)) AS timeToHire," +
                    "city_group.city, team.name as teamname, candidate.team_id as team_id, candidate.research, candidate.date, users.firstname as sourcerName, candidate.sourcer " +
                    "FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT JOIN team ON team.id = candidate.team_id " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    "LEFT JOIN users ON candidate.sourcer = users.id " +
                    "WHERE candidate.id = ?";
                var sourcequery = "SELECT id, name FROM sources WHERE active=1 ORDER BY name";
                var teamquery = "SELECT team.id, team.name, team.city_group, city_group.city FROM team " +
                    "LEFT JOIN city_group ON team.city_group = city_group.id " +
                    " WHERE team.active=1";
                var cityquery = "SELECT id, city FROM city_group";
                var userquery = "SELECT id, firstname, lastname FROM users WHERE active=1 ORDER BY firstname";

                db.query(candidatequery, parameter, function (err, rows, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen der Detail-Daten! " + err);
                    } else {
                        if (rows.length == 0) {
                            sendResponse(res, false, "Kandidat in der Datenbank nicht gefunden!");
                        } else {
                            db.query(sourcequery, function (sourceerr, sourcerows, sourcefields) {
                                if (sourceerr) {
                                    sendResponse(res, false, "Fehler beim Abfragen der Qullen aus der Datenbank! " + sourceerr);
                                } else {
                                    db.query(teamquery, function (teamerr, teamrows, teamfields) {
                                        if (teamerr) {
                                            sendResponse(res, false, "Fehler beim Abfragen der Teams aus der Datenbank! " + teamerr);
                                        } else {
                                            db.query(cityquery, function (cityerr, cityrows, cityfields) {
                                                if (cityerr) {
                                                    sendResponse(res, false, "Fehler beim Abfragen der Standorte aus der Datenbank! " + cityerr);
                                                } else {
                                                    db.query(userquery, function (usererr, userrows, userfields) {
                                                        if (usererr) {
                                                            sendResponse(res, false, "Fehler beim Abfragen der Sourcer aus der Datenbank! " + usererr);
                                                        } else {
                                                            var result = {
                                                                candidate: rows[0],
                                                                sources: sourcerows,
                                                                teams: teamrows,
                                                                citys: cityrows,
                                                                sourcer: userrows
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
                        }
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

        app.post('/candidate/rememberMeList', function (req, res) {
            if (req.session.userid) {
                var regsuc = false;
                var message = "";
                var filterquery = " WHERE candidate.rememberMe IS NOT NULL";
                var countCandidateQuery = "SELECT COUNT(candidate.id) as countCandidate FROM candidate WHERE candidate.rememberMe IS NOT NULL";
                var showusercandidates = req.body.showusercandidates;
                var filter_month = req.body.filter_month;
                var userid = req.session.userid;

                if (showusercandidates) {
                    filterquery = filterquery + " AND candidate.sourcer= " + userid + "";
                    countCandidateQuery = countCandidateQuery + " AND sourcer= " + userid + "";
                }

                if (filter_month != false) {
                    filterquery = filterquery + " AND MONTH(candidate.rememberMe) = " + filter_month + "";
                    countCandidateQuery = countCandidateQuery + " AND MONTH(candidate.rememberMe) = " + filter_month + "";
                }

                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname, candidate.rememberMe, " +
                    "CASE WHEN candidate.lastname IS NULL THEN '' ELSE candidate.lastname END AS lastname," +
                    "sources.name as source, candidate.source_text, SUBSTRING(candidate.eR,2) as eR," +
                    "CASE WHEN candidate.telnotice IS NULL THEN '-' ELSE candidate.telnotice END AS telnotice," +
                    "CASE WHEN candidate.response_value = NULL THEN 'none' ELSE CASE WHEN candidate.response_value = 1 THEN 'pos.' ELSE CASE WHEN candidate.response_value = 0 THEN 'neg.' ELSE ' ' END END END AS response_value," +
                    "CASE WHEN candidate.tracking = 1 THEN 'ja' ELSE 'nein' END AS tracking," +
                    "CASE WHEN candidate.response = 1 THEN 'ja |' ELSE 'nein' END AS response," +
                    "candidate.research, users.firstname as sourcerName, candidate.sourcer " +
                    " FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT JOIN users ON candidate.sourcer = users.id " +
                    filterquery;

                db.query(candidatequery, function (candErr, candResult, candFields) {
                    if (candErr) {
                        sendResponse(res, false, "Fehler beim Abfragen der Kandidaten aus der Datenbank! " + candErr);
                    } else {
                        db.query(countCandidateQuery, function (countErr, countResult, countFields) {
                            if (countErr) {
                                sendResponse(res, false, "Fehler beim Abfragen der Kandidatenanzahl aus der Datenbank! " + countErr);
                            } else {
                                var result = {
                                    candidate: candResult,
                                    countCandidate: countResult[0]
                                };
                                sendResponse(res, true, "", result);
                            }
                        });
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

        app.post('/personalDashboard/myRememberMeListThisMonth', function (req, res) {
            if (req.session.userid) {
                var regsuc = false;
                var message = "";

                var candidatequery = "SELECT candidate.id, candidate.firstname as firstname, candidate.rememberMe, " +
                    "CASE WHEN candidate.lastname IS NULL THEN '' ELSE candidate.lastname END AS lastname," +
                    "sources.name as source, candidate.source_text, SUBSTRING(candidate.eR,2) as eR," +
                    "CASE WHEN candidate.telnotice IS NULL THEN '-' ELSE candidate.telnotice END AS telnotice," +
                    "CASE WHEN candidate.response_value = NULL THEN 'none' ELSE CASE WHEN candidate.response_value = 1 THEN 'pos.' ELSE CASE WHEN candidate.response_value = 0 THEN 'neg.' ELSE ' ' END END END AS response_value," +
                    "CASE WHEN candidate.tracking = 1 THEN 'ja' ELSE 'nein' END AS tracking," +
                    "CASE WHEN candidate.response = 1 THEN 'ja |' ELSE 'nein' END AS response," +
                    "candidate.research, users.firstname as sourcerName, candidate.sourcer " +
                    "FROM candidate LEFT JOIN sources ON candidate.source_id = sources.id " +
                    "LEFT JOIN users ON candidate.sourcer = users.id " +
                    "WHERE candidate.rememberMe IS NOT NULL AND candidate.sourcer = " + req.session.userid + " AND MONTH(candidate.rememberme) <= MONTH(sysdate()) AND YEAR(candidate.rememberme) <= YEAR(sysdate()) " +
                    "ORDER BY candidate.rememberMe";

                db.query(candidatequery, function (candErr, candResult, candFields) {
                    if (candErr) {
                        sendResponse(res, false, "Fehler beim Abfragen der Kandidaten aus der Datenbank! " + candErr);
                    } else {
                        sendResponse(res, true, "", candResult);
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });

        app.post('/candidate/livesearch', function (req, res) {
            var searchString = req.body.searchString;
            var query = "SELECT id, firstname, lastname FROM candidate WHERE firstname like '%" + searchString + "%' OR lastname like '%" + searchString + "%' OR eR like '%" + searchString + "%' OR source_text like '%" + searchString + "%'";
            if (req.session.userid) {
                db.query(query, function (err, rows, fields) {
                    if (err) {
                        sendResponse(res, false, "Fehler beim Abfragen des LiveSearch-Anfrage! " + err);
                    } else {
                        var data = "";
                        for (var i = 0; i < rows.length; i++)
                        {
                            data = data + '<a href="#!candidatedetail/'+ rows[i].id + '">' + rows[i].firstname + ' ' + rows[i].lastname + '</a><br />';
                        }
                        sendResponse(res, true, "", data);
                    }
                });
            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }
        });
    }
};