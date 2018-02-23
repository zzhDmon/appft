
angular.module('App').controller('myTaskCtl',function($ionicModal,$ionicLoading,$ionicHistory,$timeout,$scope,$stateParams,$http,$Factory){
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}

})

