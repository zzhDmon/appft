angular.module('App').controller('InfodetailsController',function($timeout,$cacheFactory,$scope,$http,$Factory,$stateParams,$ionicHistory,$ionicPopover,WechatService,$ionicLoading,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.isActive=true
	
	$scope.$on('$ionicView.beforeEnter',function(){
		//状态栏
		if(window.StatusBar){
		  	StatusBar.show();
		 	StatusBar.backgroundColorByName("gray");
		}		
	 })
	
	$scope.type=$stateParams.type;
	$scope.id=$stateParams.id;
	$scope.userid=$stateParams.uid;
	if($scope.userid){
		$scope.show=true;
	}else{
		$scope.show=false
	}
	
	if($scope.userid){
		$http.get($Factory.HouseSource.myShop.url, { params: { id: $scope.userid } }).then(function (resData) {
			    $scope.discription = resData.data.info.Discription;
			    $scope.Name =resData.data.info.Name;
			    $scope.ShowImg =resData.data.info.ShowImg || "http://imgs.wujiuyun.com/images/logo.png";

		})
		
	}


//	var infodetailpar={type:$scope.type,id:$scope.id};
//	var infodetailpar_cache = $cacheFactory("infodetailpar_cache");
//	infodetailpar_cache.put('params',infodetailpar)
	
	$http.get($Factory.News.get.url,{params:{type:$stateParams.type,id:$stateParams.id}}).then(function(resData){
		$scope.data=resData.data;
		$('.main').html(resData.data.Article)	
	})
	
	//把浮动框读取到作用域中
	$ionicPopover.fromTemplateUrl('infodetailspopover.html', {
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
	
	//分享url
//	if($scope.uid){
//		$scope.shareurl=Apphost.apphost+"/#/tabs/info/uidinfodetails/"+$stateParams.id+'/'+$stateParams.type+'/'+$scope.uid;
//	}else{
//		$scope.shareurl=Apphost.apphost+"/#/tabs/info/infodetails/"+$stateParams.id+'/'+$stateParams.type;
//	}

	$scope.shareurl=Apphost.apphost+"/#/tabs/info/uidinfodetails/"+$stateParams.id+'/'+$stateParams.type+'/'+$scope.uid;
	
	
	 /** type 表示分享类型。0：表示分享给朋友，1表示分享到朋友圈**/
//  $scope.share = function (type) {
//  	console.log($scope.data.Thumb || 'http://imgs.wujiuyun.com/images/logo.png')
//	    var json = {};
//	    Wechat.isInstalled(function (installed) {
//	        if (!installed) {
//	        	$ionicLoading.show({
//								template: '尚未安装微信',
//								duration: 1000
//							});
//		        return false
//	    	}
//	    }, function (reason) {
//	    	$ionicLoading.show({
//								template: reason,
//								duration: 1000
//						});
//	    });
//	    $scope.params = {
//	        scene: type,
//		        message: {
//			        title: $scope.data.Title,
//			        thumb: "www/imgs/108x108.png",
//			        description:$scope.data.Brief,
//			        media: {
//				        type: Wechat.Type.LINK,
//				        webpageUrl:$scope.shareurl // 分享的url
//			    	}
//			    }
//	    };
//	    WechatService.share($scope.params);
//  }

	$scope.share = function (shareto) {
			$scope.Base64(shareto)
	    }
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("infomycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.data.Thumb || 'http://imgs.wujiuyun.com/images/logo.png';
		img.onload = function(){
			cxt.drawImage(img,0,0,mycans.width,mycans.height);	
			var infobase = mycans.toDataURL("image/png");
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
			        title: $scope.data.Title,
			        thumb: infobase,
			        description:$scope.data.Brief,
			        media: {
				        type: Wechat.Type.LINK,
				        webpageUrl:$scope.shareurl // 分享的url
			    	}
			    }
		    };
		    WechatService.share($scope.params);
			
			return;
		}
	}
    
})