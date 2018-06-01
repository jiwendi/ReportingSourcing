app.controller('sourcesController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    /*
     * Return "inactivesource" for highlighting inactive Sources via css in source-Overview
     */
    $scope.issourceinactive = function (source) {
        if (source.active == "Nein") {
            return "inactivesource";
        } else {
            return "";
        }
    };

    $http.get('sources/showSourceOverview').then(function (response) {
        $scope.sources = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });
});


app.controller('sourcenewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.source = "";

    $scope.save = function () {
        $scope.message = "";
        $http.post('source/save', {
            sourcename: $scope.source
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };
});

app.controller('sourcedetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('source/showDetailsFromSelectedSource', {
        id: $routeParams.sourceid
    }).then(function (response) {
        $scope.source = response.data.data;
        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;
    });

    $scope.update = function () {
        $scope.message = "";
        $http.post('source/update', {
            id: $scope.source.id, name: $scope.source.name, active: $scope.source.active
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };
}); 
