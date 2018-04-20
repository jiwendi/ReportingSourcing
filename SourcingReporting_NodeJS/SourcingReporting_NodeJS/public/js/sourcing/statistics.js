
/**
 * StatisticsController
 */
app.controller('statisticsController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;
    
    $scope.yearToFilter = $('#yearToFilter').val();

    $scope.update = function () {

        $scope.yearToFilter = $('#yearToFilter').val();

        $http.post('stat/requestsByYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
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

    $http.post('stat/requestsByYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
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
    
    $scope.resetFilter = function () {
        $('#from').val("");
        $('#to').val("");

        location.reload();
    };

    $scope.filter = function () {

        if ($scope.from != undefined) {
            $scope.filterFrom = toLocalDate($scope.from, 2);
        }

        if ($scope.to != undefined) {
            $scope.filterTo = toLocalDate($scope.to, 2);
        }

        $http.post('stat/reqToHire', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
            $scope.reqToHire = response.data.data;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;

            var convertionRateTotal = [];
            var convertionRateSteps = [];

            convertionRateTotal.push(0);
            convertionRateTotal.push(($scope.reqToHire.telnotice / $scope.reqToHire.request * 100).toFixed(2));
            convertionRateTotal.push(($scope.reqToHire.intern / $scope.reqToHire.request * 100).toFixed(2));
            convertionRateTotal.push(($scope.reqToHire.extern / $scope.reqToHire.request * 100).toFixed(2));
            convertionRateTotal.push(($scope.reqToHire.hires / $scope.reqToHire.request * 100).toFixed(2));

            convertionRateSteps.push(0);
            convertionRateSteps.push(($scope.reqToHire.telnotice / $scope.reqToHire.request * 100).toFixed(2));
            convertionRateSteps.push(($scope.reqToHire.intern / $scope.reqToHire.telnotice * 100).toFixed(2));
            convertionRateSteps.push(($scope.reqToHire.extern / $scope.reqToHire.intern * 100).toFixed(2));
            convertionRateSteps.push(($scope.reqToHire.hires / $scope.reqToHire.extern * 100).toFixed(2));


            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                yAxisID: 'y-axis-1',
                data: {
                    labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
                    datasets: [{
                        label: 'Anzahl',
                        data: [$scope.reqToHire.request, $scope.reqToHire.telnotice, $scope.reqToHire.intern, $scope.reqToHire.extern, $scope.reqToHire.hires],
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
                    }, {
                        label: 'Convertion Rate Gesamt',
                        yAxisID: 'y-axis-2',
                        data: convertionRateTotal,
                        fill: false,
                        type: 'line',
                        backgroundColor: getColor('yellow'),
                        borderColor: getColor('yellow'),
                        borderWidth: 3,
                        intersect: true
                        }
                        , {
                        label: 'Convertion Rate je Step',
                        yAxisID: 'y-axis-2',
                        data: convertionRateSteps,
                        fill: false,
                        type: 'line',
                        backgroundColor: getColor('green'),
                        borderColor: getColor('green'),
                        borderWidth: 3,
                        intersect: true
                    }]
                },
                options: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltips: {
                        mode: 'x'
                    },
                    scales: {
                        yAxes: [{
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                            ticks: {
                                        min: 0
                                    }
                        }, {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'y-axis-2',
                            ticks: {
                                min: 0,
                                suggestedMax: 100,
                                stepSize: 20
                            },
                            gridLines: {
                                drawOnChartArea: false
                            }
                        }]
                    }
                }
            });
        });//end reqToHire
    };

    $scope.filter();
    
});

app.controller('statisticsReqToHirePlattformController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;
    $scope.selectSource = $('#selectSource').val();

    $scope.resetFilter = function () {
        location.reload();
    };
    

    $scope.filter = function () {

        if ($scope.from != undefined) {
            $scope.filterFrom = toLocalDate($scope.from,2);
        }

        if ($scope.to != undefined) {
            $scope.filterTo = toLocalDate($scope.to, 2);
        }

        if ($scope.selectSource == undefined)
        {
            $scope.selectSource = 1;
        }

        if ($('#selectSource').val() == '') {
            $scope.team = false;
        } else {
            $scope.team = $('#selectSource').val();
        }

        
        $http.post('stat/reqToHireByPlattform', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo, source: $scope.team }).then(function (response) {
            $scope.sources = response.data.data.sources;
            $scope.reqToHireByPlattform = response.data.data.reqToHireByPlattform;

            var convertionRateTotal = [];
            var convertionRateSteps = [];
            
            convertionRateTotal.push(0);
            convertionRateTotal.push(($scope.reqToHireByPlattform.telnotice / $scope.reqToHireByPlattform.request * 100).toFixed(2));
            convertionRateTotal.push(($scope.reqToHireByPlattform.intern / $scope.reqToHireByPlattform.request * 100).toFixed(2));
            convertionRateTotal.push(($scope.reqToHireByPlattform.extern / $scope.reqToHireByPlattform.request * 100).toFixed(2));
            convertionRateTotal.push(($scope.reqToHireByPlattform.hires / $scope.reqToHireByPlattform.request * 100).toFixed(2));

            convertionRateSteps.push(0);
            convertionRateSteps.push(($scope.reqToHireByPlattform.telnotice / $scope.reqToHireByPlattform.request * 100).toFixed(2));
            convertionRateSteps.push(($scope.reqToHireByPlattform.intern / $scope.reqToHireByPlattform.telnotice * 100).toFixed(2));
            convertionRateSteps.push(($scope.reqToHireByPlattform.extern / $scope.reqToHireByPlattform.intern * 100).toFixed(2));
            convertionRateSteps.push(($scope.reqToHireByPlattform.hires / $scope.reqToHireByPlattform.extern * 100).toFixed(2));

            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;

            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                yAxisID: 'y-axis-1',
                data: {
                    labels: ["Ansprache", "Telefonnotizen", "Interne Gespräche", "Externe Gespräche", "Besetzungen"],
                    datasets: [
                        {
                            label: 'Anzahl',
                            data: [$scope.reqToHireByPlattform.request, $scope.reqToHireByPlattform.telnotice, $scope.reqToHireByPlattform.intern, $scope.reqToHireByPlattform.extern, $scope.reqToHireByPlattform.hires],
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
                        },
                        {
                            label: 'Convertion Rate Gesamt',
                            yAxisID: 'y-axis-2',
                            data: convertionRateTotal,
                            fill: false,
                            type: 'line',
                            backgroundColor: getColor('yellow'),
                            borderColor: getColor('yellow'),
                            borderWidth: 3,
                            intersect: true
                        },
                        {
                            label: 'Convertion Rate je Step',
                            yAxisID: 'y-axis-2',
                            data: convertionRateSteps,
                            fill: false,
                            type: 'line',
                            backgroundColor: getColor('green'),
                            borderColor: getColor('green'),
                            borderWidth: 3,
                            intersect: true
                    }]
                },
                options: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltips: {
                        mode: 'x'
                    },
                    scales: {
                        yAxes: [{
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                            ticks: {
                                min: 0
                            }
                        }, {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'y-axis-2',
                            ticks: {
                                min: 0,
                                suggestedMax: 100,
                                stepSize: 20
                            },
                            gridLines: {
                                drawOnChartArea: false
                            }
                        }]
                    }
                }
            });

        });

    };

    $scope.filter();



});

app.controller('statisticsHiresInTeamController', function ($scope, $http) {
   
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;

    $http.post('stat/hiresInTeams', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
        $scope.teamHires = response.data.data.hiresInTeams;
        $scope.countHires = response.data.data.countHires;
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

    var ctx = $("#myChart");

    $http.post('stat/responseRate', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
        $scope.responseRates = response.data.data.responseRates;
        $scope.allResponseRate = response.data.data.allResponseRate;

        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;

        
        $scope.labels = [];
        $scope.requests = [];
        $scope.responses = [];
        $scope.responseRate = [];
        $scope.backgroundColorForChartRequest = [];
        $scope.borderColorForChartRequest = [];
        $scope.backgroundColorForChartResponse = [];
        $scope.borderColorForChartResponse = [];

        for (var i = 0; i < $scope.responseRates.length; i++) {
            $scope.labels.push($scope.responseRates[i].name);
            
            $scope.requests.push($scope.responseRates[i].requests);
            $scope.responses.push($scope.responseRates[i].responses);
            
            $scope.responseRate.push(($scope.responseRates[i].responses / $scope.responseRates[i].requests * 100).toFixed(2));
            
            $scope.backgroundColorForChartRequest.push(getColor('red'));
            $scope.borderColorForChartRequest.push(getBorderColor('red'));
            $scope.backgroundColorForChartResponse.push(getColor('gray-medium'));
            $scope.borderColorForChartResponse.push(getBorderColor('gray-medium'));
        }

       // var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            yAxisID: 'y-axis-1',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Ansprache',
                    data: $scope.requests,
                    backgroundColor: $scope.backgroundColorForChartRequest,
                    borderColor: $scope.borderColorForChartRequest,
                    borderWidth: 1
                },
                {
                    label: 'Response',
                    data: $scope.responses,
                    backgroundColor: $scope.backgroundColorForChartResponse,
                    borderColor: $scope.borderColorForChartResponse,
                    borderWidth: 1
                },
                {
                    label: 'Response Rate',
                    yAxisID: 'y-axis-2',
                data: $scope.responseRate,
                fill: false,
                type: 'line',
                backgroundColor: getColor('yellow'),
                borderColor: getColor('yellow'),
                borderWidth: 3
                }]
            },
            options: {
                legend: {
                    position: 'bottom'
                },
                tooltips: {
                    mode: 'x'
                },
                scales: {
                    yAxes: [{
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                    }, {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }]
                }
            }
        });



    });//end allData


    $scope.resetFilter = function () {
        location.reload();
    };

    $scope.filter = function () {
        
        if ($scope.from != undefined) {
            $scope.filterFrom = toLocalDate($scope.from, 2);
        }

        if ($scope.to != undefined) {
            $scope.filterTo = toLocalDate($scope.to, 2);
        }
        
        $http.post('stat/responseRate', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
            $scope.responseRates = response.data.data.responseRates;
            $scope.allResponseRate = response.data.data.allResponseRate;

            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;


            $scope.labels = [];
            $scope.requests = [];
            $scope.responses = [];
            $scope.responseRate = [];
            $scope.backgroundColorForChartRequest = [];
            $scope.borderColorForChartRequest = [];
            $scope.backgroundColorForChartResponse = [];
            $scope.borderColorForChartResponse = [];

            for (var i = 0; i < $scope.responseRates.length; i++) {
                $scope.labels.push($scope.responseRates[i].name);
                $scope.requests.push($scope.responseRates[i].requests);
                $scope.responses.push($scope.responseRates[i].responses);
                
                $scope.responseRate.push(($scope.responseRates[i].responses / $scope.responseRates[i].requests * 100).toFixed(2));
                
                $scope.backgroundColorForChartRequest.push(getColor('red'));
                $scope.borderColorForChartRequest.push(getBorderColor('red'));
                $scope.backgroundColorForChartResponse.push(getColor('gray-medium'));
                $scope.borderColorForChartResponse.push(getBorderColor('gray-medium'));
            }

            //var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                yAxisID: 'y-axis-1',
                data: {
                    labels: $scope.labels,
                    datasets: [{
                        label: 'Ansprache',
                        data: $scope.requests,
                        backgroundColor: $scope.backgroundColorForChartRequest,
                        borderColor: $scope.borderColorForChartRequest,
                        borderWidth: 1
                    },
                    {
                        label: 'Response',
                        data: $scope.responses,
                        backgroundColor: $scope.backgroundColorForChartResponse,
                        borderColor: $scope.borderColorForChartResponse,
                        borderWidth: 1
                    },
                    {
                        label: 'Response Rate',
                        yAxisID: 'y-axis-2',
                        data: $scope.responseRate,
                        fill: false,
                        type: 'line',
                        backgroundColor: getColor('yellow'),
                        borderColor: getColor('yellow'),
                        borderWidth: 3
                    }]
                },
                options: {
                    legend: {
                        position: 'bottom'
                    },
                    scales: {
                        //yAxes: [{
                        //    ticks: {
                        //        beginAtZero: true
                        //    }
                        //}]
                        yAxes: [{
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                        }, {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'y-axis-2',
                            gridLines: {
                                drawOnChartArea: false
                            }
                        }]
                    }
                }
            });



        });//end allData
        
        myChart.update();
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
    $scope.filterFrom = FILTER_FROM; 
    $scope.filterTo = FILTER_TO; 

    var from_hire = false;
    var to_hire = false;
    var showScoreboard = false;

    $scope.resetFilter = function () { 
        location.reload();
    };
    
    $scope.filterCandidates = function () {

        if ($scope.showScoreboard) {
            showScoreboard = 1;
        } else {
            showScoreboard = 0;
        }
        
        if ($scope.from != undefined) {
            from_hire = toLocalDate($scope.from, 2);
        } else {
            from_hire = FILTER_FROM;
        }

        if ($scope.to != undefined) {
            to_hire = toLocalDate($scope.to, 2);
        } else {
            to_hire = FILTER_TO;
        }
        
        $http.post('stat/hireList', {
            filterFrom: from_hire, filterTo: to_hire, scoreboard: showScoreboard
        }).then(function (response) {
            $scope.candidates = response.data.data.candidates;
            $scope.anzahl = response.data.data.anzahl;
            $scope.anzahleR = response.data.data.anzahleR;
            $scope.eRcandidates = response.data.data.eRcandidates;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;
        });
    };

    $scope.filterCandidates();

    $scope.searchNames = function () {
        var input, filter, table, tbody, tr, td, i;
        input = document.getElementById("inputName");
        filter = input.value.toUpperCase();
        table = document.getElementById("candidates");
        tbody = document.getElementById("tableBody");
        tr = tbody.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
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
            td = tr[i].getElementsByTagName("td")[1];
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



