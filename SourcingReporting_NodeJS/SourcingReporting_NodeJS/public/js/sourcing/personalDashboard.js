app.controller('personalDashboardController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.userFirstname = "";
    $scope.greetings = "";
    $scope.yearToFilter = $('#yearToFilter').val();
    $scope.monthName = "";

    var currentTime = new Date().getHours();
    var currentMonth = new Date().getMonth()+1;

    if (currentTime >= 0 && currentTime <= 4) {
        $scope.greetings = "Du solltest besser schlafen, ";
    } else if (currentTime > 4 && currentTime <= 6) {
        $scope.greetings = "Der frühe Vogel fängt den Wurm, ";
    } else if (currentTime > 6 && currentTime < 11) {
        $scope.greetings = "Guten Morgen ";
    } else if (currentTime >= 11 && currentTime <= 13) {
        $scope.greetings = "Mahlzeit ";
    } else if (currentTime > 13 && currentTime <= 17) {
        $scope.greetings = "Hallo ";
    } else if (currentTime > 17 && currentTime <= 20) {
        $scope.greetings = "Guten Abend ";
    } else {
        $scope.greetings = "Um diese Zeit solltest du nicht mehr arbeiten, ";
    }

    switch (currentMonth) {
        case 1: $scope.monthName = "Jänner";
            break;
        case 2: $scope.monthName = "Februar";
            break;
        case 3: $scope.monthName = "März";
            break;
        case 4: $scope.monthName = "April";
            break;
        case 5: $scope.monthName = "Mai";
            break;
        case 6: $scope.monthName = "Juni";
            break;
        case 7: $scope.monthName = "Juli";
            break;
        case 8: $scope.monthName = "August";
            break;
        case 9: $scope.monthName = "September";
            break;
        case 10: $scope.monthName = "Oktober";
            break;
        case 11: $scope.monthName = "November";
            break;
        case 12: $scope.monthName = "Dezember";
            break;
        default: $scope.monthName = "";
    }

    $http.post('user/showUserDetails').then(function (response) {
        $scope.user = response.data.data;
    });
   
    $http.get('user/getAllBirthdays').then(function (response) {
        $scope.birthdays = response.data.data;
        $scope.birthdayString = "";

        if ($scope.birthdays != null) {
            $scope.birthdayClass = "birthdayToday";
        } 
    });

    $http.post('statistics/myWeek').then(function (response) {
        $scope.myWeek = response.data.data;
        $scope.myWeekRequest = response.data.data.request;
        $scope.myWeekNotRequested = response.data.data.notRequested;
        $scope.myWeekTelNotice = response.data.data.telnotice;
        $scope.myWeekHires = response.data.data.hires;
        
        if (!response.data.success){
            alertify.error(response.data.message);
        }
    });

    $http.post('personalDashboard/myRememberMeListThisMonth').then(function (response) {
        $scope.candidate = response.data.data;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    });

    $scope.update = function () {
        $scope.yearToFilter = $('#yearToFilter').val();

        $http.post('statistics/requestsByYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.requestsFromSource = response.data.data.requestsFromSource;
            $scope.allRequests = response.data.data.allRequests;
            if (!response.data.success) {
                alertify.error(response.data.message);
            }
        });

        $http.post('statistics/myYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.myYear = response.data.data;
            if (!response.data.success) {
                alertify.error(response.data.message);
            }
        });
    };
    $scope.update();
});