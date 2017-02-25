(function(angular) {
    'use strict';

    angular.module('cricBoardApp').directive('scoreBoardSummary', factory);

    //factory.$inject = ['$interval'];
    function factory() {

        function link(scope, element, attrs) {

            scope.$watch('color', function(newValue, oldValue) {

            });
        }

        return {
            scope: {
                totalRun: '=totalRun',
                totalOver: '=totalOver'
            },
            templateUrl: 'partials/score.summary.html',
            link: link
        }
    }

})(window.angular);