(function(){
    'use strict';
    angular.module('CricBoardApp', [
        'cricBoardModule',
        'ngAnimate',
        'ngAria',
        'ui.router',
        'ngMaterial'])
        .run(runBlock)
        .config(configBlock);

    runBlock.$inject = ['$rootScope', '$state', '$http', '$timeout', '$location'];

    function runBlock($rootScope, $state, $http, $timeout, $location) {
        console.log("CricBoardApp module running!!");
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });

        //This both part use for check browser back event
        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.actualLocation = $location.path();
        });
        $rootScope.$watch(function () { return $location.path(); }, function (newLocation, oldLocation) {

        });
    }

    configBlock.$inject = ['$mdThemingProvider', '$httpProvider', '$mdIconProvider', '$mdDateLocaleProvider'];

    function configBlock($mdThemingProvider, $httpProvider, $mdIconProvider, $mdDateLocaleProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', { 'default': '500' })
            .accentPalette('grey');
    }
})();
