
angular.module('App').controller('DazibaoController',function($rootScope,$ionicHistory,$timeout,$http,$Factory,$scope,$stateParams){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.name = $stateParams.name
	$scope.LineImageType = 1;
	$http.get($Factory.Template.query.url,{params:{ TemplateType:6}}).then(function(resData){
			$scope.dazibaoarr=resData.data
		})
	
	$scope.$on('$ionicView.beforeEnter',function(){
		//点赞后刷新
		if($rootScope.reloaddazibao){
			$http.get($Factory.Template.query.url,{params:{ TemplateType:6}}).then(function(resData){
				$rootScope.reloaddazibao=false;
				$scope.dazibaoarr=resData.data;
			})
		}
	})	
	
	$scope.move=function(index,$event){
		var left = (20*index+5)+'%';
		$('#underline').animate({
			left:left
		},500);
		$http.get($Factory.Template.query.url,{params:{ TemplateType:6}}).then(function(resData){
			$scope.dazibaoarr=resData.data
		})
		$scope.LineImageType=index+1;
	}
	
})
