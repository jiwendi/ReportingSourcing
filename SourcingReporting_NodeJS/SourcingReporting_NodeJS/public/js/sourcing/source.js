/**
 * Sources Controller - Sources Overview
 */
app.controller('sourcesController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.issourceinactive = function (source) {
        if (source.active == "Nein") {
            return "inactivesource";
        } else {
            return "";
        }
    };
    /**
     * get Sources for the Overview
     */
    $http.get('sources/get').then(function (response) {
        $scope.sources = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });

});

/**
 * Sourcenew Controller - Create a new Source
 */
app.controller('sourcenewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.source = "";

    /**
     * Save Function to create a new Source at Database 
     */
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

/**
 * SourceDetail Controller - Edit selected Source
 */
app.controller('sourcedetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    /**
     * get Sourcedata to fill into Form for updating selected source
     */
    $http.post('source/info', {
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

    }; //end update Function

}); //end sourcedetailController
