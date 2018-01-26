
angular.module('App').controller('FindShareposterController',function($Factory,$ionicHistory,$scope,$stateParams,$ionicActionSheet,$ionicPopover,$timeout,WechatService,$ionicLoading,Apphost){
	 	
	$scope.tid = $stateParams.tid;
	$scope.TemplateType = $stateParams.TemplateType;
	$scope.imgurl=$Factory.host+'/Images/Greet?tid='+$scope.tid+'&TemplateType='+$scope.TemplateType
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.$on('$ionicView.beforeEnter',function(){
		//友盟统计
		Umeng.Analytics.logEvent({
		    eventId: 'ft_disPaper'
		}, function () {
		    
		}, function (reason) {
		
		});	
	})
	
	//把浮动框读取到作用域中
	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('findshareposterpopover.html', {
	    scope: $scope
	}).then(function(popoverView) {
	    $scope.popover = popoverView;
	});
		
	//点击加号绑定事件
	$scope.openPopoverView=function($e){
		 $scope.popover.show($e);
	}
	
	//关闭浮动框
	$scope.closePopoverView = function(){
		$scope.popover.hide()
	}

	
	/** type 表示分享类型。0：表示分享给朋友，1表示分享到朋友圈**/
	$scope.share = function (shareto) {
			//友盟统计
			Umeng.Analytics.logEvent({
			    eventId: 'ft_disPaperShare'
			}, function () {
			    
			}, function (reason) {
			
			});	
			$scope.Base64(shareto);
	    }
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("findpostermycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.imgurl;
		img.onload = function(){
			cxt.drawImage(img,0,0,mycans.width,mycans.height);	
			var base = mycans.toDataURL("image/png");
			var json = {};
		    Wechat.isInstalled(function (installed) {
		        if (!installed) {
		        	$ionicLoading.show({
									template: '尚未安装微信',
									duration: 1000
								});
			        return false
		    	}
		    }, function (reason) {
		    	$ionicLoading.show({
									template: reason,
									duration: 1000
							});
		    });
		    $scope.params = {
		        scene: shareto,
			        message: {
			        title: "【房田网】为您推荐经纪人"+localStorage.getItem('Name'),
			        thumb: base,
			        description: localStorage.getItem('Discription'),
			        media: {
				        type: Wechat.Type.IMAGE,
				        image:base// 分享的url
			    	}
			    }
		    };
		    
		    function shareService(params) {
			   if (typeof Wechat === "undefined") {
			     	$ionicLoading.show({
								template: '尚未安装微信',
								duration: 1500
							});
			     return false;
			   }
			
			   var json = {};
			   Wechat.share(params, function (suc) {
			   	//加积分
				 var req = {
						 method: 'POST',
						 url: $Factory.Score.add.url,
						 headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						 },
						 data: "actId="+3
						}
					$http(req).then(function(resData){
						
					})
			   }, function (err) {
		
			   });
			   return true;
			 }
		    
		    shareService($scope.params)
//		    WechatService.share($scope.params);
			
			return;
		}
	}
	
	 


})
