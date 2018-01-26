angular.module('App').controller('LogoController',function($timeout,$http,$Factory,$state,$scope,$rootScope,$ionicLoading,$document,$ionicHistory){
	// $timeout(function(){
	// 	$state.go('tabs.home')
	// },3000)
//	$timeout(function(){
//		if($('#logo .logo').innerWidth()>375){
//			$('#logo .logo .normal').css('display','none')
//			$('#logo .logo .plus').css('display','block')
//		}
//	})
//	$http.get($Factory.Template.banner.url).then(function(resData){
//		$rootScope.homebanner=resData.data;
//	},function(){
//		
//	})
	$scope.canvasinit=function () {
		fanvas.play("testCanvas", swfData, {
			cache: true, autoPlay: true,showFPS:0,clearAll:1,scale:1,
			onFrame: function (index,two) {
					if(index == 30){
							fanvas.pause("testCanvas");
	                       	setTimeout(function(){
	                           fanvas.replay("testCanvas");
	                       	}, 500);
	                       	// fanvas.gotoAndPlay("testCanvas",35)
					}
			},
			imagePath: "./"
		});
	}

	$scope.canvasinit();

	$scope.onSwipeUp=function(){
			// fanvas.gotoAndPlay("testCanvas",30)
			fanvas.gotoAndStop("testCanvas",40)
	}

})