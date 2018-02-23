
angular.module('App').controller('dealRecordCtl',function($ionicHistory,$timeout,$scope,$stateParams,$http,$Factory,$ionicLoading){
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	
})
