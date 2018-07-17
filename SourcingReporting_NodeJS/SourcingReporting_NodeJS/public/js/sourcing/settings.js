app.controller('anonymizeCandidateController', function ($scope, $http) {
    $scope.ishiredcandidate = function (candidate) {
        if (candidate.hire != null) {
            return "hiredCandidate";
        } else {
            return "";
        }
    };

    var from_research = FILTER_FROM;
    var lastActivity = FILTER_DAYS;

    // Select All Checkboxes

    $scope.searchCandidatesToAnonymize = function () {
        if ($scope.from_research != undefined) {
            from_research = toLocalDate($scope.from_research, 2);
        }

        if ($scope.lastActivity != undefined && $scope.lastActivity > 0) {
            lastActivity = $scope.lastActivity;
        }

        $http.post('candidates/showCandidateToAnonymizeOverview', {
            from_research: from_research, lastActivity: lastActivity
        }).then(function (response) {
            $scope.candidates = response.data.data.candidate;
            $scope.countCandidate = response.data.data.countCandidate;
        });
    };

    $scope.searchCandidatesToAnonymize();
});