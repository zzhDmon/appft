angular.module('App').controller('HomeinfodetailController',function($timeout,$cacheFactory,$scope,$http,$Factory,$stateParams,$ionicHistory,$ionicPopover,WechatService,$ionicLoading,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.$on('$ionicView.beforeEnter',function(){
		//友盟统计
		Umeng.Analytics.logEvent({
		    eventId: 'ft_disNews'
		}, function () {
		    
		}, function (reason) {
		
		});
		//状态栏
		if(window.StatusBar){
		  	StatusBar.show();
		 	StatusBar.backgroundColorByName("gray");
		}		
	})
	
	$scope.type=$stateParams.type;
	$scope.id=$stateParams.id;
	$scope.userid=$stateParams.uid;
	
	$http.get($Factory.HouseSource.myShop.url, { params: { id: $scope.userid } }).then(function (resData) {
		    $scope.discription = resData.data.info.Discription;
		    $scope.Name =resData.data.info.Name;
		    $scope.ShowImg =resData.data.info.ShowImg || "http://imgs.wujiuyun.com/images/logo.png";

	})


	
	$http.get($Factory.News.get.url,{params:{type:1,id:$stateParams.id}}).then(function(resData){
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
	if($scope.uid){
		$scope.shareurl=Apphost.apphost+"/#/tabs/home/uidhomeinfodetail/"+$stateParams.id+'/'+$scope.uid;
	}else{
		$scope.shareurl=Apphost.apphost+"/#/tabs/home/homeinfodetails/"+$stateParams.id;
	}
	

	$scope.share = function (shareto) {
			$scope.Base64(shareto);
			//友盟统计
			Umeng.Analytics.logEvent({
			    eventId: 'ft_disNewsShare'
			}, function () {
			    
			}, function (reason) {
			
			});	
	    }
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("homeinfomycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.data.Thumb&&$scope.data.Thumb.length>0?$scope.data.Thumb:'http://imgs.wujiuyun.com/images/logo.png';
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
				 var req = {
						 method: 'POST',
						 url: $Factory.Score.add.url,
						 headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						 },
						 data: "actId="+6
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