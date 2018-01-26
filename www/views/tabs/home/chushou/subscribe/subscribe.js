
angular.module('App').controller('ChushouSubController',function($ionicHistory,$ionicLoading,$timeout,$Factory,$http,$scope,$stateParams){
	$timeout(function(){
		$('span.back-text').css('display','none');
		$('.chushousub').css('margin-top',$('.header').outerHeight())
	})
	$scope.name = $stateParams.name
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.devList = [
      { text: "思明", checked: false },
      { text: "湖里", checked: false },
      { text: "集美", checked: false },
      { text: "杏林", checked: false },
      { text: "海沧", checked: false },
      { text: "同安", checked: false },
      { text: "翔安", checked: false },
      { text: "厦门周边", checked: false }
    ];
    
//  $scope.userinfo={
//		ShowImg:localStorage.getItem('ShowImg'),
//		Name:localStorage.getItem('Name'),
//		Sex:localStorage.getItem('Sex'),
//		Phone:localStorage.getItem('Phone'),
//		WorkYears:localStorage.getItem('WorkYears'),
//		Discription:localStorage.getItem('Discription'),
//		Image:localStorage.getItem('Image'),
//		OutsideHouseRentSubscription:localStorage.getItem('OutsideHouseRentSubscription').split(','),//要转数组
//		OutsideHouseSubscription:localStorage.getItem('OutsideHouseSubscription').split(','),
//		//认证信息
//		VCard:localStorage.getItem('VCard'),
//		ShowVCard:localStorage.getItem('ShowVCard'),
//		BusinessCard:localStorage.getItem('BusinessCard'),
//		ShowBusinessCard:localStorage.getItem('ShowBusinessCard'),
//		BankType:localStorage.getItem('BankType'),
//		BankTypes:JSON.parse(localStorage.getItem('BankTypes')),
//		BankNum:localStorage.getItem('BankNum'),
//		VStatus:localStorage.getItem('VStatus'),
//		VStatusName:localStorage.getItem('VStatusName')
//  }
    

	$scope.$on('$ionicView.enter',function(){
		$http.get($Factory.User.get.url).then(function(resData){
	//					console.log(resData.data.data)
						$scope.userinfo = resData.data.data;
					
						for(item of $scope.userinfo.OutsideHouseSubscription){
						    if(item=='思明'){
						       $scope.devList[0].checked=true; 
						    }else if(item =='湖里'){
						    	$scope.devList[1].checked=true; 
						    }else if(item =='集美'){
						    	$scope.devList[2].checked=true; 
						    }else if(item =='杏林'){
						    	$scope.devList[3].checked=true; 
						    }else if(item =='海沧'){
						    	$scope.devList[4].checked=true; 
						    }else if(item =='同安'){
						    	$scope.devList[5].checked=true; 
						    }else if(item =='翔安'){
						    	$scope.devList[6].checked=true; 
						    }else if(item =='厦门周边'){
						    	$scope.devList[7].checked=true; 
						    }else{
						    	
						    }
						}
					
		}).catch(function(){
		
		})
    	
    })
    
    $scope.chk= function(){ 
    		if($scope.devList[0].checked==false&&$scope.devList[1].checked==false&&$scope.devList[2].checked==false&&$scope.devList[3].checked==false&&$scope.devList[4].checked==false&&$scope.devList[5].checked==false&&$scope.devList[6].checked==false&&$scope.devList[7].checked==false){
		   		$ionicLoading.show({
								template:'请至少选择一个',
								duration:1000
					});
		   	}else{
		    	$scope.userinfo.OutsideHouseSubscription=[];
				var obj=$('#chushousub input[type="checkbox"]'); 
				//取到对象数组后，我们来循环检测它是不是被选中 
				for(var i=0; i<obj.length; i++){ 
					if(obj[i].checked){
						$scope.userinfo.OutsideHouseSubscription.push($scope.devList[i].text);
					} 
				} 
				//那么现在来检测s的值就知道选中的复选框的值了 
				var req = {
				 method: 'POST',
				 url: $Factory.User.save.url,
				 headers: {
				   'Content-Type': 'application/json'
				 },
				 data:$scope.userinfo
				}
			
				$http(req).then(function(resData){
					if(resData.data.status==0){
						localStorage.setItem('OutsideHouseSubscription',$scope.userinfo.OutsideHouseSubscription)
						$ionicLoading.show({
							template: resData.data.msg,
							duration: 1000
						});
						$timeout(function(){
							$ionicHistory.goBack()
						},1000)
					}
				},function(err){
					$ionicLoading.show({
								template:'订阅失败',
								duration:1000
					});
				})
		   	}
    	
	}
})
