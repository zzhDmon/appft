
angular.module('App').controller('aboutUsCtl',function($ionicHistory,$timeout,$scope,$stateParams){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.name = $stateParams.name
})
