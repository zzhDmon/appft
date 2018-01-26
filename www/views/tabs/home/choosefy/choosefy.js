
angular.module('App').controller('ChoosefyController',function($timeout,$ionicHistory,$http,$Factory,$scope,$stateParams,$ionicPopover,$ionicScrollDelegate){
	$timeout(function(){
		$('span.back-text').css('display','none');
		
		if($('#choosefy .choosefy').innerWidth()>375){
			$('#choosefy .choosefy').addClass('plus')
			$('#choosefy .choosefy').removeClass('choosefy')
		}
	})
	$scope.scroll=function(){
		if($('#choosefy .scroll').height()<$('.choosefy').height()){
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
				$scope.baseLine=true;
				
			})
	
})
