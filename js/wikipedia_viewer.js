"use strict"

angular.module('wikipediaViewer', [])
    .controller("search", function($scope, $http) {

        $scope.parseAndAddResult = function (result) {
            $scope.results.push({
                url: encodeUri("https://en.wikipedia.org/wiki/" + result.title),
                title: result.title,
                snippet: result.snippet
            });
        };

        $scope.searchArticles = function (searchString) {
            var searchApiBaseUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=";
            var searchApiUrl = encodeURI(searchApiBaseUrl + searchString);

            $scope.results = [];
            $http.get(searchApiUrl)
                .then(function (result) {
                    result.query.search.forEach(
                        $scope.parseAndAddResult(result)
                    );
                });
        };
        $scope.searchArticles("google");
    });

