
angular.module('App').controller('AlikehouseController',function($ionicLoading,$ionicHistory,$state,$http,$Factory,$scope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');

		$('#view-popover').css('top',$('.header').outerHeight())
		
		if($('#alikehouse .alikehouse').innerWidth()>375){
			$('#alikehouse .alikehouse').addClass('plus')
			$('#alikehouse .alikehouse').removeClass('alikehouse')
		}
	})
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	

	$scope.minprize=$stateParams.minprize;
	$scope.maxprize=$stateParams.maxprize;
	$scope.roomnum=$stateParams.roomType.substring(0,$stateParams.roomType.indexOf('室'))*1;
	if($scope.roomnum>5){
		$scope.roomType=6;
	}else{
		$scope.roomType=$scope.roomnum;
	}
	
  	
//	$http.get($Factory.SecondVersion.alikehouse.url,{params:{minprize:$scope.minprize,maxprize:$scope.maxprize,roomType:$scope.roomType,sort:5,pagesize:10,pagenum:1}}).then(function(resData) {
//			$scope.alikehousearr=resData.data;
//		}).catch(function(resData) {
//				$ionicLoading.show({
//					template: '请求数据失败',
//					duration: 1500
//				})
//		})	

	//每页
	$scope.pagesize = 10;
	//第一次加载第一页
	$scope.pagenum = 0;
	
	$scope.noMore=true;
	
	//声明容器把所有无限滚动的数据装起来
	$scope.alikehousearr = [];
	
	function load(loadType){
		//要把 last 传到 后台
		$http.get($Factory.SecondVersion.alikehouse.url,{params:{minprize:$scope.minprize,maxprize:$scope.maxprize,roomType:$scope.roomType,sort:5,type:1,pagesize:$scope.pagesize,pagenum:$scope.pagenum}}).then(function(resData){
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
//				$ionicLoading.show({
//					template: '加载到底了',
//					duration: 1000
//				});
				$scope.baseLine=true;
				$scope.noMore = false;
				return;
			}else if(0<resData.data.length<10){
				$scope.baseLine=true;
			}
			
			if(loadType){
				$scope.pagenum += 1;
				$scope.alikehousearr = $scope.alikehousearr.concat(resData.data);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}else{	
				$scope.alikehousearr = resData.data;
//				$scope.$broadcast('scroll.refreshComplete');
				$scope.noMore=true;
			}
		}).catch(function(resData){
			$ionicLoading.show({
				template:'请求数据失败',
				//过三秒消失
				duration:3000
			})
		})
	}
	
	//传递 true 代表上拉，传递 false 代表下拉
	
	//在当前作用域添加loadMore方法
	$scope.alikeloadMore = function(infinite){
		load(infinite);
	}
	
	//在当前作用域添加 doRefresh 方法
	$scope.alikedoRefresh = function(refresh){
		$scope.baseLine=false;
		$scope.pigenum = 0;
		load(refresh)
	}

})
