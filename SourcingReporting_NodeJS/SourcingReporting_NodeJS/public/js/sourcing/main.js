var app = angular.module("sourcingApp", ['ngRoute', 'angular.filter']);

const THIS_YEAR = new Number(2018);
const FILTER_FROM = new Date('2018-01-01');
const FILTER_TO = new Date('2018-12-31');
const FILTER_DAYS = new Number(365);

const ACTIVE_SOURCER = new Number(10.5);

const WEEKLY_GOAL_TELNOTICE = new Number(5);
const WEEKLY_GOAL_REQUESTS = new Number(20); 

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'templates/releaseInfo.html',
            controller: 'dashboardController'
        }).
            //User Verwaltung
            when('/users', {
                templateUrl: 'templates/users.html',
                controller: 'usersController'
            }).
            when('/userdetail', {
                templateUrl: 'templates/userdetail.html',
                controller: 'userdetailController'
            }).
            when('/userdetail/:userid', {
                templateUrl: 'templates/userdetail.html',
                controller: 'userdetailController'
            }).
            when('/users/new', {
                templateUrl: 'templates/usernew.html',
                controller: 'usernewController'
            }).
            //Team Verwaltung
            when('/teams', {
                templateUrl: 'templates/teams.html',
                controller: 'teamsController'
            }).
            when('/team/new', {
                templateUrl: 'templates/teamnew.html',
                controller: 'teamnewController'
            }).
            when('/teamdetail', {
                templateUrl: 'templates/teamdetail.html',
                controller: 'teamdetailController'
            }).
            when('/teamdetail/:teamid', {
                templateUrl: 'templates/teamdetail.html',
                controller: 'teamdetailController'
            }).
            //Gruppen Verwaltung
            when('/group/new', {
                templateUrl: 'templates/groupnew.html',
                controller: 'groupnewController'
            }).
            //Quellen Verwaltung
            when('/sources', {
                templateUrl: 'templates/sources.html',
                controller: 'sourcesController'
            }).
            when('/source/new', {
                templateUrl: 'templates/sourcenew.html',
                controller: 'sourcenewController'
            }).
            when('/sourcedetail', {
                templateUrl: 'templates/sourcedetail.html',
                controller: 'sourcedetailController'
            }).
            when('/sourcedetail/:sourceid', {
                templateUrl: 'templates/sourcedetail.html',
                controller: 'sourcedetailController'
            }).
            //Kandidaten Verwaltung
            when('/candidates', {
                templateUrl: 'templates/candidates.html',
                controller: 'candidatesController'
            }).
            when('/candidate/new', {
                templateUrl: 'templates/candidatenew.html',
                controller: 'candidatenewController'
            }).
            when('/candidatedetail', {
                templateUrl: 'templates/candidatedetail.html',
                controller: 'candidatedetailController'
            }).
            when('/candidatedetail/:candidateid', {
                templateUrl: 'templates/candidatedetail.html',
                controller: 'candidatedetailController'
            }).
            //RememberMe Liste
            when('/rememberMe', {
                templateUrl: 'templates/rememberMe_List.html',
                controller: 'rememberMeListController'
            }).
            //eR Kandidaten
            when('/candidates_eR', {
                templateUrl: 'templates/candidates_eR.html',
                controller: 'candidatesERController'
            }).
            when('/candidate/newER', {
                templateUrl: 'templates/candidatenew_eR.html',
                controller: 'candidatenewERController'
            }).
            when('/candidatedetaileR', {
                templateUrl: 'templates/candidatedetail_eR.html',
                controller: 'candidatedetailERController'
            }).
            when('/candidatedetaileR/:candidateid', {
                templateUrl: 'templates/candidatedetail_eR.html',
                controller: 'candidatedetailERController'
            }).
            //Statistiken
            when('/statistics', {
                templateUrl: 'templates/statistics/statisticsOverview.html',
                controller: 'statisticsController'
            }).
            when('/reqestsToHire', {
                templateUrl: 'templates/statistics/reqToHire.html',
                controller: 'statisticsOverallAnalysisController'
            }).
            when('/reqestsToHireFromPlattform', {
                templateUrl: 'templates/statistics/reqToHirePlattform.html',
                controller: 'statisticsOverallAnalysisByPlattformController'
            }).
            when('/HiresInTeam', {
                templateUrl: 'templates/statistics/hiresInTeams.html',
                controller: 'statisticsHiresByTeamController'
            }).
            when('/ResponseRate', {
                templateUrl: 'templates/statistics/responseRate.html',
                controller: 'statisticsResponseRateController'
            }).
            when('/TelefonNotizen', {
                templateUrl: 'templates/statistics/telNotice.html',
                controller: 'statisticsTelNoticeController'
            }).
            when('/TelefonNotizenGraph', {
                templateUrl: 'templates/statistics/telNoticeGraph.html',
                controller: 'statisticsTelNoticeController'
            }).
            when('/telnoticeBySourcer', {
                templateUrl: 'templates/statistics/telnoticeBySourcer.html',
                controller: 'statisticsTelNoticeBySourcerController'
            }).
            when('/hires', {
                templateUrl: 'templates/statistics/hireList.html',
                controller: 'statisticsHireListController'
            }).
            when('/weeklyNumbers', {
                templateUrl: 'templates/statistics/weeklyNumbers.html',
                controller: 'statisticsWeeklyNumbersController'
            }).
            when('/responseValues', {
                templateUrl: 'templates/statistics/responseValues.html',
                controller: 'responseValuesController'
            }).
            when('/timeToTelNoticeScattering', {
                templateUrl: 'templates/statistics/timeToTelNoticeScattering.html',
                controller: 'timeToTelNoticeScatteringController'
            }).
            when('/timeToInternScattering', {
                templateUrl: 'templates/statistics/timeToInternScattering.html',
                controller: 'timeToInternScatteringController'
            }).
            when('/timeToExternScattering', {
                templateUrl: 'templates/statistics/timeToExternScattering.html',
                controller: 'timeToExternScatteringController'
            }).
            when('/timeToHireScattering', {
                templateUrl: 'templates/statistics/timeToHireScattering.html',
                controller: 'timeToHireScatteringController'
            }).
            when('/timetomax', {
                templateUrl: 'templates/statistics/timeToMax.html',
                controller: 'timeToMaxController'
            }).
            //WIG
            when('/wigs', {
                templateUrl: 'templates/wigs.html',
                controller: 'wigController'
            }).
            when('/wig/new', {
                templateUrl: 'templates/wignew.html',
                controller: 'wignewController'
            }).
            when('/wigdetail', {
                templateUrl: 'templates/wigdetail.html',
                controller: 'wigdetailController'
            }).
            when('/wigdetail/:wigid', {
                templateUrl: 'templates/wigdetail.html',
                controller: 'wigdetailController'
            }).
            //Sourcing Heroes
            when('/sourcingHeroes', {
                templateUrl: 'templates/scoreboardHeroes.html',
                controller: 'sourcingHeroesController'
            }).
            //myDashboard
            when('/myDashboard', {
                templateUrl: 'templates/personalDashboard.html',
                controller: 'personalDashboardController'
            }).
            //Settings
            when('/settings', {
                templateUrl: 'templates/settingsOverview.html',
                controller: 'settingsController'
            }).
            when('/candidateAnonymize', {
                templateUrl: 'templates/anonymizeCandidates.html',
                controller: 'anonymizeCandidateController'
            }).
            //Standard: Candidate List
            otherwise({ redirectTo: '/myDashboard' });
        //otherwise({ redirectTo: '/candidates' });
    }]);

/**
 * Function for German DateFormat
 */
var datetimepickeroptions = {
    locale: 'de',
    format: 'L',
    calendarWeeks: true,
    showTodayButton: true
};

var toLocalDate = function (date) {
    return moment(date).toDate();
};

var toLocalDate = function (date, offset) {
    return moment(date).add(offset, 'hours').toDate();
};

var getColor = function (name) {
    var color = '';

    switch (name) {
        case 'red':
            color = 'rgba(250, 50, 70, 0.2)';
            break;
        case 'medium':
            color = 'rgba(158, 21, 34, 0.2)';
            break;
        case 'dark':
            color = 'rgba(90, 12, 20, 0.2)';
            break;
        case 'black':
            color = 'rgba(0, 0, 0, 0.2)';
            break;
        case 'gray-dark':
            color = 'rgba(89, 89, 89, 0.2)';
            break;
        case 'gray-medium':
            color = 'rgba(153, 153, 153, 0.2)';
            break;
        case 'gray-light':
            color = 'rgba(230, 230, 230, 0.2)';
            break;
        case 'blue':
            color = 'rgba(0, 160, 230, 0.2)';
            break;
        case 'green':
            color = 'rgba(30, 170, 80, 0.2)';
            break;
        case 'dark-green':
            color = 'rgba(0, 120, 60, 0.2)';
            break;
        case 'yellow':
            color = 'rgba(255, 200, 10, 0.2)';
            break;
        case 'lila':
            color = 'rgba(160, 70, 160, 0.2)';
            break;
        case 'pink':
            color = 'rgba(255, 130, 190, 0.2)';
            break;
        case 'magenta':
            color = 'rgba(255, 0, 255, 0.2)';
            break;
        case 'orange':
            color = 'rgba(255, 130, 0, 0.2)';
            break;
        default:
            color = 'rgba(250, 50, 70, 0.2)'; //default epunkt-red
    }
    return color;
}

var getBorderColor = function (name) {
    var color = '';

    switch (name) {
        case 'red':
            color = 'rgba(250, 50, 70, 1)';
            break;
        case 'medium':
            color = 'rgba(158, 21, 34, 1)';
            break;
        case 'dark':
            color = 'rgba(90, 12, 20, 1)';
            break;
        case 'black':
            color = 'rgba(0, 0, 0, 1)';
            break;
        case 'gray-dark':
            color = 'rgba(89, 89, 89, 1)';
            break;
        case 'gray-medium':
            color = 'rgba(153, 153, 153, 1)';
            break;
        case 'gray-light':
            color = 'rgba(230, 230, 230, 1)';
            break;
        case 'blue':
            color = 'rgba(0, 160, 230, 1)';
            break;
        case 'green':
            color = 'rgba(30, 170, 80, 1)';
            break;
        case 'dark-green':
            color = 'rgba(0, 120, 60, 1)';
            break;
        case 'yellow':
            color = 'rgba(255, 200, 10, 1)';
            break;
        case 'lila':
            color = 'rgba(160, 70, 160, 1)';
            break;
        case 'pink':
            color = 'rgba(255, 130, 190, 1)';
            break;
        case 'magenta':
            color = 'rgba(255, 0, 255, 1)';
            break;
        case 'orange':
            color = 'rgba(255, 130, 0, 1)';
            break;
        default:
            color = 'rgba(250, 50, 70, 1)'; //default epunkt-red
    }
    return color;
}

app.controller('dashboardController', function ($scope, $http) {
    //leer - wird nicht benötigt
});

app.controller('navBarController', function ($scope, $http) {

    $scope.weeklyTelnoticeToDo = WEEKLY_GOAL_TELNOTICE * ACTIVE_SOURCER;
    $scope.weeklyRequestsToDo = WEEKLY_GOAL_REQUESTS * ACTIVE_SOURCER;

    $scope.classTN = "false";
    $scope.classReq = "false";

    $http.post('user/showUserDetails').then(function (response) {
        $scope.user = response.data.data;
    });

    $http.get('wig/weeklyNumbersInHeader').then(function (response) {
        $scope.weeklyTN = response.data.data.weekly_telnotice;
        $scope.weeklyReq = response.data.data.weekly_requests;

        if ($scope.weeklyTN >= $scope.weeklyTelnoticeToDo)
        {
            $scope.classTN = "true";
        }

        if ($scope.weeklyReq >= $scope.weeklyRequestsToDo) {
            $scope.classReq = "true";
        }

    });

    $http.get('wig/showWigInHeader').then(function (response) {
        $scope.hireThisYear = response.data.data.hireThisYear;
        $scope.hireThisYeareR = response.data.data.hireThisYeareR;
        $scope.wig = response.data.data.wig;
    });

    $scope.searchCandidate = function () {
        var str = $scope.searchString;
        if (str.length == 0) {
            document.getElementById("livesearch").innerHTML = "";
            document.getElementById("livesearch").style.border = "0px";
            document.getElementById("livesearch").style.padding = "0px";
            return;
        } else {
            $http.post('candidate/livesearch', {
                searchString: $scope.searchString
            }).then(function (response) {
                document.getElementById("livesearch").innerHTML = response.data.data;
                document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
                document.getElementById("livesearch").className = "bg-light";
                document.getElementById("livesearch").style.maxHeight = "200px";
                document.getElementById("livesearch").style.overflowY = "scroll";
                document.getElementById("livesearch").style.position = "absolute";
                document.getElementById("livesearch").style.top = "49px";
                document.getElementById("livesearch").style.right = "135px";
                document.getElementById("livesearch").style.borderRadius = "5px";
                document.getElementById("livesearch").style.width = "202px";
                document.getElementById("livesearch").style.padding = "5px";

                if (!response.data.success) {
                    alertify.error(response.data.message);
                }
            });
        }
    };

    $scope.logout = function () {
        $http.post('user/logout').then(function (response) {
            window.location = 'login.html';
        });
    };
});

app.controller('sideBarController', function ($scope, $http) {

    $http.get('candidate/showTimeInfosInSideBar').then(function (response) {
        $scope.timeinfo = response.data.data;
    });
});

app.controller('sourcingHeroesController', function ($scope, $http) {
    //leer
});

app.controller('settingsController', function ($scope, $http) {
    //leer
});