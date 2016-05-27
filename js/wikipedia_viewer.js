"use strict"

angular.module('wikipediaViewer', ['ngSanitize'])
    .controller("search", function($scope, $http, $sce, $window) {

        $scope.parseAndAddResult = function (result) {
            $scope.results.push({
                url: encodeURI("https://en.wikipedia.org/wiki/" + result.title),
                title: result.title,
                snippet: $sce.trustAsHtml(result.snippet)
            });
        };

        $scope.searchArticles = function (searchString) {
            var searchApiBaseUrl = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=";
            var searchApiUrl = encodeURI(searchApiBaseUrl + searchString);

            $scope.results = [];
            $http.get(searchApiUrl)
                .then(function (apiRequest) {
                    apiRequest.data.query.search.forEach(function (result) {
                        $scope.parseAndAddResult(result);
                    });
                });
        };

        $scope.redirectToRandomArticle = function () {
            var randomArticleUrl = "https://wikipedia.org/wiki/Special:Randompage";
            $window.open(randomArticleUrl, "_blank")
        };

    });
