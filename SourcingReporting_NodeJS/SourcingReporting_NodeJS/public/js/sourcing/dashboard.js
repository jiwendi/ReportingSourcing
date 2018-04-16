//var app = angular.module("sourcingApp", ['ngRoute', 'angular.filter']);

//const THIS_YEAR = new Number(2018);
//const FILTER_FROM = new Date('2018-01-01');
//const FILTER_TO = new Date('2018-12-31');

//app.config(['$routeProvider',
//    function ($routeProvider) {
//    $routeProvider.when('/dashboard', {
//            templateUrl: 'templates/dashboard.html',
//            controller: 'dashboardController'
//        }).
//        //User Verwaltung
//        when('/users', {
//            templateUrl: 'templates/users.html',
//            controller: 'usersController'
//        }).
//        when('/userdetail', {
//            templateUrl: 'templates/userdetail.html',
//            controller: 'userdetailController'
//        }).
//        when('/userdetail/:userid', {
//            templateUrl: 'templates/userdetail.html',
//            controller: 'userdetailController'
//        }).
//        when('/users/new', {
//            templateUrl: 'templates/usernew.html',
//            controller: 'usernewController'
//        }).
//        //Team Verwaltung
//        when('/teams', {
//            templateUrl: 'templates/teams.html',
//            controller: 'teamsController'
//        }).
//        when('/team/new', {
//            templateUrl: 'templates/teamnew.html',
//            controller: 'teamnewController'
//        }).
//        when('/teamdetail', {
//            templateUrl: 'templates/teamdetail.html',
//            controller: 'teamdetailController'
//        }).
//        when('/teamdetail/:teamid', {
//            templateUrl: 'templates/teamdetail.html',
//            controller: 'teamdetailController'
//        }).
//        //Gruppen Verwaltung
//        when('/group/new', {
//            templateUrl: 'templates/groupnew.html',
//            controller: 'groupnewController'
//        }).
//        //Quellen Verwaltung
//        when('/sources', {
//            templateUrl: 'templates/sources.html',
//            controller: 'sourcesController'
//        }).
//        when('/source/new', {
//            templateUrl: 'templates/sourcenew.html',
//            controller: 'sourcenewController'
//        }).
//        when('/sourcedetail', {
//            templateUrl: 'templates/sourcedetail.html',
//            controller: 'sourcedetailController'
//        }).
//        when('/sourcedetail/:sourceid', {
//            templateUrl: 'templates/sourcedetail.html',
//            controller: 'sourcedetailController'
//        }).
//        //Kandidaten Verwaltung
//        when('/candidates', {
//            templateUrl: 'templates/candidates.html',
//            controller: 'candidatesController'
//        }).
//        when('/candidate/new', {
//            templateUrl: 'templates/candidatenew.html',
//            controller: 'candidatenewController'
//        }).
//        when('/candidatedetail', {
//            templateUrl: 'templates/candidatedetail.html',
//            controller: 'candidatedetailController'
//        }).
//        when('/candidatedetail/:candidateid', {
//            templateUrl: 'templates/candidatedetail.html',
//            controller: 'candidatedetailController'
//        }).
//        //eR Kandidaten
//        when('/candidates_eR', {
//            templateUrl: 'templates/candidates_eR.html',
//            controller: 'candidatesERController'
//        }).
//        when('/candidate/newER', {
//            templateUrl: 'templates/candidatenew_eR.html',
//            controller: 'candidatenewERController'
//        }).
//        when('/candidatedetaileR', {
//            templateUrl: 'templates/candidatedetail_eR.html',
//            controller: 'candidatedetailERController'
//        }).
//        when('/candidatedetaileR/:candidateid', {
//            templateUrl: 'templates/candidatedetail_eR.html',
//            controller: 'candidatedetailERController'
//        }).
//        //Statistiken
//        when('/statistics', {
//            templateUrl: 'templates/statistics/statistics.html',
//            controller: 'statisticsController'
//        }).
//        when('/reqestsToHire', {
//            templateUrl: 'templates/statistics/reqToHire.html',
//            controller: 'statisticsReqToHireController'
//        }).
//        when('/reqestsToHireFromPlattform', {
//            templateUrl: 'templates/statistics/reqToHirePlattform.html',
//            controller: 'statisticsReqToHirePlattformController'
//        }).
//        when('/HiresInTeam', {
//            templateUrl: 'templates/statistics/hiresInTeams.html',
//            controller: 'statisticsHiresInTeamController'
//        }).
//        when('/ResponseRate', {
//            templateUrl: 'templates/statistics/responseRate.html',
//            controller: 'statisticsResponseRateController'
//        }).
//        when('/TelefonNotizen', {
//            templateUrl: 'templates/statistics/telNotice.html',
//            controller: 'statisticsTelNoticeController'
//        }).
//        when('/TelefonNotizenGraph', {
//            templateUrl: 'templates/statistics/telNoticeGraph.html',
//            controller: 'statisticsTelNoticeController'
//        }).
//        when('/hires', {
//            templateUrl: 'templates/statistics/hireList.html',
//            controller: 'statisticsHireListController'
//        }).
//        //WIG
//        when('/wigs', {
//            templateUrl: 'templates/wigs.html',
//            controller: 'wigController'
//        }).
//        when('/wig/new', {
//            templateUrl: 'templates/wignew.html',
//            controller: 'wignewController'
//        }).
//        when('/wigdetail', {
//            templateUrl: 'templates/wigdetail.html',
//            controller: 'wigdetailController'
//        }).
//        when('/wigdetail/:wigid', {
//            templateUrl: 'templates/wigdetail.html',
//            controller: 'wigdetailController'
//        }).
//        //Standard: Candidate List
//        otherwise({ redirectTo: '/candidates' });
//}]);

///**
// * Function for German DateFormat
// */
//var datetimepickeroptions = {
//    locale: 'de',
//    format: 'L',
//    calendarWeeks: true,
//    showTodayButton: true
//};

//var toLocalDate = function (date) {
//    return moment(date).toDate();
//};

//var toLocalDate = function (date, offset) {

//    return moment(date).add(offset,'hours').toDate();
//};

////wird nicht verwendet - war zum testen wegen sortieren der Datum in der Kandidatenübersicht (funktionert nicht)
//var dateTransform = function (date) {
//    var date = new Date(date);

//    var day = date.getDate();
//    var month = date.getMonth() + 1;
//    var year = date.getFullYear();

//    if (month < 10) month = "0" + month;
//    if (day < 10) day = "0" + day;

//    var transformedDate = year + '-' + month + '-' + day;

//    return transformedDate;
//};

//var getColor = function (name) {

//    var color = '';

//    switch (name) {
//        case 'red':
//            color = 'rgba(229, 52, 70, 0.2)';
//            break;
//        case 'medium':
//            color = 'rgba(158, 21, 34, 0.2)';
//            break;
//        case 'dark':
//            color = 'rgba(90, 12, 20, 0.2)';
//            break;
//        case 'black':
//            color = 'rgba(0, 0, 0, 0.2)';
//            break;
//        case 'gray-dark':
//            color = 'rgba(89, 89, 89, 0.2)';
//            break;
//        case 'gray-medium':
//            color = 'rgba(153, 153, 153, 0.2)';
//            break;
//        case 'gray-light':
//            color = 'rgba(230, 230, 230, 0.2)';
//            break;
//        default:
//            color = 'rgba(229, 52, 70, 0.2)'; //default red
//    }

//    return color;
//}

//var getBorderColor = function (name) {

//    var color = '';

//    switch (name) {
//        case 'red':
//            color = 'rgba(229, 52, 70, 1)';
//            break;
//        case 'medium':
//            color = 'rgba(158, 21, 34, 1)';
//            break;
//        case 'dark':
//            color = 'rgba(90, 12, 20, 1)';
//            break;
//        case 'black':
//            color = 'rgba(0, 0, 0, 1)';
//            break;
//        case 'gray-dark':
//            color = 'rgba(89, 89, 89, 1)';
//            break;
//        case 'gray-medium':
//            color = 'rgba(153, 153, 153, 1)';
//            break;
//        case 'gray-light':
//            color = 'rgba(230, 230, 230, 1)';
//            break;
//        default:
//            color = 'rgba(229, 52, 70, 1)'; //default red
//    }

//    return color;
//}


///**
// * Dashboard Controller
// */
//app.controller('dashboardController', function ($scope, $http) {
//   //leer
//});

///**
// * User Controller - Overview Users
// */
//app.controller('usersController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    $scope.isuserinactive = function (user) {
//        if (user.active == "Nein") {
//            return "inactiveuser";
//        } else {
//            return "";
//        }
//    };

   

//    /**
//     * get User-Data for the user Overview
//     */
//    $http.get('users/get').then(function (response) {
//        $scope.users = response.data.data;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;
//    });
//});

///**
// * Userdetail Controller - User Details
// */
//app.controller('userdetailController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.password = "";
//    $scope.password2 = "";

//    /**
//     * Insert Userdata in Form for editing the selected User
//     */
//    $http.post('user/info', { userid: $routeParams.userid }).then(function (response) {
//        $scope.user = response.data.data;
//        $scope.iserrmessage = !response.data.sucess;
//        $scope.message = response.data.message;

//        var selectAdmin = $('#selectadmin');
//        selectAdmin.select2();

//        var selectActive = $('#selectactive');
//        selectActive.select2();

//        if (response.data.success) {
//            selectAdmin.val($scope.user.admin);
//            selectAdmin.trigger("change");
//            selectAdmin.on("select2:select", function (e) {
//                var id = selectAdmin.val();
//                $scope.user.admin = id;
//            });

//            selectActive.val($scope.user.active);
//            selectActive.trigger("change");
//            selectActive.on("select2:select", function (e) {
//                var id = selectActive.val();
//                $scope.user.active = id;
//            });

//        }

//    });

//    /**
//     * Update Function - send updated Data to Database
//     */
//    $scope.update = function () {
//        $scope.message = "";
//        $http.post('user/update', {
//            userid: $scope.user.id, firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email, password: $scope.password, password2: $scope.password2, admin: $scope.user.admin, active: $scope.user.active
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//            });
//    };

//}); 

///**
// * Usernew Controller - Create a new User
// */
//app.controller('usernewController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.password = "";
//    $scope.password2 = "";
//    $scope.user = { firstname: "", lastname: "", email: "", admin: 0, active: 1 };

//    /**
//     * Save Function to create a new User at Database 
//     */
//    $scope.save = function () {
//        $scope.message = "";
//        $http.post('user/save', {
//            firstname: $scope.user.firstname, lastname: $scope.user.lastname, email: $scope.user.email, password: $scope.password, password2: $scope.password2, admin: $scope.user.admin, active: $scope.user.active
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//            });
//    };
//});

///**
// * TeamsController - TeamOverview
// */
//app.controller('teamsController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
    
//    /**
//     * get Team and Group Data for Team & Group Overview
//     */
//    $http.get('teams/get').then(function (response) {
//        $scope.groups = response.data.data.groups;
//        $scope.teams = response.data.data.teams;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;
//    });

    
    
//});

///**
// * TeamNew Controller - Controller for create a new Team at Database
// */
//app.controller('teamnewController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.team = { teamname: "", gruppe: ""};
//    $scope.gruppe = "";

//    //get Value from groupSelect
//    $scope.showSelectValue = function (groupSelect) {
//       // console.log(groupSelect);
//        $scope.gruppe = groupSelect;
//    }

//    /**
//     * Save Function to save Team at Database
//     */
//    $scope.save = function () {
//        $scope.message = "";
//        $http.post('team/save', {
//            teamname: $scope.team.teamname, gruppe : $scope.gruppe
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    };

//    /**
//     * Get Group Data to fill into select
//     */
//    $http.post('team/data').then(function (response) {
//        $scope.groups = response.data.data;
//    });

//}); 


///**
// * TeamDetail Controller - Edit selected Team
// */
//app.controller('teamdetailController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
    
//    /**
//     * get Teamdata to fill into Form for updating selected Team
//     */
//    $http.post('team/info', { teamid: $routeParams.teamid }).then(function (response) {
//        $scope.team = response.data.data.team;
//        $scope.gruppe = response.data.data.gruppe;
//        $scope.iserrmessage = !response.data.sucess;
//        $scope.message = response.data.message;

//        var selectActive = $('#selectactive');
//        selectActive.select2();

//        selectActive.val($scope.team.active);
//        selectActive.trigger("change");
//        selectActive.on("select2:select", function (e) {
//            var id = selectActive.val();
//            $scope.team.active = id;
//        });

//        var selectGroup = $('#selectgroup');
//        selectGroup.select2();

//        //console.log($scope.gruppe); //alle Gruppen
        
//        selectGroup.val($scope.team.city_group);
//        selectGroup.trigger("change");
//        selectGroup.on("select2:select", function (e) {
//            var id = selectGroup.val();
//            $scope.gruppe.id = id;
//        });

        
//    });

//    $scope.update = function () {
//        $scope.message = "";
//        $http.post('team/update', { id: $scope.team.id, name: $scope.team.name, gruppe: $scope.gruppe.city, active: $scope.team.active }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });

//    }; //end update Function
       

//}); //end teamdetailController

///**
// * GroupNew Controller - Controller for create a new City-Group at Database
// */
//app.controller('groupnewController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.group = "";

//    /**
//     * Save Function to save Team at Database
//     */
//    $scope.save = function () {
//        $scope.message = "";
//        $http.post('group/save', {
//            groupname: $scope.group
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    };
//}); 

///**
// * Sources Controller - Sources Overview
// */
//app.controller('sourcesController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    $scope.issourceinactive = function (source) {
//        if (source.active == "Nein") {
//            return "inactivesource";
//        } else {
//            return "";
//        }
//    };
//    /**
//     * get Sources for the Overview
//     */
//    $http.get('sources/get').then(function (response) {
//        $scope.sources = response.data.data;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;
//    });

//});

///**
// * Sourcenew Controller - Create a new Source
// */
//app.controller('sourcenewController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.source = "";

//    /**
//     * Save Function to create a new Source at Database 
//     */
//    $scope.save = function () {
//        $scope.message = "";
//        $http.post('source/save', {
//            sourcename: $scope.source
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    };
//});

///**
// * SourceDetail Controller - Edit selected Source
// */
//app.controller('sourcedetailController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    /**
//     * get Sourcedata to fill into Form for updating selected source
//     */
//    $http.post('source/info', {
//        id: $routeParams.sourceid
//    }).then(function (response) {
//        $scope.source = response.data.data;
//        $scope.iserrmessage = !response.data.sucess;
//        $scope.message = response.data.message;
//    });


//    $scope.update = function () {
//        $scope.message = "";
//        $http.post('source/update', {
//            id: $scope.source.id, name: $scope.source.name, active: $scope.source.active
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });

//    }; //end update Function

//}); //end sourcedetailController

///**
// * Candidates Controller - Candidate Overview
// */
//app.controller('candidatesController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.showusercandidates = false;

//    /**
//     * get Candidates for the Overview & show User Candidates
//     */
//    $scope.update = function () {
//        $http.post('candidates/get', { showusercandidates: $scope.showusercandidates }).then(function (response) {
//            $scope.candidates = response.data.data.candidate;
//            $scope.countCandidate = response.data.data.countCandidate;
//        });
//    };

//    $scope.update();

//    $scope.updateTracking = function () {
//        $http.post('candidates/get', { showTracking: $scope.showTracking }).then(function (response) {
//            $scope.candidates = response.data.data.candidate;
//            $scope.countCandidate = response.data.data.countCandidate;
//        });
//    };
    

//    $scope.searchNames = function () {

//        // Declare variables 
//        var input, filter, table, tbody, tr, td, i;
//        input = document.getElementById("inputName");
//        filter = input.value.toUpperCase();
//        table = document.getElementById("candidates");
//        tbody = document.getElementById("tableBody");
//        tr = tbody.getElementsByTagName("tr");
        
//        // Loop through all table rows, and hide those who don't match the search query
//        for (i = 0; i < tr.length; i++) {
//            td = tr[i].getElementsByTagName("td")[2];
//            if (td) {
//                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//                    tr[i].style.display = "";
//                } else {
//                    tr[i].style.display = "none";
//                }
//            }
//        }
        

//    }

//    $scope.searchSource = function () {

//        // Declare variables 
//        var input, filter, table, tbody, tr, td, i;
//        input = document.getElementById("inputSource");
//        filter = input.value.toUpperCase();
//        table = document.getElementById("candidates");
//        tbody = document.getElementById("tableBody");
//        tr = tbody.getElementsByTagName("tr");

//        // Loop through all table rows, and hide those who don't match the search query
//        for (i = 0; i < tr.length; i++) {
//            td = tr[i].getElementsByTagName("td")[3];
//            if (td) {
//                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//                    tr[i].style.display = "";
//                } else {
//                    tr[i].style.display = "none";
//                }
//            }
//        }


//    }

//    $scope.searcheR = function () {

//        // Declare variables 
//        var input, filter, table, tbody, tr, td, i;
//        input = document.getElementById("inputeR");
//        filter = input.value.toUpperCase();
//        table = document.getElementById("candidates");
//        tbody = document.getElementById("tableBody");
//        tr = tbody.getElementsByTagName("tr");

//        // Loop through all table rows, and hide those who don't match the search query
//        for (i = 0; i < tr.length; i++) {
//            td = tr[i].getElementsByTagName("td")[4];
//            if (td) {
//                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//                    tr[i].style.display = "";
//                } else {
//                    tr[i].style.display = "none";
//                }
//            }
//        }


//    }



//});


///**
// * CandidateNew Controller - Create a new Candidate
// */
//app.controller('candidatenewController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    //Get Data for candidate new
//    $http.post('candidate/data').then(function (response) {
//        $scope.sources = response.data.data.sources;
//        $scope.teams = response.data.data.teams;
                
//        $scope.candidate = {
//            tracking: 1, request: 1, response: 0, research: null, telnotice: null
//        };

//        var date = new Date();
//        var day = date.getDate();
//        var month = date.getMonth() + 1;
//        var year = date.getFullYear();

//        if (month < 10) month = "0" + month;
//        if (day < 10) day = "0" + day;

//        var today = year + '-' + month + '-' + day;

//        document.getElementById('research').value = today;
//    });



//    $scope.source = "";

//    //get Value from groupSelect
//    $scope.showSourceValue = function (sourceSelect) {
//        $scope.source = sourceSelect;
//    }
    

//    /**
//     * Save Function to create a new Candidate at Database 
//     */
//    $scope.save = function () {
//        $scope.message = "";
//        $scope.telnotice = $('#telnotice').val();
//        $scope.research = $('#research').val();
//        $scope.intern = $('#intern').val();
//        $scope.extern = $('#extern').val();
//        $scope.hire = $('#hire').val();
//        $scope.team = $('#teamSelect').val();

//        var responseValue = null;


//        if ($scope.response == 1) {
//            responseValue = 1;
//        } else if ($scope.response == 2) {
//            responseValue = 0;
//        }

        
//        if ($('#research').val() == '') {
//            $scope.research = '0000-00-00';
//        } else {
//            $scope.research = $('#research').val();
//        }

//        if ($('#telnotice').val() == '') {
//            $scope.telnotice = '0000-00-00';
//        } else {
//            $scope.telnotice = $('#telnotice').val();
//        }

//        if ($('#intern').val() == '') {
//            $scope.intern = '0000-00-00';
//        } else {
//            $scope.intern = $('#intern').val();
//        }

//        if ($('#extern').val() == '') {
//            $scope.extern = '0000-00-00';
//        } else {
//            $scope.extern = $('#extern').val();
//        }

//        if ($('#hire').val() == '') {
//            $scope.hire = '0000-00-00';
//        } else {
//            $scope.hire = $('#hire').val();
//        }

//        if ($('#team').val() == '') {
//            $scope.team = null;
//        } else {
//            $scope.team = $('#team').val();
//        }
        
        
//        $http.post('candidate/save', {  
//            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source: $scope.source,
//            source_text: $scope.candidate.source_text, eR: $scope.candidate.eR, tracking: $scope.tracking, request: $scope.request,
//            response: $scope.response, responseVal: responseValue, telnotice: $scope.telnotice, intern: $scope.intern, infos: $scope.candidate.info,
//            extern: $scope.extern, hire: $scope.hire, team: $scope.team, research: $scope.research, scoreboard: $scope.candidate.scoreboard
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
            

//            if (response.data.success) {
//                $scope.message = response.data.message;
//                //window.location = '#!candidate/new';

//                setTimeout(function () {
//                    window.location.href = "#!candidate/new"; //will redirect to candidate/new
//                }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.

//            }
            
//        });
//    };
   
//});


///**
// * CandidateDetail Controller - Edit selected Candidate
// */
//app.controller('candidatedetailController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    /**
//     * get Candidate-data to fill into Form for updating selected Team
//     */
//    $http.post('candidate/info', { candidateid: $routeParams.candidateid }).then(function (response) {
//        $scope.candidate = response.data.data.candidate;
//        $scope.sources = response.data.data.sources;
//        $scope.teams = response.data.data.teams;
//        $scope.citys = response.data.data.citys;
//        $scope.sourcer = response.data.data.sourcer;

//        $scope.iserrmessage = !response.data.sucess;
//        $scope.message = response.data.message;
        

//        /**
//         * Dropdowns with Datamaps and select2
//         */
//        var sourcerData = $.map($scope.sourcer, function (sourcer) {
//            sourcer.text = sourcer.firstname + ' ' + sourcer.lastname;
//            return sourcer;
//        });

//        var teamData = $.map($scope.teams, function (teams) {
//            teams.text = teams.city + ' - ' + teams.name;
//            return teams;
//        });

//        var sourceData = $.map($scope.sources, function (sources) {
//            sources.text = sources.name;
//            return sources;
//        });

//        var selectSourcer = $('#selectSourcer');
//        selectSourcer.select2({ data: sourcerData });
//        selectSourcer.val($scope.candidate.sourcer);
//        selectSourcer.trigger("change");
//        selectSourcer.on("select2:select", function (e) {
//            var id = selectSourcer.val();
//            $scope.candidate.sourcer = id;
//        });

//        var selectTeam = $('#selectTeam');
//        selectTeam.select2({ data: teamData });
//        //selectTeam.val($scope.candidate.team_id);
//        //selectTeam.trigger("change");
//        selectTeam.on("select2:select", function (e) {
//            var id = selectTeam.val();
//            $scope.candidate.team_id = id;
//        });
        
//        var selectSource = $('#selectSource');
//        selectSource.select2({ data: sourceData });
//        //selectSource.val($scope.candidate.source_id);
//        //selectSource.trigger("change");
//        selectSource.on("select2:select", function (e) {
//            var id = selectSource.val();
//            $scope.candidate.source_id = id;
//        });

//        /**
//         * Dates with moment 
//         */
//        $scope.research = toLocalDate($scope.candidate.research);
//        $scope.telnotice = toLocalDate($scope.candidate.telnotice);
//        $scope.intern = toLocalDate($scope.candidate.intern);
//        $scope.extern = toLocalDate($scope.candidate.extern);
//        $scope.hire = toLocalDate($scope.candidate.hire);



//        /**
//         * Dropdown with select2
//         */

//        var selectTracking = $('#selectTracking');
//        selectTracking.select2();

//        var selectRequest = $('#selectRequest');
//        selectRequest.select2();

//        var selectResponse = $('#selectResponse');
//        selectResponse.select2();

//        var selectResponseVal = $('#selectResponseValue');
//        selectResponseVal.select2();

//        var scoreboard = $('#scoreboard');
//        scoreboard.select2();

//        //selectTracking.val($scope.candidate.tracking);
//        //selectTracking.trigger("change");
//        selectTracking.on("select2:select", function (e) {
//            var id = selectTracking.val();
//            $scope.tracking = id;
//        });

//        //selectRequest.val($scope.candidate.request);
//        //selectRequest.trigger("change");
//        selectRequest.on("select2:select", function (e) {
//            var id = selectRequest.val();
//            $scope.request = id;
//        });

//        $scope.response = 0;

//        if ($scope.candidate.response == 1 && $scope.candidate.response_value == 1) {
//            $scope.response = 1;
//        } else if ($scope.candidate.response == 1 && $scope.candidate.response_value == 0) {
//            $scope.response = 2;
//        }
        
//        //selectResponse.val($scope.response);
//        //selectResponse.trigger("change");
//        selectResponse.on("select2:select", function (e) {
//            var id = selectResponse.val();
//            $scope.response = id;
//        });
        
//        //scoreboard.val($scope.candidate.scoreboard);
//        //scoreboard.trigger("change");
//        scoreboard.on("select2:select", function (e) {
//            var id = scoreboard.val();
//            $scope.scoreboard = id;
//        });


//    });//end candidate/info

   
//    $scope.updateCandidate = function () {
//        $scope.message = "";

//        $http.post('candidate/updateCandidate', {
//            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source_text: $scope.candidate.source_text,
//            eR: $scope.candidate.eR, infos: $scope.candidate.infos
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//            });
//    }

//    $scope.updateSource = function (selectSource) {
//        $scope.source = selectSource;
        
//        $http.post('candidate/updateSource', {
//            id: $scope.candidate.id, source: $scope.source
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//            });

//        location.reload();
//    }

//    $scope.updateTeam = function (selectTeam) {
//        $scope.team = selectTeam;

//        $http.post('candidate/updateTeam', {
//            id: $scope.candidate.id, team: $scope.team
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });

//        location.reload();
//    }
    

//    $scope.updateResearch = function () {
//        $scope.message = "";
        
//        $http.post('candidate/updateResearch', {
//            id: $scope.candidate.id, research: $scope.research
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//            });
//    }

//    $scope.updateTelnotice = function () {
//        $scope.message = "";
        
//        $http.post('candidate/updateTelnotice', {
//            id: $scope.candidate.id, telnotice: $scope.telnotice
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    }

//    $scope.updateIntern = function () {
//        $scope.message = "";

//        $http.post('candidate/updateIntern', {
//            id: $scope.candidate.id, intern: $scope.intern
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    }

//    $scope.updateExtern = function () {
//        $scope.message = "";

//        $http.post('candidate/updateExtern', {
//            id: $scope.candidate.id, extern: $scope.extern
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    }

//    $scope.updateHire = function () {
//        $scope.message = "";

//        $http.post('candidate/updateHire', {
//            id: $scope.candidate.id, hire: $scope.hire
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    }

//    $scope.updateScoreboard = function (scoreboard) {
//        $scope.message = "";
//        $scope.scoreboard = scoreboard;

//        $http.post('candidate/updateScoreboard', {
//            id: $scope.candidate.id, scoreboard: $scope.scoreboard
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//            });

//        location.reload();
//    }

//    $scope.updateSourcer = function () {
//        $scope.message = "";
             
//        $http.post('candidate/updateSourcer', {
//            id: $scope.candidate.id, sourcer_id: $scope.selectSourcer
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });

//        location.reload();
        
        
//    }

//    $scope.updateOptions = function () {
//        $scope.message = "";

//        var responseValue = null;


//        if ($scope.response == 1) {
//            responseValue = 1;
//            $scope.candidate.response = 1;
//        } else if ($scope.response == 2) {
//            responseValue = 0;
//            $scope.candidate.response = 1;
//        } else {
//            $scope.candidate.response = 0;
//        }


//        $http.post('candidate/updateOptions', {
//            id: $scope.candidate.id, tracking: $scope.candidate.tracking, request: $scope.candidate.request,
//            response: $scope.candidate.response, response_value: responseValue
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//            });

//    }
    

//    $scope.delete = function () {
//        $scope.message = "";

//        if (confirm("Kandidat wirklich löschen?"))
//        { 
//            $http.post('candidate/delete', {
//                id: $scope.candidate.id
//            }).then(function (response) {
//                $scope.iserrmessage = !response.data.success;
//                $scope.message = response.data.message;

//                if (response.data.success) {
//                    $scope.message = response.data.message;
//                    //window.location = '#!candidate/new';

//                    setTimeout(function () {
//                        window.location.href = "#!candidates"; // redirect
//                    }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.
//                }
//            });
//        }



//    }; //end update Function
    
//}); //end candidatedetailController


////End CandidateDetail


///**
// * eR-Candidates Controller - eR-Candidate Overview
// */
//app.controller('candidatesERController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.showScoreboard = false;

//    /**
//     * get Candidates for the Overview & show User Candidates
//     */
//    $scope.update = function () {
//        $http.post('candidatesER/get', { showScoreboard: $scope.showScoreboard }).then(function (response) {
//            $scope.candidates = response.data.data.candidate;
//            $scope.countCandidate = response.data.data.countCandidate;
//        });
//    };

//    $scope.update();
//});


///**
// * CandidateNew eR Controller - Create a new eR Candidate
// */
//app.controller('candidatenewERController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    //Get Data for candidate new
//    $http.post('candidateER/data').then(function (response) {
//        $scope.teams = response.data.data.teams;
//    });
    
//    /**
//     * Save Function to create a new Candidate at Database 
//     */
//    $scope.save = function () {
//        $scope.message = "";
//        $scope.hire = $('#hire').val();
//        $scope.team = $('#teamSelect').val();
//        $scope.sourcer = $('#sourcer').val();
        
//        if ($('#hire').val() == '') {
//            $scope.hire = '0000-00-00';
//        } else {
//            $scope.hire = $('#hire').val();
//        }

//       /* if ($('#team').val() == '') {
//            $scope.team = null;
//        } else {
//            $scope.team = $('#team').val();
//        }*/

//        if ($('#sourcer').val() == '') {
//            $scope.sourcer = null;
//        } else {
//            $scope.team = $('#sourcer').val();
//        }
        
//        $http.post('candidateER/save', {
//            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR, 
//            hire: $scope.hire, team: $('#team').val(), scoreboard: $scope.scoreboard
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;


//            if (response.data.success) {
//                setTimeout(function () {
//                    window.location.href = "#!candidate/newER"; //will redirect to candidate/new
//                }, 1000); //will call the function after 2 secs. --> message showed for 2 sec
//            }

//        });
//    };

//});


///**
// * CandidateDetail Controller - Edit selected Candidate
// */
//app.controller('candidatedetailERController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    /**
//     * get Candidate-data to fill into Form for updating selected Team
//     */
//    $http.post('candidateER/info', { candidateid: $routeParams.candidateid }).then(function (response) {
//        $scope.candidate = response.data.data.candidate;
//        $scope.teams = response.data.data.teams;
//        $scope.citys = response.data.data.citys;
//        $scope.sourcer = response.data.data.sourcer;

//        $scope.iserrmessage = !response.data.sucess;
//        $scope.message = response.data.message;


//        /**
//         * Dropdowns with Datamaps and select2
//         */
//        var sourcerData = $.map($scope.sourcer, function (sourcer) {
//            sourcer.text = sourcer.firstname + ' ' + sourcer.lastname;
//            return sourcer;
//        });

//        var teamData = $.map($scope.teams, function (teams) {
//            teams.text = teams.city + ' - ' + teams.name;
//            return teams;
//        });
        

//        var selectSourcer = $('#selectSourcer');
//        selectSourcer.select2({ data: sourcerData });
//        selectSourcer.val($scope.candidate.sourcer);
//        selectSourcer.trigger("change");
//        selectSourcer.on("select2:select", function (e) {
//            var id = selectSourcer.val();
//            $scope.candidate.sourcer = id;
//        });

//        var selectTeam = $('#selectTeam');
//        selectTeam.select2({ data: teamData });
//        //selectTeam.val($scope.candidate.team_id);
//        //selectTeam.trigger("change");
//        selectTeam.on("select2:select", function (e) {
//            var id = selectTeam.val();
//            $scope.candidate.team_id = id;
//        });
        

//        /**
//         * Dates with moment 
//         */
//        $scope.hire = toLocalDate($scope.candidate.hire);



//        /**
//         * Dropdown with select2
//         */
        
//        var scoreboard = $('#scoreboard');
//        scoreboard.select2();
        
//        //scoreboard.val($scope.candidate.scoreboard);
//        //scoreboard.trigger("change");
//        scoreboard.on("select2:select", function (e) {
//            var id = scoreboard.val();
//            $scope.scoreboard = id;
//        });


//    });//end candidate/info


//    $scope.update = function () {
//        $scope.message = "";
        

//        var team_id = $('#team').val();

//        $http.post('candidateER/updateCandidate', {
//            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, eR: $scope.candidate.eR, team: team_id, hire: toLocalDate($scope.hire), scoreboard: $scope.scoreboard
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });
//    };
    
    
    
//    $scope.delete = function () {
//        $scope.message = "";

//        if (confirm("Kandidat wirklich löschen?")) {
//            $http.post('candidateER/delete', {
//                id: $scope.candidate.id
//            }).then(function (response) {
//                $scope.iserrmessage = !response.data.success;
//                $scope.message = response.data.message;

//                if (response.data.success) {
//                    $scope.message = response.data.message;
//                    //window.location = '#!candidate/new';

//                    setTimeout(function () {
//                        window.location.href = "#!candidates_eR"; // redirect
//                    }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.
//                }
//            });
//        }
        
//    }; //end delete Function
    
//}); //end candidatedetailERController
















///**
// * StatisticsController
// */
//app.controller('statisticsController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
    
//    $scope.yearToFilter = $('#yearToFilter').val();

//    $scope.update = function () {

//        $scope.yearToFilter = $('#yearToFilter').val();

//        $http.post('stat/rfe', { yearToFilter: $scope.yearToFilter }).then(function (response) {
//            $scope.requestsFromSource = response.data.data.requestsFromSource;
//            $scope.allRequests = response.data.data.allRequests;
//            $scope.message = response.data.message;
//            $scope.iserrmessage = !response.data.success;
//        });

//        $http.post('stat/myYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
//           /*
//        $scope.myYearRequest = response.data.data.request;
//        $scope.myYearTelNotice = response.data.data.telNotice;
//        $scope.myYearHire = response.data.data.hires;
//        */
//            $scope.myYear = response.data.data;
//            $scope.message = response.data.message;
//            $scope.iserrmessage = !response.data.success;
//        });

//    };

//    $http.post('stat/rfe', { yearToFilter: $scope.yearToFilter }).then(function (response) {
//        $scope.requestsFromSource = response.data.data.requestsFromSource;
//        $scope.allRequests = response.data.data.allRequests;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;
//    });

//    $http.post('stat/myYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
//        /*
//        $scope.myYearRequest = response.data.data.request;
//        $scope.myYearTelNotice = response.data.data.telNotice;
//        $scope.myYearHire = response.data.data.hires;
//        */
//        $scope.myYear = response.data.data;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;
//    });

//    $http.post('stat/myWeek').then(function (response) {
//        $scope.myWeek = response.data.data;
//        $scope.myWeekRequest = response.data.data.request;
//        $scope.myWeekTelNotice = response.data.data.telnotice;
//        $scope.myWeekHires = response.data.data.hires;

//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;
//    });

//});

//app.controller('statisticsReqToHireController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    $scope.filterFrom = FILTER_FROM;
//    $scope.filterTo = FILTER_TO;
    
//    $http.post('stat/allData', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//        $scope.allData = response.data.data;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;

//        var ctx = $("#myChart");
//        var myChart = new Chart(ctx, {
//            type: 'bar',
//            data: {
//                labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
//                datasets: [{
//                    label: 'Anzahl',
//                    data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
//                    backgroundColor: [
//                        getColor('red'),
//                        getColor('gray-dark'),
//                        getColor('gray-dark'),
//                        getColor('gray-dark'),
//                        getColor('red'),
//                        getColor('black')
//                    ],
//                    borderColor: [
//                        getBorderColor('red'),
//                        getBorderColor('gray-dark'),
//                        getBorderColor('gray-dark'),
//                        getBorderColor('gray-dark'),
//                        getBorderColor('red'),
//                        getBorderColor('black')
//                    ],
//                    borderWidth: 1
//                }]
//            },
//            options: {
//                legend: {
//                    position: 'bottom'
//                },
//                scales: {
//                    yAxes: [{
//                        ticks: {
//                            beginAtZero: true
//                        }
//                    }]
//                }
//            }
//        });



//    });//end allData


//    $scope.updateAllData = function () {
        
//        $scope.filterFrom = $('#from').val();
//        $scope.filterTo = $('#to').val();

//        $http.post('stat/allData', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//            $scope.allData = response.data.data;
//            $scope.message = response.data.message;
//            $scope.iserrmessage = !response.data.success;

//            var ctx = $("#myChart");
//            var myChart = new Chart(ctx, {
//                type: 'bar',
//                data: {
//                    labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
//                    datasets: [{
//                        label: 'Anzahl',
//                        data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
//                        backgroundColor: [
//                            getColor('red'),
//                            getColor('gray-dark'),
//                            getColor('gray-dark'),
//                            getColor('gray-dark'),
//                            getColor('red'),
//                            getColor('black')
//                        ],
//                        borderColor: [
//                            getBorderColor('red'),
//                            getBorderColor('gray-dark'),
//                            getBorderColor('gray-dark'),
//                            getBorderColor('gray-dark'),
//                            getBorderColor('red'),
//                            getBorderColor('black')
//                        ],
//                        borderWidth: 1
//                    }]
//                },
//                options: {
//                    legend: {
//                        position: 'bottom'
//                    },
//                    scales: {
//                        yAxes: [{
//                            ticks: {
//                                beginAtZero: true
//                            }
//                        }]
//                    }
//                }
//            });



//        });//end allData

//    };

//});

//app.controller('statisticsReqToHirePlattformController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    $scope.filterFrom = FILTER_FROM;
//    $scope.filterTo = FILTER_TO;
//    $scope.selectSource = $('#selectSource').val();
    
//    $http.post('stat/allDataPlattform', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo, source: $scope.selectSource }).then(function (response) {
//        $scope.sources = response.data.data.sources;
//        $scope.allData = response.data.data.allData;

//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;

//        var ctx = $("#myChart");
//        var myChart = new Chart(ctx, {
//            type: 'bar',
//            data: {
//                labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
//                datasets: [{
//                    label: 'Anzahl',
//                    data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
//                    backgroundColor: [
//                        getColor('red'),
//                        getColor('gray-dark'),
//                        getColor('gray-dark'),
//                        getColor('gray-dark'),
//                        getColor('red'),
//                        getColor('black')
//                    ],
//                    borderColor: [
//                        getBorderColor('red'),
//                        getBorderColor('gray-dark'),
//                        getBorderColor('gray-dark'),
//                        getBorderColor('gray-dark'),
//                        getBorderColor('red'),
//                        getBorderColor('black')
//                    ],
//                    borderWidth: 1
//                }]
//            },
//            options: {
//                legend: {
//                    position: 'bottom'
//                },
//                scales: {
//                    yAxes: [{
//                        ticks: {
//                            beginAtZero: true
//                        }
//                    }]
//                }
//            }
//        });

//    });

//    $scope.updateAllDataPlattform = function () {
//        $scope.selectSource = $('#selectSource').val();
//        $scope.filterFrom = $('#from').val();
//        $scope.filterTo = $('#to').val();
       

//        $http.post('stat/allDataPlattform', { source: $scope.selectSource, filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//            $scope.sources = response.data.data.sources;
//            $scope.allData = response.data.data.allData;

//            $scope.message = response.data.message;
//            $scope.iserrmessage = !response.data.success;

//            var ctx = $("#myChart");
//            var myChart = new Chart(ctx, {
//                type: 'bar',
//                data: {
//                    labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
//                    datasets: [{
//                        label: 'Anzahl',
//                        data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
//                        backgroundColor: [
//                            getColor('red'),
//                            getColor('gray-dark'),
//                            getColor('gray-dark'),
//                            getColor('gray-dark'),
//                            getColor('red'),
//                            getColor('black')
//                        ],
//                        borderColor: [
//                            getBorderColor('red'),
//                            getBorderColor('gray-dark'),
//                            getBorderColor('gray-dark'),
//                            getBorderColor('gray-dark'),
//                            getBorderColor('red'),
//                            getBorderColor('black')
//                        ],
//                        borderWidth: 1
//                    }]
//                },
//                options: {
//                    legend: {
//                        position: 'bottom'
//                    },
//                    scales: {
//                        yAxes: [{
//                            ticks: {
//                                beginAtZero: true
//                            }
//                        }]
//                    }
//                }
//            });

//        });

//    };


//});

//app.controller('statisticsHiresInTeamController', function ($scope, $http) {
   
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    $scope.filterFrom = FILTER_FROM;
//    $scope.filterTo = FILTER_TO;

//    $http.post('stat/hiresInTeams', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//        $scope.teamHires = response.data.data;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;


//        $scope.labels = [];
//        $scope.anzahl = [];
//        $scope.backgroundColorForChart = [];
//        $scope.borderColorForChart = [];

//        for (var i = 0; i < $scope.teamHires.length; i++){
//            $scope.labels.push($scope.teamHires[i].name);
//            $scope.anzahl.push($scope.teamHires[i].anzahl);
//            $scope.backgroundColorForChart.push(getColor('gray-dark'));
//            $scope.borderColorForChart.push(getBorderColor('gray-dark'));
//    }
        
//        var ctx = $("#myChart");
//        var myChart = new Chart(ctx, {
//            type: 'bar',
//            data: {
//                labels: $scope.labels,
//                datasets: [{
//                    label: 'Anzahl',
//                    data: $scope.anzahl,
//                    backgroundColor: $scope.backgroundColorForChart,
//                    borderColor: $scope.borderColorForChart,
//                    borderWidth: 1
//                }]
//            },
//            options: {
//                legend: {
//                    position: 'bottom'
//                },
//                scales: {
//                    yAxes: [{
//                        ticks: {
//                            beginAtZero: true
//                        }
//                    }]
//                }
//            }
//        });



//    });//end allData


//    $scope.updateTeamHires = function () {

//        $scope.filterFrom = $('#from').val();
//        $scope.filterTo = $('#to').val();
        
//        $http.post('stat/hiresInTeams', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//            $scope.teamHires = response.data.data;
//            $scope.message = response.data.message;
//            $scope.iserrmessage = !response.data.success;

//            $scope.labels = [];
//            $scope.anzahl = [];
//            $scope.backgroundColorForChart = [];
//            $scope.borderColorForChart = [];

//            for (var i = 0; i < $scope.teamHires.length; i++) {
//                $scope.labels.push($scope.teamHires[i].name);
//                $scope.anzahl.push($scope.teamHires[i].anzahl);
//                $scope.backgroundColorForChart.push(getColor('gray-dark'));
//                $scope.borderColorForChart.push(getBorderColor('gray-dark'));
//            }


//            var ctx = $("#myChart");
//            var myChart = new Chart(ctx, {
//                type: 'bar',
//                data: {
//                    labels: $scope.labels,
//                    datasets: [{
//                        label: 'Anzahl',
//                        data: $scope.anzahl,
//                        backgroundColor: $scope.backgroundColorForChart,
//                        borderColor: $scope.borderColorForChart,
//                        borderWidth: 1
//                    }]
//                },
//                options: {
//                    legend: {
//                        position: 'bottom'
//                    },
//                    scales: {
//                        yAxes: [{
//                            ticks: {
//                                beginAtZero: true
//                            }
//                        }]
//                    }
//                }
//            });



//        });//end allData

//    };

//});

//app.controller('statisticsResponseRateController', function ($scope, $http) {

//    $scope.message = "";
//    $scope.iserrmessage = false;

//    $scope.filterFrom = FILTER_FROM;
//    $scope.filterTo = FILTER_TO;

//    $http.post('stat/responseRate', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//        $scope.responseRates = response.data.data.responseRates;
//        $scope.allResponseRate = response.data.data.allResponseRate;

//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;


//        $scope.labels = [];
//        $scope.requests = [];
//        $scope.responses = [];
//        $scope.backgroundColorForChart = [];
//        $scope.borderColorForChart = [];

//        for (var i = 0; i < $scope.responseRates.length; i++) {
//            $scope.labels.push($scope.responseRates[i].name);
//            $scope.requests.push($scope.responseRates[i].requests);
//            $scope.responses.push($scope.responseRates[i].responses);
//            $scope.backgroundColorForChart.push(getColor('red'));
//            $scope.borderColorForChart.push(getBorderColor('red'));
//        }

//        var ctx = $("#myChart");
//        var myChart = new Chart(ctx, {
//            type: 'bar',
//            data: {
//                labels: $scope.labels,
//                datasets: [{
//                    label: 'Ansprache',
//                    data: $scope.requests,
//                    backgroundColor: $scope.backgroundColorForChart,
//                    borderColor: $scope.borderColorForChart,
//                    borderWidth: 1
//                },
//                {
//                    label: 'Response',
//                    data: $scope.responses,
//                    backgroundColor: $scope.backgroundColorForChart,
//                    borderColor: $scope.borderColorForChart,
//                    borderWidth: 1
//                }]
//            },
//            options: {
//                legend: {
//                    position: 'bottom'
//                },
//                scales: {
//                    yAxes: [{
//                        ticks: {
//                            beginAtZero: true
//                        }
//                    }]
//                }
//            }
//        });



//    });//end allData


//    $scope.updateResponseRate = function () {

//        $scope.filterFrom = $('#from').val();
//        $scope.filterTo = $('#to').val();

//        $http.post('stat/responseRates', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//            $scope.responseRates = response.data.data.responseRates;
//            $scope.allResponseRate = response.data.data.allResponseRate;

//            $scope.message = response.data.message;
//            $scope.iserrmessage = !response.data.success;


//            $scope.labels = [];
//            $scope.requests = [];
//            $scope.responses = [];
//            $scope.backgroundColorForChart = [];
//            $scope.borderColorForChart = [];

//            for (var i = 0; i < $scope.responseRates.length; i++) {
//                $scope.labels.push($scope.responseRates[i].name);
//                $scope.requests.push($scope.responseRates[i].requests);
//                $scope.responses.push($scope.responseRates[i].responses);
//                $scope.backgroundColorForChart.push(getColor('gray-dark'));
//                $scope.borderColorForChart.push(getBorderColor('gray-dark'));
//            }

//            var ctx = $("#myChart");
//            var myChart = new Chart(ctx, {
//                type: 'bar',
//                data: {
//                    labels: $scope.labels,
//                    datasets: [{
//                        label: 'Anzahl',
//                        data: $scope.requests,
//                        backgroundColor: $scope.backgroundColorForChart,
//                        borderColor: $scope.borderColorForChart,
//                        borderWidth: 1
//                    },
//                    {
//                        label: 'Anzahl',
//                        data: $scope.responses,
//                        backgroundColor: $scope.backgroundColorForChart,
//                        borderColor: $scope.borderColorForChart,
//                        borderWidth: 1
//                    }]
//            },
//                options: {
//                    legend: {
//                        position: 'bottom'
//                    },
//                    scales: {
//                        yAxes: [{
//                            ticks: {
//                                beginAtZero: true
//                            }
//                        }]
//                    }
//                }
//            });



//        });//end allData

//    };

//});

//app.controller('statisticsTelNoticeController', function ($scope, $http) {
    
//    $scope.yearToFilter = THIS_YEAR;

//    $http.post('stat/telNotice', { yearToFilter: $scope.yearToFilter }).then(function (response) {
//        $scope.telNotice = response.data.data.telNotice;
//        $scope.reseaches = response.data.data.reseaches;
//        $scope.telNoticeSum = response.data.data.telSum;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;

//        $scope.labels = [];
//        $scope.telnoticeData = [];
//        $scope.backgroundColorForChart = [];
//        $scope.borderColorForChart = [];

//        for (var i = 0; i < $scope.telNoticeSum.length; i++) {
//            $scope.labels.push('KW ' + $scope.telNoticeSum[i].weeknr);
//            $scope.telnoticeData.push($scope.telNoticeSum[i].telnotice);
//            $scope.backgroundColorForChart.push(getColor('gray-dark'));
//            $scope.borderColorForChart.push(getBorderColor('gray-dark'));
//        }


//        var ctx = $("#myChart");
//        var myChart = new Chart(ctx, {
//            type: 'bar',
//            data: {
//                labels: $scope.labels,
//                datasets: [{
//                    label: 'Anzahl TelNotizen',
//                    data: $scope.telnoticeData,
//                    backgroundColor: $scope.backgroundColorForChart,
//                    borderColor: $scope.borderColorForChart,
//                    borderWidth: 1
//                }]
//            },
//            options: {
//                legend: {
//                    position: 'bottom'
//                },
//                scales: {
//                    yAxes: [{
//                        ticks: {
//                            beginAtZero: true
//                        }
//                    }]
//                }
//            }
//        });

//        $scope.update = function () {
            

//                $scope.yearToFilter = $('#yearToFilter').val();
            
//                $http.post('stat/telNotice', { yearToFilter: $scope.yearToFilter }).then(function (response) {
//                    $scope.telNotice = response.data.data.telNotice;
//                    $scope.reseaches = response.data.data.reseaches;
//                    $scope.telNoticeSum = response.data.data.telSum;
//                    $scope.message = response.data.message;
//                    $scope.iserrmessage = !response.data.success;
//                    $scope.noDataSets = false;

//                    $scope.labels = [];
//                    $scope.telnoticeData = [];
//                    $scope.backgroundColorForChart = [];
//                    $scope.borderColorForChart = [];

//                    for (var i = 0; i < $scope.telNoticeSum.length; i++) {
//                        $scope.labels.push('KW ' + $scope.telNoticeSum[i].weeknr);
//                        $scope.telnoticeData.push($scope.telNoticeSum[i].telnotice);
//                        $scope.backgroundColorForChart.push(getColor('gray-dark'));
//                        $scope.borderColorForChart.push(getBorderColor('gray-dark'));
//                    }

//                    if ($scope.telNotice.length == 0) {
//                        $scope.noDataSets = true;
//                        $scope.message = "keine Datensätze vorhanden";
//                    }


//                    var ctx = $("#myChart");
//                    var myChart = new Chart(ctx, {
//                        type: 'bar',
//                        data: {
//                            labels: $scope.labels,
//                            datasets: [{
//                                label: 'Anzahl TelNotizen',
//                                data: $scope.telnoticeData,
//                                backgroundColor: $scope.backgroundColorForChart,
//                                borderColor: $scope.borderColorForChart,
//                                borderWidth: 1
//                            }]
//                        },
//                        options: {
//                            legend: {
//                                position: 'bottom'
//                            },
//                            scales: {
//                                yAxes: [{
//                                    ticks: {
//                                        beginAtZero: true
//                                    }
//                                }]
//                            }
//                        }
//                    });
//                });
//        };
//    });
//});

//app.controller('statisticsHireListController', function ($scope, $http) {


//   // $scope.filterFrom = $('#from').val();
//   // $scope.filterTo = $('#to').val();

//    $scope.filterFrom = FILTER_FROM; //new Date(2018, 01, 01);
//    $scope.filterTo = FILTER_TO; //new Date(2018, 12, 31);

   

//        $http.post('stat/hireList', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//            $scope.candidates = response.data.data.candidates;
//            $scope.anzahl = response.data.data.anzahl + response.data.data.anzahleR;
//            $scope.eRcandidates = response.data.data.eRcandidates;
//            $scope.message = response.data.message;
//            $scope.iserrmessage = !response.data.success;
//    });

//        $scope.updateHires = function () {
            
//            $scope.filterFrom = new Date($('#from').val());
//            $scope.filterTo = new Date($('#to').val());



//            $http.post('stat/hireList', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
//                $scope.candidates = response.data.data.candidates;
//                $scope.anzahl = response.data.data.anzahl + response.data.data.anzahleR;
//                $scope.eRcandidates = response.data.data.eRcandidates;
//                $scope.message = response.data.message;
//                $scope.iserrmessage = !response.data.success;
//            });



//        };




//});





///**
// * wigController - WIG Overview
// */
//app.controller('wigController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
//    $scope.showusercandidates = false;
    
//    /**
//     * get WIGs for the Overview
//     */
//    $http.get('wig/get').then(function (response) {
//        $scope.wigs = response.data.data;
//        $scope.message = response.data.message;
//        $scope.iserrmessage = !response.data.success;
//    });
    
//});

///**
// * wigNewController - Add a new WIG
// */
//app.controller('wignewController', function ($scope, $http) {
//    $scope.message = "";
//    $scope.iserrmessage = false;
    

//    /**
//     * Save Function to create a new WIG at Database 
//     */
//    $scope.save = function () {
//        $scope.message = "";
//        $scope.start = $('#start').val();
//        $scope.end = $('#end').val();
       


//        $http.post('wig/save', {
//            name: $scope.wig.name, start: $scope.start, end: $scope.end, goal: $scope.wig.goal
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
           
//            if (response.data.success) {
//                $scope.message = response.data.message;
               
//                setTimeout(function () {
//                    window.location.href = "#!wigs"; //will redirect to wigs
//                }, 2000); //will call the function after 2 secs. --> message showed for 2 sec.

//            }
            
//        });
//    };
//});

///**
// * WIGDetail Controller - Edit or delete selected WIG
// */
//app.controller('wigdetailController', function ($scope, $http, $routeParams) {
//    $scope.message = "";
//    $scope.iserrmessage = false;

//    /**
//     * get WIGdata to fill into Form for updating selected WIG
//     */
//    $http.post('wig/detailinfo', {
//        id: $routeParams.wigid
//    }).then(function (response) {
        
//        $scope.wig = response.data.data;
//        $scope.start = toLocalDate($scope.wig.start);
//        $scope.end = toLocalDate($scope.wig.end);


//        $scope.iserrmessage = !response.data.sucess;
//        $scope.message = response.data.message;
//        });


//    $scope.update = function () {
//        $scope.message = "";
        
//        var start = toLocalDate($scope.start, 2);
//        var end = toLocalDate($scope.end, 2);
        
//        $http.post('wig/update', {
//            id: $scope.wig.id, name: $scope.wig.name, start: start, end: end, goal: $scope.wig.goal, active: $scope.wig.active
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;
//        });

//    }; //end update Function

//    $scope.delete = function () {
//        $scope.message = "";
//        $http.post('wig/delete', {
//            id: $scope.wig.id
//        }).then(function (response) {
//            $scope.iserrmessage = !response.data.success;
//            $scope.message = response.data.message;

//            if (response.data.success) {
//                $scope.message = response.data.message;
//                //window.location = '#!candidate/new';

//                setTimeout(function () {
//                    window.location.href = "#!wigs"; // redirect
//                }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.

//            }

//        });

//    }; //end update Function


//}); //end wigdetailController


///**
// * NavBarController - LoggedIn User and Search
// */
//app.controller('navBarController', function ($scope, $http) {
//    $http.post('user/info').then(function (response) {
//        $scope.user = response.data.data;
//    });

//    $http.get('wig/info').then(function (response) {
//        $scope.hireThisYear = response.data.data.hireThisYear;
//        $scope.hireThisYeareR = response.data.data.hireThisYeareR;
//        $scope.wig = response.data.data.wig;
//    });
    
//});

///**
// * SideBarController - Logout
// */
//app.controller('sideBarController', function ($scope, $http) {

//    $http.get('candidate/timeinfo').then(function (response) {
//        $scope.timeinfo = response.data.data;
//    });

//    $scope.logout = function () {
//        $http.post('user/logout').then(function (response) {
//            window.location = 'login.html';
//        });
//    };
//});



