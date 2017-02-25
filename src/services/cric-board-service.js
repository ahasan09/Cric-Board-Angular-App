(function(angular) {
    'use strict';
    angular.module('cricBoardModule').service('cricBoardService',constructor);
    constructor.$inject=['$q','scoreBoardKey','cricBoardFactory'];

    function constructor($q,scoreBoardKey,cricBoardFactory){
        console.log("CricBoard Service initialize");
        var vm=this;

        vm.scoreBoardObj={
            totalRun:0,
            totalOver:0,
            filteredMainScoreBoards:[],
            matchId:1,
            over:0,
            ball:0,
            isMatchFinished:false
        };

        function getMatchSpecificScores(mainScoreBoards,matchId){
            //var deferred = $q.defer();
            //deferred.resolve(angular.copy(_.filter(mainScoreBoards,function(item){return item.matchId==matchId;})));
            return angular.copy(_.filter(mainScoreBoards,function(item){return item.matchId==matchId;}));
            //return deferred.promise;
        }
        function getOverSpecificScore(mainScoreBoards,matchId,over){
            return _.find(mainScoreBoards,function(item){return item.over===over && item.matchId==matchId;});
        }
        function getBallSpecificScore(mainScoreBoards,matchId,over,ball){
            vm.scoreBoardObj.totalRun=0;
            var overSpecificScoreBoard= this.getOverSpecificScore(mainScoreBoards,matchId,over);
            if(overSpecificScoreBoard) {
                var score = _.find(overSpecificScoreBoard.scores, function (item) {
                    return item.ball === ball;
                });
                if(score)
                    vm.scoreBoardObj.totalRun = score.totalRun;
                else{
                    ball=overSpecificScoreBoard.scores[overSpecificScoreBoard.scores.length-1].ball;
                    this.getBallSpecificScore(matchId,over,ball);
                }
            }
            else if(mainScoreBoards.length>0 && (over!==0 && ball!==0)){
                matchId=mainScoreBoards[mainScoreBoards.length-1].matchId;
                over=mainScoreBoards[mainScoreBoards.length-1].over;
                this.getBallSpecificScore(matchId,over,ball);
            }
            if(ball>0 && ball<6 ){
                vm.scoreBoardObj.totalOver = (over-1)+ball/10;
            }
            else{
                vm.scoreBoardObj.totalOver = over;
            }
            vm.scoreBoardObj.matchId=matchId;
            vm.scoreBoardObj.ball=ball;
            vm.scoreBoardObj.over=over;
            vm.scoreBoardObj.filteredMainScoreBoards=this.getMatchSpecificScores(mainScoreBoards,matchId);

            return vm.scoreBoardObj;
        }
        function prepareScoreBoard(mainScoreBoards,matchId,over,ball){
            //var deferred = $q.defer();
            var randomRun = this.getRandomNumber();
            var scoreBoard= _.find(mainScoreBoards,function(item){return item.over===over && item.matchId==matchId;})
            if(scoreBoard){
                scoreBoard.isMatchFinished=vm.scoreBoardObj.isMatchFinished;
                scoreBoard.scores.push({
                    ball:ball,
                    run:randomRun,
                    comment:'This is test comment'
                });
            }
            else{
                mainScoreBoards.push({
                    matchId:matchId,
                    over:over,
                    scores:[{
                        ball:ball,
                        run:randomRun,
                        comment:'This is test comment'
                    }]
                });
            }
            if(ball<6){
                vm.scoreBoardObj.totalOver = (over-1)+ball/10;
            }
            else{
                vm.scoreBoardObj.totalOver = over;
            }
            vm.scoreBoardObj.totalRun=0;
            var matchData= _.filter(mainScoreBoards,function(item){
                return item.matchId==matchId;
            })
            var getAllScoresData= _.flatten(_.map(matchData, function(scoreBoard){return scoreBoard.scores;}));
            //var data= _.map(getAllScoresData,function(item){return item.run;});
            //vm.totalRun=_.reduce(data, function(memo, num){ return memo + num; }, 0)
            _.each(getAllScoresData,function(item){
                vm.scoreBoardObj.totalRun+=item.run;
            })
            matchData[over-1].scores[ball-1].totalRun=vm.scoreBoardObj.totalRun;
            this.setScoreBoardOnLocalStorage(mainScoreBoards);
            vm.scoreBoardObj.matchId=matchId;
            vm.scoreBoardObj.ball=ball;
            vm.scoreBoardObj.over=over;
            vm.scoreBoardObj.filteredMainScoreBoards=this.getMatchSpecificScores(mainScoreBoards,matchId);
            /*this.getMatchSpecificScores(mainScoreBoards,matchId).then(function(response){
                vm.scoreBoardObj.filteredMainScoreBoards=response;
                deferred.resolve(vm.scoreBoardObj);
            })*/
            setTimeout(function(){
                return vm.scoreBoardObj;
            },100)
            //return deferred.promise;
        }
        function getRandomNumber(){
            return _.random(0,6);
        }
        function playCricket(isInitializeScore,mainScoreBoards,matchId,over,ball,matchScores){
            //var deferred = $q.defer();

            if(isInitializeScore && matchScores.length>0){
                vm.scoreBoardObj.matchId=mainScoreBoards[mainScoreBoards.length-1].matchId;
                vm.scoreBoardObj.over=mainScoreBoards[mainScoreBoards.length-1].over;
                var lastScoreBoard=mainScoreBoards[mainScoreBoards.length-1];
                vm.scoreBoardObj.ball=lastScoreBoard.scores[lastScoreBoard.scores.length-1].ball;
                vm.scoreBoardObj.isInitializeScore=false;
            }
            if(ball<6) {
                vm.scoreBoardObj.over=over===0?1:over;
                vm.scoreBoardObj.ball++;
                if(vm.scoreBoardObj.over===2 && vm.scoreBoardObj.ball===6){
                    vm.scoreBoardObj.isMatchFinished=true;
                }
            }
            else{
                vm.scoreBoardObj.ball=1;
                vm.scoreBoardObj.over++;
            }
            //this.prepareScoreBoard(mainScoreBoards,vm.scoreBoardObj.matchId,vm.scoreBoardObj.over,vm.scoreBoardObj.ball);
            return vm.scoreBoardObj;
            /*this.prepareScoreBoard(mainScoreBoards,vm.scoreBoardObj.matchId,vm.scoreBoardObj.over,vm.scoreBoardObj.ball).then(function(response){
                deferred.resolve(vm.scoreBoardObj);
            })

            return deferred.promise;*/

        }
        function getScoreBoardFromLocalStorage(){
            return JSON.parse(localStorage.getItem(scoreBoardKey));
        }
        function setScoreBoardOnLocalStorage(mainScoreBoards){
            localStorage.setItem(scoreBoardKey,JSON.stringify(mainScoreBoards));
        }
        function getSelectedCountry(matchId){
            return cricBoardFactory.getSelectedCountry(matchId);
            //return _.find(JSON.parse(localStorage.getItem('cricMatch')),function(item){return item.matchId==matchId;});
        }
        function isMatchFinished(filteredMainScoreBoards){
            if(filteredMainScoreBoards.length>0)
                return filteredMainScoreBoards[filteredMainScoreBoards.length-1].isMatchFinished;
            return false;
        }

        this.getBallSpecificScore=getBallSpecificScore;
        this.getOverSpecificScore=getOverSpecificScore;
        this.prepareScoreBoard=prepareScoreBoard;
        this.getRandomNumber=getRandomNumber;
        this.playCricket=playCricket;
        this.getScoreBoardFromLocalStorage=getScoreBoardFromLocalStorage;
        this.setScoreBoardOnLocalStorage=setScoreBoardOnLocalStorage;
        this.getSelectedCountry=getSelectedCountry;
        this.isMatchFinished=isMatchFinished;
        this.getMatchSpecificScores=getMatchSpecificScores;
    }
})(window.angular);
