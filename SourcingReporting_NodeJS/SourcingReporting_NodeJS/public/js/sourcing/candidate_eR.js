app.controller('candidatesERController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.showScoreboard = false;

    $scope.update = function () {
        $http.post('candidatesER/showERCandidateOverview', { showScoreboard: $scope.showScoreboard }).then(function (response) {
            $scope.candidates = response.data.data.candidate;
            $scope.countCandidate = response.data.data.countCandidate;

            if (!response.data.success) {
                alertify.alert(response.data.message);
            }

        });
    };
    $scope.update();
});

app.controller('candidatenewERController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('candidateER/getSelectData').then(function (response) {
        $scope.teams = response.data.data.teams;
    });

    $scope.save = function () {
        $scope.message = "";
        $scope.hire = $('#hire').val();
        $scope.team = $('#teamSelect').val();
        $scope.sourcer = $('#sourcer').val();

        if ($('#hire').val() == '') {
            //$scope.hire = '0000-00-00';
            $scope.hire = null;
        } else {
            $scope.hire = $('#hire').val();
        }

        if ($('#sourcer').val() == '') {
            $scope.sourcer = null;
        } else {
            $scope.team = $('#sourcer').val();
        }

        $http.post('candidateER/save', {
            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR,
            hire: $scope.hire, team: $('#team').val(), scoreboard: $scope.scoreboard
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
                setTimeout(function () {
                    window.location.href = "#!candidate/newER";
                }, 1000);

            } else {
                alertify.error(response.data.message);
            }
        });
    };
});

app.controller('candidatedetailERController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('candidateER/showDetailsForSelectedERCandidate', { candidateid: $routeParams.candidateid }).then(function (response) {
        $scope.candidate = response.data.data.candidate;
        $scope.teams = response.data.data.teams;
        $scope.hire = toLocalDate($scope.candidate.hire);

        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;

        var sourcerData = $.map($scope.sourcer, function (sourcer) {
            sourcer.text = sourcer.firstname + ' ' + sourcer.lastname;
            return sourcer;
        });

        var teamData = $.map($scope.teams, function (teams) {
            teams.text = teams.city + ' - ' + teams.name;
            return teams;
        });
        var selectTeam = $('#selectTeam');
        selectTeam.select2({ data: teamData });
        //selectTeam.val($scope.candidate.team_id);
        //selectTeam.trigger("change");
        selectTeam.on("select2:select", function (e) {
            var id = selectTeam.val();
            $scope.candidate.team_id = id;
        });

        var scoreboard = $('#scoreboard');
        scoreboard.select2();
        //scoreboard.val($scope.candidate.scoreboard);
        //scoreboard.trigger("change");
        scoreboard.on("select2:select", function (e) {
            var id = scoreboard.val();
            $scope.scoreboard = id;
        });
    });

    $scope.update = function () {
        var team_id = $('#team').val();
        $http.post('candidateER/updateCandidate', {
            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR, team: team_id, hire: toLocalDate($scope.hire), scoreboard: $scope.scoreboard
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $scope.delete = function () {
        alertify.confirm("Kandidat wirklich löschen?", function (e) {
            if (e) {
                $http.post('candidateER/delete', { id: $scope.candidate.id }).then(function (response) {
                    if (response.data.success) {
                        alertify.success(response.data.message);
                        setTimeout(function () {
                            window.location.href = "#!candidates_eR";
                        }, 1000);
                    } else {
                        alertify.error(response.data.message);
                    }
                });
            } else {
                alertify.log("Kandidat löschen - Abgebrochen");
            }
        });
    };
}); 