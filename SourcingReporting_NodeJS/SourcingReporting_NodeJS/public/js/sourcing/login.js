var app = angular.module("sourcingApp", []);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.controller('loginController', function ($scope, $http) {
    $scope.email = "";
    $scope.password = "";
    $scope.message = "";

    $scope.login = function () {
        $http.post('user/login', {
            email: $scope.email, passwd: $scope.password
        }).then(function (response) {
            if (response.data.success) {
                window.location = '/dashboard';
            } else {
               alert(response.data.message);
            }
        });
    }
});