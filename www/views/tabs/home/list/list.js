
angular.module('App.imglist',['ionic','ionic-img-lazy-load','ionicLazyLoad'])
.controller('ListController',function($http,$Factory,$scope,$stateParams,$ionicPopover,$ionicHistory,$timeout){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.name = $stateParams.name;
	$scope.id = $stateParams.id;
//	 $scope.toshareposter=function(tid,TemplateType){
//	 	localStorage.setItem('shareposttdi',tid)
//	 	localStorage.setItem('sharepostTemplateType',TemplateType)
//	 }
	
	
	$http.get($Factory.Template.query.url,{params:{TemplateType:$stateParams.id}}).then(function(resData){
		$scope.posterlist=resData.data;
	},function(){
		console.log('获取信息失败');
	})
	

})
