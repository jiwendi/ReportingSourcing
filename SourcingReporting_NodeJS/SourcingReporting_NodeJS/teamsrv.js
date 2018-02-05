module.exports = {
    setup: function (app, db, session, toDate, sendResponse) {
        /**
        * Teams Get - Teamübersicht
        */
        app.get('/teams/get', function (req, res) {
            
                var regsuc = false;
                var message = "";
                var teamquery = "SELECT team.id, team.name, city_group.city FROM team INNER JOIN city_group ON team.city_group=city_group.id";
                var groupquery = "SELECT city_group.city, count(team.city_group) AS anzahl FROM team RIGHT OUTER JOIN city_group ON team.city_group = city_group.id group by team.city_group";

                db.query(teamquery, function (teamerr, teamresult, teamfields) {
                    if (teamerr) throw teamerr;

                    db.query(groupquery, function (grouperr, groupresult, groupfields) {
                        if (grouperr) throw grouperr;

                        var result = {
                            teams: teamresult,
                            groups: groupresult
                        };

                        sendResponse(res, true, "", result);
                    });
                });
           
        }); //end users/get

        /**
        * Team speichern
        */
        app.post('/team/save', function (req, res) {
            if (req.session.admin) {
                var suc = false;
                var message = "";

                if (req.body.teamname == null || req.body.teamname == "") {
                    message = "Bitte Teamname eingeben!";
                } else if (req.body.gruppe == null || req.body.gruppe == "") {
                    message = "Bitte Gruppe zuweisen!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "INSERT INTO team (name, city_group) VALUES (?,?)";
                    var parameters = [req.body.teamname, req.body.gruppe];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler bei <update into team>";
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Daten wurden gespeichert!");
                        }
                    });//end db query
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Keine Admin-Rechte!");
            }

        }); //end team/save

        app.post('/team/info', function (req, res) {
            
                var parameter = [];
                var suc = false;

                var teamquery = "SELECT team.id, team.name, team.city_group, team.active, city_group.city AS gruppe FROM team INNER JOIN city_group ON team.city_group=city_group.id WHERE team.id=?";
                var groupquery = "SELECT id, city from city_group";

                var parameter = [req.body.teamid];

                db.query(teamquery, parameter, function (teamerr, teamrows, teamfields) {
                    if (teamerr) throw teamerr;

                    db.query(groupquery, function (grouperr, grouprows, groupfields) {
                        if (grouperr) throw grouperr;

                        var result = {
                            team: teamrows[0],
                            gruppe: grouprows
                        };

                        sendResponse(res, true, "", result);
                    });
                });
            
        }); // end team/info

        app.post('/team/update', function (req, res) {
            if (req.session.admin) {
                var suc = false;
                var message = "";
                var update = "";
                var parameters = [];

                if (req.body.teamname == null || req.body.teamname == "") {
                    message = "Bitte Teamname eingeben!";
                } else if (req.body.gruppe == null || req.body.gruppe == 0) {
                    message = "Bitte Gruppe zuordnen!";
                } else {
                    suc = true;
                    //toDo active einfügen
                    update = "UPDATE team SET teamname = ?, city_group= ?, active = 1";
                    parameters = [req.body.teamname, req.body.gruppe];
                }

                if (suc) {
                    db.query(update, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler bei <update team>";
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Daten wurden gespeichert!");
                        }
                    });


                } else {
                    sendResponse(res, false, message);
                }



            } else {
                sendResponse(res, false, "Keine Admin-Rechte!");
            }

        }); //end team/update

        // Daten City_Group für neues Team
        app.post('/team/data', function (req, res) {
            if (req.session.userid) {
                var groupquery = "SELECT id, city from city_group";
                db.query(groupquery, function (err, rows, fields) {
                    if (err) {
                        message = "Fehler beim SELECT (city_group)";
                        sendResponse(res, false, message);
                    } else {
                        sendResponse(res, true, "", rows);
                    }
                });

            } else {
                sendResponse(res, false, "Kein Benutzer eingeloggt!");
            }

        }); //end team/data

        /**
                * Gruppe speichern
                */
        app.post('/group/save', function (req, res) {
            if (req.session.admin) {
                var suc = false;
                var message = "";

                if (req.body.groupname == null || req.body.groupname == "") {
                    message = "Bitte Gruppenname eingeben!";
                } else {
                    suc = true;
                }

                if (suc) {
                    var query = "INSERT INTO city_group (city) VALUES (?)";
                    var parameters = [req.body.groupname];

                    db.query(query, parameters, function (err, result, fields) {
                        if (err) {
                            message = "Fehler bei <update into city_group>";
                            sendResponse(res, false, message);
                        } else {
                            sendResponse(res, true, "Daten wurden gespeichert!");
                        }
                    });//end db query
                } else {
                    sendResponse(res, false, message);
                }
            } else {
                sendResponse(res, false, "Keine Admin-Rechte!");
            }

        }); //end group/save


    }

}; //end module exports