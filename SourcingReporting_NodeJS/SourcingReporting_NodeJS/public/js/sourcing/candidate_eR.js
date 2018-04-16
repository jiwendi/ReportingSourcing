
/**
 * eR-Candidates Controller - eR-Candidate Overview
 */
app.controller('candidatesERController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.showScoreboard = false;

    /**
     * get Candidates for the Overview & show User Candidates
     */
    $scope.update = function () {
        $http.post('candidatesER/get', { showScoreboard: $scope.showScoreboard }).then(function (response) {
            $scope.candidates = response.data.data.candidate;
            $scope.countCandidate = response.data.data.countCandidate;
        });
    };

    $scope.update();
});


/**
 * CandidateNew eR Controller - Create a new eR Candidate
 */
app.controller('candidatenewERController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    //Get Data for candidate new
    $http.post('candidateER/data').then(function (response) {
        $scope.teams = response.data.data.teams;
    });
    
    /**
     * Save Function to create a new Candidate at Database 
     */
    $scope.save = function () {
        $scope.message = "";
        $scope.hire = $('#hire').val();
        $scope.team = $('#teamSelect').val();
        $scope.sourcer = $('#sourcer').val();
        
        if ($('#hire').val() == '') {
            $scope.hire = '0000-00-00';
        } else {
            $scope.hire = $('#hire').val();
        }

       /* if ($('#team').val() == '') {
            $scope.team = null;
        } else {
            $scope.team = $('#team').val();
        }*/

        if ($('#sourcer').val() == '') {
            $scope.sourcer = null;
        } else {
            $scope.team = $('#sourcer').val();
        }
        
        $http.post('candidateER/save', {
            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR, 
            hire: $scope.hire, team: $('#team').val(), scoreboard: $scope.scoreboard
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;


            if (response.data.success) {
                setTimeout(function () {
                    window.location.href = "#!candidate/newER"; //will redirect to candidate/new
                }, 1000); //will call the function after 2 secs. --> message showed for 2 sec
            }

        });
    };

});


/**
 * CandidateDetail Controller - Edit selected Candidate
 */
app.controller('candidatedetailERController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    /**
     * get Candidate-data to fill into Form for updating selected Team
     */
    $http.post('candidateER/info', { candidateid: $routeParams.candidateid }).then(function (response) {
        $scope.candidate = response.data.data.candidate;
        $scope.teams = response.data.data.teams;
        $scope.citys = response.data.data.citys;
        $scope.sourcer = response.data.data.sourcer;

        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;


        /**
         * Dropdowns with Datamaps and select2
         */
        var sourcerData = $.map($scope.sourcer, function (sourcer) {
            sourcer.text = sourcer.firstname + ' ' + sourcer.lastname;
            return sourcer;
        });

        var teamData = $.map($scope.teams, function (teams) {
            teams.text = teams.city + ' - ' + teams.name;
            return teams;
        });
        

        var selectSourcer = $('#selectSourcer');
        selectSourcer.select2({ data: sourcerData });
        selectSourcer.val($scope.candidate.sourcer);
        selectSourcer.trigger("change");
        selectSourcer.on("select2:select", function (e) {
            var id = selectSourcer.val();
            $scope.candidate.sourcer = id;
        });

        var selectTeam = $('#selectTeam');
        selectTeam.select2({ data: teamData });
        //selectTeam.val($scope.candidate.team_id);
        //selectTeam.trigger("change");
        selectTeam.on("select2:select", function (e) {
            var id = selectTeam.val();
            $scope.candidate.team_id = id;
        });
        

        /**
         * Dates with moment 
         */
        $scope.hire = toLocalDate($scope.candidate.hire);



        /**
         * Dropdown with select2
         */
        
        var scoreboard = $('#scoreboard');
        scoreboard.select2();
        
        //scoreboard.val($scope.candidate.scoreboard);
        //scoreboard.trigger("change");
        scoreboard.on("select2:select", function (e) {
            var id = scoreboard.val();
            $scope.scoreboard = id;
        });


    });//end candidate/info


    $scope.update = function () {
        $scope.message = "";
        

        var team_id = $('#team').val();

        $http.post('candidateER/updateCandidate', {
            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR, team: team_id, hire: toLocalDate($scope.hire), scoreboard: $scope.scoreboard
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };
    
    
    
    $scope.delete = function () {
        $scope.message = "";

        if (confirm("Kandidat wirklich löschen?")) {
            $http.post('candidateER/delete', {
                id: $scope.candidate.id
            }).then(function (response) {
                $scope.iserrmessage = !response.data.success;
                $scope.message = response.data.message;

                if (response.data.success) {
                    $scope.message = response.data.message;
                    //window.location = '#!candidate/new';

                    setTimeout(function () {
                        window.location.href = "#!candidates_eR"; // redirect
                    }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.
                }
            });
        }
        
    }; //end delete Function
    
}); //end candidatedetailERController


