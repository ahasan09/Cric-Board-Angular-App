(function() {
    'use strict';
    angular.module('cricBoardModule').
        controller('cricBoardPlayController', function ($scope,$state,cricBoardService) {

            var vm=this;
            vm.over=Number($state.params.over);
            vm.ball=Number($state.params.ball);
            vm.matchId=$state.params.matchId;
            vm.selectedCountries=$state.params.selectedCountries;
            vm.mainScoreBoards=[];

            vm.playCricket=function(){
                var scoreBoardResult={};
               cricBoardService.playCricket(vm.isInitializeScore,vm.mainScoreBoards,vm.matchId,vm.over,vm.ball).then(function(response){
                   scoreBoardResult=response;
                   setScoreBoardData(scoreBoardResult);
                   changeRouteParam(scoreBoardResult.matchId,scoreBoardResult.over,scoreBoardResult.ball);
                });
            }

            vm.showSpecificBallScore=function(matchId,over,ball){
                var scoreBoardResult = cricBoardService.getBallSpecificScore(vm.mainScoreBoards,matchId,over,ball);
                setScoreBoardData(scoreBoardResult);
                changeRouteParam(matchId,over,ball);
            };

            function setScoreBoardData(scoreBoardResult){
                vm.totalRun=scoreBoardResult.totalRun;
                vm.totalOver=scoreBoardResult.totalOver;
                vm.filteredMainScoreBoards=scoreBoardResult.filteredMainScoreBoards;
                vm.isMatchFinished=cricBoardService.isMatchFinished(vm.filteredMainScoreBoards,vm.matchId);
                vm.ball=scoreBoardResult.ball?scoreBoardResult.ball:vm.ball;
                vm.over=scoreBoardResult.over?scoreBoardResult.over:vm.over;
            }

            function changeRouteParam(matchId,over,ball){
                $state.go(".", {matchId:matchId, over: over,ball:ball }, {
                    // prevent the events onStart and onSuccess from firing
                    notify: false,
                    // prevent reload of the current state
                    reload: false,
                    // replace the last record when changing the params so you don't hit the back button and get old params
                    //location: 'replace',
                    // inherit the current params on the url
                    inherit: true
                });
            }

            function initializeCricBoard(){
                vm.isInitializeScore=true;
                vm.mainScoreBoards=cricBoardService.getScoreBoardFromLocalStorage();
                vm.mainScoreBoards=vm.mainScoreBoards?vm.mainScoreBoards:[];
                vm.filteredMainScoreBoards= cricBoardService.getMatchSpecificScores(vm.mainScoreBoards,vm.matchId);
                vm.showSpecificBallScore(vm.matchId, vm.over,vm.ball);
                vm.isMatchFinished=cricBoardService.isMatchFinished(vm.filteredMainScoreBoards,vm.matchId);
                var selectedCountry=cricBoardService.getSelectedCountry(vm.matchId);
                if(selectedCountry){
                    vm.selectedCountries=selectedCountry.country;
                }
                else{
                    $state.go('start');
                }
            }
            initializeCricBoard();
        });
})();