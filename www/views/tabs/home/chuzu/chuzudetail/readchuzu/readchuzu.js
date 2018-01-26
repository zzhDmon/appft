
angular.module('App').controller('ReadchuzuController',function($scope,$stateParams,$ionicPopover,$timeout,$http,$sce,$Factory,$ionicHistory,$ionicSlideBoxDelegate,WechatService,$ionicLoading,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	
	$scope.url = $stateParams.url;
	$scope.otherSrc = $sce.trustAsResourceUrl($scope.url);
	
	
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	
})
