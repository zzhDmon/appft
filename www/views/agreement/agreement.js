angular.module('App').controller('AgreementController',function($ionicHistory,$http,$Factory,$stateParams,$scope,$state,$ionicLoading){
	
	setTimeout(function(){
		$('span.back-text').css('display','none');
	})
	
	$scope.back=function(){
		$ionicHistory.goBack()
	};
	
	$scope.name = $stateParams.name;
	
	$scope.agreement={checked:true}
	
	$scope.registerorback={
		phone:'',
		yz:'',
		psw:'',
		isResist:null
	}
	if($scope.name=='注册'){
		$scope.registerorback.isResist=1
	}else{
		$scope.registerorback.isResist=null
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
		data: $scope.registerorback
		};
		$http(req).then(function(resData){
			console.log(resData.data)
			$ionicLoading.show({
					template:resData.data.msg,
					duration:1000
				});
			setTimeout(function(){
					if(resData.data.msg=="该帐号已注册！"){
						$ionicHistory.goBack()
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
	$scope.Done=function(){
		//注册
		if($scope.name=="注册"){
			var req = {
			 method: 'POST',
			 url: $Factory.Server.regist.url,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {Phone:$scope.registerorback.phone,Password:$scope.registerorback.psw,Msg:$scope.registerorback.yz}
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
		}else{
			//找回（修改）密码
			var req = {
			 method: 'POST',
			 url: $Factory.Server.repass.url,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {Phone:$scope.registerorback.phone,Password:$scope.registerorback.psw,Msg:$scope.registerorback.yz}
			}
			$http(req).then(function(resData){
				console.log(resData.data)
				$ionicLoading.show({
						template:resData.data.msg,
						duration:1000
				});
				setTimeout(function(){
					$ionicHistory.goBack()
					},1000)
				}, function(resData){
					setTimeout(function(){
						$ionicLoading.show({
								template:resData.data.msg,
								duration:1000
							});
					})
				});
		}
	}
});

// function sendCode(thisBtn){ 
//		 btn = thisBtn;
//		 btn.disabled = true; //将按钮置为不可点击
//		 btn.value = nums+'秒后可重新获取';
//		 clock = setInterval(doLoop, 1000); //一秒执行一次
// }
// function doLoop(){
//	 nums--;
//	 if(nums > 0){
//	  btn.value = nums+'秒后可重新获取';
//	 }else{
//	  clearInterval(clock); //清除js定时器
//	  btn.disabled = false;
//	  btn.value = '点击发送验证码';
//	  nums = 10; //重置时间
//	 }
