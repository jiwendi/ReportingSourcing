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

    $http.get('recruiter/getData').then(function (response) {
        $scope.recruiter = response.data.data;
    });

    $http.get('jobprofiles/getData').then(function (response) {
        $scope.jobs = response.data.data;
    });

    $scope.save = function () {
        $scope.message = "";
        $scope.hire = $('#hire').val();
        $scope.team = $('#team').val();
        $scope.recruiter = $('#recruiter').val();
        $scope.job = $('#job').val();

        if ($('#hire').val() == '') {
            //$scope.hire = '0000-00-00';
            $scope.hire = null;
        } else {
            $scope.hire = $('#hire').val();
        }

        if ($('#team').val() == '') {
            $scope.team = null;
        } else {
            $scope.team = $('#team').val();
        }

        if ($('#recruiter').val() == '') {
            $scope.recruiter = null;
        } else {
            $scope.recruiter = $('#recruiter').val();
        }

        if ($('#job').val() == '') {
            $scope.job = null;
        } else {
            $scope.job = $('#job').val();
        }

        $http.post('candidateER/save', {
            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR,
            hire: $scope.hire, team: $scope.team, scoreboard: $scope.scoreboard,
            recruiter: $scope.recruiter, job: $scope.job
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

    $http.get('recruiter/getData').then(function (response) {
        $scope.recruiter = response.data.data;
    });

    $http.get('jobprofiles/getData').then(function (response) {
        $scope.jobs = response.data.data;
    });

    $http.post('candidateER/showDetailsForSelectedERCandidate', { candidateid: $routeParams.candidateid }).then(function (response) {
        $scope.candidate = response.data.data.candidate;
        $scope.teams = response.data.data.teams;
        $scope.hire = toLocalDate($scope.candidate.hire);

        if (!response.data.success) {
            alertify.error(response.data.message);
        }

        /**
         * Team
         */
        var teamData = $.map($scope.teams, function (teams) {
            teams.text = teams.name;
            if (teams.id == $scope.teamSelect) {
                teams.selected = true;
            }
            return teams;
        });

        $("#teamSelect").select2({
            theme: "bootstrap"
        });

        var selectTeam = $('#teamSelect');
        selectTeam.select2({ data: teamData });
        selectTeam.on("select2:select", function (e) {
            var id = selectTeam.val();
            $scope.teamSelect = id;
        });

        /**
         * Scoreboard
         */
        //var scoreboard = $scope.candidate.scoreboard;
        //scoreboard.select2();
        //scoreboard.on("select2:select", function (e) {
        //    var id = scoreboard.val();
        //    $scope.candidate.scoreboard = id;
        //}); 


        var selectScoreboard = $('#selectScoreboard');
        selectScoreboard.select2();
        selectScoreboard.on("select2:select", function (e) {
            var id = selectScoreboard.val();
            $scope.candidate.scoreboard = id;
        });

        /**
         * Recruiter
         */
        var recruiterData = $.map($scope.recruiter, function (recruiter) {
            recruiter.text = recruiter.firstname + ' ' + recruiter.lastname;
            if (recruiter.id == $scope.candidate.recruiter) {
                recruiter.selected = true;
            }
            return recruiter;
        });

        $("#recruiterSelect").select2({
            theme: "bootstrap"
        });

        var recruiterSelect = $('#recruiterSelect');
        recruiterSelect.select2({ data: recruiterData });
        recruiterSelect.on("select2:select", function (e) {
            var id = recruiterSelect.val();
            $scope.candidate.recruiter = id;
        });

        /**
         * Job
         */
        var jobData = $.map($scope.jobs, function (job) {
            job.text = job.firstname + ' ' + job.lastname;
            if (job.id == $scope.candidate.job) {
                job.selected = true;
            }
            return job;
        });

        $("#jobSelect").select2({
            theme: "bootstrap"
        });

        var jobSelect = $('#jobSelect');
        jobSelect.select2({ data: jobData });
        jobSelect.on("select2:select", function (e) {
            var id = jobSelect.val();
            $scope.candidate.job = id;
        });

    });

    $scope.update = function () {
        var team_id = $('#team').val();
        $http.post('candidateER/updateCandidate', {
            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR, team: $scope.teamSelect,
            hire: toLocalDate($scope.hire), scoreboard: $scope.candidate.scoreboard,
            recruiter: $scope.recruiterSelect, job: $scope.jobSelect
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