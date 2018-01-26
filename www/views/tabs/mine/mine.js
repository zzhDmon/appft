angular.module('App').controller('MineController',function($timeout,$interval,$cordovaContacts,$ionicHistory,$http,$Factory,$scope,$state,$http,$ionicPopup,$rootScope){
	//清除浏览历史，即使手机上有回退按钮或者导航栏上显示回退按钮，都无法回退
	$ionicHistory.clearHistory();
	//状态栏
	$timeout(function(){
		if(window.StatusBar){
		  	StatusBar.show();
		 	StatusBar.backgroundColorByName("gray");
		}				
	});


	//    显示控制器
    $scope.$on('$ionicView.enter',function(){
        $rootScope.hideTabs=true;
        
        $http.get($Factory.User.qCode.url).then(function(resData){
			$scope.qcode = resData.data.data;
			localStorage.setItem('qcode',resData.data.data)
		})
        
        $http.get($Factory.User.get.url).then(function(resData){
				$scope.myinfo = resData.data.data;
				
				$scope.VStatus=resData.data.data.VStatus;
				
		})
    });
       	
//	$scope.newslist=["推荐经纪人同行加入房田，马上换福利","经纪人同行加入房田，马上换福利","同行加入房田，马上换福利"]
//  $scope.autoScroll = function(obj){  
//			$(obj).find("ul").animate({  
//				marginTop : "-39px"  
//			},500,function(){  
//				$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
//				})  
//			}  
// 
//			$interval(function(){
//				$scope.autoScroll(".minerool")
//		},4000)
});