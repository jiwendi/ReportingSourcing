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
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    });
});


app.controller('sourcenewController', function ($scope, $http, $routeParams) {
    $scope.source = "";

    $scope.save = function () {
        $http.post('source/save', {
            sourcename: $scope.source
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
                setTimeout(function () {
                    window.location.href = "#!sources";
                }, 1000);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});

app.controller('sourcedetailController', function ($scope, $http, $routeParams) {

    $http.post('source/showDetailsFromSelectedSource', {
        id: $routeParams.sourceid
    }).then(function (response) {
        $scope.source = response.data.data;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    });

    $scope.update = function () {
        $http.post('source/update', {
            id: $scope.source.id, name: $scope.source.name, active: $scope.source.active
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
}); 
