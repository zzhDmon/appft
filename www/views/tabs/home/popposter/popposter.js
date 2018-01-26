angular.module('App')
.controller('PopposterController',function($ionicLoading,$timeout,$cordovaStatusbar,$state,$Factory,$http,$ionicHistory,$scope,$rootScope,$ionicSlideBoxDelegate,$http,$ionicScrollDelegate){
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}	
	

	$scope.$on('$ionicView.beforeEnter',function(){
//		//状态栏
//		if(window.StatusBar){
//		  	StatusBar.show();
//		 	StatusBar.backgroundColorByName("gray");
//		}		
		
		//Scroll不能上下滑动解决方案
//		$scope.loaded = function() {
//					var myScroll = new IScroll('#wrapper', {
//						eventPassthrough: true,
//						scrollX: true,
//						scrollY: false,
//						preventDefault: false
//					});
//					var myScroll2 = new IScroll('#wrapper2', {
//						eventPassthrough: true,
//						scrollX: true,
//						scrollY: false,
//						preventDefault: false
//					});
//					var myScroll3 = new IScroll('#wrapper3', {
//						eventPassthrough: true,
//						scrollX: true,
//						scrollY: false,
//						preventDefault: false
//					});
//				}
//		$scope.loaded()
	})
	
	
	

	

	$http.get($Factory.Template.main.url).then(function(resData){
		$scope.threetemplate=resData.data;
	},function(){
		$ionicLoading.show({
						template:'获取首页数据失败',
						duration:1000
		});
	});		

	$scope.text=new Date().getMonth()+1+'月份节日'
	
	
	
	//加载刷新
  	function load(loadType){
		$http.get($Factory.Template.main.url).then(function(resData) {
			if(loadType) {
				
				//能再次上拉加载
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.threetemplate=resData.data;
				$scope.$broadcast('scroll.refreshComplete');
				//能够让用户再次下拉刷新
				$scope.noMore = true;
			}
		}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
			if(loadType) {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.$broadcast('scroll.refreshComplete');
				$scope.noMore = true;
			}
		})
		
	}
	
	//传递 true 代表上拉，传递 false 代表下拉
	$scope.loadMore = function(infinite){
		load(infinite);
	}
	$scope.doRefresh = function(refresh){
		last = 0;
		load(refresh)
	}
	
  	//Scroll不能上下滑动解决方案
	$scope.loaded = function() {
				var myScroll = new IScroll('#wrapper', {
					eventPassthrough: true,
					scrollX: true,
					scrollY: false,
					preventDefault: false
				});
				var myScroll2 = new IScroll('#wrapper2', {
					eventPassthrough: true,
					scrollX: true,
					scrollY: false,
					preventDefault: false
				});
				var myScroll3 = new IScroll('#wrapper3', {
					eventPassthrough: true,
					scrollX: true,
					scrollY: false,
					preventDefault: false
				});
			}
	$scope.loaded()
  	

  	
  	
  	

})

