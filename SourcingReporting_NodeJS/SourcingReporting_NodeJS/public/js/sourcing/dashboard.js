var app = angular.module("sourcingApp", ['ngRoute', 'angular.filter']);

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
    //return moment.utc(date).toDate();
    return moment(new Date(date));
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

/**
 * TeamsController - TeamOverview
 */
app.controller('teamsController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    
    /**
     * get Team and Group Data for Team & Group Overview
     */
    $http.get('teams/get').then(function (response) {
        $scope.groups = response.data.data.groups;
        $scope.teams = response.data.data.teams;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });

    
    
});

/**
 * TeamNew Controller - Controller for create a new Team at Database
 */
app.controller('teamnewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.team = { teamname: "", gruppe: ""};
    $scope.gruppe = "";

    //get Value from groupSelect
    $scope.showSelectValue = function (groupSelect) {
       // console.log(groupSelect);
        $scope.gruppe = groupSelect;
    }

    /**
     * Save Function to save Team at Database
     */
    $scope.save = function () {
        $scope.message = "";
        $http.post('team/save', {
            teamname: $scope.team.teamname, gruppe : $scope.gruppe
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };

    /**
     * Get Group Data to fill into select
     */
    $http.post('team/data').then(function (response) {
        $scope.groups = response.data.data;
    });

}); 


/**
 * TeamDetail Controller - Edit selected Team
 */
app.controller('teamdetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    
    /**
     * get Teamdata to fill into Form for updating selected Team
     */
    $http.post('team/info', { teamid: $routeParams.teamid }).then(function (response) {
        $scope.team = response.data.data.team;
        $scope.gruppe = response.data.data.gruppe;
        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;

        var selectActive = $('#selectactive');
        selectActive.select2();

        selectActive.val($scope.team.active);
        selectActive.trigger("change");
        selectActive.on("select2:select", function (e) {
            var id = selectActive.val();
            $scope.team.active = id;
        });

        var selectGroup = $('#selectgroup');
        selectGroup.select2();

        //console.log($scope.gruppe); //alle Gruppen
        
        selectGroup.val($scope.team.city_group);
        selectGroup.trigger("change");
        selectGroup.on("select2:select", function (e) {
            var id = selectGroup.val();
            $scope.gruppe.id = id;
        });

        
    });

    $scope.update = function () {
        $scope.message = "";
        $http.post('team/update', { id: $scope.team.id, name: $scope.team.name, gruppe: $scope.gruppe.city, active: $scope.team.active }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });

    }; //end update Function
       

}); //end teamdetailController

/**
 * GroupNew Controller - Controller for create a new City-Group at Database
 */
app.controller('groupnewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.group = "";

    /**
     * Save Function to save Team at Database
     */
    $scope.save = function () {
        $scope.message = "";
        $http.post('group/save', {
            groupname: $scope.group
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    };
}); 

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

}); //end wigdetailController

/**
 * Candidates Controller - Candidate Overview
 */
app.controller('candidatesController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    $scope.showusercandidates = false;

    /**
     * get Candidates for the Overview & show User Candidates
     */
    $scope.update = function () {
        $http.post('candidates/get', { showusercandidates: $scope.showusercandidates }).then(function (response) {
            $scope.candidates = response.data.data;
        });
    };

    $scope.update();

    $scope.updateTracking = function () {
        $http.post('candidates/get', { showTracking: $scope.showTracking }).then(function (response) {
            $scope.candidates = response.data.data;
        });
    };
    

    $scope.searchNames = function () {

        // Declare variables 
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputName");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");
        
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        

    }

    $scope.searchSource = function () {

        // Declare variables 
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputSource");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }


    }

    $scope.searcheR = function () {

        // Declare variables 
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputeR");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[3];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }


    }



});


/**
 * CandidateNew Controller - Create a new Candidate
 */
app.controller('candidatenewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    //Get Data for candidate new
    $http.post('candidate/data').then(function (response) {
        $scope.sources = response.data.data.sources;
        $scope.teams = response.data.data.teams;
                
        $scope.candidate = {
            tracking: 1, request: 1, response: 0, research: null, telnotice: null
        };

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = year + '-' + month + '-' + day;

        document.getElementById('research').value = today;

    });



    $scope.source = "";

    //get Value from groupSelect
    $scope.showSourceValue = function (sourceSelect) {
        $scope.source = sourceSelect;
    }
    

    /**
     * Save Function to create a new Candidate at Database 
     */
    $scope.save = function () {
        $scope.message = "";
        $scope.telnotice = $('#telnotice').val();
        $scope.research = $('#research').val();
        $scope.intern = $('#intern').val();
        $scope.extern = $('#extern').val();
        $scope.hire = $('#hire').val();
        $scope.team = $('#teamSelect').val();


        $http.post('candidate/save', {
            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source: $scope.source,
            source_text: $scope.candidate.source_text, eR: $scope.candidate.eR, tracking: $scope.tracking, request: $scope.request,
            response: $scope.response, responseVal: $scope.responseVal, telnotice: $scope.telnotice, intern: $scope.intern, infos: $scope.candidate.infos,
            extern: $scope.extern, hire: $scope.hire, team: $scope.candidate.teamSelect, research: $scope.research, scoreboard: $scope.candidate.scoreboard
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            

            if (response.data.success) {
                $scope.message = response.data.message;
                //window.location = '#!candidate/new';

                setTimeout(function () {
                    window.location.href = "#!candidate/new"; //will redirect to candidate/new
                }, 2000); //will call the function after 2 secs. --> message showed for 2 sec.

            }

            //$scope.message = response.data.message;
        });
    };
   
});


/**
 * CandidateDetail Controller - Edit selected Candidate
 */
app.controller('candidatedetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    /**
     * get Candidate-data to fill into Form for updating selected Team
     */
    $http.post('candidate/info', { candidateid: $routeParams.candidateid }).then(function (response) {
        $scope.candidate = response.data.data.candidate;
        $scope.sources = response.data.data.sources;
        $scope.teams = response.data.data.teams;
        $scope.citys = response.data.data.citys;
        $scope.sourcer = response.data.data.sourcer;

        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;
        

        /**
         * Dropdowns with Datamaps and select2
         */
        var sourcerData = $.map($scope.sourcer, function (sourcer) {
            sourcer.text = sourcer.firstname + ' ' + sourcer.lastname;
            return sourcer;
        });

        var teamData = $.map($scope.teams, function (teams) {
            teams.text = teams.city + ' - ' + teams.name;
            return teams;
        });

        var sourceData = $.map($scope.sources, function (sources) {
            sources.text = sources.name;
            return sources;
        });

        var selectSourcer = $('#selectSourcer');
        selectSourcer.select2({ data: sourcerData });
        selectSourcer.val($scope.candidate.sourcer);
        selectSourcer.trigger("change");
        selectSourcer.on("select2:select", function (e) {
            var id = selectSourcer.val();
            $scope.candidate.sourcer = id;
        });

        var selectTeam = $('#selectTeam');
        selectTeam.select2({ data: teamData });
        selectTeam.val($scope.candidate.team_id);
        selectTeam.trigger("change");
        selectTeam.on("select2:select", function (e) {
            var id = selectTeam.val();
            $scope.candidate.team_id = id;
        });

        var selectSource = $('#selectSource');
        selectSource.select2({ data: sourceData });
        selectSource.val($scope.candidate.source_id);
        selectSource.trigger("change");
        selectSource.on("select2:select", function (e) {
            var id = selectSource.val();
            $scope.candidate.source_id = id;
        });

        /**
         * Dates with datetimepicker 
         */
        $scope.research = toLocalDate($scope.candidate.research);
        $scope.telnotice = toLocalDate($scope.candidate.telnotice);
        $scope.intern = toLocalDate($scope.candidate.intern);
        $scope.extern = toLocalDate($scope.candidate.extern);
        $scope.hire = toLocalDate($scope.candidate.hire);

        var research = $('#research');
        var telnotice = $('#telnotice');
        var intern = $('#intern');
        var extern = $('#extern');
        var hire = $('#hire');

      

        
        research.datetimepicker(datetimepickeroptions);
        research.data('DateTimePicker').date($scope.research);
        research.on('dp.change', function (e) {
            $scope.candidate.research = e.date;
        });
        
        telnotice.datetimepicker(datetimepickeroptions);
        telnotice.data('DateTimePicker').date($scope.telnotice);
        telnotice.on('dp.change', function (e) {
            $scope.candidate.telnotice = e.date;
        });

        intern.datetimepicker(datetimepickeroptions);
        intern.data('DateTimePicker').date($scope.intern);
        intern.on('dp.change', function (e) {
            $scope.candidate.intern = e.date;
        });

        extern.datetimepicker(datetimepickeroptions);
        extern.data('DateTimePicker').date($scope.extern);
        extern.on('dp.change', function (e) {
            $scope.candidate.extern = e.date;
        });

        hire.datetimepicker(datetimepickeroptions);
        hire.data('DateTimePicker').date($scope.hire);
        hire.on('dp.change', function (e) {
            $scope.candidate.hire = e.date;
        });

        /**
         * Dropdown with select2
         */

        var selectTracking = $('#selectTracking');
        selectTracking.select2();

        var selectRequest = $('#selectRequest');
        selectRequest.select2();

        var selectResponse = $('#selectResponse');
        selectResponse.select2();

        var selectResponseVal = $('#selectResponseValue');
        selectResponseVal.select2();

        var scoreboard = $('#scoreboard');
        scoreboard.select2();

        selectTracking.val($scope.candidate.tracking);
        selectTracking.trigger("change");
        selectTracking.on("select2:select", function (e) {
            var id = selectTracking.val();
            $scope.tracking = id;
        });

        selectRequest.val($scope.candidate.request);
        selectRequest.trigger("change");
        selectRequest.on("select2:select", function (e) {
            var id = selectRequest.val();
            $scope.request = id;
        });

        selectResponse.val($scope.candidate.response);
        selectResponse.trigger("change");
        selectResponse.on("select2:select", function (e) {
            var id = selectResponse.val();
            $scope.response = id;
        });

        selectResponseVal.val($scope.candidate.response_value);
        selectResponseVal.trigger("change");
        selectResponseVal.on("select2:select", function (e) {
            var id = selectResponseVal.val();
            $scope.response_value = id;
        });

        scoreboard.val($scope.candidate.scoreboard);
        scoreboard.trigger("change");
        scoreboard.on("select2:select", function (e) {
            var id = scoreboard.val();
            $scope.scoreboard = id;
        });


    });//end candidate/info

   
    $scope.updateCandidate = function () {
        $scope.message = "";

        $http.post('candidate/updateCandidate', {
            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source_text: $scope.candidate.source_text,
            eR: $scope.candidate.eR, infos: $scope.candidate.infos
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });
    }

    $scope.updateSource = function (selectSource) {
        $scope.source = selectSource;
        
        $http.post('candidate/updateSource', {
            id: $scope.candidate.id, source: $scope.source
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });

        location.reload();
    }

    $scope.updateTeam = function (selectTeam) {
        $scope.team = selectTeam;

        $http.post('candidate/updateTeam', {
            id: $scope.candidate.id, team: $scope.team
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });

        location.reload();
    }

    $scope.updateResearch = function () {
        $scope.message = "";
        
        $http.post('candidate/updateResearch', {
            id: $scope.candidate.id, research: $scope.candidate.research
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });
    }

    $scope.updateTelnotice = function () {
        $scope.message = "";
        
        $http.post('candidate/updateTelnotice', {
            id: $scope.candidate.id, telnotice: $scope.candidate.telnotice
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    }

    $scope.updateIntern = function () {
        $scope.message = "";

        $http.post('candidate/updateIntern', {
            id: $scope.candidate.id, intern: $scope.candidate.intern
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    }

    $scope.updateExtern = function () {
        $scope.message = "";

        $http.post('candidate/updateExtern', {
            id: $scope.candidate.id, extern: $scope.candidate.extern
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    }

    $scope.updateHire = function () {
        $scope.message = "";

        $http.post('candidate/updateHire', {
            id: $scope.candidate.id, hire: $scope.candidate.hire
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    }

    $scope.updateScoreboard = function (scoreboard) {
        $scope.message = "";
        $scope.scoreboard = scoreboard;

        $http.post('candidate/updateScoreboard', {
            id: $scope.candidate.id, scoreboard: $scope.scoreboard
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });

        location.reload();
    }

    $scope.updateSourcer = function () {
        $scope.message = "";
             
        $http.post('candidate/updateSourcer', {
            id: $scope.candidate.id, sourcer_id: $scope.selectSourcer
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });

        location.reload();
        
        
    }

    $scope.updateOptions = function () {
        $scope.message = "";

        $http.post('candidate/updateOptions', {
            id: $scope.candidate.id, tracking: $scope.candidate.tracking, request: $scope.candidate.request,
            response: $scope.candidate.response, response_value: $scope.candidate.response_value
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });

    }
    


    $scope.update = function () {
       // alert("Test");
        $scope.message = "";
        
        alert("ID: " + $scope.candidate.id +
            "\nFirstname: " + $scope.candidate.firstname +
            "\nLastname: " + $scope.candidate.lastname +
            "\nSource: " + $scope.candidate.source_id + " " + $scope.candidate.source +
            "\nSourceText: " + $scope.candidate.source_text +
            "\neR: " + $scope.candidate.eR +
            "\ntracking: " + $scope.candidate.tracking +
            "\nrequest: " + $scope.candidate.request +
            "\nresponse: " + $scope.candidate.response +
            "\nresponse_value: " + $scope.candidate.response_value +
            "\nresearch: " + moment($scope.candidate.research).format('DD.MM.YYYY') +
            "\nTelNotice nm: " + moment($scope.candidate.telnotice).format('DD.MM.YYYY') +
            "\nIntern: " + moment($scope.candidate.intern).format('DD.MM.YYYY') +
            "\nExtern: " + moment($scope.candidate.extern).format('DD.MM.YYYY') +
            "\nHire: " + moment($scope.candidate.hire).format('DD.MM.YYYY') +
            "\nTeam: " + $scope.candidate.team_id + " " + $scope.candidate.teamname +
            "\nScoreboard: " + $scope.candidate.scoreboard +
            "\nSourcer: " + $scope.candidate.sourcer + " " + $scope.candidate.sourcerName +
            "\nInfos: " + $scope.candidate.infos
        );
       /*
        $http.post('candidate/update', {
            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source: $scope.candidate.source_id,
            sourceText: $scope.candidate.source_text, eR: $scope.candidate.eR, tracking: $scope.candidate.tracking, request: $scope.candidate.request, response: $scope.candidate.response,
            response_Val: $scope.candidate.response_value, research: $scope.candidate.research, telnotice: $scope.candidate.telnotice,
            intern: $scope.candidate.intern, extern: $scope.candidate.extern, hire: $scope.candidate.hire,
            team: $scope.candidate.team_id, scoreboard: $scope.candidate.scoreboard, sourcer: $scope.candidate.sourcer, infos: $scope.candidate.infos
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });
        */
    }; //end update Function
    
}); //end candidatedetailController


//End CandidateDetail



/**
 * StatisticsController
 */
app.controller('statisticsController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    
    $scope.yearToFilter = $('#yearToFilter').val();

    $scope.update = function () {

        $scope.yearToFilter = $('#yearToFilter').val();

        $http.post('stat/rfe', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.requestsFromSource = response.data.data.requestsFromSource;
            $scope.allRequests = response.data.data.allRequests;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;
        });

        $http.post('stat/myYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.myYear = response.data.data;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;
        });

    };

    $http.post('stat/rfe', { yearToFilter: $scope.yearToFilter }).then(function (response) {
        $scope.requestsFromSource = response.data.data.requestsFromSource;
        $scope.allRequests = response.data.data.allRequests;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });

    $http.post('stat/myYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
        $scope.myYear = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });

    $http.post('stat/myWeek').then(function (response) {
        $scope.myWeek = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });

});

app.controller('statisticsReqToHireController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.yearToFilter = $('#yearToFilter').val();
    $http.post('stat/allData', { yearToFilter: $scope.yearToFilter }).then(function (response) {
        $scope.allData = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;

        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
                datasets: [{
                    label: 'Anzahl',
                    data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
                    backgroundColor: [
                        getColor('red'),
                        getColor('gray-dark'),
                        getColor('gray-dark'),
                        getColor('gray-dark'),
                        getColor('red'),
                        getColor('black')
                    ],
                    borderColor: [
                        getBorderColor('red'),
                        getBorderColor('gray-dark'),
                        getBorderColor('gray-dark'),
                        getBorderColor('gray-dark'),
                        getBorderColor('red'),
                        getBorderColor('black')
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });



    });//end allData


    $scope.updateAllData = function () {

        $scope.yearToFilter = $('#yearToFilter').val();

        $http.post('stat/allData', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.allData = response.data.data;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;

            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
                    datasets: [{
                        label: 'Anzahl',
                        data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
                        backgroundColor: [
                            getColor('red'),
                            getColor('gray-dark'),
                            getColor('gray-dark'),
                            getColor('gray-dark'),
                            getColor('red'),
                            getColor('black')
                        ],
                        borderColor: [
                            getBorderColor('red'),
                            getBorderColor('gray-dark'),
                            getBorderColor('gray-dark'),
                            getBorderColor('gray-dark'),
                            getBorderColor('red'),
                            getBorderColor('black')
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });



        });//end allData

    };

});

app.controller('statisticsReqToHirePlattformController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.yearToFilter = $('#yearToFilter').val();
    $scope.selectSource = $('#selectSource').val();

    $http.post('stat/allDataPlattform', { source: $('#selectSource').val() }).then(function (response) {
        $scope.sources = response.data.data.sources;
        $scope.allData = response.data.data.allData;

        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;

        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
                datasets: [{
                    label: 'Anzahl',
                    data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
                    backgroundColor: [
                        getColor('red'),
                        getColor('gray-dark'),
                        getColor('gray-dark'),
                        getColor('gray-dark'),
                        getColor('red'),
                        getColor('black')
                    ],
                    borderColor: [
                        getBorderColor('red'),
                        getBorderColor('gray-dark'),
                        getBorderColor('gray-dark'),
                        getBorderColor('gray-dark'),
                        getBorderColor('red'),
                        getBorderColor('black')
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    });

    $scope.updateAllDataPlattform = function () {
        $scope.selectSource = $('#selectSource').val();
        $scope.yearToFilter = $('#yearToFilter').val();
       

        $http.post('stat/allDataPlattform', { yearToFilter: $scope.yearToFilter , source: $scope.selectSource }).then(function (response) {
            $scope.sources = response.data.data.sources;
            $scope.allData = response.data.data.allData;

            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;

            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
                    datasets: [{
                        label: 'Anzahl',
                        data: [$scope.allData.request, $scope.allData.telnotice, $scope.allData.intern, $scope.allData.extern, $scope.allData.hires],
                        backgroundColor: [
                            getColor('red'),
                            getColor('gray-dark'),
                            getColor('gray-dark'),
                            getColor('gray-dark'),
                            getColor('red'),
                            getColor('black')
                        ],
                        borderColor: [
                            getBorderColor('red'),
                            getBorderColor('gray-dark'),
                            getBorderColor('gray-dark'),
                            getBorderColor('gray-dark'),
                            getBorderColor('red'),
                            getBorderColor('black')
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        });

    };


});


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
        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;
        });


    $scope.update = function () {
        $scope.message = "";
        $http.post('wig/update', {
            id: $scope.wig.id, name: $scope.wig.name, start: $scope.wig.start, end: $scope.wig.end, goal: $scope.wig.goal, active: $scope.wig.active
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


/**
 * NavBarController - LoggedIn User and Search
 */
app.controller('navBarController', function ($scope, $http) {
    $http.post('user/info').then(function (response) {
        $scope.user = response.data.data;
    });

    $http.get('wig/info').then(function (response) {
        $scope.hireThisYear = response.data.data.hireThisYear;
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



