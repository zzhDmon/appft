angular.module('App')
.controller('HomeController',function(goTo,$ionicViewSwitcher,$interval,$cacheFactory,$timeout,$cordovaStatusbar,$state,$Factory,$http,$ionicHistory,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,$ionicLoading,$http,$ionicScrollDelegate){
	//清除浏览历史，即使手机上有回退按钮或者导航栏上显示回退按钮，都无法回退
	$ionicHistory.clearHistory();
	
	$timeout(function(){
		$ionicSlideBoxDelegate.update();
		//$ionicSlideBoxDelegate.loop(true); 
		$ionicSideMenuDelegate.canDragContent(false) //不能滑出侧栏	
		
		if($('#home .home').innerWidth()>375){
			$('#home .home').addClass('plus')
			$('#home .home').removeClass('home')
		}
		
	})

	$scope.dragLeft=function(e){
		console.log(e)
	}
	$scope.reg=function(){
		// $state.go('agreement')
		// $ionicViewSwitcher.nextDirection("forward");
		goTo.goto('agreement')
	}
	
	
	//全局使用  咨询页面判断使用
	$rootScope.loged=localStorage.getItem('loged');
	$rootScope.uid=localStorage.getItem('AccountId');
	
	$scope.$on('$ionicView.beforeEnter',function(){
		//状态栏
		$timeout(function(){
			if(window.StatusBar){
			  	StatusBar.show();
			 	StatusBar.backgroundColorByName("gray");
			}				
		});
		
		//失败重新请求
		if($scope.reload){
			$http.get($Factory.SecondVersion.homenews.url).then(function(resData) {
				$scope.loushizixunarr=resData.data;
		
			}).catch(function(resData) {
					$ionicLoading.show({
						template: '请求数据失败',
						duration: 1500
					})
					$scope.reload=true;
				})
		
		    
		    //请求新房
		    $http.get($Factory.NewHouse.query.url,{params:{pagesize:10,pagenum:0,CityId:1}}).then(function(resData){
				$scope.homehousearr=resData.data;
		           if(resData.data.length>9){
						$scope.noMore = true;
					}else if(resData.data.length<=0){
						$scope.noMore = false;
						$ionicLoading.show({
								template: '暂无房源数据',
								duration: 1000
							});
						$scope.renderdone=false;
					}else{
						$scope.noMore = false;
						//底线
						$scope.baseLine=true;
					}
				
			}, function (err) {
		            	$ionicLoading.show({
							template: '请求数据失败',
							duration: 1500
						})
		            	$scope.reload=true;
		            })
		    //轮播图
		    $http.get($Factory.Template.banner.url).then(function(resData) {
				$scope.BannerList=resData.data;
				$ionicSlideBoxDelegate.update();//重绘，让图片显示出来
			}).catch(function(resData) {
					$ionicLoading.show({
						template: '请求数据失败',
						duration: 1500
					})
					$scope.reload=true;
				})
		}
		
		
		//每日登录加积分
		var req = {
				 method: 'POST',
				 url: $Factory.Score.add.url,
				 headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				 },
				 data: "actId="+1
				}
			$http(req).then(function(resData){
				
			})
		
		$scope.showmoney=false;
		if($scope.uid){
			$http.get($Factory.User.get.url).then(function(resData){
						//认证信息
						localStorage.setItem('VCard',resData.data.data.VCard);
						localStorage.setItem('ShowVCard',resData.data.data.ShowVCard);
						localStorage.setItem('BusinessCard',resData.data.data.BusinessCard);
						localStorage.setItem('ShowBusinessCard',resData.data.data.ShowBusinessCard);
						localStorage.setItem('BankType',resData.data.data.BankType);
						localStorage.setItem('BankTypes',JSON.stringify(resData.data.data.BankTypes));
						localStorage.setItem('BankNum',resData.data.data.BankNum);
						localStorage.setItem('VStatus',resData.data.data.VStatus);
						localStorage.setItem('VStatusName',resData.data.data.VStatusName);
					
						$scope.VStatus=resData.data.data.VStatus;

						if($scope.VStatus*1==2){
							$scope.showmoney=true;
						}
			})			
		}
		
	})
	
	
	//定义全局右划后退
	$rootScope.onSwipeRight=function(){
		$ionicHistory.goBack()
	}
	

	//关闭右侧相似房源option
	$scope.closeoption=function($event){
		$('#home .fylist .item-content').css('transform','translate3d(0px, 0px, 0px)')
	}
	
	
	$scope.scrollTop = function() {
		    $ionicScrollDelegate.scrollTop(true);
		  };



	
	 	$scope.scrollListen = function(){
	 		var posterheight = $('#home .homebanner').height();
			//根据滚动控制回到顶部的显示
			var scrollTop = $ionicScrollDelegate.$getByHandle('myscroll').getScrollPosition().top;
			
			if(scrollTop>300){
				$('#home .backtop').css('display','block')
			}else{
				$('#home .backtop').css('display','none')
			}
			
			
			//顶部动画
			if(scrollTop>posterheight-44){
				$('#home .home-header').css('background-color','rgb(65,160,255)')
			}else if(scrollTop<0){
				$('#home .home-header').css('background-color','rgba(255,255,255,0.5)')
			}
			//渐变过程
			else{
				var opacity=scrollTop/(posterheight-44)
				$('#home .home-header').css({
					display:'flex',
					backgroundColor:'rgba(65,160,255,'+opacity+')'
				})
				
			}
	 	}
	
	
	
	//GPS定位
	$scope.getarea=function(){
      //myaddr(116.324499,39.899216);
      // 进行定位
      baidumap_location.getCurrentPosition(function (result) {
        if(result.city=='厦门市'){
        	$ionicLoading.show({
				template: '系统自动定位，无须选择！',
				duration: 1500
			})
        }else{
        	$ionicLoading.show({
				template: result.city+'还未开放运营',
				duration: 1500
			})
        }
      }, function (error) {

      });
    }
	
	//公私盘切换
	$scope.toptwo="房田公盘";
	$scope.changeToptwo = function(toptwo){
		$scope.toptwo=toptwo;
		if($scope.toptwo=="房田公盘"){
			$('#home .eightpic .toptwo .public').css({
				"background-color":"#ffffff",
				"color":"#333333"
				});
			$('#home .eightpic .toptwo .private').css({
				"background-color":"#f6f6f6",
				"color":"#969696"
				});
		}else{
			$('#home .eightpic .toptwo .public').css({
				"background-color":"#f6f6f6",
				"color":"#969696"
				});
			$('#home .eightpic .toptwo .private').css({
				"background-color":"#ffffff",
				"color":"#333333"
				});
		}
	}
	
	//楼市资讯
	$scope.autoScroll = function(obj){  
			$(obj).find("ul").animate({  
				marginTop : "-39px"  
			},500,function(){  
				$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
				})  
			}  
 
			$interval(function(){
				$scope.autoScroll(".trytry")
		},4000)

	
	$http.get($Factory.VTwoPFive.toutiao.url).then(function(resData) {
		$scope.loushizixunarr=resData.data;
	}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
			$scope.reload=true;
		})
	
	//轮播图
    $http.get($Factory.Template.banner.url).then(function(resData) {
		$scope.BannerList=resData.data;
		$ionicSlideBoxDelegate.update();//重绘，让图片显示出来
	}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
			$scope.reload=true;
		})
	
    //请求新房
    $http.get($Factory.NewHouse.query.url,{params:{pagesize:10,pagenum:0,CityId:1}}).then(function(resData){
		$scope.homehousearr=resData.data;
           if(resData.data.length>9){
				$scope.noMore = true;
			}else if(resData.data.length<=0){
				$scope.noMore = false;
				$ionicLoading.show({
						template: '暂无房源数据',
						duration: 1000
					});
				$scope.renderdone=false;
			}else{
				$scope.noMore = false;
				//底线
				$scope.baseLine=true;
			}
		
	}, function (err) {
            	$ionicLoading.show({
					template: '请求数据失败',
					duration: 1500
				})
            	$scope.reload=true;
            })
 
	//起始请求页码
	$scope.pagenum = 1;
	//每页请求数量
	$scope.pagesize = 10;
	
	
	//刷新和加载方法
	function load(loadType) {
		//只需加载三四十条
		if($scope.pagenum>3){
			$scope.noMore = false;
			//底线
			$scope.baseLine=true;
			
			return;
		}
		
		$http.get($Factory.NewHouse.query.url,{params:{pagesize:$scope.pagesize,pagenum:$scope.pagenum,CityId:1}}).then(function (resData) {
			//返回空数组，没有更多数据了
			if(resData.data.length<=0){
//				$ionicLoading.show({
//					template: '加载到底了',
//					duration: 1000
//				});
				$scope.noMore = false;
				//底线
				$scope.baseLine=true;
				$scope.$broadcast('scroll.infiniteScrollComplete');
				return;
			}
			if(loadType) {
				$scope.pagenum += 1;
				$scope.homehousearr = $scope.homehousearr.concat(resData.data);
				//无线加载数据成功后需要广播事件通知这个指令 ion-infinite-scroll 加载完成。
				$scope.$broadcast('scroll.infiniteScrollComplete');
			} else {
				//数据清空，重新写入
				$scope.newhouse = resData.data;
				$scope.$broadcast('scroll.refreshComplete');
				//能够让用户再次下拉刷新
				if(resData.data.length>10){
					$scope.noMore = true;
				}else{
					$scope.noMore = false;
				}
			}
		}).catch(function(resData) {
			$ionicLoading.show({
				template: '请求数据失败',
				duration: 1500
			})
		})
	}

	//在当前作用域添加loadMore方法
	$scope.homehouseloadMore = function(infinite){
		load(infinite);
	}
                
                
    $scope.renderdone=true;
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
          //渲染完成后执行的js
		   $scope.renderdone=false;
		 
    });
    
    //获取经纬度后转地址
//  $http.jsonp("http://api.map.baidu.com/geocoder/v2/?callback=JSON_CALLBACK&mcode=com.xxxxx.-&location=24.46,118.10&output=json&pois=1&ak=outxAWxuvSee8qx4VwG2MiRuW9qkTlD2")
//	   .success(function(data){
//	  　　 console.log(data.result.formatted_address.substring(0,6)) 
//	　　})
  
    

})



