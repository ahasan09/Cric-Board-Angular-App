(function(angular) {
    'use strict';

    angular.module('cricBoardModule').
        controller('cricBoardPlayController',constructor);

    constructor.$inject=['$state','cricBoardService'];
    function constructor($state,cricBoardService){
        var vm=this;

        function initializeCricBoard(){
            cricBoardService.scoreBoardObj.isMatchFinished=false;
            vm.over=Number($state.params.over);
            vm.ball=Number($state.params.ball);
            vm.matchId=$state.params.matchId;
            vm.selectedCountries=$state.params.selectedCountries;
            vm.mainScoreBoards=[];
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

        function playCricket(){
            var matchScores=cricBoardService.getMatchSpecificScores(vm.mainScoreBoards,vm.matchId);
            var scoreBoardResult;
                cricBoardService.playCricket(vm.isInitializeScore,vm.mainScoreBoards,vm.matchId,vm.over,vm.ball,matchScores).then(function(response){
                    scoreBoardResult=response;
                    cricBoardService.prepareScoreBoard(vm.mainScoreBoards,scoreBoardResult.matchId,scoreBoardResult.over,scoreBoardResult.ball);
                    setScoreBoardData(scoreBoardResult);
                    changeRouteParam(scoreBoardResult.matchId,scoreBoardResult.over,scoreBoardResult.ball);
                });

           /* cricBoardService.prepareScoreBoard(vm.mainScoreBoards,scoreBoardResult.matchId,scoreBoardResult.over,scoreBoardResult.ball);


            setScoreBoardData(scoreBoardResult);
            changeRouteParam(scoreBoardResult.matchId,scoreBoardResult.over,scoreBoardResult.ball);*/

            /*var scoreBoardResult={};
            cricBoardService.playCricket(vm.isInitializeScore,vm.mainScoreBoards,vm.matchId,vm.over,vm.ball).then(function(response){
                scoreBoardResult=response;
                setScoreBoardData(scoreBoardResult);
                changeRouteParam(scoreBoardResult.matchId,scoreBoardResult.over,scoreBoardResult.ball);
            });*/
        }

        function showSpecificBallScore(matchId,over,ball){
            var scoreBoardResult = cricBoardService.getBallSpecificScore(vm.mainScoreBoards,matchId,over,ball);
            setScoreBoardData(scoreBoardResult);
            changeRouteParam(matchId,over,ball);
        }

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
        function newMatch(){
            cricBoardService.scoreBoardObj.isMatchFinished=false;
            $state.go('start');
        }

        vm.playCricket=playCricket;
        vm.showSpecificBallScore=showSpecificBallScore;
        vm.newMatch=newMatch;
        initializeCricBoard();
    }
})(window.angular);