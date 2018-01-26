
angular.module('App').controller('AlikehousedetailController',function($ionicModal,$ionicScrollDelegate,$interval,$timeout,$ionicHistory,$scope,$state,$stateParams,$http,$Factory,$ionicSlideBoxDelegate,$ionicPopover,$timeout,$ionicLoading,WechatService,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
		$ionicSlideBoxDelegate.$getByHandle('alikedetail-handle').update();
	
		if($('#alikehousedetail .alikehousedetail').innerWidth()>375){
			$('#alikehousedetail .alikehousedetail').addClass('plus')
			$('#alikehousedetail .alikehousedetail').removeClass('alikehousedetail')
		}
		
	})
	
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}

	if(window.StatusBar){
	 	StatusBar.backgroundColorByName("gray");
	}
	
	
	//关闭广告
	$scope.closeadv=function(){
		$('#alikehousedetail .advimg').css('display','none');
		$('#alikehousedetail .bottompad').css('height','49px');
	}
	
	
	
	
	
	
	//数字轮播序号
	$scope.currentindex=1;
	$scope.changeindex=function(){	
		$scope.currentindex=$ionicSlideBoxDelegate.$getByHandle('alikedetail-handle').currentIndex()+1;
	}
	
	
	$scope.id=$stateParams.id
	$scope.type=$stateParams.type;
	$http.get($Factory.SecondVersion.alikehousedetail.url,{params:{id:$stateParams.id}}).then(function(resData) {
			$scope.alikehousedetail=resData.data;
					
			$scope.bannerarr = resData.data.house.IndoorShowImages;
			$scope.totalbanner=$scope.bannerarr.length;
			if($scope.bannerarr.length>0){
				$ionicSlideBoxDelegate.update();//重绘，让图片显示出来	
			}
			if($scope.bannerarr.length==1){
					$('#alikehousedetail .slider .slider-pager').css('display','none')
				}
			
			$scope.FirstPayment = parseInt($scope.alikehousedetail.house.Price / 4);
			var mp = 3.05 / 100 / 12;
			$scope.Monthly = parseInt($scope.alikehousedetail.house.Price * 10000 * 0.75 * mp * Math.pow((1 + mp), 360) / (Math.pow((1 + mp), 360) - 1));
			$scope.UnitPrice = parseInt($scope.alikehousedetail.house.Price * 10000 / $scope.alikehousedetail.house.Space)
	

			if(resData.data.house.Discription){
				$scope.isobj=resData.data.house.Discription.substring(0,1)=='{'
				if($scope.isobj){
					$scope.onedesc=JSON.parse(resData.data.house.Discription).Support;
					$scope.twodesc=JSON.parse(resData.data.house.Discription).Mind;
					$scope.threedesc=JSON.parse(resData.data.house.Discription).Service;
				
				}else{
					//去除&nbsp;
					var reg = new RegExp("&nbsp;","g");
					var reg1 = new RegExp("&rdquo;","g");
					var reg2 = new RegExp("&ldquo;","g");
					$scope.Discription=resData.data.house.Discription.replace(reg,' ');
					$scope.Discription=$scope.Discription.replace(reg2,'【');
					$scope.Discription=$scope.Discription.replace(reg1,'】');
				}				
			}
			
			
			if($scope.type==1){
				$http.get($Factory.SecondVersion.alikehouse.url,{params:{minprize:resData.data.house.Price,maxprize:resData.data.house.Id,roomType:resData.data.house.RoomType,sort:5,type:1,pagesize:5,pagenum:1}}).then(function(resData) {
				
						$scope.otheralikehousearr=resData.data;
					}).catch(function(resData) {
							
					})					
			}else{
				$http.get($Factory.SecondVersion.alikehouse.url,{params:{minprize:resData.data.house.Price,maxprize:resData.data.house.Id,roomType:resData.data.house.RoomType,sort:5,type:2,pagesize:5,pagenum:1}}).then(function(resData) {
						$scope.otheralikehousearr=resData.data;
					}).catch(function(resData) {
							
					})	
			}
			
			
		}).catch(function(resData) {
				$ionicLoading.show({
					template: '获取房源信息失败',
					duration: 1500
				})
		})	
	

	
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
		$scope.Base64(shareto);
	}
	
	$scope.Base64=function(shareto){
		var mycans = document.getElementById("alikehousedetailmycans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.alikehousedetail.house.IndoorShowImages.slice(0,1)&&$scope.alikehousedetail.house.IndoorShowImages.slice(0,1)[0].length>0?$scope.alikehousedetail.house.IndoorShowImages.slice(0,1):'http://imgs.wujiuyun.com/images/logo.png';
		img.onload = function(){
			cxt.drawImage(img,0,0,mycans.width,mycans.height);	
			var alikedetailbase = mycans.toDataURL("image/png");
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
			        title: $scope.alikehousedetail.house.Title,
			        thumb: alikedetailbase,
			        description:$scope.onedesc||$scope.alikehousedetail.house.Discription||'房田网为您推荐',
			        media: {
				       	type: Wechat.Type.LINK,
			       		webpageUrl:Apphost.apphost+"/#/tabs/home/alikehousedetail/"+$stateParams.id+'/'+$stateParams.type// 分享的url
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
