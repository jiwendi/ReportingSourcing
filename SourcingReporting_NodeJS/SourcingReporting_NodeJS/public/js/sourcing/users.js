/**
 * User Controller - Overview Users
 */
app.controller('usersController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.isuserinactive = function (user) {
        if (user.active == "Nein") {
            return "inactiveuser";
        } else {
            return "";
        }
    };

   

    /**
     * get User-Data for the user Overview
     */
    $http.get('users/get').then(function (response) {
        $scope.users = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });
});

/**
 * Userdetail Controller - User Details
 */
app.controller('userdetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.password = "";
    $scope.password2 = "";

    /**
     * Insert Userdata in Form for editing the selected User
     */
    $http.post('user/info', { userid: $routeParams.userid }).then(function (response) {
        $scope.user = response.data.data;
        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;

        var selectAdmin = $('#selectadmin');
        selectAdmin.select2();

        var selectActive = $('#selectactive');
        selectActive.select2();

        if (response.data.success) {
            selectAdmin.val($scope.user.admin);
            selectAdmin.trigger("change");
            selectAdmin.on("select2:select", function (e) {
                var id = selectAdmin.val();
                $scope.user.admin = id;
            });

            selectActive.val($scope.user.active);
            selectActive.trigger("change");
            selectActive.on("select2:select", function (e) {
                var id = selectActive.val();
                $scope.user.active = id;
            });

        }

    });

    /**
     * Update Function - send updated Data to Database
     */
    $scope.update = function () {
        $scope.message = "";
        $http.post('user/update', {
            userid: $scope.user.id, firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email, password: $scope.password, password2: $scope.password2, admin: $scope.user.admin, active: $scope.user.active
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });
    };

}); 

/**
 * Usernew Controller - Create a new User
 */
app.controller('usernewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.password = "";
    $scope.password2 = "";
    $scope.user = { firstname: "", lastname: "", email: "", admin: 0, active: 1 };

    /**
     * Save Function to create a new User at Database 
     */
    $scope.save = function () {
        $scope.message = "";
        $http.post('user/save', {
            firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email, password: $scope.password, password2: $scope.password2, admin: $scope.user.admin, active: $scope.user.active
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });
    };
});