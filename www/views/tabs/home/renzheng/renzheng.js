
angular.module('App').controller('RenzhengController',function($ionicLoading,$ionicHistory,$state,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$ionicPopup,$timeout,$ionicActionSheet){
	$timeout(function(){
		$('span.back-text').css('display','none');
		
		if($('#renzheng .renzheng').innerWidth()>320){
			$('#renzheng .renzheng').addClass('plus')
//			$('#renzheng .renzheng').removeClass('renzheng')
		}
	
	})

	
	$scope.back=function(){
		$ionicHistory.goBack()
	}
	
	$scope.popchoose = function(){
		//如果有元素移除
	    $('.sel-boxs').remove();
	    $('body').append('<style>'+
	                '.sel-boxs{display:none;}'+
	                '.sel-boxs .bg{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:998;}'+
	                '.sel-box{position:fixed;bottom:0;left:0;right:0;z-index:999;}'+
	                '.sel-box .btn{background:white;overflow:hidden;}'+
	                '.sel-box .btn1{overflow:hidden;width:70px;height:50px;float:left;padding:11px 12px;text-align:center;}'+
	                '.sel-box .btn1 img{float:left;width:100%;height:100%;}'+
	                '.sel-box .ok{float:right;color:rgb(65,160,255);}'+
	                '.sel-box .cancel{color:gray;}'+
	                '.sel-box .name{color:rgb(0,0,0);text-align:center;line-height:22px;font-size:18px;padding:11px 0;}'+
	                '.sel-con{background:white;}'+
	                '.sel-con .border{height:45px;border:solid 1px gainsboro;border-width:1px 0;position:fixed;bottom:72px;left:0;right:0;pointer-events:none;}'+
	                '.sel-con .table{display:table;width:100%;table-layout:fixed;}'+
	                '.sel-con .cell{display:table-cell;vertical-align:middle;text-align:center;overflow:hidden;}'+
	                '.sel-con .scroll{-webkit-overflow-scrolling:touch;height:180px;overflow:auto;box-sizing:border-box;padding:63px 0 65px;width:200%;padding-right:100%;}'+
	                '.sel-con .ele{font-size:16px;color:#b2b2b2;height:45px;line-height:45px;}'+
	                '@-webkit-keyframes fadeInUp {from {opacity: 0;-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0);}to {opacity: 1;-webkit-transform: none;transform: none;}}'+
	                '@keyframes fadeInUp {from {opacity: 0;-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0);} to {opacity: 1;-webkit-transform: none;transform: none;}}'+
	                '.fadeInUp {-webkit-animation-name: fadeInUp;animation-name: fadeInUp;}'+
	                '@-webkit-keyframes fadeInDown {from {opacity: 1;-webkit-transform: none;transform: none;}to {opacity: 0;-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0);}}'+
	                '@keyframes fadeInDown {from {opacity: 1;-webkit-transform: none;transform: none;}to {opacity: 0;-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0);}}'+
	                '.fadeInDown {-webkit-animation-name: fadeInDown;animation-name: fadeInDown;}'+
	                '.animated {-webkit-animation-duration: .4s;animation-duration: .4s;-webkit-animation-fill-mode: both;animation-fill-mode: both;}'+
	                '</style>'+
	                '<div class="sel-boxs">'+
	                '   <div class="bg"></div>'+
	                '   <div class="sel-box animated fadeInUp">'+
	                '       <div class="btn">'+
	                '           <div class="btn1 ok">确定</div>'+
	                '           <div class="btn1 cancel">取消</div>'+
	                '           <div class="name">加载中...</div>'+
	                '       </div>'+
	                '       <div class="sel-con">'+
	                '           <div class="border"></div>'+
	                '           <div class="table"></div>'+
	                '       </div>'+
	                '   </div>'+
	                '</div>');
	
	    // 取消选择
	    $('.sel-box .cancel,.sel-boxs .bg').click(function(){
	    
	        $('.sel-boxs .bg')[0].removeEventListener('touchmove', preDef, false);
	        $('.sel-boxs .btn')[0].removeEventListener('touchmove', preDef, false);
	        $('.sel-boxs').find('.sel-box').removeClass('fadeInUp').addClass('fadeInDown');
	        setTimeout(function(){
	          $('.sel-boxs').hide();
	        },300);
	    });
	
	    //取消ios在zepto下的穿透事件
	    $(".sel-con").on("touchend", function (event) {
	        event.preventDefault();
	    });
	
	    //取消默认行为   灰层底部不能滑动
	    var preDef = function(e){
	        e.preventDefault();
	        return false;
	    };
	
	    function dataFrame(ele){
	        // ele数组转换成相应结构
	        var eleText = '';
	        for(var i=0;i<ele.length;i++){
	            eleText += '<div class="ele">'+ele[i]+'</div>';
	        };
	        return '<div class="cell elem"><div class="scroll">'+eleText+'</div></div>';
	    };
	    // 封装说明：
	    // 基于jQuery
	    // 适合场景，只适用于单个值的选取模式
	    $.scrEvent = function(params){
	
	        var dataArr = params.data || [];
	        var evEle = params.evEle;
	        var title = params.title || '';
	        var defValue = params.defValue || dataArr[0]; //首次默认值
	        var type = params.type || 'click'; //事件类型
	        var beforeAction = params.beforeAction || function(){};//执行前的动作  无参数 
	        var afterAction = params.afterAction || function (data){};//执行后的动作   参数：选择的文字
	
	        $(evEle).attr('readonly','readonly');
	        // 点击对应input执行事件
	        $(evEle).on(type, function (){
	
	            //由于IOS点击(tap)其他区域 input也不失去焦点的特性
	            $('input, textarea').each(function(){
	                this.blur();
	            });
	            
	            $('.sel-boxs .bg')[0].addEventListener('touchmove', preDef, false);
	            $('.sel-boxs .btn')[0].addEventListener('touchmove', preDef, false);
	
	            beforeAction();
	            $('.sel-con .table').html(dataFrame(dataArr));
	            $('.sel-box .name').text(title);
	            $('.sel-boxs').show().find('.sel-box').removeClass('fadeInDown').addClass('fadeInUp');
	            // 默认值
	            $(evEle).val() == "" ? defValue = defValue : defValue = $(evEle).attr('data-sel01');
	
	            $('.sel-con').find('.elem').eq(0).find('.ele').each(function(){
	                if($(this).text() == defValue){
	                    $(this).parents('.scroll')[0].scrollTop = $(this).index()*45;
	                }
	            });
	            // 选择器滚动获取值和确认赋值
	            var scText = defValue; // 默认值为默认值
	            $('.sel-con .scroll').scroll(function(){
	                var that = $(this);
	                // 数值显示
	                var scTop = $(this)[0].scrollTop+18;
	                var scNum = Math.floor(scTop/45);
	                scText = $(this).find('.ele').eq(scNum).text();
	                //选到字体变大
	                $('.sel-con .scroll').find('.ele').eq(scNum).css({
	                	'color':'rgb(51,51,51)',
	                	'font-size':18
	                	})
	                $('.sel-con .scroll').find('.ele').eq(scNum).siblings().css({
	                	'color':'rgb(102,102,102)',
	                	'font-size':16
	                	})
	                
	                // 停止锁定
	                clearTimeout($(this).attr('timer'));
	                $(this).attr('timer',setTimeout(function(){
	                    that[0].scrollTop = scNum*45;
	                },100));
	            });
	
	            //移除之前的绑定事件
	            $(".sel-box .ok").off();
	            // 确认选择
	            $('.sel-box .ok').click(function(){
	                $(evEle).attr('data-sel01', scText);
	                afterAction(scText);
	                $('.sel-boxs').find('.sel-box').removeClass('fadeInUp').addClass('fadeInDown');
	                setTimeout(function(){
	                  $('.sel-boxs').hide();
	                },300);
	                
	                $('.sel-boxs .bg')[0].removeEventListener('touchmove', preDef, false);
	                $('.sel-boxs .btn')[0].removeEventListener('touchmove', preDef, false);
	            });
	        });
	    };
	}
	
	$scope.popchoose()
	
	
	$scope.showBankType={
		BankType:''
	}
	
	$http.get($Factory.User.get.url).then(function(resData){
//					console.log(resData.data.data)
					$scope.userinfo = resData.data.data;
				
					for(item of $scope.userinfo.BankTypes){
				        	if($scope.userinfo.BankType == item.Id){
				        		$scope.userinfo.BankType = item.Id;
				        		$scope.showBankType.BankType = item.Name;
				        	}
				        }

					//类型
				    var banklist=$scope.userinfo.BankTypes;
				    var banklistarr=[];
				    for(var i=0;i<banklist.length;i++){
						banklistarr.push(banklist[i].Name)
					}
				    $.scrEvent({
				      data: banklistarr,   //数据
				      evEle: '.rz-banktype',            //选择器
				      title: '',            // 标题
				      defValue: '中国建设银行',             // 默认值
				      afterAction: function (data) {   //  点击确定按钮后,执行的动作
				        $(".rz-banktype").val(data);
				        for(item of $scope.userinfo.BankTypes){
				        	if(data ==item.Name){
				        		$scope.userinfo.BankType = item.Id;
				        		$scope.showBankType.BankType = item.Name;
				        		
				        	}
				        }
				        
				      }
				    });
	
	}).catch(function(){
	})
				

	
	
	$('#addIdcard').on('click','.add',function(){
		$(this).next().click();
	});
	$('#addIdcard').on('change','input',function(){
		var file = $(this)[0].files[0];
		$scope.idcardBase64(URL.createObjectURL(file),1)
	});
	
	 $('#businesscard').on('click','.add',function(){
		$(this).next().click();
	});
	$('#businesscard').on('change','input',function(){
		var file = $(this)[0].files[0];
		$scope.idcardBase64(URL.createObjectURL(file),2)
	});
	
	//base64转url
	$scope.idcardBase64=function(url,index){
		if(index==1){
			var mycans = document.getElementById("idcardcans");
			var cxt = mycans.getContext("2d");
			var img = new Image();
			img.src = url;
			img.onload = function(){
				cxt.drawImage(img,0,0,mycans.width,mycans.height);	
				var base = mycans.toDataURL("image/png");
				//base64返回url
				var req={
						 method: 'POST',
						 url: $Factory.Server.upload.url,
						 headers: {
						   'Content-Type': 'application/json'
						 },
						 data:{path:'VCard',file:base}
				}
				
	
				//身份证				
				$http(req).then(function(resData){
					if(resData.data.error==0){
						$scope.userinfo.VCard=resData.data.url;
						$scope.userinfo.ShowVCard=resData.data.view;
					}
				}).catch(function(err){
					console.log(err)
				})
			
				return;
			}
			
		}else{
			var mycans = document.getElementById("businesscardcans");
			var cxt = mycans.getContext("2d");
			var img = new Image();
			img.src = url;
			img.onload = function(){
				cxt.drawImage(img,0,0,mycans.width,mycans.height);	
				var base = mycans.toDataURL("image/png");
				//base64返回url
				var req={
						 method: 'POST',
						 url: $Factory.Server.upload.url,
						 headers: {
						   'Content-Type': 'application/json'
						 },
						 data:{path:'BusinessCard',file:base}
				}
			
				//工作证
				$http(req).then(function(resData){
					if(resData.data.error==0){
						$scope.userinfo.BusinessCard=resData.data.url;
						$scope.userinfo.ShowBusinessCard=resData.data.view;
					}
				}).catch(function(err){
				})
			
				return;
			}
		}
		
		
		
		
	}
	
	
	
	//提交
	$scope.submit=function(){

//		$scope.submitdata="Name="+$scope.userinfo.Name+'&'+"Sex="+$scope.userinfo.Sex+'&'+"Phone="+$scope.userinfo.Phone+'&'+"WorkYears="+$scope.userinfo.WorkYears
//							+'&'+"AccountId="+$scope.userinfo.AccountId+'&'+"ShowImg="+$scope.userinfo.ShowImg+'&'+"Discription="+$scope.userinfo.Discription
//							+'&'+"Image="+$scope.userinfo.Image+'&'+"OutsideHouseRentSubscription="+$scope.userinfo.OutsideHouseRentSubscription+'&'+"OutsideHouseSubscription="+$scope.userinfo.OutsideHouseSubscription
//							+'&'+"VCard="+$scope.userinfo.Vcard+'&'+"ShowVcard="+$scope.userinfo.ShowVCard+'&'+"BusinessCard="+$scope.userinfo.BusinessCard
//							+'&'+"ShowBusinessCard="+$scope.userinfo.ShowBusinessCard+'&'+"BankTypes="+$scope.userinfo.BankTypes
//							+'&'+"BankType="+$scope.userinfo.BankType+'&'+"BankNum="+$scope.userinfo.BankNum+'&'+"VStatus="+$scope.userinfo.VStatus+'&'+"VStatusName="+$scope.userinfo.VStatusName
		//友盟统计
		Umeng.Analytics.logEvent({
		    eventId: 'ft_userCertify'
		}, function () {
		    
		}, function (reason) {
		
		});	
		
		var req = {
			 method: 'POST',
			 url: $Factory.User.save.url,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data:$scope.userinfo
		}
	
	
		$http(req).then(function(resData){
			
			if(resData.data.status==0){
				$state.go('tabs.renzhengmsg')
			}else{
				$ionicLoading.show({
						template:'提交失败，请重新登录后认证',
						duration:1500
				});
			}
		}).catch(function(err){
			$ionicLoading.show({
					template:'提交失败，请重新登录后认证',
					duration:1500
			});
		});

	}
})
