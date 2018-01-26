
angular.module('App').controller('FindChoosefyController',function($timeout,$ionicHistory,$http,$Factory,$scope,$stateParams,$ionicPopover,$ionicScrollDelegate){
	$timeout(function(){
		$('span.back-text').css('display','none');
		
		if($('#findchoosefy .findchoosefy').innerWidth()>375){
			$('#findchoosefy .findchoosefy').addClass('plus')
			$('#findchoosefy .findchoosefy').removeClass('findchoosefy')
		}
	})
	$scope.scroll=function(){
		if($('#findchoosefy .scroll').height()<$('.findchoosefy').height()){
			$scope.torf=false
		}else{
			$scope.torf=true
		}
	}
	$scope.scroll();
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	
	$scope.tid=$stateParams.tid;
	$http.get($Factory.HouseSource.query.url,{params:{houseType:1}}).then(function(resData){
				$scope.sellhouse=resData.data;
			})
	
})
