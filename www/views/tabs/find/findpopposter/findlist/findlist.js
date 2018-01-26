
angular.module('App.imglist',['ionic','ionic-img-lazy-load','ionicLazyLoad'])
.controller('FindListController',function($http,$Factory,$scope,$stateParams,$ionicPopover,$ionicHistory,$timeout){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.name = $stateParams.name;
	$scope.id = $stateParams.id;
	
	
	$http.get($Factory.Template.query.url,{params:{TemplateType:$stateParams.id}}).then(function(resData){
		$scope.posterlist=resData.data;
	},function(){
		console.log('获取信息失败');
	})
	

})
