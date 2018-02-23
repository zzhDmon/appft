
angular.module('App').controller('agentHomePageCtl',function($ionicSlideBoxDelegate,goTo,goBack,$rootScope,$ionicHistory,$ionicPopover,$ionicActionSheet,$http,$Factory,$scope,$state,$stateParams,$timeout,WechatService,$ionicLoading,Apphost){
	setTimeout(function(){
		$('span.back-text').css('display','none');
		
		//根据导航栏绝对定位
//		$('.header').outerHeight();
//		$('.agent-home-page').css('margin-top',$('.header').outerHeight()-1)
		
		if($('#agent_home_page .agent-home-page').innerWidth()>375){
			$('#agent_home_page .agent-home-page').addClass('plus')
			$('#agent_home_page .agent-home-page').removeClass('weidian')
		}
	})
	
	$scope.back=function(){
		goBack.goback();
	}
	
	//状态栏
	//  if(window.StatusBar){
	//  	StatusBar.backgroundColorByHexString("#3699f5");
	//  }
	
	// $scope.scroll=function(){
	// 	if($('#agent_home_page .scroll').height()<$('.agent-home-page').height()){
	// 		$scope.torf=false
	// 	}else{
	// 		$scope.torf=true
	// 	}
	// }
	// $scope.scroll();
	
	
	$scope.headTitle=$stateParams.id+'的房源';
	$scope.name=$stateParams.id;

	$scope.haveType=0;
	$scope.changeHaveType=function(type){
		$scope.haveType=type;
	}
	
	$scope.goDetail=function(){
		goTo.goto('sellHouseDetail',{id:38418})
	}
	$scope.changeindex=function(){
		$scope.currentindex=$ionicSlideBoxDelegate.$getByHandle('agentHome-handle').currentIndex();
		if($scope.currentindex>1){
			$scope.currentindex=$scope.currentindex-2;
			$scope.haveType=$scope.currentindex;
		}else{
			$scope.haveType=$scope.currentindex;
		}
	}


	//请求新房
	$http.get($Factory.NewHouse.query.url,{params:{pagesize:10,pagenum:0,CityId:1}}).then(function(resData){
		$scope.homehousearr=resData.data;
		
	}, function (err) {
				$ionicLoading.show({
					template: '请求数据失败',
					duration: 1500
				})
				$scope.reload=true;
			})
	




})
