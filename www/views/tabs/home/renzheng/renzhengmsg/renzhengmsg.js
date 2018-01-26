
angular.module('App').controller('RenzhengmsgController',function($ionicHistory,$state,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	
})
