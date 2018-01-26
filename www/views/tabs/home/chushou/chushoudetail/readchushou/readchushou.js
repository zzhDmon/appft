
angular.module('App').controller('ReadchushouController',function($scope,$stateParams,$ionicPopover,$timeout,$http,$sce,$Factory,$ionicHistory,$ionicSlideBoxDelegate,WechatService,$ionicLoading,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	
	$scope.url = $stateParams.url;
	$scope.otherSrc = $sce.trustAsResourceUrl($scope.url);
	
	
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
//	$('#readchushou .sidebar').css('display','none')
//	$(".sidebar", document.iframes("readchushouiframe").document).css('display','none');
	$("#readchushouiframe").contents().find(".sidebar").css('display','none');
	$("#readchushouiframe").on('click',function(){
	})
	
})
