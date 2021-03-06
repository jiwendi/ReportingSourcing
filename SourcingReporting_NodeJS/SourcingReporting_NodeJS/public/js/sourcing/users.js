﻿app.controller('usersController', function ($scope, $http) {
    $scope.isuserinactive = function (user) {
        if (user.active == "Nein") {
            return "inactiveuser";
        } else {
            return "";
        }
    };

    $http.get('users/showUserOverview').then(function (response) {
        $scope.users = response.data.data;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    });
});

app.controller('userdetailController', function ($scope, $http, $routeParams) {
    $scope.password = "";
    $scope.password2 = "";

    $http.post('user/showUserDetails', { userid: $routeParams.userid }).then(function (response) {
        $scope.user = response.data.data;

        $scope.birthday = toLocalDate($scope.user.birthday);

        if (!response.data.success) {
            alertify.error(response.data.message);
        }

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
    /*
    $http.post('uploadUserImg').then(function (response) {
        if (response.data.success) {
            alertify.success(response.data.message);
        } else {
            alertify.error(response.data.message);
        }
    });
    */

    $scope.update = function () {
        $http.post('user/update', {
            userid: $scope.user.id, firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email, password: $scope.password, password2: $scope.password2, admin: $scope.user.admin, active: $scope.user.active, start: $scope.user.start, birthday: $scope.birthday, hero: $scope.user.hero, heroDescr: $scope.user.heroDescr, imageName: $scope.user.imageName
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});

app.controller('usernewController', function ($scope, $http, $routeParams) {
    $scope.password = "";
    $scope.password2 = "";
    $scope.user = { firstname: "", lastname: "", email: "", admin: 0, active: 1, birthday: new Date(), start: "", hero:"", heroDescr: "", imageName: "noImage.png" };

    $scope.save = function () {
        $http.post('user/save', {
            firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email, password: $scope.password, password2: $scope.password2,
            admin: $scope.user.admin, active: $scope.user.active, start: $scope.user.start, birthday: $scope.user.birthday, hero: $scope.user.hero,
            heroDescr: $scope.user.heroDescr, imageName: $scope.user.imageName
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});