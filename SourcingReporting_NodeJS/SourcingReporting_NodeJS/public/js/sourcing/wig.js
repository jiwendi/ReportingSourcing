

/**
 * wigController - WIG Overview
 */
app.controller('wigController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.showusercandidates = false;
    
    /**
     * get WIGs for the Overview
     */
    $http.get('wig/get').then(function (response) {
        $scope.wigs = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });
    
});

/**
 * wigNewController - Add a new WIG
 */
app.controller('wignewController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    

    /**
     * Save Function to create a new WIG at Database 
     */
    $scope.save = function () {
        $scope.message = "";
        $scope.start = $('#start').val();
        $scope.end = $('#end').val();
       


        $http.post('wig/save', {
            name: $scope.wig.name, start: $scope.start, end: $scope.end, goal: $scope.wig.goal
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
           
            if (response.data.success) {
                $scope.message = response.data.message;
               
                setTimeout(function () {
                    window.location.href = "#!wigs"; //will redirect to wigs
                }, 2000); //will call the function after 2 secs. --> message showed for 2 sec.

            }
            
        });
    };
});

/**
 * WIGDetail Controller - Edit or delete selected WIG
 */
app.controller('wigdetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    /**
     * get WIGdata to fill into Form for updating selected WIG
     */
    $http.post('wig/detailinfo', {
        id: $routeParams.wigid
    }).then(function (response) {
        
        $scope.wig = response.data.data;
        $scope.start = toLocalDate($scope.wig.start);
        $scope.end = toLocalDate($scope.wig.end);


        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;
        });


    $scope.update = function () {
        $scope.message = "";
        
        var start = toLocalDate($scope.start, 2);
        var end = toLocalDate($scope.end, 2);
        
        $http.post('wig/update', {
            id: $scope.wig.id, name: $scope.wig.name, start: start, end: end, goal: $scope.wig.goal, active: $scope.wig.active
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });

    }; //end update Function

    $scope.delete = function () {
        $scope.message = "";
        $http.post('wig/delete', {
            id: $scope.wig.id
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;

            if (response.data.success) {
                $scope.message = response.data.message;
                //window.location = '#!candidate/new';

                setTimeout(function () {
                    window.location.href = "#!wigs"; // redirect
                }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.

            }

        });

    }; //end update Function


}); //end wigdetailController
