
angular.module('App').controller('openVipCtl',function($ionicLoading,$ionicHistory,$timeout,$scope,$stateParams,$http,$Factory){
	
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
