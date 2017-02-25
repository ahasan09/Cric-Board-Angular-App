(function(angular){
    'use strict';
    function initApp() {
        var app = angular.module('cricBoardApp');
        app.constant('matchKey', 'cricMatch');
        app.constant('scoreBoardKey', 'cricBoard');
        app.run(runBlock);
        app.config(configBlock);

        runBlock.$inject = ['$rootScope', '$state', '$http', '$timeout', '$location'];
        configBlock.$inject = ['$mdThemingProvider','$compileProvider'];

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

        function configBlock($mdThemingProvider, $compileProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue', { 'default': '500' })
                .accentPalette('red');

            $compileProvider.debugInfoEnabled(false);
        }

        angular.bootstrap(document, ['cricBoardApp']);
    }
    document.addEventListener('DOMContentLoaded', initApp, false);
})(window.angular);
