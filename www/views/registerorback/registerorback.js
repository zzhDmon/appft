angular.module('App').controller('RegisterorbackController',function(goBack,$interval,$timeout,$ionicHistory,$http,$Factory,$stateParams,$scope,$state,$ionicLoading){
	$scope.back=function(){
		goBack.goback();
	}
	$scope.name = $stateParams.name;
	
	$scope.agreement={checked:true}
	
	$scope.submitData={
		Phone:'',
		Password:'',
		Msg:''
		
	}
	

	
	
	//验证码请求
	$scope.yzcode=function($event){
		
		var sMobile = $('#registerorback .backphone').val()
	    if(!(/^1[34578]\d{9}$/.test(sMobile))){ 
	        $ionicLoading.show({
								template:"请输入正确的手机号码",
								duration:1000
							});
	        return false; 
	    } 
		
		
		$scope.daojishi=80;
		clock = $interval(function(){
			$scope.daojishi--
			if($scope.daojishi<0){
				$event.target.innerText="获取";
				$scope.daojishi=80;
				$scope.disabled=false;
				$interval.cancel(clock);
			}else{
				$scope.disabled=true;
				$event.target.innerText=$scope.daojishi+'s后获取'
			}
		},1000);
		
		var req = {
		method: 'POST',
		url: $Factory.Server.msg.url,
		headers: {
//		   'Content-Type': 'application/json'
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: "Phone="+$scope.submitData.Phone
		};
		$http(req).then(function(resData){
			$ionicLoading.show({
					template:resData.data.msg,
					duration:1500
				});
			if(resData.data.status==0){
				//发送成功
			}else{
				$event.target.innerText="获取";
				$scope.daojishi=80;
				$scope.disabled=false;
				$interval.cancel(clock);
			}
			
			}, function(err){
				$event.target.innerText="获取";
				$scope.daojishi=80;
				$scope.disabled=false;
				$interval.cancel(clock);
				
				$ionicLoading.show({
						template:"获取失败",
						duration:1000
					});
					
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
//			 data: {Phone:$scope.submitData.Phone,Password:$scope.submitData.Password,Msg:$scope.submitData.Msg,ParPhone:$scope.submitData.ParPhone}
			 data:$scope.submitData
			}
			$http(req).then(function(resData){
					if(resData.data.status==0){
						$ionicLoading.show({
								template:'注册成功',
								duration:1500
						});	
						//友盟统计
						Umeng.Analytics.logEvent({
						    eventId: 'ft_userRegister'
						}, function () {
						    
						}, function (reason) {
						
						});	
						//加积分
						if($scope.submitData.ParPhone){
							var req = {
							 method: 'POST',
							 url: $Factory.Score.add.url,
							 headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							 },
							 data: "actId="+8
							}
							$http(req).then(function(resData){
								$ionicHistory.goBack()
							})
						}else{
							var req = {
							 method: 'POST',
							 url: $Factory.Score.add.url,
							 headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							 },
							 data: "actId="+7
							}
							$http(req).then(function(resData){
								$ionicHistory.goBack()
							})
						}

					}else{
						//不成功
						$ionicLoading.show({
								template:resData.data.msg,
								duration:1500
						});	
						$('#registerorback .registerorback .list .button').html("获取");
						$scope.daojishi=80;
						$scope.disabled=false;
						$interval.cancel(clock);
					}
					
				
				}, function(resData){
					$('#registerorback .registerorback .list .button').html("获取");
					$scope.daojishi=80;
					$scope.disabled=false;
					$interval.cancel(clock);
					
					$ionicLoading.show({
							template:"提交失败",
							duration:1000
						});
					
				});
		}else{
			//找回（修改）密码
			var req = {
			 method: 'POST',
			 url: $Factory.Server.repass.url,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {Phone:$scope.submitData.Phone,Password:$scope.submitData.Password,Msg:$scope.submitData.Msg}
			}
			$http(req).then(function(resData){
				if(resData.data.status==0){
						$ionicLoading.show({
								template:'修改成功',
								duration:1500
						});	
						$timeout(function(){
							$ionicHistory.goBack()
						},1500)
					}else{
						//不成功
						$ionicLoading.show({
							template:resData.data.msg,
							duration:1500
						});	
						$('#registerorback .registerorback .list .button').html("获取");
						$scope.daojishi=80;
						$scope.disabled=false;
						$interval.cancel(clock);
					}
				
				}, function(err){
					$('#registerorback .registerorback .list .button').html("获取");
					$scope.daojishi=80;
					$scope.disabled=false;
					$interval.cancel(clock);
					
					$ionicLoading.show({
							template:"提交失败",
							duration:1000
						});
					
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
