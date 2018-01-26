
angular.module('App').controller('FydetailController',function($ionicScrollDelegate,$ionicModal,$timeout,$ionicHistory,$scope,$state,$stateParams,$http,$Factory,$ionicSlideBoxDelegate,$ionicPopover,$timeout,$ionicLoading,WechatService,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
	
		if($('#fydetail .fydetail').innerWidth()>375){
			$('#fydetail .fydetail').addClass('plus')
			$('#fydetail .fydetail').removeClass('fydetail')
		}
	})
	
	if(window.StatusBar){
	 	StatusBar.backgroundColorByName("gray");
	 }

	$scope.id=$stateParams.id
	$scope.housetype=$stateParams.housetype
	if($stateParams.housetype==1){
		$scope.housetype='sell'
	}else if($stateParams.housetype==2){
		$scope.housetype='rent'
	}else{
		$scope.housetype = $stateParams.housetype		
	}
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$http.get($Factory.HouseSource.detail.url,{params:{id:$scope.id}}).then(function(resData){
				$scope.houseinfo=resData.data.house;
				$scope.bannerarr=resData.data.house.IndoorShowImages;
				$scope.totalbanner=resData.data.house.IndoorShowImages.length;
				$scope.userinfo=resData.data.info;
				if($scope.bannerarr.length>0){
					$ionicSlideBoxDelegate.update();//重绘，显示轮播图
				}
				if($scope.bannerarr.length==1){
					$('#fydetail .slider-pager').css('display','none')
				}
				
				$scope.FirstPayment = parseInt(resData.data.house.Price / 4);
				var mp = 3.05 / 100 / 12;
				$scope.Monthly = parseInt(resData.data.house.Price * 10000 * 0.75 * mp * Math.pow((1 + mp), 360) / (Math.pow((1 + mp), 360) - 1));
				$scope.UnitPrice = parseInt(resData.data.house.Price * 10000 / resData.data.house.Space)
	
				
				//房源描述两种格式显示
				if(resData.data.house.Discription){
					$scope.isobj=resData.data.house.Discription.substring(0,1)=='{'
					if($scope.isobj){
						$scope.onedesc=JSON.parse(resData.data.house.Discription).Support;
						$scope.twodesc=JSON.parse(resData.data.house.Discription).Mind;
						$scope.threedesc=JSON.parse(resData.data.house.Discription).Service;
					
					}
				}
				
				//其它最多显示五个
				if(resData.data.others.length>5){
					$scope.other=resData.data.others.slice(0,5);					
				}else{
					$scope.other=resData.data.others;
				}
			})
	
	//数字轮播序号
	$scope.currentindex=1;
	$scope.changeindex=function(){	
		$scope.currentindex=$ionicSlideBoxDelegate.$getByHandle('fydetail-handle').currentIndex()+1;
	}


	
	//把浮动框读取到作用域中
	// .fromTemplateUrl() 方法
	$ionicPopover.fromTemplateUrl('fydetailpopover.html', {
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
		var mycans = document.getElementById("fydetailmycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.bannerarr.slice(0,1)&&$scope.bannerarr.slice(0,1)[0].length>0?$scope.bannerarr.slice(0,1):'http://imgs.wujiuyun.com/images/logo.png';
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
			        title: $scope.houseinfo.Title,
			        thumb: fydetailbase,
			        description:$scope.onedesc||$scope.houseinfo.Discription||'房田网为您推荐',
			        media: {
				       	type: Wechat.Type.LINK,
			       		webpageUrl:Apphost.apphost+"/#/tabs/home/fyfabu/fydetail/"+$stateParams.id+'/'+$stateParams.housetype// 分享的url
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
