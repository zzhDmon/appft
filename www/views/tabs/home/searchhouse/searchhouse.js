angular.module('App')
.controller('SearchhouseController',function($stateParams,$interval,$cacheFactory,$timeout,$cordovaStatusbar,$state,$Factory,$http,$ionicHistory,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,$ionicLoading,$http,$ionicScrollDelegate){
	$scope.cancle=function(){
		$ionicHistory.goBack();
	}
	
	$http.get($Factory.VTwoPFive.hotsearch.url).then(function(resData){
				$scope.hotSearcharr=resData.data;
			}).catch(function(err){
				
			});
	
	$scope.typechoose=$stateParams.housetype||'二手房'
	$scope.changetype=function(type){
		$scope.typechoose=type;
		$scope.popover.hide();
		if($scope.typechoose=='二手房'){
			$scope.type=1;
		}else if($scope.typechoose=='租房'){
			$scope.type=2;
		}else{
			$scope.type=0;
		}
		
	}
	if($scope.typechoose=='二手房'){
		$scope.type=1;
	}else if($scope.typechoose=='租房'){
		$scope.type=2;
	}else{
		$scope.type=0;
	}
	
	//输入框样式操作
	$scope.searchName={
		key:''
	}
	
	$scope.cancle=function(){
		$scope.searchName.key="";
	}
	$scope.goback=function(){
		$ionicHistory.goBack();
	}
	
	$scope.setershouhistory=localStorage.getItem('ershouhistory')?JSON.parse(localStorage.getItem('ershouhistory')):[];
	$scope.setzufanghistory=localStorage.getItem('zufanghistory')?JSON.parse(localStorage.getItem('zufanghistory')):[];
	$scope.setnewhousehistory=localStorage.getItem('newhousehistory')?JSON.parse(localStorage.getItem('newhousehistory')):[];
	
	//判断搜索历史是否存在
	function contains(arr, obj) {  
			    var i = arr.length;  
			    while (i--) {  
			        if (arr[i] === obj) {  
			            return true;  
			        }  
			    }  
			    return false;  
			} 
	$scope.search=function(){
		$state.go('tabs.searchresult',{query:$scope.searchName.key,type:$scope.type})
		
		if($scope.type==1){
			//已存在该历史？
			if(contains($scope.setershouhistory, $scope.searchName.key)){
				return
			}else{
				//最多十条
				if($scope.setershouhistory>9){
				
					$scope.setershouhistory.pop()
					$scope.setershouhistory.unshift($scope.searchName.key);
				}else{
					$scope.setershouhistory.unshift($scope.searchName.key);				
				}					
			}
			//设置二手搜索历史记录
			localStorage.setItem('ershouhistory',JSON.stringify($scope.setershouhistory));
		}else if($scope.type==2){
			//已存在该历史？
			if(contains($scope.setzufanghistory, $scope.searchName.key)){
				return
			}else{
				//最多十条
				if($scope.setzufanghistory>9){
					$scope.setzufanghistory.pop()
					$scope.setzufanghistory.unshift($scope.searchName.key);
				}else{
					$scope.setzufanghistory.unshift($scope.searchName.key);				
				}
				//设置租房搜索历史记录
				localStorage.setItem('zufanghistory',JSON.stringify($scope.setzufanghistory));				
			}
		}else{
			//已存在该历史？
			if(contains($scope.setnewhousehistory, $scope.searchName.key)){
				return
			}else{
				//最多十条
				if($scope.setnewhousehistory>9){
					$scope.setnewhousehistory.pop()
					$scope.setnewhousehistory.unshift($scope.searchName.key);
				}else{
					$scope.setnewhousehistory.unshift($scope.searchName.key);				
				}
				//设置租房搜索历史记录
				localStorage.setItem('newhousehistory',JSON.stringify($scope.setnewhousehistory));
			}
		}
	}
	
	//删除历史记录
	$scope.removeershouhistory=function(){
		localStorage.removeItem('ershouhistory');
		$scope.setershouhistory=[];
	}
	$scope.removezufanghistory=function(){
		localStorage.removeItem('zufanghistory')
		$scope.setzufanghistory=[];
	}
	$scope.removenewhousehistory=function(){
		localStorage.removeItem('newhousehistory')
		$scope.setzufanghistory=[];
	}
	
	//点叉号删除单个
	$scope.Delershou=function(index){
		$scope.setershouhistory.splice(index,1);
		//设置二手搜索历史记录
		localStorage.setItem('ershouhistory',JSON.stringify($scope.setershouhistory));
	}
	$scope.Delzufang=function(index){
		$scope.setzufanghistory.splice(index,1);
		//设置二手搜索历史记录
		localStorage.setItem('zufanghistory',JSON.stringify($scope.setzufanghistory));
	}
	$scope.Delnewhouse=function(index){
		$scope.setnewhousehistory.splice(index,1);
		//设置二手搜索历史记录
		localStorage.setItem('newhousehistory',JSON.stringify($scope.setnewhousehistory));
	}
	
	
	
	$scope.popover = $ionicPopover.fromTemplateUrl('searchhouse.html', {
	    scope: $scope
  	});
	 
  	// .fromTemplateUrl() 方法
  	$ionicPopover.fromTemplateUrl('searchhouse.html', {
	    scope: $scope
  	}).then(function(popover) {
	    $scope.popover = popover;
  	});
	 
  	$scope.openPopover = function($event) {
	    $scope.popover.show($event);
	   
	   //图标旋转
	    $('#searchhouse .icon--pulldown').css('transform','rotate(180deg)');
  	};
  	$scope.closePopover = function() {
	    $scope.popover.hide();
  	};
  	// 清除浮动框
  	$scope.$on('$destroy', function() {
	    $scope.popover.remove();
	   
  	});
  	// 在隐藏浮动框后执行
  	$scope.$on('popover.hidden', function() {
	    // 执行代码
	    $('#searchhouse .icon--pulldown').css('transform','rotate(0deg)');
  	});
  	// 移除浮动框后执行
  	$scope.$on('popover.removed', function() {
	    // 执行代码
  	});
})

