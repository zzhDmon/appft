angular.module('App').controller('FindInfoController',function($ionicScrollDelegate,$rootScope,$ionicHistory,$Factory,$scope,$http,$ionicLoading,$ionicSideMenuDelegate,$ionicSlideBoxDelegate){
	//清除浏览历史，即使手机上有回退按钮或者导航栏上显示回退按钮，都无法回退
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.showbacktopbtn=function(scrollTop){
		if(scrollTop>1500){
			$('#findinfo .backtop').css('display','block')
		}else{
			$('#findinfo .backtop').css('display','none')
		}
	}
	$scope.loushiscrollListen = function(){
		//根据滚动控制回到顶部的显示
		var scrollTop = $ionicScrollDelegate.$getByHandle('loushiscroll').getScrollPosition().top;
		$scope.showbacktopbtn(scrollTop)
	}
	$scope.loushiscrollTop = function() {
		    $ionicScrollDelegate.scrollTop(true);
		  };
		  
	$scope.xiamenscrollListen = function(){
		//根据滚动控制回到顶部的显示
		var scrollTop = $ionicScrollDelegate.$getByHandle('xiamenscroll').getScrollPosition().top;
		$scope.showbacktopbtn(scrollTop)
	}
	$scope.xiamenscrollTop = function() {
		    $ionicScrollDelegate.scrollTop(true);
		  };
	$scope.yulescrollListen = function(){
		//根据滚动控制回到顶部的显示
		var scrollTop = $ionicScrollDelegate.$getByHandle('yulescroll').getScrollPosition().top;
		$scope.showbacktopbtn(scrollTop)
	}
	$scope.yulescrollTop = function() {
		    $ionicScrollDelegate.scrollTop(true);
		  };
		  
	$scope.xiaoshouscrollListen = function(){
		//根据滚动控制回到顶部的显示
		var scrollTop = $ionicScrollDelegate.$getByHandle('xiaoshouscroll').getScrollPosition().top;
		$scope.showbacktopbtn(scrollTop)
	}
	$scope.xiaoshouscrollTop = function() {
		    $ionicScrollDelegate.scrollTop(true);
		  };


	//强制刷新
	$scope.$on('$ionicView.beforeEnter',function(){
		//状态栏
		if(window.StatusBar){
		  	StatusBar.show();
		 	StatusBar.backgroundColorByName("gray");
		}
		
		$rootScope.loged=localStorage.getItem('loged');
		$rootScope.uid=localStorage.getItem('AccountId');
	})
	

	
	//用于咨询分享参数
	$scope.shareinfo=function(id,type,uid){
		localStorage.setItem('shareinfoid',id);
		localStorage.setItem('shareinfotype',type);
		localStorage.setItem('shareinfouid',uid);
	}
	

	$scope.head='楼市';
	
//	if($scope.head=='楼市'){
//		$scope.lsdoRefresh();			
//	}
//	else if($scope.head=='厦门'){
//		$scope.xmdoRefresh();
//	}
//	else if($scope.head=='娱乐'){
//		$scope.yldoRefresh();
//	}else{
//		$scope.xsdoRefresh();
//	}
	
	//起始请求页码
	$scope.pagenum = 1;
	//每页请求数量
	var pagesize = 10;
	$scope.noMore = true;

	//声明一个容器把所有无限滚动的数据装起来（上拉时在容器拼接数据，下拉重新生成空容器）
	$scope.loushiarr = [];
	$scope.xiamenarr = [];
	$scope.yulearr = [];
	$scope.xiaoshouarr = [];
	
	if($scope.head=='楼市'){
			//在当前作用域添加loadMore方法
			$scope.lsloadMore = function(infinite) {
				var newstype=1;
				load(infinite,newstype);
			}
		
			//在当前作用域添加 doRefresh 方法
			$scope.lsdoRefresh = function(refresh) {
				$scope.pagenum = 1;
				var newstype=1;
				load(refresh,newstype)
			}
			
		}
	$scope.move=function(index,$event){
		var left = (25*index+7)+'%'
		$('.underline').animate({
			left:left
		},500);
		$scope.head=$event.target.innerText;	
		$scope.pagenum=1	
		
		if($scope.head=='楼市'){
			//在当前作用域添加loadMore方法
			$scope.lsloadMore = function(infinite) {
				var newstype=1;
				load(infinite,newstype);
			}
		
			//在当前作用域添加 doRefresh 方法
			$scope.lsdoRefresh = function(refresh) {
				$scope.pagenum = 1;
				var newstype=1;
				load(refresh,newstype)
			}
//			$scope.lsdoRefresh(false);
			$scope.noMore = true;
		}
		else if($scope.head=='厦门'){

			//在当前作用域添加loadMore方法
			$scope.xmloadMore = function(infinite) {
				var newstype=2;
				load(infinite,newstype);
			}
			//在当前作用域添加 doRefresh 方法
			$scope.xmdoRefresh = function(refresh) {
				$scope.pagenum = 1;
				var newstype=2;
				load(refresh,newstype)
			}
//			$scope.xmdoRefresh(false);
			$scope.noMore = true;
		}
		else if($scope.head=='娱乐'){
			//在当前作用域添加loadMore方法
			$scope.ylloadMore = function(infinite) {
				var newstype=3;
				load(infinite,newstype);
			}
		
			//在当前作用域添加 doRefresh 方法
			$scope.yldoRefresh = function(refresh) {
				$scope.pagenum = 1;
				var newstype=3;
				load(refresh,newstype)
			}
//			$scope.yldoRefresh(false)
			$scope.noMore = true;
		}else{
			//在当前作用域添加loadMore方法
			$scope.xsloadMore = function(infinite) {
				var newstype=4;
				load(infinite,newstype);
			}
			//在当前作用域添加 doRefresh 方法
			$scope.xsdoRefresh = function(refresh) {
				$scope.pagenum = 1;
				var newstype=4;
				load(refresh,newstype)
			}
//			$scope.xsdoRefresh(false);
			$scope.noMore = true;
		}
	}
	
    //刷新和加载方法
	function load(loadType,newstype) {
		$http.get($Factory.News.query.url,{params:{pagenum:$scope.pagenum,size:pagesize,query:'',newsType:newstype}}).then(function(resData) {	
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
				$ionicLoading.show({
					template: '没有更多资讯了',
					duration: 1000
				});
				$scope.noMore = false;
				return;
			}
			
			if(loadType) {
				$scope.pagenum += 1;
				if(newstype==1){
					$scope.loushiarr = $scope.loushiarr.concat(resData.data);
				}else if(newstype==2){
					$scope.xiamenarr = $scope.xiamenarr.concat(resData.data);
				}else if(newstype==3){
					$scope.yulearr = $scope.yulearr.concat(resData.data);
				}else{
					$scope.xiaoshouarr = $scope.xiaoshouarr.concat(resData.data);
				}
				//无线加载数据成功后需要广播事件通知这个指令 ion-infinite-scroll 加载完成。
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				//数据清空，重新写入
				//$scope.showarr = resData.data;
				if(newstype==1){
					$scope.loushiarr = resData.data;	
				}else if(newstype==2){
					$scope.xiamenarr = resData.data;
				}else if(newstype==3){
					$scope.yulearr = resData.data;
				}else{
					$scope.xiaoshouarr = resData.data;
				}
				$scope.$broadcast('scroll.refreshComplete');
				//能够让用户再次下拉刷新
				if(resData.data.length>9){
					$scope.noMore = true;
				}else{
					$scope.noMore = false;
				}
			}
		}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求新闻数据失败',
				duration: 1500
			})
		})
	}
	

	
})
