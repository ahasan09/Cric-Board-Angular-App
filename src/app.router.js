(function (angular) {
    'use strict';

    angular.module('cricBoardApp').config(addRoutes);

    addRoutes.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

    function addRoutes($stateProvider,$locationProvider, $urlRouterProvider){
        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'partials/cric-start.html',
                controller:'cricBoardStartController',
                controllerAs:'vm'
            })
            .state('play', {
                url: '/play/:matchId/:over/:ball',
                params: {
                    selectedCountries: null
                },
                reloadOnSearch: false,
                templateUrl: 'partials/cric-play.html',
                controller:'cricBoardPlayController',
                controllerAs:'vm'
            });
        $urlRouterProvider.otherwise('/start');
        $locationProvider.hashPrefix('');
    }
})(window.angular);