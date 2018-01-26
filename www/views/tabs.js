angular.module('App').controller('TabsController',function($http,$Factory,$state,$scope){
	$scope.back=function(){
		$state.go('tabs.home')
	};
	$scope.logininfo={
		Status:0,
		isRegist: 3,
		Phone:null,
		Password:null
	};
	$scope.data = { Status: 0, isRegist: 3, Phone: 18850148217, Password: 123456 };
	$scope.login=function(){
		console.log($scope.logininfo)
		$http.post($Factory.Server.login.url,{params:$scope.logininfo}).then(function(resData){
			console.log(resData)
		})

//		$http.get($Factory.User.get.url).then(function(resData){
//			console.log(resData)
//		})
	}
	$scope.tabsmine="tabs.mine"
});