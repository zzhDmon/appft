angular.module('App').controller('ShareRefcodeController',function($ionicHistory,$timeout,$scope,$stateParams){
	
	$scope.Phone = $stateParams.phone;
	$scope.Name = $stateParams.name;
	
	$scope.version =" android";

	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
	    $scope.version = "android";
	}
	if (isIOS) {
	    $scope.version = "ios";
	}
		
})
