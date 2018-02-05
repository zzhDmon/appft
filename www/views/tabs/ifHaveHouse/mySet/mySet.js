
angular.module('App').controller('mySetCtl',function($timeout,$ionicHistory,$cordovaAppVersion,$cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2,$rootScope,$http,$Factory,$state,$scope,$stateParams,$ionicPopup,$ionicLoading){
	$timeout(function(){
		$('span.back-text').css('display','none');
	})	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	$scope.name = $stateParams.name
	

	
   //confirm 对话框
   	$scope.logout = function() {
     	var confirmPopup = $ionicPopup.confirm({
	        title: '确定退出？',
            cancelText: '取消',
            okText: '退出'
	     });
     	confirmPopup.then(function(res) {
	        if(res) {
	        		$ionicHistory.clearHistory();
					
	     			localStorage.clear();
	     			$rootScope.loged=localStorage.getItem('loged');
	     			$rootScope.uid=localStorage.getItem('AccountId');
					$http.post($Factory.Server.logout.url).then(function(resData){
						if(resData.data.status==0){
							$state.go('tabs.home')
						}
					})
	        } else {
	         
	        }
     	});
    };
    

   $scope.check=function(){
   		checkUpdate()
   }

    // 检查更新
    function checkUpdate() {
         document.addEventListener("deviceready", function () {
         	$http.get($Factory.Server.getversion.url).then(function(resData){
             		var serverAppVersion = resData.data.version; //从服务端获取最新版本号
             		//获取版本
             		$cordovaAppVersion.getVersionNumber().then(function (version) {
             		    if (version != serverAppVersion) {
             		        showUpdateConfirm(resData.data.description,resData.data.url,serverAppVersion);
             		    }else{
             		    	$ionicLoading.show({
									template:'当前已是最新版本',
									duration:2000
							});
             		    }
             		});
        		
        	})
         }, false);
    }

    // 显示是否更新对话框
    function showUpdateConfirm(updateinfo,updateurl,version) {
        var confirmPopup = $ionicPopup.confirm({
            title: '检查到新版本',
            template: updateinfo, //从服务端获取更新的内容
            cancelText: '取消',
            okText: '升级'
        });
        confirmPopup.then(function (res) {
            if (res) {
                var url = updateurl; //服务端返回更新APP的路径
//              var url = "http://192.168.0.105:8081/apk/fangtian.apk"; //服务端返回更新APP的路径
                var targetPath = cordova.file.externalRootDirectory + 'fangtian'+version+'.apk'; //APP下载存放的路径      
                var trustHosts = true;
                var options = {};
                $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
                    // 打开下载下来的APP
                    $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive').then(function () {
                            // 打开成功成功
                        }, function (err) {
                            // 打开错误
                        });
                    $ionicLoading.hide();
                }, function (err) {
                	 $ionicLoading.show({
                            template: "未设置存储权限，下载失败",
                            duration:2000
                       });
                }, function (progress) {
                    //进度，这里使用文字显示下载百分比
                    $timeout(function () {
                        var downloadProgress = (progress.loaded / progress.total) * 100;
                        $ionicLoading.show({
                            template: "已经下载：" + Math.floor(downloadProgress) + "%"
                        });
                        if (downloadProgress > 99) {
                            $ionicLoading.hide();
                        }
                    })
                });
            } else {
                // 点击取消
            }
        });
    } 
           

})
