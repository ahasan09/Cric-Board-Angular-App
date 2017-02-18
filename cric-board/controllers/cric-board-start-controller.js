(function() {
    'use strict';
    angular.module('cricBoardModule').
        controller('cricBoardStartController', function ($scope,$state) {

            var vm=this;

            vm.selectedCountries=[];
            var selectedCountry="";
            function CricCard(){}
            CricCard.prototype={
                teamGroups:[
                    {
                        id:1,
                        label:'First Team',
                        countries:['Bangladesh','India','Pakistan','Srilanka'],
                        selectedCountry:''
                    },
                    {
                        id:2,
                        label:'Second Team',
                        countries:['Bangladesh','India','Pakistan','Srilanka'],
                        selectedCountry:''
                    }
                ],
                selectedGroupId:1,
                selectedTeam:function(){
                    var selectedCountries =  _.pluck(vm.cricCard.teamGroups, "selectedCountry");
                    if(selectedCountries.length===2 && selectedCountries[0] && selectedCountries[1]){
                        vm.cricCard.isTwoTeamSelected=true;
                        return selectedCountry = selectedCountries[0]+' VS '+selectedCountries[1];
                    }
                    return '';
                },
                isTwoTeamSelected:false,
                startMatch:function(){
                    var cricMatchData= JSON.parse(localStorage.getItem('cricMatch'));
                    cricMatchData=cricMatchData?cricMatchData:[];
                    var maxMatchId=0;
                    if(cricMatchData.length>0){
                        var result = _.max(cricMatchData, _.property('matchId'));
                        maxMatchId=result?result.matchId:0;
                    }
                    var newMatchId=maxMatchId?Number(maxMatchId)+1:1;
                    cricMatchData.push({
                        matchId:newMatchId,country:selectedCountry
                    })
                    localStorage.setItem('cricMatch',JSON.stringify(cricMatchData));
                    $state.go('play',{matchId:newMatchId,over: 0, ball: 0,selectedCountries:selectedCountry});
                }
            }

            vm.cricCard=new CricCard();
        });
})();