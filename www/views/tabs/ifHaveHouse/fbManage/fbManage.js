
angular.module('App').controller('fbManageCtl',function(goTo,$ionicLoading,$ionicHistory,$state,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');
//		//根据导航栏绝对定位
//		$('.toptwo').css('top',$('.header').outerHeight())
//		$('.fyfabu').css('margin-top',$('.header').outerHeight()+40)
		$('#view-popover').css('top',$('.header').outerHeight())
		
		if($('#fbManage .fbManage').innerWidth()>375){
			$('#fbManage .fbManage').addClass('plus')
			$('#fbManage .fbManage').removeClass('fbManage')
		}
	})

	$scope.showType=$stateParams.type;
	$scope.back=function(){
		$ionicHistory.goBack()
	}

	$scope.changeInfo=function($event){
		$event.stopPropagation();  
	}
	$scope.changeReal=function($event){
		$event.stopPropagation();  
	}
	$scope.changePublic=function($event){
		$event.stopPropagation();  
	}
	$scope.changePush=function($event){
		$event.stopPropagation();  
	}
	
	
	$scope.update=function(){
		if($scope.toptwo=='二手房'){
			$http.get($Factory.HouseSource.query.url,{params:{houseType:1}}).then(function(resData){
				$scope.sellhouse=resData.data;
			})
		}else{
			$http.get($Factory.HouseSource.query.url,{params:{houseType:2}}).then(function(resData){
				$scope.renthouse=resData.data;
			})
		}
	}
  	
  	
  	//起始请求页码
	$scope.pagenum = 0;
	//每页请求数量
	$scope.pagesize = 20;
	$scope.noMore = true;
	
	//声明一个容器
	$scope.renthouse = [];
	$scope.sellhouse = [];
	
//二手房
	//在当前作用域添加loadMore方法
	$scope.ershouloadMore = function(infinite) {
		var housetype=1;
		load(infinite,housetype);
	}
	//在当前作用域添加 doRefresh 方法
	$scope.ershoudoRefresh = function(refresh) {
		$scope.pagenum = 0;
		var housetype=1;
		load(refresh,housetype);
	}
//租房
  	//在当前作用域添加loadMore方法
	$scope.zufangloadMore = function(infinite) {
		var housetype=2;
		load(infinite,housetype);
	}
	//在当前作用域添加 doRefresh 方法
	$scope.zufangdoRefresh = function(refresh) {
		$scope.pagenum = 0;
		var housetype=2;
		load(refresh,housetype)
	}

	
  	
	// $http.get($Factory.HouseSource.query.url,{params:{houseType:1,pagenum:1,pagesize:10}}).then(function(resData){
	// 		console.log(resData)
	// 			// $scope.sellhouse=resData.data;
	// 			// $scope.housetype='sell'
	// 			// $scope.noMore = true;
	// 		})

  	
  	//刷新和加载方法
	function load(loadType,housetype) {
		$http.get($Factory.HouseSource.query.url,{params:{houseType:housetype,pagenum:$scope.pagenum,pagesize:$scope.pagesize}}).then(function(resData) {
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
				$ionicLoading.show({
					template: '没有更多房源数据了',
					duration: 1000
				});
				$scope.noMore = false;
				//渲染完成后执行的js
//		  		$scope.renderdone=false;
				return;
			}
			
			if(resData.status==200){
				if(loadType) {
					$scope.pagenum += 1;
					if(housetype==1){
						$scope.sellhouse = $scope.sellhouse.concat(resData.data);
						$scope.housetype='sell'
					}else{
						$scope.renthouse = $scope.renthouse.concat(resData.data);
						$scope.housetype='rent'
					}
					//无限加载数据成功后需要广播事件通知这个指令 ion-infinite-scroll 加载完成。
					$scope.$broadcast('scroll.infiniteScrollComplete');
				} else {
					//数据清空，重新写入
					if(housetype==1){
						$scope.sellhouse = resData.data;	
						$scope.housetype='sell'
					}else{
						$scope.renthouse = resData.data;
						$scope.housetype='rent';
					}
					$scope.$broadcast('scroll.refreshComplete');
					//能够让用户再次下拉刷新
					if(resData.data.length>19){
						$scope.noMore = true;						
					}else{
						$scope.noMore = false;
					}
				}
			}
			
		}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
		})
  	}
	
	//渲染时加载动画
	$scope.renderdone=true;
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          //渲染完成后执行的js
		  $scope.renderdone=false;
		 
    });
  	
  	
	  
	
  	//底部弹出框
	$scope.show = function($event,id,housetype) {

		goTo.goto('sellHouseDetail',{id:38420})
// 	   var hideSheet = $ionicActionSheet.show({
// 	     buttons: [
// 	       { text: '查看详情' },
// 	       { text: '设置/取消主推房源' },
// 	       { text: '修该' },
// 	       { text: '删除' }
// 	     ],
// 	    cancelText: '取消',
// 	    cancel: function() {
// 	      },
// 	    buttonClicked: function(index) {
// 		    if(index==0){
// 		       $state.go("tabs.fydetail",{id:id,housetype:housetype})
// 		    }else if(index==1){
// 		    	if($scope.toptwo=='二手房'){
// 			       	var req = {
// 					 method: 'POST',
// 					 url: $Factory.HouseSource.setRecommend.url,
// 					 headers: {
// 					   'Content-Type': 'application/json'
// 					 },
// 					 data: {id:id}
// 					}
// 					$http(req).then(function(resData){
// 						if(resData.data.status==0){		
// 							$scope.update();
// 						}
// 					},function(resData){
						
// 					})
		    		
// 		    	}else{
// 		    		var req = {
// 					 method: 'POST',
// 					 url: $Factory.HouseSource.setRecommend.url,
// 					 headers: {
// 					   'Content-Type': 'application/json'
// 					 },
// 					 data: {id:id}
// 					}
// 					$http(req).then(function(resData){
// 						console.log(resData)
// 						if(resData.data.status==0){		
// 							$scope.update();
// 						}
// 					},function(resData){
						
// 					})
// 		    	}
// 		    }else if(index==2){
// 		    	if($scope.toptwo=='二手房'){
// 		    		$http.get($Factory.HouseSource.detail.url,{params:{id:id}}).then(function(resData){
// 		    			$rootScope.ershouxiaoqu=resData.data.house.CommunityName;
// 						$rootScope.ershouxiaoquid=resData.data.house.CommunityId;
// 						$rootScope.ershoutitle=resData.data.house.Title;
// 						$rootScope.ershoudes=resData.data.house.Discription;
						
// 		    		})
// 		    		$state.go('tabs.addershou',{title:'修改',id:id})
		    		
// 		    	}else{
// 		    		$http.get($Factory.HouseSource.detail.url,{params:{id:id}}).then(function(resData){
// 		    			$rootScope.zufangxiaoqu=resData.data.house.CommunityName;
// 						$rootScope.zufangxiaoquid=resData.data.house.CommunityId;
// 						$rootScope.zufangtitle=resData.data.house.Title;
// 						$rootScope.zufangdes=resData.data.house.Discription;
						
// 		    		})
// 		    		$state.go('tabs.addzufang',{title:'修改',id:id})
// 		    	}
// 		    }else if(index==3){
// 	             var confirmPopup = $ionicPopup.confirm({
// 	               title: '确认删除？'
// 	             });
// 	             confirmPopup.then(function(res) {
// 		                if(res) {
// 		                  	var req = {
// 								 method: 'POST',
// 								 url: $Factory.HouseSource.delete.url,
// 								 headers: {
// 								   'Content-Type': 'application/json'								 	
// //								   'Content-Type': 'application/x-www-form-urlencoded'
// 								 },
// 								 data: {id:id}								 
// //								 data: 'id='+id
// 								}
// 								$http(req).then(function(resData){
// 									if(resData.data.status==0){
// 										$scope.update();
// 									}
// 								},function(err){
									
// 								})
// 		                } else {
		                  
// 		                }
// 	             });
           
// 		    }
		    
// 		       return true;
	       
// 	    }
// 	   });
	
	
	 };
})
