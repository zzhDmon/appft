angular.module('App').controller('CartController',function($ionicLoading,$timeout,$scope,$ionicHistory,$http,$Factory){
	//清除浏览历史，即使手机上有回退按钮或者导航栏上显示回退按钮，都无法回退
	$ionicHistory.clearHistory();
	//状态栏
	$timeout(function(){
		if(window.StatusBar){
		  	StatusBar.show();
		 	StatusBar.backgroundColorByName("gray");
		}				
	});
	$scope.$on('$ionicView.beforeEnter',function(){
		//首次失败重新请求
		if($scope.reload){
			$http.get($Factory.Template.query.url,{params:{TemplateType:1}}).then(function(resData){
				if(resData.data.length>9){
					$scope.findTempletearr=resData.data.slice(0,9);			
				}else{
					$scope.findTempletearr=resData.data
				}
			},function(){
				$ionicLoading.show({
							template: '获取营销图片失败',
							duration: 1000
						});
				$scope.reload=true;
			})
			//	$http.get($Factory.VTwoPFive.findnews.url).then(function(resData){
			$http.get($Factory.News.query.url,{params:{pagenum:1,size:6,query:'',newsType:1}}).then(function(resData){
				$scope.findNewsarr=resData.data;
			}).catch(function(err){
				$ionicLoading.show({
							template: '获取资讯失败',
							duration: 1000
						});
				$scope.reload=true;
			});
		}
		
	})
	
	//Scroll上下左右滑动解决方案
	$scope.loaded = function() {
				var myScroll = new IScroll('#findwrapper', {
					eventPassthrough: true,
					scrollX: true,
					scrollY: false,
					preventDefault: false
				});
			}
	$scope.loaded()
	
	$http.get($Factory.Template.query.url,{params:{TemplateType:1}}).then(function(resData){
		if(resData.data.length>9){
			$scope.findTempletearr=resData.data.slice(0,9);			
		}else{
			$scope.findTempletearr=resData.data
		}
	},function(){
		$ionicLoading.show({
					template: '获取营销图片失败',
					duration: 1000
				});
		$scope.reload=true;
	})
	
//	$http.get($Factory.VTwoPFive.findnews.url).then(function(resData){
	$http.get($Factory.News.query.url,{params:{pagenum:1,size:6,query:'',newsType:1}}).then(function(resData){
		
		$scope.findNewsarr=resData.data;
	}).catch(function(err){
		$ionicLoading.show({
					template: '获取资讯失败',
					duration: 1000
				});
		$scope.reload=true;
	});
	
	//刷新
	$scope.finddoRefresh = function(){
		$http.get($Factory.Template.query.url,{params:{TemplateType:1}}).then(function(resData){
			if(resData.data.length>9){
				$scope.findTempletearr=resData.data.slice(0,9);			
			}else{
				$scope.findTempletearr=resData.data
			}
			
//			$http.get($Factory.VTwoPFive.findnews.url).then(function(resData){
			$http.get($Factory.News.query.url,{params:{pagenum:1,size:6,query:'',newsType:1}}).then(function(resData){
				$scope.findNewsarr=resData.data;
				$scope.$broadcast('scroll.refreshComplete');
			}).catch(function(err){
				$ionicLoading.show({
							template: '获取资讯失败',
							duration: 1000
						});
			});	
			
		},function(){
			$ionicLoading.show({
						template: '获取营销图片失败',
						duration: 1000
					});
		})
		
	}
});