app.controller('teamsController', function ($scope, $http) {    
    $http.get('teams/showTeamOverview').then(function (response) {
        $scope.groups = response.data.data.groups;
        $scope.teams = response.data.data.teams;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    }); 
});

app.controller('teamnewController', function ($scope, $http, $routeParams) {
    $scope.team = { teamname: "", gruppe: ""};
    $scope.gruppe = "";

    $scope.showSelectValue = function (groupSelect) {
        $scope.gruppe = groupSelect;
    }

    $scope.save = function () {
        $http.post('team/save', {
            teamname: $scope.team.teamname, gruppe : $scope.gruppe
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $http.post('team/getDataForSelect').then(function (response) {
        $scope.groups = response.data.data;
    });
}); 

app.controller('teamdetailController', function ($scope, $http, $routeParams) {
    $http.post('team/getDetailsForSelectedTeam', { teamid: $routeParams.teamid }).then(function (response) {
        $scope.team = response.data.data.team;
        $scope.gruppe = response.data.data.gruppe;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }

        var selectActive = $('#selectactive');
        selectActive.select2();

        selectActive.val($scope.team.active);
        selectActive.trigger("change");
        selectActive.on("select2:select", function (e) {
            var id = selectActive.val();
            $scope.team.active = id;
        });

        var selectGroup = $('#selectgroup');
        selectGroup.select2();
        
        selectGroup.val($scope.team.city_group);
        selectGroup.trigger("change");
        selectGroup.on("select2:select", function (e) {
            var id = selectGroup.val();
            $scope.gruppe.id = id;
        });
    });

    $scope.update = function () {
        $http.post('team/update', { id: $scope.team.id, name: $scope.team.name, gruppe: $scope.gruppe.city, active: $scope.team.active }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
}); 

app.controller('groupnewController', function ($scope, $http, $routeParams) {
    $scope.group = "";

    $scope.save = function () {
        $http.post('group/save', {
            groupname: $scope.group
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
}); 