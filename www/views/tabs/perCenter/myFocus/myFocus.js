angular.module('App')
.controller('myFocusCtl',function(goTo,$ionicHistory,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$timeout){
	$scope.back=function(){
        $ionicHistory.goBack()
    }

    

	$scope.goto=function(id){
        goTo.goto('dialogBox',{id:id})
    }

    $scope.headType = 0;
    $scope.move=function(index){
        left=(index*50 + 10)+'%';
        $('#my_focus .header .switch .bottomline').animate({'left':left},300);
        $scope.headType = index;
    }

})


