/**
 * TeamsController - TeamOverview
 */
app.controller('teamsController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    
    $http.get('teams/showTeamOverview').then(function (response) {
        $scope.groups = response.data.data.groups;
        $scope.teams = response.data.data.teams;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    }); 
});

/**
 * TeamNew Controller - Controller for create a new Team at Database
 */
app.controller('teamnewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.team = { teamname: "", gruppe: ""};
    $scope.gruppe = "";

    $scope.showSelectValue = function (groupSelect) {
        $scope.gruppe = groupSelect;
    }

    /**
     * Save Function to save Team at Database
     */
    $scope.save = function () {
        $scope.message = "";
        $http.post('team/save', {
            teamname: $scope.team.teamname, gruppe : $scope.gruppe
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };

    /**
     * Get Group Data to fill into select
     */
    $http.post('team/getDataForSelect').then(function (response) {
        $scope.groups = response.data.data;
    });
}); 


/**
 * TeamDetail Controller - Edit selected Team
 */
app.controller('teamdetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    
    /**
     * get Teamdata to fill into Form for updating selected Team
     */
    $http.post('team/getDetailsForSelectedTeam', { teamid: $routeParams.teamid }).then(function (response) {
        $scope.team = response.data.data.team;
        $scope.gruppe = response.data.data.gruppe;
        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;

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
        $scope.message = "";
        $http.post('team/update', { id: $scope.team.id, name: $scope.team.name, gruppe: $scope.gruppe.city, active: $scope.team.active }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };
}); //end teamdetailController

/**
 * GroupNew Controller - Controller for create a new City-Group at Database
 */
app.controller('groupnewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.group = "";

    /**
     * Save Function to save Team at Database
     */
    $scope.save = function () {
        $scope.message = "";
        $http.post('group/save', {
            groupname: $scope.group
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };
}); 