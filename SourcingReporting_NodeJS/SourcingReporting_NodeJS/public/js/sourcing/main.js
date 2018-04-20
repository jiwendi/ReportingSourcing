﻿var app = angular.module("sourcingApp", ['ngRoute', 'angular.filter']);

const THIS_YEAR = new Number(2018);
const FILTER_FROM = new Date('2018-01-01');
const FILTER_TO = new Date('2018-12-31');

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'templates/dashboard.html',
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
                templateUrl: 'templates/statistics/statistics.html',
                controller: 'statisticsController'
            }).
            when('/reqestsToHire', {
                templateUrl: 'templates/statistics/reqToHire.html',
                controller: 'statisticsReqToHireController'
            }).
            when('/reqestsToHireFromPlattform', {
                templateUrl: 'templates/statistics/reqToHirePlattform.html',
                controller: 'statisticsReqToHirePlattformController'
            }).
            when('/HiresInTeam', {
                templateUrl: 'templates/statistics/hiresInTeams.html',
                controller: 'statisticsHiresInTeamController'
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
            when('/hires', {
                templateUrl: 'templates/statistics/hireList.html',
                controller: 'statisticsHireListController'
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
            //Standard: Candidate List
            otherwise({ redirectTo: '/candidates' });
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

//wird nicht verwendet - war zum testen wegen sortieren der Datum in der Kandidatenübersicht (funktionert nicht)
var dateTransform = function (date) {
    var date = new Date(date);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var transformedDate = year + '-' + month + '-' + day;

    return transformedDate;
};

var getColor = function (name) {

    var color = '';

    switch (name) {
        case 'red':
            color = 'rgba(229, 52, 70, 0.2)';
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
        case 'yellow':
            color = 'rgba(255, 200, 10, 0.2)';
            break;
        default:
            color = 'rgba(229, 52, 70, 0.2)'; //default red
    }

    return color;
}

var getBorderColor = function (name) {

    var color = '';

    switch (name) {
        case 'red':
            color = 'rgba(229, 52, 70, 1)';
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
        default:
            color = 'rgba(229, 52, 70, 1)'; //default red
    }

    return color;
}


/**
 * Dashboard Controller
 */
app.controller('dashboardController', function ($scope, $http) {
    //leer
});

/**
 * NavBarController - LoggedIn User and Search
 */
app.controller('navBarController', function ($scope, $http) {
    $http.post('user/info').then(function (response) {
        $scope.user = response.data.data;
    });

    $http.get('wig/info').then(function (response) {
        $scope.hireThisYear = response.data.data.hireThisYear;
        $scope.hireThisYeareR = response.data.data.hireThisYeareR;
        $scope.wig = response.data.data.wig;
    });

});

/**
 * SideBarController - Logout
 */
app.controller('sideBarController', function ($scope, $http) {

    $http.get('candidate/timeinfo').then(function (response) {
        $scope.timeinfo = response.data.data;
    });

    $scope.logout = function () {
        $http.post('user/logout').then(function (response) {
            window.location = 'login.html';
        });
    };
});