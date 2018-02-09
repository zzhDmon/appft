
angular.module('App').controller('myAgencyCtl',function(goTo,$ionicLoading,$ionicHistory,$state,$http,$Factory,$scope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	$timeout(function(){
		
		if($('#my_agency .my-agency').innerWidth()>375){
			$('#my_agency .my-agency').addClass('plus')
			$('#my_agency .my-agency').removeClass('my-agency')
		}
	})
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	
	//请求新房
	$http.get($Factory.NewHouse.query.url,{params:{pagesize:10,pagenum:0,CityId:1}}).then(function(resData){
		$scope.housesarr=resData.data;
		
	}, function (err) {
				$ionicLoading.show({
					template: '请求数据失败',
					duration: 1500
				})
				$scope.reload=true;
			})	
	
	$scope.goDetail=function(){
		goTo.goto('sellHouseDetail',{id:38418})
	}
	

})
