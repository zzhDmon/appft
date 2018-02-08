

angular.module('App')
.controller('agentSearchCtl',function(goBack,$stateParams,$interval,$cacheFactory,$timeout,$cordovaStatusbar,$state,$Factory,$http,$ionicHistory,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,$ionicLoading,$http,$ionicScrollDelegate){
	$scope.cancle=function(){
		goBack.goback();
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
	

	$scope.setershouhistory=localStorage.getItem('clientsearchhistory')?JSON.parse(localStorage.getItem('ershouhistory')):[];
	
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
		localStorage.setItem('clientsearchhistory',JSON.stringify($scope.setershouhistory));
	
	}
	
	//删除全部历史记录
	$scope.removeallhistory=function(){
		localStorage.removeItem('clientsearchhistory');
		$scope.setershouhistory=[];
	}
	
	//点叉号删除单个历史记录
	$scope.Delclientsearch=function(index){
		$scope.setershouhistory.splice(index,1);
		//设置二手搜索历史记录
		localStorage.setItem('clientsearchhistory',JSON.stringify($scope.setershouhistory));
	}
	
	
	
})



