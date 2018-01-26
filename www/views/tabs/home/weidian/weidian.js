
angular.module('App').controller('WeidianController',function($rootScope,$ionicHistory,$ionicPopover,$ionicActionSheet,$http,$Factory,$scope,$state,$stateParams,$timeout,WechatService,$ionicLoading,Apphost){
	setTimeout(function(){
		$('span.back-text').css('display','none');
		
		//根据导航栏绝对定位
//		$('.header').outerHeight();
//		$('.weidian').css('margin-top',$('.header').outerHeight()-1)
		
		if($('#weidian .weidian').innerWidth()>375){
			$('#weidian .weidian').addClass('plus')
			$('#weidian .weidian').removeClass('weidian')
		}
	})
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	//状态栏
	 if(window.StatusBar){
	 	StatusBar.backgroundColorByHexString("#3699f5");
	 }
	
	$scope.scroll=function(){
		if($('#weidian .scroll').height()<$('.weidian').height()){
			$scope.torf=false
		}else{
			$scope.torf=true
		}
	}
	$scope.scroll();
	
	
	$scope.userid=$stateParams.uid;
	$http.get($Factory.HouseSource.myShop.url,{params:{id:$scope.userid}}).then(function(resData){		
		$scope.info=resData.data.info;
		$scope.recommend=resData.data.recommend;
		$scope.rent=resData.data.rent;
		$scope.sell=resData.data.sell;
		
		$scope.showname=true;
		if(resData.data.info.Name=='null'){
			$scope.showname=false;
		}
		$scope.showdesc=true;
		if(resData.data.info.Discription=='null'){
			$scope.showdesc=false;
		}
	})
	

	//把浮动框读取到作用域中
	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('weidianpopover.html', {
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
//  $scope.share = function (type) {
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
//	    
//	    $scope.params = {
//	        scene: type,
//	        message: {
//		        title: "【房田网】为您推荐经纪人"+$scope.info.Name,
//		        thumb: $scope.info.ShowImg,
//		        thumb: "www/imgs/108x108.png",
//		        description:$scope.info.Discription,
//		        media: {
//			        type: Wechat.Type.LINK,
//			        webpageUrl:Apphost.apphost+"/#/tabs/home/weidian/"+$stateParams.uid   // 分享的url
//		        }
//		    }
//	    };
//	    WechatService.share($scope.params);
//  }
		
	$scope.share = function (shareto) {
		$scope.Base64(shareto)
    }
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("weidianmycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.info.ShowImg || 'http://imgs.wujiuyun.com/images/logo.png';
		img.onload = function(){
			cxt.drawImage(img,0,0,mycans.width,mycans.height);	
			var weidianbase = mycans.toDataURL("image/png");
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
			        title: "【房田网】为您推荐经纪人"+$scope.info.Name,
			        thumb: weidianbase,
			        description:$scope.info.Discription,
			        media: {
				       	type: Wechat.Type.LINK,
			       		webpageUrl:Apphost.apphost+"/#/tabs/home/weidian/"+$stateParams.uid   // 分享的url
			    	}
			    }
		    };
		    WechatService.share($scope.params);
			
			return;
		}
	}


})
