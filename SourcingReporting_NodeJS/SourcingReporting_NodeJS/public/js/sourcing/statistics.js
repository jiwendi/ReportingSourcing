app.controller('statisticsController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

});

app.controller('statisticsOverallAnalysisController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;

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

        $http.post('statistics/overallAnalysis', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
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

            $("#ChartDiv").empty();
            $("#ChartDiv").append('<canvas id="myChart"></canvas>');
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
        });
    };
    $scope.filter();
});

app.controller('statisticsOverallAnalysisByPlattformController', function ($scope, $http) {
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
            $scope.filterFrom = toLocalDate($scope.from, 2);
        }

        if ($scope.to != undefined) {
            $scope.filterTo = toLocalDate($scope.to, 2);
        }

        if ($scope.selectSource == undefined) {
            $scope.selectSource = 1;
        }

        if ($('#selectSource').val() == '' || $('#selectSource').val() == null) {
            $scope.team = false;
        } else {
            $scope.team = $('#selectSource').val();
        }

        $http.post('statistics/overallAnalysisByPlattform', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo, source: $scope.team }).then(function (response) {
            $scope.sources = response.data.data.sources;
            $scope.reqToHireByPlattform = response.data.data.reqToHireByPlattform;
            $scope.sourceName = response.data.data.sourceName;
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

            $("#ChartDiv").empty();
            $("#ChartDiv").append('<canvas id="myChart"></canvas>');
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

app.controller('statisticsHiresByTeamController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;

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

        $http.post('statistics/hiresByTeams', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
            $scope.teamHires = response.data.data.hiresInTeams;
            $scope.teamHiresER = response.data.data.eRHiresInTeams;
            $scope.countHires = response.data.data.countHires;
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

            $("#ChartDiv").empty();
            $("#ChartDiv").append('<canvas id="myChart"></canvas>');
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
        });
    };
    $scope.filter();
});

app.controller('statisticsResponseRateController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;

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

        $http.post('statistics/responseRate', { filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
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

            $("#ChartDiv").empty();
            $("#ChartDiv").append('<canvas id="myChart"></canvas>');
            var ctx = $("#myChart");
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
        });
    };
    $scope.filter();
});

app.controller('statisticsTelNoticeController', function ($scope, $http) {
    $scope.yearToFilter = THIS_YEAR;

    $http.post('statistics/telNoticeOverview', { yearToFilter: $scope.yearToFilter }).then(function (response) {
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

        $("#ChartDiv").empty();
        $("#ChartDiv").append('<canvas id="myChart"></canvas>');
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

            $http.post('statistics/telNoticeOverview', { yearToFilter: $scope.yearToFilter }).then(function (response) {
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

                $("#ChartDiv").empty();
                $("#ChartDiv").append('<canvas id="myChart"></canvas>');
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

    /*
     * Return "candidateNotOnScoreboard" for highlighting Candidated with Scoreboard = 0 on Hire-List
     */
    $scope.isnotatScoreboard = function (candidate) {
        if (candidate.scoreboard == "Nein") {
            return "candidateNotOnScoreboard";
        } else {
            return "";
        }
    };

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

        $http.post('statistics/hireList', {
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



app.controller('statisticsWeeklyNumbersController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.yearToFilter = $('#yearToFilter').val();

    $scope.update = function () {
        $scope.yearToFilter = $('#yearToFilter').val();

        $http.post('statistics/weeklyNumbers', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.requestsByKW = response.data.data.requestsByKW;
            $scope.telnoticeByKW = response.data.data.telnoticeByKW;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;
        });
    };
    $scope.update();
});


app.controller('responseValuesController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $scope.yearToFilter = THIS_YEAR;
    $scope.filterFrom = FILTER_FROM;
    $scope.filterTo = FILTER_TO;

    $scope.resetFilter = function () {
        location.reload();
    };

    $scope.filter = function () {
        $scope.filterFrom = $('#from').val();

        if (!$scope.filterFrom) {
            $scope.filterFrom = FILTER_FROM;
        }

        $scope.filterTo = $('#to').val();

        if (!$scope.filterTo) {
            $scope.filterTo = FILTER_TO;
        }

        $http.post('statistics/responseValues', { yearToFilter: $scope.yearToFilter, filterFrom: $scope.filterFrom, filterTo: $scope.filterTo }).then(function (response) {
            $scope.responseValues = response.data.data;
            $scope.message = response.data.message;
            $scope.iserrmessage = !response.data.success;

            $scope.percentage = [];
            $scope.percentage.push(100);
            $scope.percentage.push((100 / $scope.responseValues.ansprachen * $scope.responseValues.response_gesamt).toFixed(2));
            $scope.percentage.push((100 / $scope.responseValues.response_gesamt * $scope.responseValues.positiveResponse).toFixed(2));
            $scope.percentage.push((100 / $scope.responseValues.response_gesamt * $scope.responseValues.negativeResponse).toFixed(2));

            $("#ChartDiv").empty();
            $("#ChartDiv").append('<canvas id="myChart"></canvas>');
            var ctx = $("#myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                yAxisID: 'y-axis-1',
                data: {
                    labels: ['Ansprachen', 'Response-Gesamt', 'Response-Positiv', 'Response-Negativ'],
                    datasets: [{
                        label: 'Absolute Zahlen',
                        data: [$scope.responseValues.ansprachen, $scope.responseValues.response_gesamt, $scope.responseValues.positiveResponse, $scope.responseValues.negativeResponse],
                        backgroundColor: getColor('red'),
                        borderColor: getColor('red'),
                        borderWidth: 1
                    }, {
                        label: 'Prozent',
                        yAxisID: 'y-axis-2',
                        data: $scope.percentage,
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
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 10
                            }
                        }, {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            id: 'y-axis-2',
                            gridLines: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }]
                    }
                }
            });
        });
    };
    $scope.filter();
});

app.controller('timeToTelNoticeScatteringController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('statistics/timeToTelNoticeScattering').then(function (response) {
        $scope.data = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
        $scope.dataset = [];
        $scope.borderColorForChart = [];
        $scope.backgroundColorForChart = [];
        $scope.labels = [];

        if ($scope.data.iszero > 0) {
            $scope.dataset.push($scope.data.iszero);
            $scope.labels.push("0 Tage");
            $scope.backgroundColorForChart.push(getColor("red"));
            $scope.borderColorForChart.push(getBorderColor("red"));
        }

        if ($scope.data.oneortwo > 0) {
            $scope.dataset.push($scope.data.oneortwo);
            $scope.labels.push("1-2 Tage");
            $scope.backgroundColorForChart.push(getColor("yellow"));
            $scope.borderColorForChart.push(getBorderColor("yellow"));
        }

        if ($scope.data.threetosix > 0) {
            $scope.dataset.push($scope.data.threetosix);
            $scope.labels.push("3-6 Tage");
            $scope.backgroundColorForChart.push(getColor("green"));
            $scope.borderColorForChart.push(getBorderColor("green"));
        }

        if ($scope.data.seventonine > 0) {
            $scope.dataset.push($scope.data.seventonine);
            $scope.labels.push("7-9 Tage");
            $scope.backgroundColorForChart.push(getColor("blue"));
            $scope.borderColorForChart.push(getBorderColor("blue"));
        }

        if ($scope.data.f10t13 > 0) {
            $scope.dataset.push($scope.data.f10t13);
            $scope.labels.push("10-13 Tage");
            $scope.backgroundColorForChart.push(getColor("pink"));
            $scope.borderColorForChart.push(getBorderColor("pink"));
        }

        if ($scope.data.f14t17 > 0) {
            $scope.dataset.push($scope.data.f14t17);
            $scope.labels.push("14-17 Tage");
            $scope.backgroundColorForChart.push(getColor("gray-medium"));
            $scope.borderColorForChart.push(getBorderColor("gray-medium"));
        }

        if ($scope.data.f18t25 > 0) {
            $scope.dataset.push($scope.data.f18t25);
            $scope.labels.push("18-25 Tage");
            $scope.backgroundColorForChart.push(getColor("dark-green"));
            $scope.borderColorForChart.push(getBorderColor("dark-green"));
        }

        if ($scope.data.f25t50 > 0) {
            $scope.dataset.push($scope.data.f25t50);
            $scope.labels.push("25-50 Tage");
            $scope.backgroundColorForChart.push(getColor("orange"));
            $scope.borderColorForChart.push(getBorderColor("orange"));
        }

        if ($scope.data.f50t100 > 0) {
            $scope.dataset.push($scope.data.f50t100);
            $scope.labels.push("50-100 Tage");
            $scope.backgroundColorForChart.push(getColor("gray-dark"));
            $scope.borderColorForChart.push(getBorderColor("gray-dark"));
        }

        if ($scope.data.up100 > 0) {
            $scope.dataset.push($scope.data.up100);
            $scope.labels.push("über 100 Tage");
            $scope.backgroundColorForChart.push(getColor("dark"));
            $scope.borderColorForChart.push(getBorderColor("dark"));
        }
        
        $("#ChartDiv").empty();
        $("#ChartDiv").append('<canvas id="myChart"></canvas>');
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            yAxisID: 'y-axis-1',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Absolute Zahlen',
                    data: $scope.dataset,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'right'
                }
            }
        });
    });

});

app.controller('timeToInternScatteringController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('statistics/timeToInternScattering').then(function (response) {
        $scope.data = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
        $scope.dataset = [];
        $scope.borderColorForChart = [];
        $scope.backgroundColorForChart = [];
        $scope.labels = [];

        if ($scope.data.f0t7 > 0) {
            $scope.dataset.push($scope.data.f0t7);
            $scope.labels.push("0-7 Tage");
            $scope.backgroundColorForChart.push(getColor("red"));
            $scope.borderColorForChart.push(getBorderColor("red"));
        }

        if ($scope.data.f8t14 > 0) {
            $scope.dataset.push($scope.data.f8t14);
            $scope.labels.push("8-14 Tage");
            $scope.backgroundColorForChart.push(getColor("yellow"));
            $scope.borderColorForChart.push(getBorderColor("yellow"));
        }

        if ($scope.data.f15t21 > 0) {
            $scope.dataset.push($scope.data.f15t21);
            $scope.labels.push("15-21 Tage");
            $scope.backgroundColorForChart.push(getColor("green"));
            $scope.borderColorForChart.push(getBorderColor("green"));
        }

        if ($scope.data.f22t30 > 0) {
            $scope.dataset.push($scope.data.f22t30);
            $scope.labels.push("22-30 Tage");
            $scope.backgroundColorForChart.push(getColor("blue"));
            $scope.borderColorForChart.push(getBorderColor("blue"));
        }

        if ($scope.data.f30t60 > 0) {
            $scope.dataset.push($scope.data.f30t60);
            $scope.labels.push("30-60 Tage (1-2 Monate)");
            $scope.backgroundColorForChart.push(getColor("dark"));
            $scope.borderColorForChart.push(getBorderColor("dark"));
        }

        if ($scope.data.f60t90 > 0) {
            $scope.dataset.push($scope.data.f60t90);
            $scope.labels.push("60-90 Tage (2-3 Monate)");
            $scope.backgroundColorForChart.push(getColor("gray-medium"));
            $scope.borderColorForChart.push(getBorderColor("gray-medium"));
        }

        if ($scope.data.f90t120 > 0) {
            $scope.dataset.push($scope.data.f90t120);
            $scope.labels.push("90-120 Tage (3-4 Monate)");
            $scope.backgroundColorForChart.push(getColor("dark-green"));
            $scope.borderColorForChart.push(getBorderColor("dark-green"));
        }

        if ($scope.data.up120 > 0) {
            $scope.dataset.push($scope.data.up120);
            $scope.labels.push("über 120 Tage (über 4 Monate)");
            $scope.backgroundColorForChart.push(getColor("orange"));
            $scope.borderColorForChart.push(getBorderColor("orange"));
        }
        
        $("#ChartDiv").empty();
        $("#ChartDiv").append('<canvas id="myChart"></canvas>');
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            yAxisID: 'y-axis-1',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Absolute Zahlen',
                    data: $scope.dataset,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'right'
                }
            }
        });
    });

});

app.controller('timeToExternScatteringController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('statistics/timeToExternScattering').then(function (response) {
        $scope.data = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
        $scope.dataset = [];
        $scope.borderColorForChart = [];
        $scope.backgroundColorForChart = [];
        $scope.labels = [];

        if ($scope.data.Monat1 > 0) {
            $scope.dataset.push($scope.data.Monat1);
            $scope.labels.push("0-30 Tage (im 1.Monat)");
            $scope.backgroundColorForChart.push(getColor("red"));
            $scope.borderColorForChart.push(getBorderColor("red"));
        }

        if ($scope.data.Monat2 > 0) {
            $scope.dataset.push($scope.data.Monat2);
            $scope.labels.push("31-60 Tage (im 2.Monat)");
            $scope.backgroundColorForChart.push(getColor("yellow"));
            $scope.borderColorForChart.push(getBorderColor("yellow"));
        }

        if ($scope.data.Monat3 > 0) {
            $scope.dataset.push($scope.data.Monat3);
            $scope.labels.push("61-90 Tage (im 3.Monat)");
            $scope.backgroundColorForChart.push(getColor("green"));
            $scope.borderColorForChart.push(getBorderColor("green"));
        }

        if ($scope.data.Monat4 > 0) {
            $scope.dataset.push($scope.data.Monat4);
            $scope.labels.push("91-120 Tage (im 4.Monat)");
            $scope.backgroundColorForChart.push(getColor("blue"));
            $scope.borderColorForChart.push(getBorderColor("blue"));
        }

        if ($scope.data.upMonat4 > 0) {
            $scope.dataset.push($scope.data.upMonat4);
            $scope.labels.push("über 120 Tage (über 4 Monate)");
            $scope.backgroundColorForChart.push(getColor("dark"));
            $scope.borderColorForChart.push(getBorderColor("dark"));
        }


        $("#ChartDiv").empty();
        $("#ChartDiv").append('<canvas id="myChart"></canvas>');
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            yAxisID: 'y-axis-1',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Absolute Zahlen',
                    data: $scope.dataset,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'right'
                }
            }
        });
    });

});

app.controller('timeToHireScatteringController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('statistics/timeToHireScattering').then(function (response) {
        $scope.data = response.data.data;
        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
        $scope.dataset = [];
        $scope.borderColorForChart = [];
        $scope.backgroundColorForChart = [];
        $scope.labels = [];

        if ($scope.data.Monat1 > 0) {
            $scope.dataset.push($scope.data.Monat1);
            $scope.labels.push("0-30 Tage (im 1.Monat)");
            $scope.backgroundColorForChart.push(getColor("red"));
            $scope.borderColorForChart.push(getBorderColor("red"));
        }

        if ($scope.data.Monat2 > 0) {
            $scope.dataset.push($scope.data.Monat2);
            $scope.labels.push("31-60 Tage (im 2.Monat)");
            $scope.backgroundColorForChart.push(getColor("yellow"));
            $scope.borderColorForChart.push(getBorderColor("yellow"));
        }

        if ($scope.data.Monat3 > 0) {
            $scope.dataset.push($scope.data.Monat3);
            $scope.labels.push("61-90 Tage (im 3.Monat)");
            $scope.backgroundColorForChart.push(getColor("green"));
            $scope.borderColorForChart.push(getBorderColor("green"));
        }

        if ($scope.data.Monat4 > 0) {
            $scope.dataset.push($scope.data.Monat4);
            $scope.labels.push("91-120 Tage (im 4.Monat)");
            $scope.backgroundColorForChart.push(getColor("blue"));
            $scope.borderColorForChart.push(getBorderColor("blue"));
        }

        if ($scope.data.Monat5 > 0) {
            $scope.dataset.push($scope.data.Monat5);
            $scope.labels.push("120-150 Tage (im 5. Monat)");
            $scope.backgroundColorForChart.push(getColor("dark"));
            $scope.borderColorForChart.push(getBorderColor("dark"));
        }

        if ($scope.data.Monat6 > 0) {
            $scope.dataset.push($scope.data.Monat6);
            $scope.labels.push("150-180 Tage (im 6. Monat)");
            $scope.backgroundColorForChart.push(getColor("lila"));
            $scope.borderColorForChart.push(getBorderColor("lila"));
        }

        if ($scope.data.upMonat6 > 0) {
            $scope.dataset.push($scope.data.upMonat6);
            $scope.labels.push("über 180 Tage (über 6 Monate)");
            $scope.backgroundColorForChart.push(getColor("gray-medium"));
            $scope.borderColorForChart.push(getBorderColor("gray-medium"));
        }


        $("#ChartDiv").empty();
        $("#ChartDiv").append('<canvas id="myChart"></canvas>');
        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            yAxisID: 'y-axis-1',
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: 'Absolute Zahlen',
                    data: $scope.dataset,
                    backgroundColor: $scope.backgroundColorForChart,
                    borderColor: $scope.borderColorForChart,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'right'
                }
            }
        });
    });

});

app.controller('timeToMaxController', function ($scope, $http) {
    $scope.message = "";
    $scope.iserrmessage = false;

    $http.post('statistics/timetomax').then(function (response) {
        $scope.requestsByKW = response.data.data.requestsByKW;
        $scope.telnoticeByKW = response.data.data.telnoticeByKW;

        $scope.timeToTelNotice = response.data.data.timeToTelNotice;
        $scope.timeToIntern = response.data.data.timeToIntern;
        $scope.timeToExtern = response.data.data.timeToExtern;
        $scope.timeToHire = response.data.data.timeToHire;

        $scope.message = response.data.message;
        $scope.iserrmessage = !response.data.success;
    });


});