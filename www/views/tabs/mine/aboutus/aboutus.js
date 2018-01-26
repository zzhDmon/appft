
angular.module('App').controller('AboutusController',function($ionicHistory,$timeout,$scope,$stateParams){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.name = $stateParams.name
})
