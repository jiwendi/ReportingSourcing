app.controller('wigController', function ($scope, $http) {
    $scope.showusercandidates = false;
    
    $http.get('wig/showWigOverview').then(function (response) {
        $scope.wigs = response.data.data;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    }); 
});

app.controller('wignewController', function ($scope, $http) {
    $scope.save = function () {
        $scope.start = $('#start').val();
        $scope.end = $('#end').val();
  
        $http.post('wig/save', {
            name: $scope.wig.name, start: $scope.start, end: $scope.end, goal: $scope.wig.goal
        }).then(function (response) {

            if (response.data.success) {
                alertify.set({delay: 2000});
                alertify.success(response.data.message);
                setTimeout(function () {
                    window.location.href = "#!wigs"; //will redirect to wigs
                }, 2000); //will call the function after 2 secs. --> message showed for 2 sec.
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});

app.controller('wigdetailController', function ($scope, $http, $routeParams) {
    $http.post('wig/showDetailsForSelectedWig', {
        id: $routeParams.wigid
    }).then(function (response) { 
        $scope.wig = response.data.data;
        $scope.start = toLocalDate($scope.wig.start);
        $scope.end = toLocalDate($scope.wig.end);
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
        });

    $scope.update = function () {
        var start = toLocalDate($scope.start, 2);
        var end = toLocalDate($scope.end, 2);
        
        $http.post('wig/update', {
            id: $scope.wig.id, name: $scope.wig.name, start: start, end: end, goal: $scope.wig.goal, active: $scope.wig.active
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    }; //end update Function

    $scope.delete = function () {
        alertify.confirm("WIG wirklich löschen?", function (e) {
            if (e) {
                $http.post('wig/delete', { id: $scope.wig.id }).then(function (response) {
                    if (response.data.success) {
                        alertify.success(response.data.message);
                        setTimeout(function () {
                            window.location.href = "#!wigs";
                        }, 1000);
                    } else {
                        alertify.error(response.data.message);
                    }
                });
            } else {
                alertify.log("WIG löschen - Abgebrochen");
            }
        });
    }; 
});
