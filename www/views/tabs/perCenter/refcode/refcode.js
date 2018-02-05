angular.module('App').controller('RefcodeController',function($ionicHistory,$timeout,$scope,$stateParams,$http,$Factory,$ionicLoading,WechatService,Apphost){
	$timeout(function(){
		if($('#refcode .refcode').innerWidth()>375){
			$('#refcode .refcode').addClass('plus')
			$('#refcode .refcode').removeClass('refcode')
		}
	})
	
	$http.get($Factory.User.get.url).then(function (resData) {
		   $scope.Phone=resData.data.data.Phone;	
		   $scope.ShowImg=resData.data.data.ShowImg;	
		   $scope.Name=resData.data.data.Name;	
		   $scope.Discription=resData.data.data.Discription;	
	})

	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.$on('$ionicView.beforeEnter',function(){
		//友盟统计
		Umeng.Analytics.logEvent({
		    eventId: 'ft_recommandCode'
		}, function (res) {
		    
		}, function (reason) {
		
		});	
	})
	
	
	
	/** type 表示分享类型。0：表示分享给朋友，1表示分享到朋友圈**/
	$scope.share = function (shareto) {
		//友盟统计
		Umeng.Analytics.logEvent({
		    eventId: 'ft_recommandSend'
		}, function () {
		    
		}, function (reason) {
		
		});	
		$scope.Base64(shareto);
    }
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("refcodemycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.ShowImg?$scope.ShowImg:'http://imgs.wujiuyun.com/images/logo.png';
		img.onload = function(){
			cxt.drawImage(img,0,0,mycans.width,mycans.height);	
			var fydetailbase = mycans.toDataURL("image/png");
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
			        title: '房田' + $scope.Name,
			        thumb: fydetailbase,
			        description:$scope.Discription||'房田网为您推荐',
			        media: {
				       	type: Wechat.Type.LINK,
			       		webpageUrl:Apphost.apphost+"/#/tabs/mine/refcode/sharerefcode/"+$scope.Phone+"/"+$scope.Name// 分享的url
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
						 data: "actId="+5
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
