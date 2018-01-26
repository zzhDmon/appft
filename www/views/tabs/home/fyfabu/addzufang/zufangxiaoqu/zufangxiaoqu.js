
angular.module('App').controller('ZufangxiaoquController',function($ionicLoading,$ionicHistory,$http,$Factory,$rootScope,$scope,$stateParams,$ionicPopover,$timeout){
	$timeout(function(){
		//根据导航栏绝对定位
		$('.zufangxiaoqu').css('margin-top',$('.bar-header').outerHeight())
	})
	
	$scope.name = $stateParams.name
	$scope.cancel=function(){
		$ionicHistory.goBack();
	}
	
	$scope.searchName={
		key:''
	}
	$scope.choosexiaoqu=function($event,xiaoquid){
		$scope.xiaoquname=$event.target.innerText;
		$rootScope.zufangxiaoqu=$scope.xiaoquname
		$rootScope.zufangxiaoquid=xiaoquid
		$ionicHistory.goBack()
	}
	$scope.search=function(searchname){
		$http.get($Factory.HouseSource.communities.url,{params:{query:$scope.searchName.key}}).then(function(resData){
			$scope.xiaoquarr=resData.data;
		},function(){
			$ionicLoading.show({
							template:'获取二手小区失败',
							duration:1000
					});
		})
	}
	$scope.clear=function(){
		$scope.searchName.key=""
		$scope.xiaoquarr=[]
	}
})
