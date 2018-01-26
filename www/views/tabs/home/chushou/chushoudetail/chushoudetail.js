
angular.module('App').controller('ChushoudetailController',function($scope,$stateParams,$ionicPopover,$timeout,$http,$sce,$Factory,$ionicHistory,$ionicSlideBoxDelegate,WechatService,$ionicLoading,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
		$ionicSlideBoxDelegate.update();
//		$ionicSlideBoxDelegate.loop(true); //解决轮播至最后一个不轮播的问题
		
		if($('#chushoudetail .chushoudetail').innerWidth()>375){
			$('#chushoudetail .chushoudetail').addClass('plus')
		}
	})
	$scope.id = $stateParams.id;
	
	$http.get($Factory.OutsideHouse.get.url,{params:{id:$scope.id}}).then(function(resData){
		$scope.chushoudata=resData.data;
		
		if($scope.chushoudata.Imgs.length>0){
				$ionicSlideBoxDelegate.update();//重绘，让图片显示出来	
			}
		if($scope.chushoudata.Imgs.length==1){
					$('#chushoudetail .slider .slider-pager').css('display','none')
				}
	},function(resData){
	})
	
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	//把浮动框读取到作用域中
	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('chushoudetailpopover.html', {
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
		var mycans = document.getElementById("chushoumycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.chushoudata.Imgs.slice(0,1) || 'http://imgs.wujiuyun.com/images/logo.png';
		img.onload = function(){
			cxt.drawImage(img,0,0,mycans.width,mycans.height);	
			var chushoubase = mycans.toDataURL("image/png");
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
			        title: $scope.chushoudata.Title,
			        thumb: chushoubase,
			        description:$scope.chushoudata.Desc || '房田网为您推荐',
			        media: {
				       	type: Wechat.Type.LINK,
			       		webpageUrl:Apphost.apphost+"/#/tabs/home/chuzu/chuzudetail/"+$stateParams.id // 分享的url
			    	}
			    }
		    };
		    
		    //加积分分享
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
						 data: "actId="+2
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
