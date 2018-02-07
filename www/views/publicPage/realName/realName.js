angular.module('App').controller('realNameCtl',function(goBack,$http,$Factory,$state,$scope,$rootScope,$ionicLoading,$document,$ionicHistory){
	
	
	$scope.user = {};
	$scope.loginn = function () {
		$scope.closeModal({'login': true});
		// LoginService.login($scope.user).then(function (data) {
		// 	//login  这个就是写自己的登录逻辑
		// $scope.closeModal({'login': true});    //登录成功后，调用关闭modal的方法，同时传递了参数对象{‘login’:true}，所传的参数在上面提到的路由监听方法中会用到
		// }, function (err) {
		// })
	};
	

  

	/***/ 
	$scope.back=function(){
		goBack.goback()
	};
	$scope.logininfo={
		Status:0,
//		isRegist: 3,
		Phone:null,
		Password:null
	};

	
	$scope.login=function(){
	
		var req = {
		 	method: 'POST',
		 	url: $Factory.Server.login.url,
		 	dataType: "json",
		 	headers: {
				//		   'Content-Type': 'application/json'
		   		'Content-Type': 'application/x-www-form-urlencoded'
			 },
		//		 data: $scope.logininfo
		 data: "Phone="+$scope.logininfo.Phone+'&'+"Password="+$scope.logininfo.Password
		}
		
		$http(req).then(function(resData){

		}).catch( function(resData){
				
		});
		
		



	}
	

})