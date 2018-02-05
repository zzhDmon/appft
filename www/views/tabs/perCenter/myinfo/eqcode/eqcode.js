
angular.module('App').controller('EqcodeController',function($http,$Factory,$ionicHistory,$rootScope,$scope,$stateParams,$ionicPopover,WechatService,$ionicLoading,Apphost){
	setTimeout(function(){
		$('span.back-text').css('display','none');
	})	
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	$scope.name = $stateParams.name
	$scope.$on('$ionicView.enter',function(){
//      $http.get($Factory.User.qCode.url).then(function(resData){
//			$scope.qcode = resData.data.data;
//		}).catch(function(){
//			$scope.qcode=localStorage.getItem('qcode');
//		})
		$scope.qcode=localStorage.getItem('qcode');
    });
	
	//把浮动框读取到作用域中
	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('qcodepopover.html', {
	    scope: $scope
	}).then(function(popoverView) {
	    $scope.popover = popoverView;
	});
	//点击加号绑定事件
	$scope.openPopoverView=function($e){
		//形参$e是事件对象
		 $scope.popover.show($e);
	}
	//关闭浮动框
	$scope.closePopoverView = function(){
		$scope.popover.hide()
	}
	
	 /** type 表示分享类型。0：表示分享给朋友，1表示分享到朋友圈**/
    $scope.share = function (shareto) {
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
		        thumb: $scope.qcode,
		        description: localStorage.getItem('Discription'),
		        media: {
			        type: Wechat.Type.IMAGE,
			        image:$scope.qcode// 分享的url
		    	}
		    }
	    };
	    WechatService.share($scope.params);
    }
	    
})
