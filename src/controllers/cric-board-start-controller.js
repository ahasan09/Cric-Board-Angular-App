(function(angular) {
    'use strict';

    angular.module('cricBoardModule').controller('cricBoardStartController',constructor);

    constructor.$inject=['$state','cricBoardFactory'];
    function constructor($state,cricBoardFactory){
        var vm=this;

        vm.selectedCountries=[];
        var selectedCountry="";

        function init(){
            vm.teamGroups= cricBoardFactory.getTeamGroups();
            vm.selectedGroupId=1;
            vm.isTwoTeamSelected=false;
        }

        function getSelectedTeam(){
            var selectedCountries =  _.pluck(vm.teamGroups, "selectedCountry");
            if(selectedCountries.length===2 && selectedCountries[0] && selectedCountries[1]){
                vm.isTwoTeamSelected=true;
                return selectedCountry = selectedCountries[0]+' VS '+selectedCountries[1];
            }
            return '';
        }
        function matchStart(){
            var cricMatchData= cricBoardFactory.getMatchInfoOnLocalStorage();
            cricMatchData=cricMatchData||[];
            var newMatchId=cricBoardFactory.getNewMatchId(cricMatchData);
            cricBoardFactory.setMatchData(cricMatchData,newMatchId,selectedCountry);
            $state.go('play',{matchId:newMatchId,over: 0, ball: 0,selectedCountries:selectedCountry});
        }
        init();
        vm.getSelectedTeam=getSelectedTeam;
        vm.matchStart=matchStart;
    }
})(window.angular);