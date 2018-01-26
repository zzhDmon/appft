
angular.module('App').controller('ChuzuController',function($ionicScrollDelegate,$timeout,$http,$Factory,$rootScope,$scope,$stateParams,$ionicLoading,$ionicHistory){
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	$scope.isSub=localStorage.getItem('OutsideHouseRentSubscription');
	
	
	//订阅回到顶部
	$scope.subScrollListen = function(){
		
		//根据滚动控制回到顶部的显示
		var scrollTop = $ionicScrollDelegate.$getByHandle('subscroll').getScrollPosition().top;
		if(scrollTop>300){
			$('#chuzu .backtop').css('display','block')
		}else{
			$('#chuzu .backtop').css('display','none')
		}
	}
	$scope.subscrollTop = function() {
		    $ionicScrollDelegate.$getByHandle('subscroll').scrollTop(true);
    };
	//全部回到顶部
	$scope.allScrollListen = function(){
		
		//根据滚动控制回到顶部的显示
		var scrollTop = $ionicScrollDelegate.$getByHandle('allscroll').getScrollPosition().top;
		if(scrollTop>300){
			$('#chuzu .backtop').css('display','block')
		}else{
			$('#chuzu .backtop').css('display','none')
		}
	}
	$scope.allscrollTop = function() {
		    $ionicScrollDelegate.$getByHandle('allscroll').scrollTop(true);
    };
	
	//下划线移动
  	$scope.toptwo='订阅';
  	//起始请求页码
	var pagenum = 0;
	//每页请求数量
	var pagesize = 20;
	$scope.noMore = true;

	//声明一个容器把所有无限滚动的数据装起来（上拉时在容器拼接数据，下拉重新生成空容器）
	$scope.subchushoudatarr = [];
	$scope.allchushoudatarr = [];
	
	//默认进入显示订阅
	if($scope.toptwo=='订阅'){
			//在当前作用域添加loadMore方法
			$scope.subloadMore = function(infinite) {
				var subtype=1;
				load(infinite,subtype);
			}
			//在当前作用域添加 doRefresh 方法
			$scope.subdoRefresh = function(refresh) {
				pagenum = 0;
				var subtype=1;
				load(refresh,subtype)
			}
			
		}
  
  
  
  	//在当前作用域添加loadMore方法
	$scope.allloadMore = function(infinite) {
		var subtype=2;
		load(infinite,subtype);
	}
	//在当前作用域添加 doRefresh 方法
	$scope.alldoRefresh = function(refresh) {
		pagenum = 0;
		var subtype=2;
		load(refresh,subtype)
	}
  	
  	
  	$scope.move=function(index,$event){
		var left = (50*index)+'%';
		$('.line').animate({
			left:left
		},200);
		$scope.toptwo=$event.target.innerText;
		if($scope.toptwo=='订阅'){
			//在当前作用域添加loadMore方法
			$scope.subloadMore = function(infinite) {
				var subtype=1;
				load(infinite,subtype);
			}
		
			//在当前作用域添加 doRefresh 方法
			$scope.subdoRefresh = function(refresh) {
				pagenum = 1;
				var subtype=1;
				load(refresh,subtype)
			}
			
		}else{
			$scope.allloadMore();
			$scope.alldoRefresh();
		}
		
  	}
		
  	
  	
  	//刷新和加载方法
	function load(loadType,subtype) {
		$http.get($Factory.OutsideHouseRent.query.url,{params:{isSubs:subtype,pagenum:pagenum,pagesize:pagesize}}).then(function(resData) {
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
				$ionicLoading.show({
					template: '加载到底了',
					duration: 1000
				});
				$scope.noMore = false;
				return;
			}
			if(resData.data.status!==10001){
				if(loadType) {
					pagenum += 1;
					if(subtype==1){
						$scope.subchushoudatarr = $scope.subchushoudatarr.concat(resData.data);
					}else{
						$scope.allchushoudatarr = $scope.allchushoudatarr.concat(resData.data);
					}
					//无线加载数据成功后需要广播事件通知这个指令 ion-infinite-scroll 加载完成。
					$scope.$broadcast('scroll.infiniteScrollComplete');
				} else {
					//数据清空，重新写入
					if(subtype==1){
						$scope.subchushoudatarr = resData.data;	
					}else{
						$scope.allchushoudatarr = resData.data;
					}
					$scope.$broadcast('scroll.refreshComplete');
					//能够让用户再次下拉刷新
					$scope.noMore = true;
				}
			}
		}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
		})
	}
  	
  	
})
