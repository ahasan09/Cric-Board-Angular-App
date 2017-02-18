(function () {
    'use strict';

    angular.module('CricBoardApp').config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
        console.log("Inside Routing!!");
            $urlRouterProvider.otherwise('/start');
            $stateProvider
                .state('start', {
                    url: '/start',
                    templateUrl: 'cric-board/partials/cric-start.html',
                    controller:'cricBoardStartController as vm'
                })
                .state('play', {
                    url: '/play/:matchId/:over/:ball',
                    params: {
                        selectedCountries: null
                    },
                    reloadOnSearch: false,
                    templateUrl: 'cric-board/partials/cric-play.html',
                    controller:'cricBoardPlayController as vm'
                });
    }]);
})();