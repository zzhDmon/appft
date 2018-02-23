
angular.module('App').controller('mySafeCtl',function($ionicModal,$ionicLoading,$ionicHistory,$timeout,$scope,$stateParams,$http,$Factory){
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}

	// 回复模态框
	$ionicModal.fromTemplateUrl('templates/buySafemodal.html', {
			scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.buysafe=function(){
		$scope.modal.show()
	}
})

