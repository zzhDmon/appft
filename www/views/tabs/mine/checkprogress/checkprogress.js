
angular.module('App').controller('CheckprogressController',function($ionicHistory,$state,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	$http.get($Factory.User.get.url).then(function(resData){
					
					//认证信息
//					localStorage.setItem('VCard',resData.data.data.VCard);
//					localStorage.setItem('ShowVCard',resData.data.data.ShowVCard);
//					localStorage.setItem('BusinessCard',resData.data.data.BusinessCard);
//					localStorage.setItem('ShowBusinessCard',resData.data.data.ShowBusinessCard);
//					localStorage.setItem('BankType',resData.data.data.BankType);
//					localStorage.setItem('BankTypes',JSON.stringify(resData.data.data.BankTypes));
//					localStorage.setItem('BankNum',resData.data.data.BankNum);
//					localStorage.setItem('VStatus',resData.data.data.VStatus);
//					localStorage.setItem('VStatusName',resData.data.data.VStatusName);
					
					$scope.VStatus=resData.data.data.VStatus;
		
	})
	
})
