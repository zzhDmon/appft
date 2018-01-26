angular.module('App').controller('ShareinfodetailsController',function($timeout,$cacheFactory,$scope,$http,$Factory,$stateParams,$ionicHistory,$ionicPopover,WechatService,$ionicLoading,Apphost){
	$timeout(function(){
		$('span.back-text').css('display','none');
		$('.infodetails').css('margin-top',$('.header').outerHeight())
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.type=localStorage.getItem('shareinfotype');
	$scope.id=localStorage.getItem('shareinfoid');
	$scope.uid=localStorage.getItem('shareinfouid');
	
	
	$scope.discription=localStorage.getItem('Discription');
	$scope.Name=localStorage.getItem('Name');
	$scope.showimg=localStorage.getItem('ShowImg')||"http://imgs.wujiuyun.com/images/logo.png";

	
	$http.get($Factory.News.get.url,{params:{type:$scope.type,id:$scope.id}}).then(function(resData){
		$scope.data=resData.data;
		$('.main').html(resData.data.Article)	
	})

	
	
	
	
})