
angular.module('App').controller('ShareposterController',function($Factory,$ionicHistory,$scope,$stateParams,$ionicActionSheet,$ionicPopover,$timeout,WechatService,$ionicLoading,Apphost){
	setTimeout(function(){
		$('span.back-text').css('display','none');
	})
	
	 	
	$scope.tid = $stateParams.tid;
	$scope.TemplateType = $stateParams.TemplateType;
	$scope.imgurl=$Factory.host+'/Images/Greet?tid='+$scope.tid+'&TemplateType='+$scope.TemplateType
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	//把浮动框读取到作用域中
	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('shareposterpopover.html', {
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
			$scope.Base64(shareto)
	    }
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("postermycans");
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
		    WechatService.share($scope.params);
			
			return;
		}
	}
	
	 


})
