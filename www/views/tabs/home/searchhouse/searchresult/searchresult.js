
angular.module('App').controller('SearchresultController',function($ionicLoading,$ionicHistory,$state,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){

	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.headname=$stateParams.query;
	$scope.type=$stateParams.type;
	
	$http.get($Factory.VTwoPFive.homesearch.url,{params:{query:$scope.headname,type:$scope.type,pagenum:0,pagesize:10}}).then(function(resData){
		
		$scope.reTotal=resData.data.results;
		$scope.houselist = resData.data.rows;
		$scope.noMore=false;
		if(resData.data.rows.length>9){
			$scope.noMore=true;
		}
	}).catch(function(){
		$ionicLoading.show({
					template: '请求失败!',
					duration: 1000
				});
	})
	
	//每页
	$scope.pagesize = 10;
	//第一次加载第一页
	$scope.pagenum = 1;
	
	
	
	//声明容器把所有无限滚动的数据装起来
//	$scope.houselist = [];
	
	function load(loadType,type){
		//要把 last 传到 后台
		$http.get($Factory.VTwoPFive.homesearch.url,{params:{query:$scope.headname,type:type,pagenum:$scope.pagenum,pagesize:$scope.pagesize}}).then(function(resData){
			
			//返回空数组，没有更多数据了
			if(resData.data.rows.length<=0){
				$ionicLoading.show({
					template: '暂无其它房源信息!',
					duration: 1000
				});
				$scope.noMore = false;
				return;
			}
			
			if(loadType){
				$scope.pagenum += 1;
				$scope.houselist = $scope.houselist.concat(resData.data.rows);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}else{	
				$scope.houselist = resData.data;
				$scope.$broadcast('scroll.refreshComplete');
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
	$scope.sellloadMore = function(infinite){
		load(infinite,1);
	}
	
	//在当前作用域添加 doRefresh 方法
//	$scope.selldoRefresh = function(refresh){
//		$scope.pigenum = 0;
//		load(refresh,1)
//	}
	
	//在当前作用域添加loadMore方法
	$scope.rentloadMore = function(infinite){
		load(infinite,2);
	}
	
	//在当前作用域添加 doRefresh 方法
//	$scope.rentdoRefresh = function(refresh){
//		$scope.pigenum = 0;
//		load(refresh,2)
//	}
	
	//在当前作用域添加loadMore方法
	$scope.newloadMore = function(infinite){
		load(infinite,0);
	}
	
	//在当前作用域添加 doRefresh 方法
//	$scope.rentdoRefresh = function(refresh){
//		$scope.pigenum = 0;
//		load(refresh,2)
//	}
	
})
