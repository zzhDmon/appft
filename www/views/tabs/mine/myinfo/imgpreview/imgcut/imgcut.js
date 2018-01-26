
angular.module('App').controller('ImgcutController',function($rootScope,$scope,$stateParams,$ionicHistory,$http,$Factory,$ionicLoading,$timeout){
	setTimeout(function(){
		$('span.back-text').css('display','none');
	})	
	
	$scope.imgurl=$stateParams.imgurl;
	$scope.init = function () {
        new AlloyCrop({
            image_src: $scope.imgurl,
            circle: true, // optional parameters , the default value is false
            width: 200,
            height: 200,
            ok: function (base64, canvas) { $scope.$apply(function () {
            	$scope.view = base64; 
            	$scope.done()
            }); },
            cancel: function () {$ionicHistory.goBack()},
            ok_text: "确定", // optional parameters , the default value is ok
            cancel_text: "取消" // optional parameters , the default value is cancel
        });
    }
    $scope.init();
	
	$scope.$on('$ionicView.enter',function(){
			$http.get($Factory.User.get.url).then(function(resData){
							$scope.userinfo = resData.data.data;
						
			}).catch(function(){
			
			})
	    	
	    })
	
	
	$scope.done=function(){
		$scope.$on('$ionicView.enter',function(){
			$http.get($Factory.User.get.url).then(function(resData){
							$scope.userinfo = resData.data.data;
						
			}).catch(function(){
			
			})
	    	
	    })
		
		
		
		$scope.save=function(){
			var req={
					 method: 'POST',
					 url: $Factory.Server.upload.url,
					 headers: {
					   'Content-Type': 'application/json'
					 },
					 data:{path:'Upload',file:$scope.view}
					}
					$http(req).then(function(resData){
						if(resData.data.error==0){
							localStorage.setItem('ShowImg',resData.data.view);
							$scope.userinfo.Image=resData.data.url;
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
										template: '操作失败',
										duration: 1000
									});
							})
						}
					},function(err){
						$ionicLoading.show({
										template: '提交失败',
										duration: 1000
									});
					})
		}
	}
	
})
