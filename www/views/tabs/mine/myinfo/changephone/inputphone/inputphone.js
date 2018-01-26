angular.module('App').controller('InputphoneController',function($ionicHistory,$http,$Factory,$stateParams,$scope,$state,$ionicLoading){
	
	setTimeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.name = $stateParams.name;
	
	$scope.checkphone={
		phone:'',
		yz:'',
		isResist:null
	}
	
	//验证码请求
	$scope.yzcode=function($event){
		$scope.daojishi=80;
		clock = setInterval(function(){
			$scope.daojishi--
			if($scope.daojishi<0){
				$event.target.innerText="获取";
				$scope.daojishi=80;
				$event.target.disabled=false;
				clearInterval(clock);
			}else{
				$event.target.disabled=true;
				$event.target.innerText=$scope.daojishi+'s'
			}
		},1000);
		
		var req = {
		method: 'POST',
		url: $Factory.Server.msg.url,
		headers: {
		   'Content-Type': 'application/json'
		},
		data: $scope.checkphone
		};
		$http(req).then(function(resData){
			console.log(resData.data)
			$ionicLoading.show({
					template:resData.data.msg,
					duration:1000
				});
			setTimeout(function(){
					if(resData.data.msg=="发送成功！"){
						$event.target.innerText="获取";
						$scope.daojishi=80;
						$event.target.disabled=false;
						clearInterval(clock);
					}else if(resData.data.msg=="发送失败！"){
						$event.target.innerText="获取";
						$scope.daojishi=80;
						$event.target.disabled=false;
						clearInterval(clock);
					}else{
						
					}
				},1000)
			}, function(resData){
				setTimeout(function(){
						$ionicLoading.show({
								template:resData.data.msg,
								//过多久消失
								duration:1000
							});
					})
			});
	}
	
	
	//点击完成
	$scope.save=function(){
		//注册
			var req = {
			 method: 'POST',
			 url: $Factory.Server.phone.url,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {phone:$scope.checkphone.phone,msg:$scope.checkphone.yz}
			}
			$http(req).then(function(resData){
				console.log(resData.data)
					setTimeout(function(){
						$ionicLoading.show({
								template:resData.data.msg,
								duration:1000
							});
					})
				
				}, function(resData){
					setTimeout(function(){
						$ionicLoading.show({
								template:resData.data.msg,
								duration:1000
							});
					})
				});
		
	}
});

