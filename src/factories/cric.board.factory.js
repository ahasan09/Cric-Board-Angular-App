(function(angular) {
    'use strict';

    var module = angular.module('cricBoardModule');
    module.factory('cricBoardFactory', factory);
    factory.$inject=['matchKey']
    function factory(matchKey) {
        function getTeamGroups(){
            return [
                {
                    id:1,
                    label:'First Team',
                    countries:['Bangladesh','India','Pakistan','Srilanka'],
                    selectedCountry:''
                },
                {
                    id:2,
                    label:'Second Team',
                    countries:['Australia','England','South Africa','Newzland'],
                    selectedCountry:''
                }
            ];
        }
        function getNewMatchId(cricMatchData){
            var cricMatchData= getMatchInfoOnLocalStorage();
            cricMatchData=cricMatchData||[];
            var maxMatchId=0;
            if(cricMatchData.length>0){
                var result = _.max(cricMatchData, _.property('matchId'));
                maxMatchId=result?result.matchId:0;
            }
            var newMatchId=maxMatchId?Number(maxMatchId)+1:1;
            return newMatchId;
        }
        function setMatchData(cricMatchData,newMatchId,selectedCountry){
            cricMatchData.push({
                matchId:newMatchId,country:selectedCountry
            })
            setMatchInfoOnLocalStorage(cricMatchData);
        }
        function setMatchInfoOnLocalStorage(cricMatchData){
            localStorage.setItem(matchKey,JSON.stringify(cricMatchData));
        }
        function getMatchInfoOnLocalStorage(){
            return JSON.parse(localStorage.getItem(matchKey));
        }
        function getSelectedCountry(matchId){
            return _.find(JSON.parse(localStorage.getItem(matchKey)),function(item){return item.matchId==matchId;});
        }
        return {
            setMatchInfoOnLocalStorage:setMatchInfoOnLocalStorage,
            getMatchInfoOnLocalStorage:getMatchInfoOnLocalStorage,
            getTeamGroups: getTeamGroups,
            getNewMatchId:getNewMatchId,
            setMatchData:setMatchData,
            getSelectedCountry:getSelectedCountry
        }
    }
})(window.angular);