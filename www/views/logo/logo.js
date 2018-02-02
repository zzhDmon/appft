angular.module('App').controller('LogoController',function($timeout,$interval,$http,$Factory,$state,$scope,$rootScope,$ionicLoading,$document,$ionicHistory){
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
			onFrame: function (index) {
					if(index == 30){
							fanvas.pause("testCanvas");
	                       	setTimeout(function(){
	                           fanvas.replay("testCanvas");
	                       	}, 500);
	                       	// fanvas.gotoAndPlay("testCanvas",35)
					}else if(index == 65){
							fanvas.pause("testCanvas");
							$timeout(function(){
								// fanvas.gotoAndPlay("testCanvas",35)
								$state.go('tabs.ifHaveHouse')
							}, 500);
							
					}
			},
			imagePath: "./canvasimg/"
		});
	}
	//响应式canvas
	$(window).resize(resizeCanvas);
	function resizeCanvas() {
			$('#testCanvas').width($(window).get(0).innerWidth);
			$('#testCanvas').height($(window).get(0).innerHeight);
//	        $('#testCanvas').getContext("2d").fillRect(0, 0, canvas.width(), canvas.height());
	};
	resizeCanvas();

	$scope.canvasinit();

	$scope.onSwipeUp=function(){
			fanvas.gotoAndPlay("testCanvas",31)
			// fanvas.gotoAndStop("testCanvas",40)
	}

})