
angular.module('App').controller('MypointsController',function($ionicLoading,$ionicHistory,$timeout,$scope,$stateParams,$http,$Factory){
	
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
	
	$http.get($Factory.Score.get.url).then(function(resData){
			$scope.points=resData.data;
		}).catch(function(err){
			$ionicLoading.show({
				template:"获取积分失败",
				duration:1500
			})
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
