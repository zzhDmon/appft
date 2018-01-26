
angular.module('App').controller('ImgpreviewController',function($timeout,$ionicHistory,$state,$rootScope,$scope,$stateParams,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.userinfo={
		ShowImg:localStorage.getItem('ShowImg')
	}
	//底部弹出框
	$scope.show = function() {
	   // Show the action sheet
	   var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '从相册中选择' }
	     ],
	     cancelText: '取消',
	     cancel: function() {
	       },
	     buttonClicked: function(index) {
			if(index==0){
				$('input').click();
				$('input').change(function(){
					var file = $(this)[0].files[0];
					// 其实这里可以不用判断，因为 accept="image/*"
					if (file.type.startsWith('image')) {
						$scope.imgurl=URL.createObjectURL(file);
						$state.go('tabs.imgcut',{imgurl:$scope.imgurl})
					}
				});
			}
	       return true;
	     }
	   });
	

	
	};
	 
	 $scope.init = function () {
        new AlloyCrop({
            image_src: 'http://192.168.0.105:8100/3f9b9a83-1aa3-4407-9ffc-a0885962590f',
            circle: true, // optional parameters , the default value is false
            width: 200,
            height: 200,
            ok: function (base64, canvas) { $scope.$apply(function () { $scope.view = base64; }); },
            cancel: function () { $location.path("myAvatarPrev"); },
            ok_text: "确定", // optional parameters , the default value is ok
            cancel_text: "取消" // optional parameters , the default value is cancel
        });
    }
	 
})
