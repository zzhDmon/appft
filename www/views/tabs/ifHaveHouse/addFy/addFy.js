
angular.module('App').controller('AddFyCtl',function($ionicLoading,$ionicHistory,$timeout,$http,$Factory,$scope,$rootScope,$stateParams,$ionicPopover,$timeout){
	//是否缓存
	$rootScope.$on('$ionicView.beforeLeave',function(event,data){
		if(data.stateName=="tabs.fyfabu"){
			$scope.isCache=false;
		}else{
			$scope.isCache=true;
		}
		
	})

	$scope.back=function(){
		$ionicHistory.goBack();
	}
	
	$scope.title = $stateParams.title;
	$scope.headtitle = '二手房源'+$scope.title;
	$scope.id=$stateParams.id;
	
//	
//	$scope.$on('$ionicView.beforeEnter',function(event,data){
//		//console.log('离开'+data.stateName+'视图');
//		console.log(data)
//	})
	
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
        var afterAction = params.afterAction || function (){data, data2};//执行后的动作   参数1：选择的文字1； 参数2 选择的文字2 

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
//              $(evEle).attr('data-sel02', scText2);
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
		
		$scope.chaoxiang=resData.data.Bounds;
		$scope.chaoxiangarr=[]
		for(var i=0;i<$scope.chaoxiang.length;i++){
			$scope.chaoxiangarr.push($scope.chaoxiang[i].text)
		}	
	    $.scrEvent({
	      data: $scope.chaoxiangarr,   //数据
	      evEle: '.qu-chaoxiang',            //选择器
	      title: '请选择朝向',            // 标题
	      defValue: '东',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".qu-chaoxiang").val(data);
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
	        evEle: '.qu-louceng',
	        title: '楼层',
	        defValue: 1,
	        defValue2: 1,
	        eleName: '层 ',
	        eleTotal: '共',
	        eleNo:'第',
	        eleName2: '层',
	        afterAction: function (data1, data2) {
	          $('.qu-louceng').val(data1 + '/' + data2);
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
	        evEle: '.qu-fangxing',
	        title: '房型',
	        defValue: 1,
	        defValue2: 1,
	        defValue3: 1,
	        eleName: '室',
	        eleName2: '厅',
	        eleName3: '卫',
	        afterAction: function (data1, data2,data3) {
	          $('.qu-fangxing').val(data1 + '室' + data2 + '厅'+data3+'卫');
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
	      evEle: '.qu-leixing',            //选择器
	      title: '',            // 标题
	      defValue: '普通住宅',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".qu-leixing").val(data);
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
	      evEle: '.qu-zhuangxiu',            //选择器
	      title: '装修',            // 标题
	      defValue: '豪装',             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".qu-zhuangxiu").val(data);
	      }
	    });
	    
	    //年代
	    var niandai=resData.data.YearOptions;
	    var niandaiarr=[];
	    for(var i=0;i<niandai.length;i++){
			niandaiarr.push(niandai[i].text)
		}
	    $.scrEvent({
	      data:niandaiarr,   //数据
	      evEle: '.qu-niandai',            //选择器
	      title: '年代',            // 标题
	      defValue: 1995,             // 默认值
	      afterAction: function (data) {   //  点击确定按钮后,执行的动作
	        $(".qu-niandai").val(data);
	      }
	    });
	    
	    $scope.chooseList=resData.data.Specials;
	    
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
//				$rootScope.ershouxiaoqu=resData.data.house.CommunityName;
//				$rootScope.ershouxiaoquid=resData.data.house.CommunityId;
//				$rootScope.ershoutitle=resData.data.house.Title;
//				$rootScope.ershoudes=resData.data.house.Discription;
				$scope.TotalFloor=resData.data.house.TotalFloor;
				$scope.Floor=resData.data.house.Floor;
				$scope.RoomType=resData.data.house.RoomType;
				$scope.HallType=resData.data.house.HallType;
				$scope.BathType=resData.data.house.BathType;
				$timeout(function(){
					for(var i=0;i<resData.data.house.Special.length;i++){
						var num=resData.data.house.Special[i]*1-1;
						$scope.chooseList[num].isChecked=true;
					}	
				})
				$scope.publishdata={
					AccountId:resData.data.house.AccountId,
					Id:resData.data.house.Id,
					xiaoqu:resData.data.house.CommunityName,
					xiaoquid:resData.data.house.Id,
					number:resData.data.house.Number,
					price:resData.data.house.Price,
					area:resData.data.house.Space,
					fangxing:resData.data.house.RoomType+'室'+resData.data.house.HallType+'厅'+resData.data.house.BathType+'卫',
					louceng:resData.data.house.Floor+'/'+resData.data.house.TotalFloor,
					type:resData.data.house.BuildType,
					chaoxiang:resData.data.house.Orientation,
					zhuangxiu:resData.data.house.Fitment,
					year:resData.data.house.Year,
					special:resData.data.house.Special,
					IndoorImages:resData.data.house.IndoorImages,
					IndoorShowImages:resData.data.house.IndoorShowImages,
					LayoutImages:resData.data.house.LayoutImages,
					LayoutShowImages:resData.data.house.LayoutShowImages,
					title:resData.data.house.Title,
					des:resData.data.house.Discription
				}
//				$scope.chooseList=resData.data.house.Special
//				for(var i=0;i<resData.data.house.Special.length;i++){
//					var num=resData.data.house.Special[i]*1;
//					$scope.chooseList[num].isChecked=true;
//				}
			})
	}else{
		$scope.publishdata={
			AccountId:'',
			Id:'',
			xiaoqu:$rootScope.ershouxiaoqu,
			number:'',
			price:'',
			area:'',
			fangxing:'',
			louceng:'',
			type:'',
			chaoxiang:'',
			zhuangxiu:'',
			year:'',
			special:[],
			IndoorImages:[],
			IndoorShowImages:[],
			LayoutImages:[],
			LayoutShowImages:[],
			title:$rootScope.ershoutitle,
			des:$rootScope.ershoudes
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

	
	
	
		//室内图片获取
	    $('#chooseImg').on('click','img',function(){
			$(this).next().click();
		});
		$('#chooseImg').on('change','input',function(){
			var file = $(this)[0].files[0];
				$scope.changeBase64(URL.createObjectURL(file))
//			}
		});
		//室外图片获取
	    $('#chooseLayoutImg').on('click','img',function(){
			$(this).next().click();
		});
		$('#chooseLayoutImg').on('change','input',function(){
			var file = $(this)[0].files[0];
//			$scope.changeBase64(file)
			// 其实这里可以不用判断，因为 accept="image/*"
//			if (file.type.startsWith('image')) {
//				$(this).prev().attr('src',URL.createObjectURL(file))
				$scope.changeLayoutBase64(URL.createObjectURL(file))
//			}
		});
	
    
		
		
	
	    $scope.publish=function(){
	    	$scope.publishdata.xiaoqu=$scope.ershouxiaoqu
	    	$scope.publishdata.title=$scope.ershoutitle
	    	$scope.publishdata.des=$rootScope.ershoudes
	    	$scope.publishdata.year=$(".qu-niandai").val()
	    	$scope.publishdata.chaoxiang=$(".qu-chaoxiang").val()
	    	$scope.publishdata.fangxing=$(".qu-fangxing").val()
	    	$scope.publishdata.louceng=$(".qu-louceng").val()
	    	$scope.publishdata.type=$(".qu-leixing").val()
	    	$scope.publishdata.zhuangxiu=$(".qu-zhuangxiu").val()
	    	
	    	var obj=$('input[type="checkbox"]'); 
			//取到对象数组后，我们来循环检测它是不是被选中  
			$scope.publishdata.special=[];
			for(var i=0; i<obj.length; i++){ 
				if(obj[i].checked){
					$scope.publishdata.special.push(i+1); //如果选中，将value添加到变量s中
				} 
			} 
			//发布的信息$scope.publishdata
			//提交的信息
			$scope.Data={
				AccountId:$scope.publishdata.AccountId,
				Id:$scope.publishdata.Id,
				BathType:$scope.BathType,
				BuildType:$(".qu-leixing").val(),
				CommunityId:$rootScope.ershouxiaoquid,
				CommunityName:$rootScope.ershouxiaoqu,
				Configure:[],
				CreateTime:$scope.createtime,
				Discription:$rootScope.ershoudes,
				Fitment:$(".qu-zhuangxiu").val(),
				Floor:$scope.Floor,
				HallType:$scope.HallType,
				IndoorImages:$scope.publishdata.IndoorImages,
				IndoorShowImages:[],
				LayoutImages:$scope.publishdata.LayoutImages,
				LayoutShowImages:[],
				Number:$scope.publishdata.number,
				Orientation:$(".qu-chaoxiang").val(),
				PayType:'',
				Phone:localStorage.getItem('agentphone'),
				Price:$scope.publishdata.price,
				Recommend:'',
				RentType:'',
				RoomType:$scope.RoomType,
				Space:$scope.publishdata.area,
				Special:$scope.publishdata.special,
				Tags:'',
				Title:$rootScope.ershoutitle,
				TotalFloor:$scope.TotalFloor,
				Type:1,
				Year:$scope.publishdata.year
			}
			if($scope.Data.BathType==''||$scope.Data.BuildType==''||$scope.Data.Year==''||$scope.Data.CommunityName==''||$scope.Data.Discription==''||$scope.Data.IndoorImages.length<1||$scope.Data.Special.length<1||
			$scope.Data.Fitment==''||$scope.Data.Floor==''||$scope.Data.Number==''||$scope.Data.Orientation==''||$scope.Data.Price==''||$scope.Data.Space==''||$scope.Data.Title==''){
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
								'Content-Type': 'application/x-www-form-urlencoded'
							 },
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
