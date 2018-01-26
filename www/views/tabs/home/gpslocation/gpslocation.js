angular.module('App')
.controller('GpslocationController',function($stateParams,$interval,$cacheFactory,$timeout,$cordovaStatusbar,$state,$Factory,$http,$ionicHistory,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,$ionicLoading,$http,$ionicScrollDelegate){
	$scope.cancle=function(){
		$ionicHistory.goBack();
	}
	
	$scope.typechoose=$stateParams.typchoose||'二手房'
	$scope.changetype=function(type){
		$scope.typechoose=type;
		$scope.popover.hide();
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
	
	
	
	
	$scope.getarea=function(){
      //myaddr(116.324499,39.899216);
      // 进行定位
      baidumap_location.getCurrentPosition(function (result) {
        var latitude=result.latitude;
        var longitude=result.longitude;
        alert(JSON.stringify(result))
        myaddr(longitude,latitude);
      }, function (error) {

      });
    }
    //根据定位得到的经纬度对地址进行解析
    function myaddr(longitude,latitude){
//      alert("我的地址是："+longitude+","+latitude);

      // 百度地图API功能
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(longitude, latitude);//34.7534880000,113.6313490000
      map.centerAndZoom(point, 12);
      var marker = new BMap.Marker(point);  // 创建标注
      map.addOverlay(marker);               // 将标注添加到地图中
      //把地址在地图上标出来
      var geoc = new BMap.Geocoder();
      geoc.getLocation(point, function(rs){
        var addrmsg=rs.address;
        var addComp = rs.addressComponents;  //详细的分省市县街道的信息
        //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
		alert('1.'+rs+'2.'+rs.address+'3.'+rs.addressComponents+'4.'+rs.addressComponents.city)
		alert(JSON.stringify(rs.addressComponents))
		alert(JSON.stringify(rs))
//		$ionicLoading.show({
//							template:'1.'+rs+'2.'+rs.address+'3.'+rs.addressComponents+'3.'+rs.addressComponents.city,
//							duration:4000
//					});
        var opts = {
          width : 200,     // 信息窗口宽度
          height: 50,     // 信息窗口高度
        }
        var infoWindow = new BMap.InfoWindow("地址:"+addrmsg, opts);  //创建信息窗口对象 
        map.openInfoWindow(infoWindow,point); //开启信息窗口


      }); 



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

