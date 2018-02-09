

angular.module('App')
.controller('agentSearchCtl',function(goBack,$stateParams,$interval,$cacheFactory,$timeout,$cordovaStatusbar,$state,$Factory,$http,$ionicHistory,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,$ionicLoading,$http,$ionicScrollDelegate){
	$scope.cancle=function(){
		goBack.goback();
	}

	

	
	//输入框样式操作
	$scope.searchName={
		key:''
	}
	
	$scope.clear=function(){
		$scope.searchName.key="";
	}
	$scope.goback=function(){
		$ionicHistory.goBack();
	}
	

	$scope.showAgentsearchHistory=localStorage.getItem('agentSearchHistory')?JSON.parse(localStorage.getItem('agentSearchHistory')):[];
	
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
		$state.go('tabs.agentSearchResult',{query:$scope.searchName.key})
		
		//已存在该历史？
		if(contains($scope.showAgentsearchHistory, $scope.searchName.key)){
			return
		}else{
			//最多十条
			if($scope.showAgentsearchHistory>9){
			
				$scope.showAgentsearchHistory.pop()
				$scope.showAgentsearchHistory.unshift($scope.searchName.key);
			}else{
				$scope.showAgentsearchHistory.unshift($scope.searchName.key);				
			}					
		}
		//设置二手搜索历史记录
		localStorage.setItem('agentSearchHistory',JSON.stringify($scope.showAgentsearchHistory));
	
	}
	
	//删除全部历史记录
	$scope.removeallhistory=function(){
		localStorage.removeItem('agentSearchHistory');
		$scope.showAgentsearchHistory=[];
	}
	
	//点叉号删除单个历史记录
	$scope.DelAgentSearch=function(index){
		$scope.showAgentsearchHistory.splice(index,1);
		//设置二手搜索历史记录
		localStorage.setItem('agentSearchHistory',JSON.stringify($scope.showAgentsearchHistory));
	}
	
	
	
})



