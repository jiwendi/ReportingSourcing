app.controller('jobprofilesController', function ($scope, $http) {

    $http.get('jobprofiles/showJobOverview').then(function (response) {
        $scope.kategorien = response.data.data.kategories;
        $scope.jobprofile = response.data.data.profiles;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    });
});

app.controller('jobcategoryNewController', function ($scope, $http) {
    $scope.jobcategory = { titel: "" };

    $scope.save = function () {
        $http.post('jobcategory/save', { titel: $scope.category.titel }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});

app.controller('jobprofileNewController', function ($scope, $http) {
    $scope.jobprofile = { jobtitle: "", category: null };

    $scope.showSelectValue = function (selectCategory) {
        $scope.category = selectCategory;
    }

    $http.get('jobcategory/getDataForSelect').then(function (response) {
        $scope.categories = response.data.data;
    });

    $scope.save = function () {
        $http.post('jobprofile/save', { jobtitle: $scope.jobprofile.jobtitle, category: $scope.category }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };
});