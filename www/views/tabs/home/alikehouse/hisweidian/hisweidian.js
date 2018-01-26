
angular.module('App').controller('HisweidianController',function($rootScope,$ionicHistory,$ionicPopover,$ionicActionSheet,$http,$Factory,$scope,$state,$stateParams,$timeout,WechatService,$ionicLoading,Apphost){
	setTimeout(function(){
		$('span.back-text').css('display','none');
		
		//根据导航栏绝对定位
//		$('.header').outerHeight();
//		$('.weidian').css('margin-top',$('.header').outerHeight()-1)
		
		if($('#hisweidian .hisweidian').innerWidth()>375){
			$('#hisweidian .hisweidian').addClass('plus')
			$('#hisweidian .hisweidian').removeClass('hisweidian')
		}
	})
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	//状态栏
	 if(window.StatusBar){
	 	StatusBar.backgroundColorByHexString("#3699f5");
	 }
	
	$scope.scroll=function(){
		if($('#weidian .scroll').height()<$('.weidian').height()){
			$scope.torf=false
		}else{
			$scope.torf=true
		}
	}
	$scope.scroll();
	
	
	$scope.userid=$stateParams.uid;
	$http.get($Factory.HouseSource.myShop.url,{params:{id:$scope.userid}}).then(function(resData){		
		
		$scope.info=resData.data.info
		$scope.recommend=resData.data.recommend
		$scope.rent=resData.data.rent
		$scope.sell=resData.data.sell
	})
	



})
