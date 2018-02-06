
angular.module('App').controller('addRentCtl',function($ionicLoading,$ionicHistory,$http,$Factory,$rootScope,$scope,$stateParams,$ionicPopover,$timeout){
	
	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	$scope.headtitle = '租房源新增';
	
	(function($){
    //如果有元素移除
    $('.sel-boxs').remove();
    $('body').append('<style>'+
                '.sel-boxs{display:none;}'+
                '.sel-boxs .bg{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:998;}'+
                '.sel-box{position:fixed;bottom:0;left:0;right:0;z-index:999;}'+
                '.sel-box .btn{background:white;overflow:hidden;}'+
                '.sel-box .btn1{overflow:hidden;width:70px;height:50px;float:left;padding:11px 12px;text-align:center;}'+
                '.sel-box .btn1 img{float:left;width:100%;height:100%;}'+
                '.sel-box .ok{float:right;color:#fda626;}'+
                '.sel-box .cancel{color:gray;}'+
                '.sel-box .name{color:rgb(0,0,0);text-align:center;line-height:22px;font-size:18px;padding:11px 0;}'+
                '.sel-con{background:white;}'+
                '.sel-con .border{height:34px;border:solid 1px gainsboro;border-width:1px 0;position:fixed;bottom:72px;left:0;right:0;pointer-events:none;}'+
                '.sel-con .table{display:table;width:100%;table-layout:fixed;}'+
                '.sel-con .cell{display:table-cell;vertical-align:middle;text-align:center;overflow:hidden;}'+
                '.sel-con .scroll{-webkit-overflow-scrolling:touch;height:180px;overflow:auto;box-sizing:border-box;padding:72px 0;width:200%;padding-right:100%;}'+
                '.sel-con .ele{font-size:16px;color:#b2b2b2;height:36px;line-height:36px;}'+
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
                    $(this).parents('.scroll')[0].scrollTop = $(this).index()*36;
                }
            });
            // 选择器滚动获取值和确认赋值
            var scText = defValue; // 默认值为默认值
            $('.sel-con .scroll').scroll(function(){
                var that = $(this);
                // 数值显示
                var scTop = $(this)[0].scrollTop+18;
                var scNum = Math.floor(scTop/36);
                scText = $(this).find('.ele').eq(scNum).text();
                // 停止锁定
                clearTimeout($(this).attr('timer'));
                $(this).attr('timer',setTimeout(function(){
                    that[0].scrollTop = scNum*36;
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


    // 封装说明：
    // 基于jQuery
    // 适合场景，只适用于两个值的选取模式
    $.scrEvent2 = function(params){

        var ele = params.data || [];        //数据
        var ele2 = params.data2 || [];      //数据
        var evEle = params.evEle;           //触发选择器
        var selName = params.title || '';   //标题
        var defValue = params.defValue || ele[0]; //首次默认值
        var defValue2 = params.defValue2 || ele2[0];//首次默认值
        var type = params.type || 'click'; //事件类型
        var eleName = params.eleName || '';  //第一个值的单位
        var eleName2 = params.eleName2 || '';  //第二个值的单位
        var eleNo = params.eleNo || '';  //第
        var eleTotal = params.eleTotal || '';  //共
        var beforeAction = params.beforeAction || function(){}; //执行前的动作  无参数
        var afterAction = params.afterAction || function (){data1, data2};//执行后的动作   参数1：选择的文字1； 参数2 选择的文字2 

        $(evEle).attr('readonly','readonly');
        eleName!=''?eleName = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleName+'</div>':eleName = '';
        eleNo!=''?eleNo = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleNo+'</div>':eleNo = '';
        eleName2!=''?eleName2 = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleName2+'</div>':eleName2 = '';
        eleTotal!=''?eleTotal = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleTotal+'</div>':eleTotal = '';
        
        $(evEle).on(type, function (){

            //由于IOS点击(tap)其他区域 input也不失去焦点的特性
            $('input, textarea').each(function(){
                this.blur();
            });

            $('.sel-boxs .bg')[0].addEventListener('touchmove', preDef, false);
            $('.sel-boxs .btn')[0].addEventListener('touchmove', preDef, false);
            beforeAction();
            $('.sel-con .table').html(eleNo+dataFrame(ele)+eleName+eleTotal+dataFrame(ele2)+eleName2);
            $('.sel-box .name').text(selName);
            $('.sel-boxs').show().find('.sel-box').removeClass('fadeInDown').addClass('fadeInUp');

            // 第一个值默认值
            $(evEle).val()==""?defValue = defValue:defValue= $(evEle).attr('data-sel01');
            // 第二个值默认值
            $(evEle).val()==""?defValue2 = defValue2:defValue2=$(evEle).attr('data-sel02');

            $('.sel-con').find('.elem').eq(0).find('.ele').each(function(){
                if($(this).text()==defValue){
                    $(this).parents('.scroll')[0].scrollTop = $(this).index()*36;
                }
            });
            // 第二个值默认值
            $('.sel-con').find('.elem').eq(1).find('.ele').each(function(){
                if($(this).text()==defValue2){
                    $(this).parents('.scroll')[0].scrollTop = $(this).index()*36;
                }
            });
            // 选择器滚动获取值和确认赋值
            var scText = ele[0]; // 默认值为数组第一个值
            var scText2 = ele2[0]; // 默认值为数组第二个值
            $('.sel-con .scroll').scroll(function(){
                var that = $(this);
                // 数值显示
                var scTop = $(this)[0].scrollTop+18;
                var scNum = Math.floor(scTop/36);
                if($(this).parents('.elem').index()==1){
                    scText = $(this).find('.ele').eq(scNum).text();
                }else{
                    scText2 = $(this).find('.ele').eq(scNum).text();
                };
                // 停止锁定
                clearTimeout($(this).attr('timer'));
                $(this).attr('timer',setTimeout(function(){
                    that[0].scrollTop = scNum*36;
                },100));
            });

            //移除之前的绑定事件
            $(".sel-box .ok").off();
            // 确认选择
            $('.sel-box .ok').click(function(){
                $(evEle).attr('data-sel01', scText);
                $(evEle).attr('data-sel02', scText2);
                afterAction(scText, scText2);

                $('.sel-boxs').find('.sel-box').removeClass('fadeInUp').addClass('fadeInDown');
                setTimeout(function(){
                  $('.sel-boxs').hide();
                },300);
                
                $('.sel-boxs .bg')[0].removeEventListener('touchmove', preDef, false);
                $('.sel-boxs .btn')[0].removeEventListener('touchmove', preDef, false);
            });   
        });
    };


    // 封装说明：
    // 基于jQuery
    // 适合场景，只适用于三个值的选取模式
    $.scrEvent3 = function(params){

        var ele = params.data || [];        //数据
        var ele2 = params.data2 || [];      //数据
        var ele3 = params.data3 || [];      //数据
        var evEle = params.evEle;           //触发选择器
        var selName = params.title || '';   //标题
        var defValue = params.defValue || ele[0]; //首次默认值
        var defValue2 = params.defValue2 || ele2[0];//首次默认值
        var defValue3 = params.defValue3 || ele3[0];//首次默认值
        var type = params.type || 'click'; //事件类型
        var eleName = params.eleName || '';  //第一个值的单位
        var eleName2 = params.eleName2 || '';  //第二个值的单位
        var eleName3 = params.eleName3 || '';  //第三个值的单位
        var beforeAction = params.beforeAction || function(){}; //执行前的动作  无参数
        var afterAction = params.afterAction || function (){data1,data2,data3};//执行后的动作   参数1：选择的文字1； 参数2 选择的文字2 

        $(evEle).attr('readonly','readonly');
        eleName!=''?eleName = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleName+'</div>':eleName = '';
        eleName2!=''?eleName2 = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleName2+'</div>':eleName2 = '';
        eleName3!=''?eleName3 = '<div class="cell" style="font-size:14px;color:#b2b2b2;">'+eleName3+'</div>':eleName3 = '';
        
        $(evEle).on(type, function (){

            //由于IOS点击(tap)其他区域 input也不失去焦点的特性
            $('input, textarea').each(function(){
                this.blur();
            });

            $('.sel-boxs .bg')[0].addEventListener('touchmove', preDef, false);
            $('.sel-boxs .btn')[0].addEventListener('touchmove', preDef, false);
            beforeAction();
            $('.sel-con .table').html(dataFrame(ele)+eleName+dataFrame(ele2)+eleName2+dataFrame(ele3)+eleName3);
            $('.sel-box .name').text(selName);
            $('.sel-boxs').show().find('.sel-box').removeClass('fadeInDown').addClass('fadeInUp');

            // 第一个值默认值
            $(evEle).val()==""?defValue = defValue:defValue= $(evEle).attr('data-sel01');
            // 第二个值默认值
            $(evEle).val()==""?defValue2 = defValue2:defValue2=$(evEle).attr('data-sel02');
            // 第二个值默认值
            $(evEle).val()==""?defValue3 = defValue3:defValue3=$(evEle).attr('data-sel03');

            $('.sel-con').find('.elem').eq(0).find('.ele').each(function(){
                if($(this).text()==defValue){
                    $(this).parents('.scroll')[0].scrollTop = $(this).index()*36;
                }
            });
            // 第二个值默认值
            $('.sel-con').find('.elem').eq(1).find('.ele').each(function(){
                if($(this).text()==defValue2){
                    $(this).parents('.scroll')[0].scrollTop = $(this).index()*36;
                }
            });
            // 第三个值默认值
            $('.sel-con').find('.elem').eq(2).find('.ele').each(function(){
                if($(this).text()==defValue3){
                    $(this).parents('.scroll')[0].scrollTop = $(this).index()*36;
                }
            });
            // 选择器滚动获取值和确认赋值
            var scText = ele[0]; // 默认值为数组第一个值
            var scText2 = ele2[0]; // 默认值为数组第二个值
            var scText3 = ele3[0]; // 默认值为数组第三个值
            $('.sel-con .scroll').scroll(function(){
                var that = $(this);
                // 数值显示
                var scTop = $(this)[0].scrollTop+18;
                var scNum = Math.floor(scTop/36);
                if($(this).parents('.elem').index()==0){
                    scText = $(this).find('.ele').eq(scNum).text();
                }else if($(this).parents('.elem').index()==2){
                    scText2 = $(this).find('.ele').eq(scNum).text();
                }else{
                	 scText3 = $(this).find('.ele').eq(scNum).text();
                };
                // 停止锁定
                clearTimeout($(this).attr('timer'));
                $(this).attr('timer',setTimeout(function(){
                    that[0].scrollTop = scNum*36;
                },100));
            });

            //移除之前的绑定事件
            $(".sel-box .ok").off();
            // 确认选择
            $('.sel-box .ok').click(function(){
                $(evEle).attr('data-sel01', scText);
                $(evEle).attr('data-sel02', scText2);
                $(evEle).attr('data-sel03', scText3);
                afterAction(scText, scText2,scText3);

                $('.sel-boxs').find('.sel-box').removeClass('fadeInUp').addClass('fadeInDown');
                setTimeout(function(){
                  $('.sel-boxs').hide();
                },300);
                
                $('.sel-boxs .bg')[0].removeEventListener('touchmove', preDef, false);
                $('.sel-boxs .btn')[0].removeEventListener('touchmove', preDef, false);
            });   
        });
    };

})($);

	$http.get($Factory.Server.hjson.url).then(function(resData){
		//租房方式
		var zufang=resData.data.RentTypes;
		var zufangarr=[];
		for(var i=0;i<zufang.length;i++){
			zufangarr.push(zufang[i].text)
		}
	    $.scrEvent({
	      data: zufangarr,   //数据
	      evEle: '.zf-zufang',            //选择器
	      title: '租房方式',            // 标题
	      defValue: '整租',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".zf-zufang").val(data);
	      }
	    });

	     //付款方式
	    var fukuang=resData.data.PayTypes;
		var fukuangarr=[];
		for(var i=0;i<fukuang.length;i++){
			fukuangarr.push(fukuang[i].text)
		}
	    $.scrEvent({
	      data: fukuangarr,   //数据
	      evEle: '.zf-fukuang',            //选择器
	      title: '付款方式',            // 标题
	      defValue: '押1付1',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".zf-fukuang").val(data);
	      }
	    });
		//朝向
		var chaoxiang=resData.data.Bounds;
		var chaoxiangarr=[]
		for(var i=0;i<chaoxiang.length;i++){
			chaoxiangarr.push(chaoxiang[i].text)
		}	
	    $.scrEvent({
	      data: chaoxiangarr,   //数据
	      evEle: '.zf-chaoxiang',            //选择器
	      title: '请选择朝向',            // 标题
	      defValue: '东',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".zf-chaoxiang").val(data);
	      }
	    });
	    
	    //楼层
	    var louceng=resData.data.FloorOptions;
		var loucengarr=[]
		for(var i=0;i<louceng.length;i++){
			loucengarr.push(louceng[i].text)
		}
		$.scrEvent2({
	        data: loucengarr,
	        data2: loucengarr,
	        evEle: '.zf-louceng',
	        title: '楼层',
	        defValue: 1,
	        defValue2: 1,
	        eleName: '层 ',
	        eleTotal: '共',
	        eleNo:'第',
	        eleName2: '层',
	        afterAction: function (data1, data2) {
	          $('.zf-louceng').val(data1 + '/' + data2);
	          $scope.TotalFloor=data2;
	          $scope.Floor=data1;
	        }
	    });
	    
	    //房型
	    var fangxing=resData.data.RoomTypes.customData;
	    var shi=fangxing.y;
	    var ting=fangxing.m;
	    var wei=fangxing.d;
	    var shiarr=[]
	    var tingarr=[]
	    var weiarr=[]
	    for(var i=0;i<shi.length;i++){
			shiarr.push(shi[i].text)
		}
	    for(var i=0;i<ting.length;i++){
			tingarr.push(ting[i].text)
		}
	    for(var i=0;i<wei.length;i++){
			weiarr.push(wei[i].text)
		}
	    $.scrEvent3({
	        data: shiarr,
	        data2: tingarr,
	        data3: weiarr,
	        evEle: '.zf-fangxing',
	        title: '房型',
	        defValue: 1,
	        defValue2: 1,
	        defValue3: 1,
	        eleName: '室',
	        eleName2: '厅',
	        eleName3: '卫',
	        afterAction: function (data1, data2,data3) {
	          $('.zf-fangxing').val(data1 + '室' + data2 + '厅'+data3+'卫');
	          $scope.RoomType=data1;
	          $scope.HallType=data2;
	          $scope.BathType=data3;
	        }
	    });
	    
	    
	    //类型
	    var leixing=resData.data.BuildingTypes;
	    var leixingarr=[];
	    for(var i=0;i<leixing.length;i++){
			leixingarr.push(leixing[i].text)
		}
	    $.scrEvent({
	      data: leixingarr,   //数据
	      evEle: '.zf-leixing',            //选择器
	      title: '',            // 标题
	      defValue: '普通住宅',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".zf-leixing").val(data);
	      }
	    });
	    
	    //装修
	    var zhuangxiu=resData.data.Fitments;
	    var zhuangxiuarr=[];
	    for(var i=0;i<zhuangxiu.length;i++){
			zhuangxiuarr.push(zhuangxiu[i].text)
		}
	    $.scrEvent({
	      data: zhuangxiuarr,   //数据
	      evEle: '.zf-zhuangxiu',            //选择器
	      title: '装修',            // 标题
	      defValue: '豪装',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".zf-zhuangxiu").val(data);
	      }
	    });
	    
	   
	    
		//special
	    $scope.devList=resData.data.Configures;
		console.log($scope.devList)
	})

	$scope.createtime=function(){
			var day=new Date();
			var year=day.getFullYear();
			var month=day.getMonth()+1;
			var date=day.getDate();
			var hour=day.getHours();
			var minute=day.getMinutes();
			var second=day.getSeconds();
			return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second;
		}
	
	if($scope.title=='修改'){
		$http.get($Factory.HouseSource.detail.url,{params:{id:$scope.id}}).then(function(resData){
//				$rootScope.zufangxiaoqu=resData.data.house.CommunityName;
//				$rootScope.zufangxiaoquid=resData.data.house.CommunityId;
//				$rootScope.zufangtitle=resData.data.house.Title;
//				$rootScope.zufangdes=resData.data.house.Discription;
				$scope.TotalFloor=resData.data.house.TotalFloor;
				$scope.Floor=resData.data.house.Floor;
				$scope.RoomType=resData.data.house.RoomType;
				$scope.HallType=resData.data.house.HallType;
				$scope.BathType=resData.data.house.BathType;
				$timeout(function(){
					for(var i=0;i<resData.data.house.Configure.length;i++){
						var num=resData.data.house.Configure[i]*1-1;
						$scope.devList[num].isChecked=true;
					}
					
				})
				
				$scope.publishdata={
					AccountId:resData.data.house.AccountId,
					Id:resData.data.house.Id,
					xiaoqu:resData.data.house.CommunityName,
					xiaoquid:resData.data.house.Id,
					zufang:resData.data.house.RentType,
					zujin:resData.data.house.Price,
					area:resData.data.house.Space,
					fangxing:resData.data.house.RoomType+'室'+resData.data.house.HallType+'厅'+resData.data.house.BathType+'卫',
					louceng:resData.data.house.Floor+'/'+resData.data.house.TotalFloor,
					type:resData.data.house.BuildType,
					chaoxiang:resData.data.house.Orientation,
					zhuangxiu:resData.data.house.Fitment,
					peizhi:resData.data.house.Configure,
//					peizhi:$scope.chooseList,
					pay:resData.data.house.PayType,
					special:resData.data.house.Special,
					IndoorImages:resData.data.house.IndoorImages,
					IndoorShowImages:resData.data.house.IndoorShowImages,
					LayoutImages:resData.data.house.LayoutImages,
					LayoutShowImages:resData.data.house.LayoutShowImages,
					title:resData.data.house.Title,
					des:resData.data.house.Discription
				}
				
			})
	}else{
		$scope.publishdata={
			AccountId:'',
			Id:'',
			xiaoqu:$rootScope.ershouxiaoqu,
			zujin:'',
			zufang:'',
			area:'',
			fangxing:'',
			louceng:'',
			type:'',
			chaoxiang:'',
			zhuangxiu:'',
			pay:'',
			peizhi:[],
			IndoorImages:[],
			IndoorShowImages:[],
			LayoutImages:[],
			LayoutShowImages:[],
			title:$rootScope.zufangtitle,
			des:$rootScope.zufangdes
		}
	}

		//base64转url
	$scope.changeBase64=function(url){
		var mycans = document.getElementById("mycans");
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
					 data:{path:'HouseSource',file:base}
				}
				$http(req).then(function(resData){
					if(resData.data.error==0){
						$scope.publishdata.IndoorImages.push(resData.data.url)
						$scope.publishdata.IndoorShowImages.push(resData.data.view);
					}
				})
				return;
		}
	}
	//base64转url
	$scope.changeLayoutBase64=function(url){
		var mycans = document.getElementById("mycans");
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
					 data:{path:'HouseSource',file:base}
			}
				$http(req).then(function(resData){
					if(resData.data.error==0){
						$scope.publishdata.LayoutImages.push(resData.data.url)
						$scope.publishdata.LayoutShowImages.push(resData.data.view);
					}
				})
				return;
		}
	}
	
	//点击叉号去除
	$scope.remove=function(index){
		$scope.publishdata.IndoorImages.splice(index,1)
		$scope.publishdata.IndoorShowImages.splice(index,1);
	}
	$scope.removelayout=function(index){
		$scope.publishdata.LayoutImages.splice(index,1)
		$scope.publishdata.LayoutShowImages.splice(index,1);
	}
	
		//图片获取
	    $('#zufangchooseImg').on('click','img',function(){
			$(this).next().click();
		});
		$('#zufangchooseImg').on('change','input',function(){
			var file = $(this)[0].files[0];
//			$scope.changeBase64(file)
			// 其实这里可以不用判断，因为 accept="image/*"
//			if (file.type.startsWith('image')) {
				$scope.changeBase64(URL.createObjectURL(file))
//			}
		});
		//室外图片获取
	    $('#zufangchooseLayoutImg').on('click','img',function(){
			$(this).next().click();
		});
		$('#zufangchooseLayoutImg').on('change','input',function(){
			var file = $(this)[0].files[0];
			$scope.changeLayoutBase64(URL.createObjectURL(file))
		});
			
		
		$scope.publish=function(){
	    	$scope.publishdata.xiaoqu=$scope.zufangxiaoqu
	    	$scope.publishdata.title=$scope.zufangtitle
	    	$scope.publishdata.des=$rootScope.zufangdes
	    	$scope.publishdata.zufang=$(".zf-zufang").val()
	    	$scope.publishdata.pay=$(".zf-fukuang").val()
	    	$scope.publishdata.chaoxiang=$(".zf-chaoxiang").val()
	    	$scope.publishdata.fangxing=$(".zf-fangxing").val()
	    	$scope.publishdata.louceng=$(".zf-louceng").val()
	    	$scope.publishdata.type=$(".zf-leixing").val()
	    	$scope.publishdata.zhuangxiu=$(".zf-zhuangxiu").val()
	    	
	    	var obj=$('input[type="checkbox"]'); 
	    	$scope.publishdata.peizhi=[];
			for(var i=0; i<obj.length; i++){ 
				if(obj[i].checked){
					$scope.publishdata.peizhi.push(i+1); //如果选中，将value添加到变量s中
				} 
			} 
			
			//发布的信息$scope.publishdata
			//提交的信息
			$scope.Data={
				AccountId:$scope.publishdata.AccountId,
				Id:$scope.publishdata.Id,
				BathType:$scope.BathType,
				BuildType:$(".zf-leixing").val(),
				CommunityId:$rootScope.zufangxiaoquid,
				CommunityName:$rootScope.zufangxiaoqu,
				Configure:$scope.publishdata.peizhi,
				CreateTime:$scope.createtime,
				Discription:$rootScope.zufangdes,
				Fitment:$(".zf-zhuangxiu").val(),
				Floor:$scope.Floor,
				HallType:$scope.HallType,
				IndoorImages:$scope.publishdata.IndoorImages,
				IndoorShowImages:$scope.publishdata.IndoorShowImages,
				LayoutImages:$scope.publishdata.LayoutImages,
				LayoutShowImages:$scope.publishdata.LayoutShowImages,
				Number:$scope.publishdata.number,
				Orientation:$(".zf-chaoxiang").val(),
				PayType:$(".zf-fukuang").val(),
				Phone:localStorage.getItem('agentphone'),
				Price:$scope.publishdata.zujin,
				Recommend:'',
				RentType:$(".zf-zufang").val(),
				RoomType:$scope.RoomType,
				Space:$scope.publishdata.area,
				Special:'',
				Tags:'',
				Title:$rootScope.zufangtitle,
				TotalFloor:$scope.TotalFloor,
				Type:2,
				Year:''
			}
			if($scope.Data.BathType==''||$scope.Data.BuildType==''||$scope.Data.RentType==''||$scope.Data.CommunityName==''||$scope.Data.Discription==''||$scope.Data.IndoorImages.length<1||$scope.Data.Configure.length<1||
			$scope.Data.Fitment==''||$scope.Data.Floor==''||$scope.Data.PayType==''||$scope.Data.Orientation==''||$scope.Data.Price==''||$scope.Data.Space==''||$scope.Data.Title==''){
				$ionicLoading.show({
								template:'除房型图其他为必填',
								duration:1000
					});
			}else{
				var req = {
				 method: 'POST',
				 url: $Factory.HouseSource.save.url,
				 headers: {
				   'Content-Type': 'application/json'
				 },
				 data: $scope.Data
				}
			
				$http(req).then(function(resData){
					if(resData.data.status==0){
						$rootScope.ershouxiaoquid='';
						$rootScope.ershouxiaoqu='';
						$rootScope.ershoudes='';
						$rootScope.ershoutitle='';
						
						//添加积分
						var req = {
							 method: 'POST',
							 url: $Factory.Score.add.url,
							 headers: {
					//			'Content-Type': 'application/json'
								'Content-Type': 'application/x-www-form-urlencoded'
							 },
					//		 data: {actId:$scope.uid}
							 data: "actId="+11
							}
						$http(req).then(function(resData){
							
						})
						$timeout(function(){
							$ionicHistory.goBack()
						},1000)
						$ionicLoading.show({
								template:resData.data.msg,
								duration:1000
						});
					
					}
				},function(resData){
					$ionicLoading.show({
								template:'新增房源失败',
								duration:1000
					});
				})	
				
			}
			
			
			
			
	    }
 	
    	  	
			
})
