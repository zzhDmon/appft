
angular.module('App').controller('ChangeinfoController',function($timeout,$ionicHistory,$ionicLoading,$rootScope,$http,$Factory,$scope,$stateParams,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');
		$('.radio-content i.radio-icon').removeClass('ion-checkmark icon')
		$('.radio-content i.radio-icon').addClass('iconfont icon-xuanze')
	})	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.name = $stateParams.name
		 $scope.clientSideList = [
		        { text: "男", value:"男" },
		        { text: "女", value: "女" }
		      ];
		      
    $scope.$on('$ionicView.enter',function(){
		$http.get($Factory.User.get.url).then(function(resData){
	//					console.log(resData.data.data)
						$scope.userinfo = resData.data.data;
					
		}).catch(function(){
		
		})
    	
    })
	
	
	

//封装提交方法
	$scope.postmethod=function(setitemName,setitem){
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
						localStorage.setItem(setitemName,setitem);
						$ionicHistory.goBack();
					}
				},function(err){
					$ionicLoading.show({
								template:'提交失败',
								duration:1500
					});
				})
	}
	
    $scope.save=function(){
    	
    	if($scope.name=="修改姓名"){
					var Name='Name'
					$scope.postmethod(Name,$scope.userinfo.Name)
		    	
		}else if($scope.name=="工作年限"){
		    		var WorkYears='WorkYears'
					$scope.postmethod(WorkYears,$scope.userinfo.WorkYears)
		}else if($scope.name=="修改性别"){
	
						var Sex='Sex'
						$scope.postmethod(Sex,$scope.userinfo.Sex)
						
					
		}else{
					
					var Discription='Discription'
					$scope.postmethod(Discription,$scope.userinfo.Discription)
		    }

    }
});
