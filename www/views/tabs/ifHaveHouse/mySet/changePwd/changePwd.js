
angular.module('App').controller('changePwdCtl',function($ionicHistory,$timeout,$ionicLoading,$http,$state,$Factory,$rootScope,$scope,$stateParams){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.problem={
		Phone:'',
		Password:'',
		newPassword:'',
		againPassword:''
	}

	$scope.save=function(){
		// $http.post($Factory,{params:{}}).then(function(resData){
		// 	$ionicLoading.show({
		// 			template:resData.data.msg,
		// 			duration:1000
		// 	});
		// 	$timeout(function(){
		// 		$ionicHistory.goBack()
		// 	},1000)
		// },function(resData){
		// 	$ionicLoading.show({
		// 			template:resData.data.msg,
		// 			duration:1000
		// 	});
		// })
	}
})
