
angular.module('App').controller('IncarouselController',function($scope,$stateParams,$ionicPopover,$timeout,$ionicHistory){
	setTimeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	};
	$scope.name = $stateParams.name
	if($stateParams.name%2){
		$scope.name="节日问候";
	}else{
		$scope.name="房源海报";
	}
	$scope.back=function(){
		$ionicHistory.goBack();
	}
})
