
angular.module('App').controller('NewhouseController',function($ionicScrollDelegate,$ionicLoading,$ionicHistory,$state,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');
		
		if($('#newhouse .newhouse').innerWidth()>375){
			$('#newhouse .newhouse').addClass('plus')
			$('#newhouse .newhouse').removeClass('newhouse')
		}
	})
	
	//默认城市
	$scope.CityName = '厦门市';
	$scope.CityId = 1;
	
	//城市定位
	$scope.$on('$ionicView.beforeEnter',function(){
		//是否认证
		$scope.ifloged = localStorage.getItem('AccountId');
		$scope.ifV = localStorage.getItem('VStatus');
		
		$scope.showmoney=false;
		if($scope.ifV*1==2){
			$scope.showmoney=true;
		}
//		$scope.showone = true;
//		$scope.showtwo = false;
//		if( $scope.ifV*1!==2){
//			$scope.showone = false;
//			$scope.showtwo = true;
//		}else{
//			$scope.showone = true;
//			$scope.showtwo = false;
//		}
		
//		document.addEventListener("deviceready", function () {
//			// 进行定位
//		    baidumap_location.getCurrentPosition(function (result) {
//			        switch (result.city)
//						{
//						case '厦门市':
//						  $scope.CityName = '厦门市';
//						  $scope.CityId = 1;
//						  break;
//						case '漳州市':
//						  $scope.CityName = '漳州市';
//						  $scope.CityId = 2;
//						  break;
//						case '泉州市':
//						  $scope.CityName = '泉州市';
//						  $scope.CityId = 3;
//						  break;
//						case '福州市':
//						  $scope.CityName = '福州市';
//						  $scope.CityId = 4;
//						  break;
//						case '宁德市':
//						  $scope.CityName = '宁德市';
//						  $scope.CityId = 5;
//						  break;
//						case '莆田市':
//						  $scope.CityName = '莆田市';
//						  $scope.CityId = 6;
//						  break;
//						case '龙岩市':
//						  $scope.CityName = '龙岩市';
//						  $scope.CityId = 7;
//						  break;
//						case '三明市':
//						  $scope.CityName = '三明市';
//						  $scope.CityId = 8;
//						  break;
//						default:
//						  $scope.CityName = '厦门市';
//						  $scope.CityId = 1;
//						}
//			    }, function (error) {
//			
//			    });
//				
//			}, false);
		
	})
	
	//手动选择城市
//	$scope.CityList = [{CityName:'厦门市',CityId:1},{CityName:'漳州市',CityId:2},{CityName:'泉州市',CityId:3},{CityName:'福州市',CityId:4},{CityName:'宁德市',CityId:5},{CityName:'莆田市',CityId:6},{CityName:'龙岩市',CityId:7},{CityName:'三明市',CityId:8}]
	
	
	$scope.CityList = [{CityName:'厦门市',CityId:1},{CityName:'漳州市',CityId:2},{CityName:'泉州市',CityId:3}]
	$scope.changeCity = function(name,id){
		$scope.CityName = name;
	    $scope.CityId = id;
	    $scope.popover.hide();
	    
	    $http.get($Factory.NewHouse.query.url,{params:{pagesize:10,pagenum:0,CityId:$scope.CityId}}).then(function(resData){
	   	 	//起始请求页码
			$scope.pagenum = 1;
			//返回顶部
			$ionicScrollDelegate.$getByHandle('newhouseScroll').scrollTop();
			
			
			$scope.newhouse=resData.data;
			if(resData.data.length>9){
				$scope.noMore = true;
			}else if(resData.data.length<=0){
				$scope.noMore = false;
				$ionicLoading.show({
						template: '暂无房源数据',
						duration: 1000
					});
				$scope.renderdone=false;
				$scope.baseLine=true;
			}else{
				$scope.noMore = false;
				$scope.baseLine=true;
			}
		}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
		})
	}
	
	//一开始进入加载
	$http.get($Factory.NewHouse.query.url,{params:{pagesize:10,pagenum:0,CityId:$scope.CityId}}).then(function(resData){
		//起始请求页码
		$scope.pagenum = 1;
		
		$scope.newhouse=resData.data;
		if(resData.data.length>9){
			$scope.noMore = true;
		}else if(resData.data.length<=0){
			$scope.noMore = false;
			$ionicLoading.show({
					template: '暂无房源数据',
					duration: 1000
				});
			$scope.renderdone=false;
		}else{
			$scope.noMore = false;
			$scope.baseLine=true;
		}
	}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
		})
	
	
	
	
	//打开对话框
	$scope.popover = $ionicPopover.fromTemplateUrl('newhouse.html', {
	    scope: $scope
  	});
	 
  	// .fromTemplateUrl() 方法
  	$ionicPopover.fromTemplateUrl('newhouse.html', {
	    scope: $scope
  	}).then(function(popover) {
	    $scope.popover = popover;
  	});
	 
  	$scope.openPopover = function($event) {
	    $scope.popover.show($event);
	   
	   //图标旋转
	    $('#newhouse .icon-xialacaidanxiaosanjiao1').css('transform','rotate(180deg)');
  	};
  	$scope.closePopover = function() {
	    $scope.popover.hide();
  	};
  	// 清除浮动框
  	$scope.$on('$destroy', function() {
	    $scope.popover.remove();
	   
  	});
  	// 在隐藏浮动框后执行
  	$scope.$on('popover.hidden', function() {
	    // 执行代码
	    $('#newhouse .icon-xialacaidanxiaosanjiao1').css('transform','rotate(0deg)');
  	});
  	
	
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	
	//每页请求数量
	$scope.pagesize = 10;
	//刷新和加载方法
	function load(loadType) {
		$http.get($Factory.NewHouse.query.url,{params:{pagenum:$scope.pagenum,pagesize:$scope.pagesize,CityId:$scope.CityId}}).then(function(resData) {	
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
//				$ionicLoading.show({
//					template: '加载到底了',
//					duration: 1000
//				});
				$scope.baseLine=true;
				$scope.noMore = false;
				$scope.$broadcast('scroll.refreshComplete');
				return;
			}else if(0<resData.data.length<10){
				$scope.baseLine=true;
			}
			if(loadType) {
				$scope.pagenum += 1;
				$scope.newhouse = $scope.newhouse.concat(resData.data)
				//无线加载数据成功后需要广播事件通知这个指令 ion-infinite-scroll 加载完成。
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				//数据清空，重新写入
				$scope.newhouse = resData.data;
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
				template: '请求数据失败',
				duration: 1500
			})
		})
	}
	
	//传递 true 代表上拉，传递 false 代表下拉
	$scope.newhousedoRefresh = function(infinite) {
		$scope.pagenum=0;
		$scope.baseLine=false;
		load(infinite);
	}
	
	//在当前作用域添加loadMore方法
	$scope.newhouseloadMore = function(infinite){
		load(infinite);
	}
  	
  	//监听是否渲染完成
  	$scope.renderdone=true;
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          //渲染完成后执行的js
		  $scope.renderdone=false;
		 
    });
})
