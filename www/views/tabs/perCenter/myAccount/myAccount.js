
angular.module('App').controller('myAccountCtl',function($ionicLoading,$ionicHistory,$timeout,$scope,$stateParams,$http,$Factory){
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}


})

