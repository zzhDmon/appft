
angular.module('App').controller('NewhousedetailController',function($ionicModal,$ionicScrollDelegate,$interval,$timeout,$ionicHistory,$scope,$state,$stateParams,$http,$Factory,$ionicSlideBoxDelegate,$ionicPopover,$timeout,$ionicLoading,WechatService,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
		$ionicSlideBoxDelegate.$getByHandle('alikedetail-handle').update();
	
		if($('#newhousedetail .newhousedetail').innerWidth()>375){
			$('#newhousedetail .newhousedetail').addClass('plus')
		}
		//点击展开初始高度
		var initheight = $('#newhousedetail .jianjie.cross').outerHeight()+$('#newhousedetail .peitao.cross').outerHeight()+10;
		$("#newhousedetail .sellpointlist").css('height',initheight);
		
	});
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	if(window.StatusBar){
	 	StatusBar.backgroundColorByName("gray");
	}
	
	$scope.ifloged = localStorage.getItem('AccountId');
	$scope.ifV = localStorage.getItem('VStatus');
	
	//显示佣金
	$scope.showone = true;
	$scope.showtwo = false;
	$scope.showthree = false;
	if($scope.ifloged && $scope.ifV*1==2){
		$scope.showone = false;
		$scope.showtwo = true;
		$scope.showthree = false;
	}else if($scope.ifloged && $scope.ifV*1!==2){
		$scope.showone = false;
		$scope.showtwo = false;
		$scope.showthree = true;
	}else{
		$scope.showone = true;
		$scope.showtwo = false;
		$scope.showthree = false;
	}
	
	
	//楼盘卖点点击展开
	$scope.unfold=function(){
		$('#newhousedetail .sellpointlist').toggleClass('open','fast')
		$('#newhousedetail .sellpoint .position').toggle()
	}
	//置业顾问点击展开
	$scope.switch=function(){
		$('#newhousedetail .counselor').toggleClass('open')
		$('#newhousedetail .counselor .position').toggle()
	}	
	
	//房型图左右滑动
	//Scroll不能上下滑动解决方案
	$scope.loaded = function() {
				var myScroll = new IScroll('#wrapper4', {
					eventPassthrough: true,
					scrollX: true,
					scrollY: false,
					preventDefault: false
				});
			}
	$scope.loaded()
	
	
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
	

	
	$scope.id=$stateParams.id;
	
	
	$http.get($Factory.NewHouse.get.url,{params:{id:$stateParams.id}}).then(function(resData) {
			
			$scope.newhousedetail=resData.data;
			$scope.bannerarr = resData.data.ShowBuildingImg;
			$scope.totalbanner=$scope.bannerarr.length;
			
			//显示主力户型
			if(resData.data.ShowFloorPlanImg.length>0){
				$scope.showmainimg=true;
			}else{
				$scope.showmainimg=false;
			}
			
			if($scope.bannerarr.length>0){
				$ionicSlideBoxDelegate.update();//重绘，让图片显示出来	
			}else if($scope.bannerarr.length==1){
					$('#newhousedetail .slider .slider-pager').css('display','none')
			}else{
				
			}
			
			//置业顾问点击展开更多
			if(resData.data.Users.length<=2){
				$('#newhousedetail .counselor').css('height','auto');
				$('#newhousedetail .counselor p.position').css('display','none');
			}else{
				$('#newhousedetail .counselor').css('height',208);
			}
			
			//主力户型图重新加载，滑动
			$scope.maintypewidth = resData.data.ShowFloorPlanImg.length*208+10;
			$('#newhousedetail #wrapper4 #scroller4').css('width',$scope.maintypewidth)
			$scope.loaded()
			
//			$scope.mapimg='http://api.map.baidu.com/staticimage?center='+118.180661+','+24.488291+'&markers=厦门市国金广场&width=300&height=200&zoom=15'
//			$scope.mapimg='http://api.map.baidu.com/staticimage?center='+resData.data.Longitude+','+resData.data.Latitude+'&markers='+resData.data.Address+'&width=300&height=200&zoom=15'
			$scope.mapimg='http://api.map.baidu.com/staticimage?center='+resData.data.Longitude+','+resData.data.Latitude+'&markers='+'&width=300&height=200&zoom=15'
			
			
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
		
		var mycans = document.getElementById("newhousedetailcans");
		var cxt = mycans.getContext("2d");
		var img = new Image();
		img.src = $scope.newhousedetail.ShowBuildingImg.slice(0,1) && $scope.newhousedetail.ShowBuildingImg.slice(0,1)[0].length>0?$scope.newhousedetail.ShowBuildingImg.slice(0,1)[0]:'http://imgs.wujiuyun.com/images/logo.png';
		img.onload = function(){
			cxt.drawImage(img,0,0,mycans.width,mycans.height);	
			var newhousedetailbase = mycans.toDataURL("image/png");
			var json = {};
		    Wechat.isInstalled(function (installed) {
		        if (!installed) {
		        	$ionicLoading.show({
									template: '尚未安装微信',
									duration: 1500
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
			        title: $scope.newhousedetail.HousePeriod,
			        thumb: newhousedetailbase,
			        description:$scope.newhousedetail.Description||'房田网为您推荐',
			        media: {
				       	type: Wechat.Type.LINK,
			       		webpageUrl:Apphost.apphost+"/#/tabs/home/newhouse/newhousedetail/"+$stateParams.id// 分享的url
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
