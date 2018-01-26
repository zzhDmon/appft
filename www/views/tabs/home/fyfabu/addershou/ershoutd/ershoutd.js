
angular.module('App').controller('ErshoutdController',function($rootScope,$scope,$stateParams,$ionicPopover,$timeout,$ionicHistory){
	setTimeout(function(){
		$('span.back-text').css('display','none');
		$('a.ion-plus-round').css({
			'color':'#11C1F3',
			'font-size':'2rem!important'
			});
	})
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	$scope.name = $stateParams.name;
	if($scope.name=="房源标题设置"){
		$scope.ershoutd= {content: $rootScope.ershoutitle};
			$scope.save=function(){
				$rootScope.ershoutitle=$scope.ershoutd.content;
				$ionicHistory.goBack();	
			}
	}else{
		$scope.ershoutd= {content: $rootScope.ershoudes};
		$scope.save=function(){
			$rootScope.ershoudes=$scope.ershoutd.content;
			$ionicHistory.goBack()	;		
		}
	}
})
