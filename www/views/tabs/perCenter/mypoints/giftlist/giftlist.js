angular.module('App').controller('GiftlistController',function($ionicScrollDelegate,$ionicModal,$ionicHistory,$timeout,$scope,$stateParams,$http,$Factory,$ionicLoading){

	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.$on('$ionicView.beforeEnter',function(){
		
		
		//友盟统计
		Umeng.Analytics.logEvent({
		    eventId: 'ft_goalStore'
		}, function () {
		    
		}, function (reason) {
		
		});	
	})

	
	$http.get($Factory.Exchange.list.url,{params:{pagenum:0,pagesize:10}}).then(function(resData){
		$scope.pagenum = 1;
		$scope.newhouse=resData.data;
		if(resData.data.length>9){
			$scope.noMore = true;
		}else if(resData.data.length<=0){
			$scope.noMore = false;
			$ionicLoading.show({
					template: '暂无商品数据',
					duration: 1000
				});
			$scope.renderdone=false;
		}else{
			$scope.noMore = false;
			$scope.baseLine = true;
		}
		$scope.giftList=resData.data;
		
		//余额
		$http.get($Factory.Score.get.url).then(function(resData){
				$scope.Balance=resData.data.total;
			}).catch(function(err){
					
			})
		}).catch(function(err){
			$ionicLoading.show({
						template:'获取商品列表失败',
						duration:1500
			});
		})
		
	//加载
	$scope.pagesize = 10;
	
	//刷新和加载方法
	function load(loadType) {
		$http.get($Factory.Exchange.list.url,{params:{pagenum:$scope.pagenum,pagesize:$scope.pagesize}}).then(function(resData) {	
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
				$ionicLoading.show({
					template: '没有更多数据了',
					duration: 1000
				});
				$scope.baseLine = true;
				$scope.noMore = false;
				$scope.$broadcast('scroll.refreshComplete');
				return;
			}else if(0<resData.data.length<10){
				$scope.baseLine = true;
			}
			if(loadType) {
				$scope.pagenum += 1;
				$scope.giftList = $scope.giftList.concat(resData.data)
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				//数据清空，重新写入
				$scope.giftList = resData.data;
				$scope.$broadcast('scroll.refreshComplete');
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
	$scope.giftdoRefresh = function(infinite) {
		$scope.baseLine = false;
		$scope.pagenum=0;
		load(infinite);
	}
	
	//在当前作用域添加loadMore方法
	$scope.giftloadMore = function(infinite){
		load(infinite);
	}
	
	
	
	$ionicModal.fromTemplateUrl('giftlist-modal', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  
	  //控制显示模态框内容
	  //"心理价位","住房面积","装修要求","房屋结构","楼层高度","户型要求"
	  $scope.openModal = function($index,id) {
	  	$scope.showmsg=false;
		$http.get($Factory.Exchange.detail.url,{params:{id:id}}).then(function(resData){
			$scope.giftDetail=resData.data;
			$scope.modal.show();
			}).catch(function(err){
				$ionicLoading.show({
							template:'获取商品详情失败',
							duration:1500
				});
			})
	  };
	 
	window.addEventListener('native.keyboardshow',function(e){
	 	$timeout(function(){
	 		$ionicScrollDelegate.$getByHandle('giftdetailScroll').scrollBottom(true);	 		
	 	},500)
	});
	  
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	 
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  
	  $scope.$on('modal.hidden', function() {
	    
	  });
	  
	  $scope.$on('modal.removed', function() {
	   
	  });

	
	$scope.submitData={
		Id:'',
		Message:''
	}
	
	$scope.exchange = function(id,name,score){
		$scope.submitData.Id=id;
		
		var req = {
		 	method: 'POST',
		 	url: $Factory.Exchange.change.url,
		 	dataType: "json",
		 	headers: {
		   		'Content-Type': 'application/x-www-form-urlencoded'
		 	},
		 data:"Id="+$scope.submitData.Id+"&"+"Message="+$scope.submitData.Message
		}
		
		$http(req).then(function(resData){
			if(resData.data.status==0){
				$scope.modal.show();
				$scope.showmsg=true;
				//友盟统计
				Umeng.Analytics.logEvent({
				    eventId: 'ft_goalExchange',
				    attributes: {"goods":name},
				    num: score
				}, function () {
				}, function (reason) {
				});

				$timeout(function(){
					$scope.modal.hide();
				},3000)				
			}else{
				$ionicLoading.show({
					template:"请确认您的积分余额",
					duration:1500
				});
				$scope.modal.hide();
			}
		}).catch(function(err){
			$ionicLoading.show({
					template:"兑换失败",
					duration:1000
				});
		})
		
		//余额
		$http.get($Factory.Score.get.url).then(function(resData){
				$scope.Balance=resData.data.total;
			}).catch(function(err){
				
			})
		
	}
})
