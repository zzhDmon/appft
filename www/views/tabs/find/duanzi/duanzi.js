
angular.module('App').controller('DuanziController',function($cordovaContacts,$ionicScrollDelegate,$timeout,$ionicHistory,$window,$http,$ionicLoading,$Factory,$scope,$stateParams){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.name = $stateParams.name;
	
	$scope.scrollListen = function(){
		//根据滚动控制回到顶部的显示
		var scrollTop = $ionicScrollDelegate.$getByHandle('zuanziscroll').getScrollPosition().top;
		if(scrollTop>1500){
			$('#duanzi .backtop').css('display','block')
		}else{
			$('#duanzi .backtop').css('display','none')
		}
	}
	$scope.scrollTop = function() {
		    $ionicScrollDelegate.scrollTop(true);
		  };
	
	//起始请求页码
	var pagenum = 0;
	//每页请求数量
	var pagesize = 20;
	$scope.noMore = true;
	$scope.jokearr = [];

	function load(loadType) {
		$http.get($Factory.Template.jakes.url,{params:{pagenum:pagenum,pagesize:pagesize}}).then(function(resData) {
			if(resData.data.length<1) {
				$ionicLoading.show({
					template: '没有更多数据了',
					duration: 1000
				});
				$scope.noMore = false;
				return;
			}
			if(loadType) {
				pagenum += 1;
				$scope.jokearr = $scope.jokearr.concat(resData.data);
				//再次上拉加载
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				$scope.jokearr = resData.data;
				$scope.$broadcast('scroll.refreshComplete');
				//再次下拉刷新
				$scope.noMore = true;
			}
		}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求段子数据失败',
				duration: 1500
			})
		})
	}
	$scope.loadMore = function(infinite) {
		load(infinite);
	}
	$scope.doRefresh = function(refresh) {
		pagenum = 0;
		load(refresh)
	}	

	$scope.copyText=function(index,content){
			var divid='#copy'+index
			var clipboard = new Clipboard(divid, {
    		    text: function() {
    		        return content;
    		    }
    		});

    		clipboard.on('success', function(e) {
    		    $ionicLoading.show({
						template: '复制成功',
						duration: 1500
					})
    		});

    		clipboard.on('error', function(e) {
    		    $ionicLoading.show({
						template: '复制失败',
						duration: 1500
					})
    		});
	}
})

