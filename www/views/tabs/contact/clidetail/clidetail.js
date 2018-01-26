angular.module('App').controller('ClidetailCtr',function($timeout,$ionicPopup,$state,$stateParams,$ionicActionSheet,$ionicScrollDelegate,$rootScope,$ionicHistory,$Factory,$scope,$http,$ionicLoading,$ionicSideMenuDelegate,$ionicSlideBoxDelegate){
	
	$scope.back=function(){
		$ionicHistory.goBack()
	}

	$http.get($Factory.Client.get.url,{params:{id:$stateParams.id}}).then(function(resData) {
				$scope.clientData = resData.data;

				if(resData.data.Level==1){
					$scope.level="A 有价值";
				}else if(resData.data.Level==2){
					$scope.level="B 有价值";
				}else{
					$scope.level="C 观望";
				}
			}).catch(function(resData) {
				$ionicLoading.show({
					template: '请求客户数据失败',
					duration: 1500
				})
			})
			
	//底部弹出框
	$scope.showsheet = function($event,phone) {
	   var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '修改客户资料'}
	     ],
	    destructiveText: '删除客户',
	    destructiveButtonClicked:function(){
	    	 hideSheet();
	    	//删除
	    	var confirmPopup = $ionicPopup.confirm({
               title: '确认删除？'
             });
             confirmPopup.then(function(res) {
	                if(res) {
	                  	var req = {
							 method: 'POST',
							 url: $Factory.Client.delete.url,
							 headers: {
//								   'Content-Type': 'application/json'
							   'Content-Type': 'application/x-www-form-urlencoded'
							 },
//								 data: {id:$stateParams.id}		
							 data:"id="+$stateParams.id
							}
						$http(req).then(function(resData){
							$ionicLoading.show({
								template: resData.data.msg,
								duration: 1000
							});
							$timeout(function(){
								$ionicHistory.goBack()
							},1000)
						},function(err){
							$ionicLoading.show({
								template: "删除失败",
								duration: 1000
							});
						})
	                } else {
	                  
	                }
             });
	    },
	    cancelText: '关闭',
	    cancel: function() {
	      },
	    buttonClicked: function(index) {
		    if(index==0){
		    	$state.go("tabs.createcli",{id:$stateParams.id})
		    }
		    
		    return true;
	       
	    }
	   });
	
	
	 };
})
.filter('customFilter',function(){
		//返回的方法中参数
		//1.要过滤的数据  2.过滤器第一个冒号后面参数 3.过滤器第二个冒号后面参数
		return function(value,symbol,fraction){
			//console.log(arguments)
			//如果没有传递保留位数，默认保留两位
			fraction = fraction || 2;
			//防止value没有值
			if(!value){
				return
			}
			value = value.toFixed(fraction);
			var dotIndex = value.indexOf('.');
			while(dotIndex>3){
				dotIndex -=3;
				value=value.substring(0,dotIndex)+','+value.substring(dotIndex)
			}
			symbol = symbol || ""
			return symbol+ value;
		}
	})
