
angular.module('App').controller('ShareweidianController',function($rootScope,$ionicHistory,$ionicPopover,$ionicActionSheet,$http,$Factory,$scope,$stateParams,$timeout){
	setTimeout(function(){
		$('span.back-text').css('display','none');
		
		if($('#shareweidian .shareweidian').innerWidth()>375){
			$('#shareweidian .shareweidian').addClass('plus')
			$('#shareweidian .shareweidian').removeClass('shareweidian')
		}
	})
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	console.log($rootScope.uid)
	
	$http.get($Factory.HouseSource.myShop.url,{params:{id:$rootScope.uid}}).then(function(resData){
		$scope.info=resData.data.info
		$scope.recommend=resData.data.recommend
		$scope.rent=resData.data.rent
		$scope.sell=resData.data.sell
	})
//		$scope.info=localStorage.setItem('shareweidianinfo')
//		$scope.recommendlocalStorage.setItem('shareweidianrecommend')
//		$scope.rentlocalStorage.setItem('shareweidianrent')
//		$scope.localStorage.setItem('shareweidiansell')
	
//	$scope.discription=localStorage.getItem('Discription')
//	$scope.WorkYears=localStorage.getItem('WorkYears')

})
