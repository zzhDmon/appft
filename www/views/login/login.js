angular.module('App').controller('LoginController',function(goTo,goBack,$http,$Factory,$state,$scope,$rootScope,$ionicLoading,$document,$ionicHistory){
	
	
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
	$scope.goregister=function(name){
		goTo.goto('registerorback',{name:name})
	};

	$scope.logininfo={
		Status:0,
//		isRegist: 3,
		Phone:null,
		Password:null
	};

	
	$scope.login=function(){
	
		//'Content-Type': 'application/json' 跨域拦截成option方法
//		var req = {
//		 method: 'POST',
//		 url: $Factory.Server.login.url,
//		 headers: {
//		   'Content-Type': 'application/json'
//		 },
//		 data: $scope.logininfo
//		}

		var req = {
		 	method: 'POST',
		 	url: $Factory.Server.login.url,
		 	dataType: "json",
		 	headers: {
		   		'Content-Type': 'application/x-www-form-urlencoded'
		 	},
		 data: "Phone="+$scope.logininfo.Phone+'&'+"Password="+$scope.logininfo.Password
		}
		
		$http(req).then(function(resData){
			$ionicLoading.show({
					template:resData.data.msg,
					duration:1000
			});
			
			//成功
			if(resData.data.status==0){	
				setTimeout(function(){
					$state.go('tabs.home')
				},1000)
				
				$http.get($Factory.Server.agent.url).then(function(resData){
					localStorage.setItem('loged',resData.data.status);
					localStorage.setItem('agentphone',resData.data.msg);
					
					$rootScope.loged=localStorage.getItem('loged');
				
				})
				
				$http.get($Factory.User.get.url).then(function(resData){
//					console.log(resData.data.data)
					
					localStorage.setItem('AccountId',resData.data.data.AccountId);
					localStorage.setItem('Phone',resData.data.data.Phone);
					localStorage.setItem('Sex',resData.data.data.Sex);
					localStorage.setItem('Discription',resData.data.data.Discription);
					localStorage.setItem('ShowImg',resData.data.data.ShowImg);
					localStorage.setItem('Image',resData.data.data.Image);
					localStorage.setItem('Name',resData.data.data.Name);
					localStorage.setItem('WorkYears',resData.data.data.WorkYears);
					localStorage.setItem('OutsideHouseRentSubscription',resData.data.data.OutsideHouseRentSubscription);
					localStorage.setItem('OutsideHouseSubscription',resData.data.data.OutsideHouseSubscription);
					//认证信息
					localStorage.setItem('VCard',resData.data.data.VCard);
					localStorage.setItem('ShowVCard',resData.data.data.ShowVCard);
					localStorage.setItem('BusinessCard',resData.data.data.BusinessCard);
					localStorage.setItem('ShowBusinessCard',resData.data.data.ShowBusinessCard);
					localStorage.setItem('BankType',resData.data.data.BankType);
					localStorage.setItem('BankTypes',JSON.stringify(resData.data.data.BankTypes));
					localStorage.setItem('BankNum',resData.data.data.BankNum);
					localStorage.setItem('VStatus',resData.data.data.VStatus);
					localStorage.setItem('VStatusName',resData.data.data.VStatusName);
					
					$rootScope.uid=localStorage.getItem('AccountId');
				})
				
							
			}else{
				
			}
					
		}).catch( function(resData){
					$ionicLoading.show({
							template:"登录失败",
							duration:1000
						});
				
		});
		
		



	}
	

})