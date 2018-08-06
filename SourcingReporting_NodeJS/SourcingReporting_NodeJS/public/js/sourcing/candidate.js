app.controller('candidatesController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    var showusercandidates = false;
    var showTracking = false;
    var showRequest = false;

    var from_telnotice = false;
    var to_telnotice = false;

    var from_intern = false;
    var to_intern = false;

    var from_extern = false;
    var to_extern = false;

    var from_research = false;
    var to_research = false;

    var from_hire = false;
    var to_hire = false;

    var filterSourcer = false;
    var filterSource = false;
    var filterTracking = false;
    var filterRequest = false;
    var filterResponse = false;
    var filterResponseValue = false;

    $scope.ishiredcandidate = function (candidate) {
        if (candidate.hire != null) {
            return "hiredCandidate";
        } else {
            return "";
        }
    };

    $scope.resetFilter = function () {
        location.reload();
    };

    $scope.filterCandidates = function () {
        if ($scope.filterSourcer != undefined) {
            if ($scope.filterSourcer > 0) {
                filterSourcer = $scope.filterSourcer;
            }
        }

        if ($scope.filterSource != undefined) {
            if ($scope.filterSource > 0){
                filterSource = $scope.filterSource;
            }
        }

        if ($scope.filterTracking != undefined) {
            if ($scope.filterTracking >= 0) {
                filterTracking = $scope.filterTracking;
            }
        }

        if ($scope.filterRequest != undefined) {
            if ($scope.filterRequest >= 0) {
                filterRequest = $scope.filterRequest;
            }
        }

        if ($scope.filterResponse != undefined) {
            if ($scope.filterResponse == 0) {
                filterResponse = $scope.filterResponse;
            } else if ($scope.filterResponse == 1) {
                filterResponse = 1;
                filterResponseValue = 1;
            } else if ($scope.filterResponse == 2) {
                filterResponse = 1;
                filterResponseValue = 0;
            }
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

        if ($scope.from_hire != undefined) {
            from_hire = toLocalDate($scope.from_hire, 2);
        }

        if ($scope.to_hire != undefined) {
            to_hire = toLocalDate($scope.to_hire, 2);
        }

        $http.get('candidates/getFilterData').then(function (response) {
            $scope.sourcer = response.data.data.sourcer;
            $scope.sources = response.data.data.sources;

            if (!response.data.success) {
                alertify.alert(response.data.message);
            }
        });

        $http.post('candidates/showCandidateOverview', {
            from_telnotice: from_telnotice, to_telnotice: to_telnotice, from_intern: from_intern, to_intern: to_intern,
            from_extern: from_extern, to_extern: to_extern, from_research: from_research, to_research: to_research, from_hire: from_hire, to_hire: to_hire,
            filterSourcer: filterSourcer, filterSource: filterSource, filterTracking: filterTracking, filterRequest: filterRequest, filterResponse: filterResponse, filterResponseValue: filterResponseValue
        }).then(function (response) {
            $scope.candidates = response.data.data.candidate;
            $scope.countCandidate = response.data.data.countCandidate;

            if (!response.data.success) {
                alertify.alert(response.data.message);
            }
        });   
    };

    $scope.filterCandidates();

    /*
     * Search Candidates by Name, Source and eR-Number
     */
    $scope.searchNames = function () {
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputName");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

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
    };

    $scope.searchSource = function () {
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputSource");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

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
    };

    $scope.searcheR = function () {
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputeR");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

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
    };
});

app.controller('candidatenewController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('candidate/getSelectData').then(function (response) {
        $scope.sources = response.data.data.sources;
        $scope.teams = response.data.data.teams;
        $scope.source = "";

        $scope.candidate = {
            tracking: 1, request: 1, response: 0, research: null, telnotice: null
        };

        /**
         * Automatically set Research-Date today
         */
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = year + '-' + month + '-' + day;

        document.getElementById('research').value = today;
    });

    $scope.showSourceValue = function (sourceSelect) {
        $scope.source = sourceSelect;
    }

    $scope.save = function () {
        $scope.message = "";
        $scope.telnotice = $('#telnotice').val();
        $scope.research = $('#research').val();
        $scope.intern = $('#intern').val();
        $scope.extern = $('#extern').val();
        $scope.hire = $('#hire').val();
        $scope.team = $('#teamSelect').val();
        $scope.rememberme = $('#rememberme').val();

        var responseValue = null;

        if ($scope.response == 1) {
            responseValue = 1;
        } else if ($scope.response == 2) {
            responseValue = 0;
        }
        //ToDo: 0000-00-00 durch null ersetzen!
        if ($('#research').val() == '') {
            //$scope.research = '0000-00-00';
            $scope.research = null;
        } else {
            $scope.research = $('#research').val();
        }

        if ($('#telnotice').val() == '') {
            //$scope.telnotice = '0000-00-00';
            $scope.telnotice = null;
        } else {
            $scope.telnotice = $('#telnotice').val();
        }

        if ($('#intern').val() == '') {
            //$scope.intern = '0000-00-00';
            $scope.intern = null;
        } else {
            $scope.intern = $('#intern').val();
        }

        if ($('#extern').val() == '') {
            //$scope.extern = '0000-00-00';
            $scope.extern = null;
        } else {
            $scope.extern = $('#extern').val();
        }

        if ($('#hire').val() == '') {
            //$scope.hire = '0000-00-00';
            $scope.hire = null;
        } else {
            $scope.hire = $('#hire').val();
        }

        if ($('#team').val() == '') {
            $scope.team = null;
        } else {
            $scope.team = $('#team').val();
        }

        if ($('#rememberme').val() == '') {
            $scope.rememberme = null;
        } else {
            $scope.rememberme = $('#rememberme').val();
        }

        $http.post('candidate/save', {
            firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source: $scope.source,
            source_text: $scope.candidate.source_text, eR: $scope.candidate.eR, tracking: $scope.tracking, request: $scope.request,
            response: $scope.response, responseVal: responseValue, telnotice: $scope.telnotice, intern: $scope.intern, infos: $scope.candidate.info,
            extern: $scope.extern, hire: $scope.hire, team: $scope.team, rememberme: $scope.rememberme, research: $scope.research, scoreboard: $scope.candidate.scoreboard
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
                setTimeout(function () {
                    window.location.href = "#!candidate/new";
                }, 1000);

            } else {
                alertify.error(response.data.message);
            }
        });
    };
});

app.controller('candidatedetailController', function ($scope, $http, $routeParams) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('candidate/showDetailForSelectedCandidate', { candidateid: $routeParams.candidateid }).then(function (response) {

        if (!response.data.success) {
            alertify.error(response.data.message);
        }

        $scope.candidate = response.data.data.candidate;
        $scope.sources = response.data.data.sources;
        $scope.teams = response.data.data.teams;
        $scope.citys = response.data.data.citys;
        $scope.sourcer = response.data.data.sourcer;
        $scope.iserrmessage = !response.data.sucess;
        $scope.message = response.data.message;

        $scope.research = toLocalDate($scope.candidate.research);
        $scope.telnotice = toLocalDate($scope.candidate.telnotice);
        $scope.intern = toLocalDate($scope.candidate.intern);
        $scope.extern = toLocalDate($scope.candidate.extern);
        $scope.hire = toLocalDate($scope.candidate.hire);
        $scope.rememberme = toLocalDate($scope.candidate.rememberme);

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
        selectTeam.on("select2:select", function (e) {
            var id = selectTeam.val();
            $scope.candidate.team_id = id;
        });

        var selectSource = $('#selectSource');
        selectSource.select2({ data: sourceData });
        selectSource.on("select2:select", function (e) {
            var id = selectSource.val();
            $scope.candidate.source_id = id;
        });

        var selectTracking = $('#selectTracking');
        selectTracking.select2();
        selectTracking.on("select2:select", function (e) {
            var id = selectTracking.val();
            $scope.tracking = id;
        });

        var selectRequest = $('#selectRequest');
        selectRequest.select2();
        selectRequest.on("select2:select", function (e) {
            var id = selectRequest.val();
            $scope.request = id;
        });

        var selectResponse = $('#selectResponse');
        selectResponse.select2();

        $scope.response = 0;

        if ($scope.candidate.response == 1 && $scope.candidate.response_value == 1) {
            $scope.response = 1;
        } else if ($scope.candidate.response == 1 && $scope.candidate.response_value == 0) {
            $scope.response = 2;
        }

        selectResponse.on("select2:select", function (e) {
            var id = selectResponse.val();
            $scope.response = id;
        });

        var selectResponseVal = $('#selectResponseValue');
        selectResponseVal.select2();

        var scoreboard = $('#scoreboard');
        scoreboard.select2();
        scoreboard.on("select2:select", function (e) {
            var id = scoreboard.val();
            $scope.scoreboard = id;
        });
    });


    $scope.updateCandidate = function () {
        $scope.message = "";

        $http.post('candidate/updateCandidate', {
            id: $scope.candidate.id, firstname: $scope.candidate.firstname, lastname: $scope.candidate.lastname, source_text: $scope.candidate.source_text,
            eR: $scope.candidate.eR, infos: $scope.candidate.infos
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    }

    $scope.updateSource = function (selectSource) {
        $scope.source = selectSource;

        $http.post('candidate/updateSource', {
            id: $scope.candidate.id, source: $scope.source
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
        location.reload();
    }

    $scope.updateTeam = function (selectTeam) {
        $scope.team = selectTeam;

        $http.post('candidate/updateTeam', {
            id: $scope.candidate.id, team: $scope.team
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
        location.reload();
    }


    $scope.updateResearch = function () {
        $scope.message = "";

        $http.post('candidate/updateResearch', {
            id: $scope.candidate.id, research: $scope.research
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $scope.updateTelnotice = function () {
        $scope.message = "";

        $http.post('candidate/updateTelnotice', {
            id: $scope.candidate.id, telnotice: $scope.telnotice
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $scope.deleteTelNotice = function () {
        $scope.message = "";

        if (confirm("Telefonnotiz wirklich entfernen?")) {
            $http.post('candidate/deleteTelNotice', {
                id: $scope.candidate.id
            }).then(function (response) {
                if (response.data.success) {
                    alertify.success(response.data.message);
                } else {
                    alertify.error(response.data.message);
                }
            });
            location.reload();
        }
    };

    $scope.updateIntern = function () {
        $scope.message = "";

        $http.post('candidate/updateIntern', {
            id: $scope.candidate.id, intern: $scope.intern
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $scope.deleteIntern = function () {
        $scope.message = "";

        if (confirm("Internes Gespräch wirklich entfernen?")) {
            $http.post('candidate/deleteIntern', {
                id: $scope.candidate.id
            }).then(function (response) {
                if (response.data.success) {
                    alertify.success(response.data.message);
                } else {
                    alertify.error(response.data.message);
                }
            });
            location.reload();
        }
    };

    $scope.updateExtern = function () {
        $scope.message = "";

        $http.post('candidate/updateExtern', {
            id: $scope.candidate.id, extern: $scope.extern
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $scope.deleteExtern = function () {
        $scope.message = "";

        if (confirm("Externes Gespräch wirklich entfernen?")) {
            $http.post('candidate/deleteExtern', {
                id: $scope.candidate.id
            }).then(function (response) {
                if (response.data.success) {
                    alertify.success(response.data.message);
                } else {
                    alertify.error(response.data.message);
                }
            });
            location.reload();
        }
    };

    $scope.updateHire = function () {
        $scope.message = "";

        $http.post('candidate/updateHire', {
            id: $scope.candidate.id, hire: $scope.hire
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $scope.deleteHire = function () {
        $scope.message = "";

        if (confirm("Besetzung (inkl. Team) wirklich entfernen?")) {
            $http.post('candidate/deleteHire', {
                id: $scope.candidate.id
            }).then(function (response) {
                if (response.data.success) {
                    alertify.success(response.data.message);
                } else {
                    alertify.error(response.data.message);
                }
            });
            location.reload();
        }
    };

    $scope.updateRememberMe = function () {
        $scope.message = "";

        $http.post('candidate/updateRememberMe', {
            id: $scope.candidate.id, rememberme: $scope.rememberme
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    };

    $scope.deleteRememberMe = function () {
        $scope.message = "";

        alertify.confirm("Kandidat wirklich von der RememberMe-Liste entfernen?", function (e) {
            if (e) {
                $http.post('candidate/deleteRememberMe', { id: $scope.candidate.id }).then(function (response) {
                    if (response.data.success) {
                        alertify.success(response.data.message);
                    } else {
                        alertify.error(response.data.message);
                    }
                });
            } else {
                alertify.log("RememberMe nicht entfernt!");
            }
        });
    };

    $scope.updateScoreboard = function (scoreboard) {
        $scope.message = "";
        $scope.scoreboard = scoreboard;

        $http.post('candidate/updateScoreboard', {
            id: $scope.candidate.id, scoreboard: $scope.scoreboard
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
        location.reload();
    }

    $scope.updateSourcer = function () {
        $scope.message = "";

        $http.post('candidate/updateSourcer', {
            id: $scope.candidate.id, sourcer_id: $scope.selectSourcer
        }).then(function (response) {
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
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
            if (response.data.success) {
                alertify.success(response.data.message);
            } else {
                alertify.error(response.data.message);
            }
        });
    }


    $scope.delete = function () {
        alertify.confirm("Kandidat wirklich löschen?", function (e) {
            if (e) {
                $http.post('candidate/delete', { id: $scope.candidate.id }).then(function (response) {
                    if (response.data.success) {
                        alertify.success(response.data.message);
                        setTimeout(function () {
                            window.location.href = "#!candidates";
                        }, 1000);
                    } else {
                        alertify.error(response.data.message);
                    }
                });
            } else {
                alertify.log("Kandidat löschen - Abgebrochen");
            }
        });
    };
});


app.controller('rememberMeListController', function ($scope, $http) {
    $scope.filterMonth = $('#filter_month').val().substring(5);

    var filter_month = false;
    var showusercandidates = false;

    $scope.resetFilter = function () {
        location.reload();
    };

    $scope.filterCandidates = function () {
        var fm = $('#filter_month').val();

        if ($scope.showusercandidates) {
            showusercandidates = true;
        } else {
            showusercandidates = false;
        }

        if ($scope.filterMonth != undefined) {
            filter_month = fm.substring(5);
        } else {
            filter_month = new Date().getMonth();
        }

        $http.post('candidate/rememberMeList', {
            filter_month: filter_month, showusercandidates: showusercandidates
        }).then(function (response) {
            $scope.candidate = response.data.data.candidate;
            if (!response.data.success) {
                alertify.alert(response.data.message);
            }
        });
    };

    $scope.filterCandidates();

    $scope.resetFilter = function () {
        location.reload();
    };

    $scope.searchNames = function () {
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputName");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

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
    };

    $scope.searcheR = function () {
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputeR");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

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
    };

    $scope.searchSource = function () {
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputSource");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

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
    };
});