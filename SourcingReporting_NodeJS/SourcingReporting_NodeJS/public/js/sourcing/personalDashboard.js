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
    } else if (currentTime > 6 && currentTime < 10) {
        $scope.greetings = "Guten Morgen ";
    } else if (currentTime >= 10 && currentTime < 11) {
        $scope.greetings = "Zeit um das Mittagessen zu organisieren, ";
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
   
    $http.get('personalDashboard/getAllBirthdays').then(function (response) {
        $scope.birthdays = response.data.data;
        $scope.birthdayString = "";

        if ($scope.birthdays != null) {
            $scope.birthdayClass = "birthdayToday";
        } 
    });

    $http.post('personalDashboard/myWeek').then(function (response) {
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

    $http.get('personalDashboard/telnoticeThisWeek').then(function (response) {
        $scope.candidateTelNotice = response.data.data;
        if (!response.data.success) {
            alertify.error(response.data.message);
        }
    });

    $scope.update = function () {
        $scope.yearToFilter = $('#yearToFilter').val();

        $http.post('personalDashboard/requestsByYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.requestsFromSource = response.data.data.requestsFromSource;
            $scope.allRequests = response.data.data.allRequests;
            if (!response.data.success) {
                alertify.error(response.data.message);
            }
        });

        $http.post('personalDashboard/myYear', { yearToFilter: $scope.yearToFilter }).then(function (response) {
            $scope.myYear = response.data.data;
            if (!response.data.success) {
                alertify.error(response.data.message);
            }
        });
    };
    $scope.update();
});


/* Release 1.5.2 TelnoticeBySourcer */
app.controller('telNoticeBySourcerController', function ($scope, $http) {
    $scope.yearToFilter = THIS_YEAR;

    $http.post('personalDashboard/telnoticeBySourcer', { yearToFilter: $scope.yearToFilter }).then(function (response) {
        $scope.telNotice = response.data.data;

        if (!response.data.success) {
            alertify.set({ delay: 10000 });
            alertify.error(response.data.message);
        }

        $scope.labels = [];
        $scope.telnoticeData = [];
        $scope.backgroundColorForChart = [];
        $scope.borderColorForChart = [];

        $scope.sumTelNotice = 0;
        $scope.countNr = 0;

        for (var i = 0; i < $scope.telNotice.length; i++) {
            $scope.labels.push('KW ' + $scope.telNotice[i].weeknr);
            $scope.telnoticeData.push($scope.telNotice[i].count_telnotice);
            $scope.backgroundColorForChart.push(getColor('red'));
            $scope.borderColorForChart.push(getBorderColor('red'));
            $scope.sumTelNotice = $scope.sumTelNotice + $scope.telNotice[i].count_telnotice;
            $scope.countNr = $scope.countNr + 1;
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

            $http.post('personalDashboard/telnoticeBySourcer', { yearToFilter: $scope.yearToFilter }).then(function (response) {
                $scope.telNotice = response.data.data;

                if (!response.data.success) {
                    alertify.set({ delay: 10000 });
                    alertify.error(response.data.message);
                }

                $scope.labels = [];
                $scope.telnoticeData = [];
                $scope.backgroundColorForChart = [];
                $scope.borderColorForChart = [];

                $scope.sumTelNotice = 0;
                $scope.countNr = 0;

                for (var i = 0; i < $scope.telNotice.length; i++) {
                    $scope.labels.push('KW ' + $scope.telNotice[i].weeknr);
                    $scope.telnoticeData.push($scope.telNotice[i].count_telnotice);
                    $scope.backgroundColorForChart.push(getColor('red'));
                    $scope.borderColorForChart.push(getBorderColor('red'));
                    $scope.sumTelNotice = $scope.sumTelNotice + $scope.telNotice[i].count_telnotice;
                    $scope.countNr = $scope.countNr + 1;
                }

                if ($scope.telNotice.length == 0) {
                    alertify.set({ delay: 10000 });
                    alertify.error("keine Datensätze für " + $scope.yearToFilter + " vorhanden");
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