
angular.module('App').controller('MyinfoController',function($timeout,$ionicHistory,$rootScope,$scope,$http,$Factory,$stateParams){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.name = $stateParams.name
	
	 $scope.$on('$ionicView.enter',function(){
//      $http.get($Factory.User.qCode.url).then(function(resData){
//			$scope.qcode = resData.data.data;
//		}).catch(function(){
//			$scope.qcode=localStorage.getItem('qcode');
//		})
        
        $scope.qcode=localStorage.getItem('qcode');
        
        $http.get($Factory.User.get.url).then(function(resData){
				$scope.myinfo = resData.data.data;
				$scope.showname=true;
				if($scope.myinfo.Name=='null'){
					$scope.showname=false;
				}
				$scope.showdesc=true;
				if($scope.myinfo.Discription=='null'){
					$scope.showdesc=false;
				}
				$scope.showsex=true;
				if($scope.myinfo.Sex=='null'){
					$scope.showsex=false;
				}
		})
    });

})
