
angular.module('App').controller('MyWeidianController',function($rootScope,$ionicHistory,$ionicPopover,$ionicActionSheet,$http,$Factory,$scope,$state,$stateParams,$timeout,WechatService,$ionicLoading,Apphost){
	setTimeout(function(){
		$('span.back-text').css('display','none');

		
		if($('#myweidian .myweidian').innerWidth()>375){
			$('#myweidian .myweidian').addClass('plus')
			$('#myweidian .myweidian').removeClass('myweidian')
		}
	})
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	//状态栏
//	 if(window.StatusBar){
//	 	StatusBar.backgroundColorByHexString("#3699f5");
//	 }
	
	$scope.scroll=function(){
		if($('#myweidian .scroll').height()<$('.myweidian').height()){
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
		
	})
	

	//把浮动框读取到作用域中
	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('myweidianpopover.html', {
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
		$scope.Base64(shareto)
    }
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("myweidianmycans");
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
			       		webpageUrl:Apphost.apphost+"/#/tabs/mine/myweidian/"+$stateParams.uid   // 分享的url
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
						 data: "actId="+4
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
