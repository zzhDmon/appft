
angular.module('App').controller('PotruleController',function($ionicHistory,$timeout,$scope,$stateParams,$http,$Factory,$ionicLoading){
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	
	$http.get($Factory.Score.rule.url).then(function(resData){
			$scope.rules=resData.data;
			$scope.descarr=resData.data.description.split('。');
		}).catch(function(err){
			$ionicLoading.show({
						template:'获取积分规则失败',
						duration:1500
			});
		})
})
