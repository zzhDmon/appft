
angular.module('App').controller('highServeCtl',function($ionicModal,$ionicLoading,$ionicHistory,$timeout,$scope,$stateParams,$http,$Factory){
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.$on('$ionicView.beforeEnter',function(){
		//友盟统计
		Umeng.Analytics.logEvent({
		    eventId: 'ft_goalBrowse'
		}, function () {
			
		}, function (reason) {
		
		});

	})
	
	// 回复模态框
	$ionicModal.fromTemplateUrl('templates/highServemodal.html', {
			scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.renew=function(){
		$scope.modal.show()
	}
	
})
.filter('cutStr', function () {
  return function (value) {
    if (!value){
    	return ''
    } ;

    var result;
    result = value.slice(0,-3) 

    return result;
  };
});
