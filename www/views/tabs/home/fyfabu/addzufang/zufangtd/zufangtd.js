
angular.module('App').controller('ZufangtdController',function($ionicHistory,$rootScope,$scope,$stateParams,$ionicPopover,$timeout){
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
	
	$scope.name = $stateParams.name
	
	if($scope.name=="房源标题设置"){
		$scope.zufangtd= {content:$rootScope.zufangtitle};
			$scope.save=function(){
				$rootScope.zufangtitle=$scope.zufangtd.content;
				$ionicHistory.goBack();		
			}
	}else{
		$scope.zufangtd= {content:$rootScope.zufangdes};
		$scope.save=function(){
			$rootScope.zufangdes=$scope.zufangtd.content;
			$ionicHistory.goBack();		
		}
	}
		

})
