(function (angular) {
    'use strict';

    angular.module('cricBoardModule', []).run(runBlock);

    function runBlock() {
        console.log('cric board module running...');
    }

})(window.angular);