
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
           /*
        $scope.myYearRequest = response.data.data.request;
        $scope.myYearTelNotice = response.data.data.telNotice;
        $scope.myYearHire = response.data.data.hires;
        */
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
        /*
        $scope.myYearRequest = response.data.data.request;
        $scope.myYearTelNotice = response.data.data.telNotice;
        $scope.myYearHire = response.data.data.hires;
        */
        $scope.myYear = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });

    $http.post('stat/myWeek').then(function (response) {
        $scope.myWeek = response.data.data;
        $scope.myWeekRequest = response.data.data.request;
        $scope.myWeekTelNotice = response.data.data.telnotice;
        $scope.myWeekHires = response.data.data.hires;

        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });

});

app.controller('statisticsReqToHireController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;
    
    $http.post('stat/allData', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
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
                legend: {
                    position: 'bottom'
                },
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
        
        $scope.filterFrom = $('#from').val();
        $scope.filterTo = $('#to').val();

        $http.post('stat/allData', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
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
                    legend: {
                        position: 'bottom'
                    },
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

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;
    $scope.selectSource = $('#selectSource').val();
    
    $http.post('stat/allDataPlattform', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo, source: $scope.selectSource }).then(function (response) {
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
                legend: {
                    position: 'bottom'
                },
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
        $scope.filterFrom = $('#from').val();
        $scope.filterTo = $('#to').val();
       

        $http.post('stat/allDataPlattform', { source: $scope.selectSource, filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
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
                    legend: {
                        position: 'bottom'
                    },
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

app.controller('statisticsHiresInTeamController', function ($scope, $http) {
   
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;

    $http.post('stat/hiresInTeams', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
        $scope.teamHires = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;


        $scope.labels = [];
        $scope.anzahl = [];
        $scope.backgroundColorForChart = [];
        $scope.borderColorForChart = [];

        for (var i = 0; i < $scope.teamHires.length; i++){
            $scope.labels.push($scope.teamHires[i].name);
            $scope.anzahl.push($scope.teamHires[i].anzahl);
            $scope.backgroundColorForChart.push(getColor('gray-dark'));
            $scope.borderColorForChart.push(getBorderColor('gray-dark'));
    }
        
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Anzahl',
                    data: $scope.anzahl,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'bottom'
                },
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


    $scope.updateTeamHires = function () {

        $scope.filterFrom = $('#from').val();
        $scope.filterTo = $('#to').val();
        
        $http.post('stat/hiresInTeams', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
            $scope.teamHires = response.data.data;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;

            $scope.labels = [];
            $scope.anzahl = [];
            $scope.backgroundColorForChart = [];
            $scope.borderColorForChart = [];

            for (var i = 0; i < $scope.teamHires.length; i++) {
                $scope.labels.push($scope.teamHires[i].name);
                $scope.anzahl.push($scope.teamHires[i].anzahl);
                $scope.backgroundColorForChart.push(getColor('gray-dark'));
                $scope.borderColorForChart.push(getBorderColor('gray-dark'));
            }


            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: $scope.labels,
                    datasets: [{
                        label: 'Anzahl',
                        data: $scope.anzahl,
                        backgroundColor: $scope.backgroundColorForChart,
                        borderColor: $scope.borderColorForChart,
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        position: 'bottom'
                    },
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

app.controller('statisticsResponseRateController', function ($scope, $http) {

    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;

    $http.post('stat/responseRate', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
        $scope.responseRates = response.data.data.responseRates;
        $scope.allResponseRate = response.data.data.allResponseRate;

        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;


        $scope.labels = [];
        $scope.requests = [];
        $scope.responses = [];
        $scope.backgroundColorForChart = [];
        $scope.borderColorForChart = [];

        for (var i = 0; i < $scope.responseRates.length; i++) {
            $scope.labels.push($scope.responseRates[i].name);
            $scope.requests.push($scope.responseRates[i].requests);
            $scope.responses.push($scope.responseRates[i].responses);
            $scope.backgroundColorForChart.push(getColor('red'));
            $scope.borderColorForChart.push(getBorderColor('red'));
        }

        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Ansprache',
                    data: $scope.requests,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                },
                {
                    label: 'Response',
                    data: $scope.responses,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'bottom'
                },
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


    $scope.updateResponseRate = function () {

        $scope.filterFrom = $('#from').val();
        $scope.filterTo = $('#to').val();

        $http.post('stat/responseRates', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
            $scope.responseRates = response.data.data.responseRates;
            $scope.allResponseRate = response.data.data.allResponseRate;

            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;


            $scope.labels = [];
            $scope.requests = [];
            $scope.responses = [];
            $scope.backgroundColorForChart = [];
            $scope.borderColorForChart = [];

            for (var i = 0; i < $scope.responseRates.length; i++) {
                $scope.labels.push($scope.responseRates[i].name);
                $scope.requests.push($scope.responseRates[i].requests);
                $scope.responses.push($scope.responseRates[i].responses);
                $scope.backgroundColorForChart.push(getColor('gray-dark'));
                $scope.borderColorForChart.push(getBorderColor('gray-dark'));
            }

            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: $scope.labels,
                    datasets: [{
                        label: 'Anzahl',
                        data: $scope.requests,
                        backgroundColor: $scope.backgroundColorForChart,
                        borderColor: $scope.borderColorForChart,
                        borderWidth: 1
                    },
                    {
                        label: 'Anzahl',
                        data: $scope.responses,
                        backgroundColor: $scope.backgroundColorForChart,
                        borderColor: $scope.borderColorForChart,
                        borderWidth: 1
                    }]
            },
                options: {
                    legend: {
                        position: 'bottom'
                    },
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

app.controller('statisticsTelNoticeController', function ($scope, $http) {
    
    $scope.yearToFilter = THIS_YEAR;

    $http.post('stat/telNotice', { yearToFilter: $scope.yearToFilter }).then(function (response) {
        $scope.telNotice = response.data.data.telNotice;
        $scope.reseaches = response.data.data.reseaches;
        $scope.telNoticeSum = response.data.data.telSum;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;

        $scope.labels = [];
        $scope.telnoticeData = [];
        $scope.backgroundColorForChart = [];
        $scope.borderColorForChart = [];

        for (var i = 0; i < $scope.telNoticeSum.length; i++) {
            $scope.labels.push('KW ' + $scope.telNoticeSum[i].weeknr);
            $scope.telnoticeData.push($scope.telNoticeSum[i].telnotice);
            $scope.backgroundColorForChart.push(getColor('gray-dark'));
            $scope.borderColorForChart.push(getBorderColor('gray-dark'));
        }


        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Anzahl TelNotizen',
                    data: $scope.telnoticeData,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'bottom'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        $scope.update = function () {
            

                $scope.yearToFilter = $('#yearToFilter').val();
            
                $http.post('stat/telNotice', { yearToFilter: $scope.yearToFilter }).then(function (response) {
                    $scope.telNotice = response.data.data.telNotice;
                    $scope.reseaches = response.data.data.reseaches;
                    $scope.telNoticeSum = response.data.data.telSum;
                    $scope.message = response.data.message;
                    $scope.iserrmessage = !response.data.success;
                    $scope.noDataSets = false;

                    $scope.labels = [];
                    $scope.telnoticeData = [];
                    $scope.backgroundColorForChart = [];
                    $scope.borderColorForChart = [];

                    for (var i = 0; i < $scope.telNoticeSum.length; i++) {
                        $scope.labels.push('KW ' + $scope.telNoticeSum[i].weeknr);
                        $scope.telnoticeData.push($scope.telNoticeSum[i].telnotice);
                        $scope.backgroundColorForChart.push(getColor('gray-dark'));
                        $scope.borderColorForChart.push(getBorderColor('gray-dark'));
                    }

                    if ($scope.telNotice.length == 0) {
                        $scope.noDataSets = true;
                        $scope.message = "keine Datensätze vorhanden";
                    }


                    var ctx = $("#myChart");
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: $scope.labels,
                            datasets: [{
                                label: 'Anzahl TelNotizen',
                                data: $scope.telnoticeData,
                                backgroundColor: $scope.backgroundColorForChart,
                                borderColor: $scope.borderColorForChart,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            legend: {
                                position: 'bottom'
                            },
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
});

app.controller('statisticsHireListController', function ($scope, $http) {


   // $scope.filterFrom = $('#from').val();
   // $scope.filterTo = $('#to').val();

    $scope.filterFrom = FILTER_FROM; //new Date(2018, 01, 01);
    $scope.filterTo = FILTER_TO; //new Date(2018, 12, 31);

   

        $http.post('stat/hireList', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
            $scope.candidates = response.data.data.candidates;
            $scope.anzahl = response.data.data.anzahl + response.data.data.anzahleR;
            $scope.eRcandidates = response.data.data.eRcandidates;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;
    });

        $scope.updateHires = function () {
            
            $scope.filterFrom = new Date($('#from').val());
            $scope.filterTo = new Date($('#to').val());



            $http.post('stat/hireList', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
                $scope.candidates = response.data.data.candidates;
                $scope.anzahl = response.data.data.anzahl + response.data.data.anzahleR;
                $scope.eRcandidates = response.data.data.eRcandidates;
                $scope.message = response.data.message;
                $scope.iserrmessage = !response.data.success;
            });



        };




});



