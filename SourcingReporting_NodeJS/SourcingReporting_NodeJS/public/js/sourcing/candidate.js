/**
 * Candidates Controller - Candidate Overview
 */
app.controller('candidatesController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    var showusercandidates = false;
    var showTracking = false;

    var from_telnotice = false;
    var to_telnotice = false;

    var from_intern = false;
    var to_intern = false;

    var from_extern = false;
    var to_extern = false;

    var from_research = false;
    var to_research = false;

    $scope.resetFilter = function () {
        $('#from_telnotice').val("");
        $('#to_telnotice').val("");

        $('#from_intern').val("");
        $('#to_intern').val("");

        $('#from_extern').val("");
        $('#to_extern').val("");

        $('#from_research').val("");
        $('#to_research').val("");

        $('#showusercandidates').removeAttr('checked');
        $('#showTracking').removeAttr('checked');


        $http.post('candidates/get', {
            showusercandidates: showusercandidates, showTracking: showTracking, from_telnotice: from_telnotice, to_telnotice: to_telnotice, from_intern: from_intern, to_intern: to_intern,
            from_extern: from_extern, to_extern: to_extern, from_research: from_research, to_research: to_research
        }).then(function (response) {
            $scope.candidates = response.data.data.candidate;
            $scope.countCandidate = response.data.data.countCandidate;
            });

        location.reload();

    };

    $scope.filterCandidates = function () {

        if ($scope.showusercandidates) {
            showusercandidates = true;
        }

        if ($scope.showTracking) {
            showTracking = true;
        }

        if ($scope.from_telnotice != undefined) {
            from_telnotice = toLocalDate($scope.from_telnotice, 2);
        }

        if ($scope.to_telnotice != undefined) {
            to_telnotice = toLocalDate($scope.to_telnotice, 2);
        }

        if ($scope.from_intern != undefined) {
            from_intern = toLocalDate($scope.from_intern, 2);
        }

        if ($scope.to_intern != undefined) {
            to_intern = toLocalDate($scope.to_intern, 2);
        }

        if ($scope.from_extern != undefined) {
            from_extern = toLocalDate($scope.from_extern, 2);
        }

        if ($scope.to_extern != undefined) {
            to_extern = toLocalDate($scope.to_extern, 2);
        }

        if ($scope.from_research != undefined) {
            from_research = toLocalDate($scope.from_research, 2);
        }

        if ($scope.to_research != undefined) {
            to_research = toLocalDate($scope.to_research, 2);
        }


        $http.post('candidates/get', {
            showusercandidates: showusercandidates, showTracking: showTracking, from_telnotice: from_telnotice, to_telnotice: to_telnotice, from_intern: from_intern, to_intern: to_intern,
            from_extern: from_extern, to_extern: to_extern, from_research: from_research, to_research: to_research
        }).then(function (response) {
            $scope.candidates = response.data.data.candidate;
            $scope.countCandidate = response.data.data.countCandidate;
        });

        

    };

    $scope.filterCandidates();
    

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
            td = tr[i].getElementsByTagName("td")[4];
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

        var responseValue = null;


        if ($scope.response == 1) {
            responseValue = 1;
        } else if ($scope.response == 2) {
            responseValue = 0;
        }

        
        if ($('#research').val() == '') {
            $scope.research = '0000-00-00';
        } else {
            $scope.research = $('#research').val();
        }

        if ($('#telnotice').val() == '') {
            $scope.telnotice = '0000-00-00';
        } else {
            $scope.telnotice = $('#telnotice').val();
        }

        if ($('#intern').val() == '') {
            $scope.intern = '0000-00-00';
        } else {
            $scope.intern = $('#intern').val();
        }

        if ($('#extern').val() == '') {
            $scope.extern = '0000-00-00';
        } else {
            $scope.extern = $('#extern').val();
        }

        if ($('#hire').val() == '') {
            $scope.hire = '0000-00-00';
        } else {
            $scope.hire = $('#hire').val();
        }

        if ($('#team').val() == '') {
            $scope.team = null;
        } else {
            $scope.team = $('#team').val();
        }
        
        
        $http.post('candidate/save', {  
            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source: $scope.source,
            source_text: $scope.candidate.source_text, eR: $scope.candidate.eR, tracking: $scope.tracking, request: $scope.request,
            response: $scope.response, responseVal: responseValue, telnotice: $scope.telnotice, intern: $scope.intern, infos: $scope.candidate.info,
            extern: $scope.extern, hire: $scope.hire, team: $scope.team, research: $scope.research, scoreboard: $scope.candidate.scoreboard
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            

            if (response.data.success) {
                $scope.message = response.data.message;
                //window.location = '#!candidate/new';

                setTimeout(function () {
                    window.location.href = "#!candidate/new"; //will redirect to candidate/new
                }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.

            }
            
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
        //selectTeam.val($scope.candidate.team_id);
        //selectTeam.trigger("change");
        selectTeam.on("select2:select", function (e) {
            var id = selectTeam.val();
            $scope.candidate.team_id = id;
        });
        
        var selectSource = $('#selectSource');
        selectSource.select2({ data: sourceData });
        //selectSource.val($scope.candidate.source_id);
        //selectSource.trigger("change");
        selectSource.on("select2:select", function (e) {
            var id = selectSource.val();
            $scope.candidate.source_id = id;
        });

        /**
         * Dates with moment 
         */
        $scope.research = toLocalDate($scope.candidate.research);
        $scope.telnotice = toLocalDate($scope.candidate.telnotice);
        $scope.intern = toLocalDate($scope.candidate.intern);
        $scope.extern = toLocalDate($scope.candidate.extern);
        $scope.hire = toLocalDate($scope.candidate.hire);



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

        //selectTracking.val($scope.candidate.tracking);
        //selectTracking.trigger("change");
        selectTracking.on("select2:select", function (e) {
            var id = selectTracking.val();
            $scope.tracking = id;
        });

        //selectRequest.val($scope.candidate.request);
        //selectRequest.trigger("change");
        selectRequest.on("select2:select", function (e) {
            var id = selectRequest.val();
            $scope.request = id;
        });

        $scope.response = 0;

        if ($scope.candidate.response == 1 && $scope.candidate.response_value == 1) {
            $scope.response = 1;
        } else if ($scope.candidate.response == 1 && $scope.candidate.response_value == 0) {
            $scope.response = 2;
        }
        
        //selectResponse.val($scope.response);
        //selectResponse.trigger("change");
        selectResponse.on("select2:select", function (e) {
            var id = selectResponse.val();
            $scope.response = id;
        });
        
        //scoreboard.val($scope.candidate.scoreboard);
        //scoreboard.trigger("change");
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
            id: $scope.candidate.id, research: $scope.research
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });
    }

    $scope.updateTelnotice = function () {
        $scope.message = "";
        
        $http.post('candidate/updateTelnotice', {
            id: $scope.candidate.id, telnotice: $scope.telnotice
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    }

    $scope.updateIntern = function () {
        $scope.message = "";

        $http.post('candidate/updateIntern', {
            id: $scope.candidate.id, intern: $scope.intern
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    }

    $scope.updateExtern = function () {
        $scope.message = "";

        $http.post('candidate/updateExtern', {
            id: $scope.candidate.id, extern: $scope.extern
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
        });
    }

    $scope.updateHire = function () {
        $scope.message = "";

        $http.post('candidate/updateHire', {
            id: $scope.candidate.id, hire: $scope.hire
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

        var responseValue = null;


        if ($scope.response == 1) {
            responseValue = 1;
            $scope.candidate.response = 1;
        } else if ($scope.response == 2) {
            responseValue = 0;
            $scope.candidate.response = 1;
        } else {
            $scope.candidate.response = 0;
        }


        $http.post('candidate/updateOptions', {
            id: $scope.candidate.id, tracking: $scope.candidate.tracking, request: $scope.candidate.request,
            response: $scope.candidate.response, response_value: responseValue
        }).then(function (response) {
            $scope.iserrmessage = !response.data.success;
            $scope.message = response.data.message;
            });

    }
    

    $scope.delete = function () {
        $scope.message = "";

        if (confirm("Kandidat wirklich löschen?"))
        { 
            $http.post('candidate/delete', {
                id: $scope.candidate.id
            }).then(function (response) {
                $scope.iserrmessage = !response.data.success;
                $scope.message = response.data.message;

                if (response.data.success) {
                    $scope.message = response.data.message;
                    //window.location = '#!candidate/new';

                    setTimeout(function () {
                        window.location.href = "#!candidates"; // redirect
                    }, 1000); //will call the function after 2 secs. --> message showed for 2 sec.
                }
            });
        }



    }; //end update Function
    
}); //end candidatedetailController


//End CandidateDetail