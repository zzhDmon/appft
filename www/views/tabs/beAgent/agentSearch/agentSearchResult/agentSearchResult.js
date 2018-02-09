angular.module('App')
.controller('agentSearchResultCtl',function(goTo,$stateParams,$ionicHistory,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$timeout){
	
	$scope.goto=function(id){
        goTo.goto('agentHomePage',{id:id})
    }
    $scope.back=function(){
        $ionicHistory.goBack();
    }
    $scope.headTitle=$stateParams.query;

})

