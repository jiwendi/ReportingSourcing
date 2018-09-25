app.controller('recruiterController', function ($scope, $http) {
    $http.get('recruiter/showRecruiterOverview').then(function (response) {
        $scope.recruiters = response.data.data;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    });
});

app.controller('recruiterDetailController', function ($scope, $http, $routeParams) {
    $http.post('candidate/getSelectData').then(function (response) {
        $scope.teams = response.data.data.teams;
    });

    $http.post('recruiter/showRecruiterDetails', { recruiterid: $routeParams.recruiterid }).then(function (response) {
        if (!response.data.success) {
            alertify.error(response.data.message);
        }

        $scope.recruiter = response.data.data;
        $scope.team = null;
        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;

        /**
         * Team
         */
        var teamData = $.map($scope.teams, function (teams) {
            teams.text = teams.name;
            if (teams.id == $scope.recruiter.teamid) {
                teams.selected = true;
            }
            return teams;
        });

        $("#selectTeam").select2({
            theme: "bootstrap"
        });

        var selectTeam = $('#selectTeam');
        selectTeam.select2({ data: teamData });
        selectTeam.on("select2:select", function (e) {
            var id = selectTeam.val();
            $scope.recruiter.teamid = id;
        });
    });
    
        

    $scope.update = function () {
        $http.post('recruiter/update', {
            id: $routeParams.recruiterid, firstname: $scope.recruiter.firstname, lastname: $scope.recruiter.lastname, teamid: $scope.selectTeam
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});

app.controller('recruiterNewController', function ($scope, $http, $routeParams) {
    $scope.recruiter = { firstname: "", lastname: "", team: null};
    
    $http.post('candidate/getSelectData').then(function (response) {
        $scope.teams = response.data.data.teams;  
    });
    
    $scope.save = function () {        
        $http.post('recruiter/save', {
            firstname: $scope.recruiter.firstname, lastname: $scope.recruiter.lastname, teamid: $scope.teamSelect
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});