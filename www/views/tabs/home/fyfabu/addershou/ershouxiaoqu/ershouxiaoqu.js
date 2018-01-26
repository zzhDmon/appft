
angular.module('App').controller('ErshouxiaoquController',function($ionicHistory,$ionicLoading,$http,$Factory,$rootScope,$scope,$stateParams,$ionicPopover,$timeout){
	$timeout(function(){
		//根据导航栏绝对定位
		$('.ershouxiaoqu').css('margin-top',$('.bar-header').outerHeight())
	})
	
	$scope.name = $stateParams.name
	$scope.cancel=function(){
		$ionicHistory.goBack();
	};
	
	$scope.searchName={
		key:''
	}
	
	$scope.choosexiaoqu=function($event,xiaoquid){
		$scope.xiaoquname=$event.target.innerText;
		$rootScope.ershouxiaoqu=$scope.xiaoquname
		$rootScope.ershouxiaoquid=xiaoquid;
		$ionicHistory.goBack();
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
	//清除
	$scope.clear=function(){
		$scope.searchName.key=""
		$scope.xiaoquarr=[]
	}
	
	
})
