
angular.module('App').controller('LikeController',function($rootScope,$timeout,$cordovaToast,$scope,$http,$Factory,$ionicLoading,$ionicHistory,$stateParams,$timeout,$cordovaFileTransfer){
	$scope.name = $stateParams.name
	$timeout(function(){
		$('span.back-text').css('display','none');
	})
	$scope.back=function(){
		$ionicHistory.goBack()
	}
		$scope.id=$stateParams.id;
		$scope.url=$stateParams.url;
		$scope.name=$stateParams.name;
		$scope.like=function(){
			var req = {
			 method: 'POST',
			 url: $Factory.Template.hit.url,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: { id:$scope.id}
			}
			$http(req).then(function(resData){
				$rootScope.reloaddazibao=true;
				$scope.test=resData.data.msg
					$ionicLoading.show({
							template:resData.data.msg,
							duration:1000
					});
				});
			
		}
		//保存图片	
		$scope.downloadImage = function(photoPath) {
			var pictrueUrl = encodeURI(photoPath);
			
			function saveImageToPhone(url, success, error) {
				var canvas, context, imageDataUrl, imageData;
				var img = new Image();
				img.onload = function() {
					canvas = document.createElement('canvas');
					canvas.width = img.width;
					canvas.height = img.height;
					context = canvas.getContext('2d');
					context.drawImage(img, 0, 0);
					try {
						imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
						imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
						cordova.exec(
							success,
							error,
							'Canvas2ImagePlugin',
							'saveImageDataToLibrary', [imageData]
						);
					} catch(e) {
						error(e.message);
					}
				};
				try {
					img.src = url;
				} catch(e) {
					error(e.message);
				}
			}
		
			var success = function(msg) {
				//下载成功
				$ionicLoading.show({
					template: '保存图片成功',
					duration: 1000
				});
			};
			var error = function(err) {
				//下载失败
				$ionicLoading.show({
					template: '未设置存储权限，保存失败',
					duration: 1000
				});
			};
			saveImageToPhone(photoPath, success, error);
		}
		
		
		
		
		
		//保存图片	
//		 $scope.downloadImage = function() {
//         var url = $scope.url;
//         var filename = url.split("/").pop();//filename
//         var targetPath = cordova.file.externalRootDirectory + filename;
//         var trustHosts = true
//         var options = {};
//         // alert(cordova.file.externalRootDirectory);
//         $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
//             .then(function(result) {
//					//alert(JSON.stringify(result));
//					//路径：file:///storage/emulated/0/
//					$ionicLoading.show({
//								template:'保存成功到本地',
//								duration:1000
//						});
//             }, function(error) {
//             	 	$ionicLoading.show({
//								template:'未设置存储权限，保存失败',
//								duration:1000
//						});
//             }, function (progress) {
//                 $timeout(function () {
//                     $scope.downloadProgress = (progress.loaded / progress.total) * 100;
//                 })
//             });
//     }

})
