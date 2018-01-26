angular.module('App').controller('CreatecliCtr',function($ionicTabsDelegate,$timeout,$stateParams,$ionicPlatform,$ionicModal,$ionicScrollDelegate,$rootScope,$ionicHistory,$Factory,$scope,$http,$ionicLoading,$ionicSideMenuDelegate,$ionicSlideBoxDelegate){
	
	// 点击返回取消编辑
	$scope.closeselfmodal=function(){
		$('.selfbackdrop').css('display','none');
		$('.selfmodal').css('display','none');
	}
	$scope.back=function(){
		$('.selfbackdrop').css('display','block');
		$('.selfmodal').css('display','block');
	}
	$scope.giveUp=function(){
		$scope.closeselfmodal();
		$ionicHistory.goBack();
	}
	$scope.continue=function(){
		$scope.closeselfmodal();
	}
	$scope.$watch('showSelfModal',function(){
		if($rootScope.showSelfModal){
			$scope.back();
			$rootScope.showSelfModal=false;
		}
	})
   

   window.addEventListener('native.keyboardshow',function(e){
   		$('#createcli .save').css('display','none');
   })
   window.addEventListener('native.keyboardhide',function(e){
   		$('#createcli .save').css('display','block');
   })

	


//(function($){
$scope.useful=function(){
    //如果有元素移除
    $('.sel-boxs').remove();
    $('body').append('<style>'+
                '.sel-boxs{display:none;}'+
                '.sel-boxs .bg{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.2);z-index:998;}'+
                '.sel-clibox{width:80%;position:fixed;bottom:30%;left:10%;right:0;z-index:999;background:rgb(255,255,255);}'+
                '.sel-clibox .tit{border-radius:10px 10px 0 0;background:white;overflow:hidden;width:100%;height:50px;line-height:50px;position:absolute;top:0;left:0;z-index:1000;text-align:center;font-size:16px;color:#333;border-bottom:1px solid #f2f2f2;}'+
                '.sel-clibox .btn{background:white;overflow:hidden;height:50%}'+
                '.sel-clibox .btn1{overflow:hidden;width:100%;height:50px;line-height:50px;text-align:center;font-size: 16px;background-color:#f2f2f2;color: rgb(65,160,255);}'+
//              '.sel-box .btn1 img{float:left;width:100%;height:100%;}'+
//              '.sel-box .ok{float:right;color:#fda626;}'+
                '.sel-clibox .cancel{color:gray;}'+
                '.sel-clibox .name{color:rgb(0,0,0);text-align:center;line-height:22px;font-size:18px;padding:11px 0;}'+
                '.sel-clicon{background:white;padding:0 12px 0;}'+
                '.sel-con .border{width:100%;height:34px;border:solid 1px gainsboro;border-width:1px 0;position:fixed;bottom:72px;left:0;right:0;pointer-events:none;}'+
                '.sel-con .table{display:table;width:100%;table-layout:fixed;}'+
                '.sel-con .cell{position:relative;display:table-cell;vertical-align:middle;text-align:center;overflow:hidden;}'+
                '.sel-con .scroll{-webkit-overflow-scrolling:touch;height:180px;overflow:auto;box-sizing:border-box;padding:72px 0;width:200%;padding-right:100%;}'+
                '.sel-con .cell .borderbot{width:100%;height:0;position:absolute;bottom:72px;border-bottom:1px solid rgb(230,230,230);}'+
                '.sel-con .ele{font-size:16px;color:#666666;height:36px;line-height:36px;}'+
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
                '   <div class="sel-clibox animated fadeInUp">'+
                '       <div class="tit">设置户型要求</div>'+
                '       <div class="sel-con">'+
//              '           <div class="border"></div>'+
                '           <div class="table"></div>'+
                '       </div>'+
                '       <div class="btn">'+
                '           <div class="btn1 ok">确定</div>'+
//              '           <div class="btn1 cancel">取消</div>'+
                '       </div>'+
                '   </div>'+
                '</div>');
	
    // 取消选择
    $('.sel-clibox .cancel,.sel-boxs .bg').click(function(){
    
        $('.sel-boxs .bg')[0].removeEventListener('touchmove', preDef, false);
        $('.sel-boxs .btn')[0].removeEventListener('touchmove', preDef, false);
        $('.sel-boxs').find('.sel-clibox').removeClass('fadeInUp').addClass('fadeInDown');
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
        return '<div class="cell elem"><div class="scroll">'+eleText+'</div>'+'<div class="borderbot"></div>'+'</div>';
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
            $('.sel-clibox .name').text(selName);
            $('.sel-boxs').show().find('.sel-clibox').removeClass('fadeInDown').addClass('fadeInUp');

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
                    //选到字体变大
                    $(this).find('.ele').eq(scNum).css({
	                	'color':'rgb(65,160,255)',
	                	'font-size':18
	                	});
                    $(this).find('.ele').eq(scNum).siblings().css({
	                	'color':'#666666',
                		'font-size':16
	                	});
                }else if($(this).parents('.elem').index()==2){
                    scText2 = $(this).find('.ele').eq(scNum).text();
                    //选到字体变大
                    $(this).find('.ele').eq(scNum).css({
	                	'color':'rgb(65,160,255)',
	                	'font-size':18
	                	});
                    $(this).find('.ele').eq(scNum).siblings().css({
	                	'color':'#666666',
                		'font-size':16
	                	});
                }else{
                	 scText3 = $(this).find('.ele').eq(scNum).text();
                	 //选到字体变大
                    $(this).find('.ele').eq(scNum).css({
	                	'color':'rgb(65,160,255)',
	                	'font-size':18
	                	});
                    $(this).find('.ele').eq(scNum).siblings().css({
	                	'color':'#666666',
                		'font-size':16
	                	});
                };
                
                // 停止锁定
                clearTimeout($(this).attr('timer'));
                $(this).attr('timer',setTimeout(function(){
                    that[0].scrollTop = scNum*36;
                },100));
            });

            //移除之前的绑定事件
            $(".sel-clibox .ok").off();
            // 确认选择
            $('.sel-clibox .ok').click(function(){
                $(evEle).attr('data-sel01', scText);
                $(evEle).attr('data-sel02', scText2);
                $(evEle).attr('data-sel03', scText3);
                afterAction(scText, scText2,scText3);

                $('.sel-boxs').find('.sel-clibox').removeClass('fadeInUp').addClass('fadeInDown');
                setTimeout(function(){
                  $('.sel-boxs').hide();
                },300);
                
                $('.sel-boxs .bg')[0].removeEventListener('touchmove', preDef, false);
                $('.sel-boxs .btn')[0].removeEventListener('touchmove', preDef, false);
            });   
        });
    };
};
//})($);

	    
$scope.useful()
$scope.showchoosefx=function($index){
	$scope.keyindex = $index;
	$.scrEvent3({
	    data: ["不限",1,2,3,4,5,6,7,8,9],
	    data2: ["不限",1,2,3,4,5,6,7,8,9],
	    data3: ["不限",1,2,3,4,5,6,7,8,9],
	    evEle: '.creatcli-fangxing',
	    title: '房型',
	    defValue: $scope.submitData.RoomType,
	    defValue2: $scope.submitData.HallType,
	    defValue3: $scope.submitData.BathType,
	    eleName: '室',
	    eleName2: '厅',
	    eleName3: '卫',
	    afterAction: function (data1, data2,data3) {
	    	if(data1=="不限"&&data2=="不限"&&data3=="不限"){
	    		$('.creatcli-fangxing+input').val("不限"); 
				$scope.itemList[$scope.keyindex].value = "不限";
				$scope.submitData.RoomType=0;
				$scope.submitData.HallType=0;
				$scope.submitData.BathType=0;
	    	}else if(data1=="不限"&&data2=="不限"){
	    		$('.creatcli-fangxing+input').val(data3+'卫');  
				$scope.itemList[$scope.keyindex].value =data3+'卫';
				$scope.submitData.RoomType=0;
				$scope.submitData.HallType=0;
				$scope.submitData.BathType=data3*1;
	    	}else if(data1=="不限"&&data3=="不限"){
	    		$('.creatcli-fangxing+input').val(data2 + '厅');
				$scope.itemList[$scope.keyindex].value = data2 + '厅';
				$scope.submitData.RoomType=0;
				$scope.submitData.HallType=data2*1;
				$scope.submitData.BathType=0;
	    	}else if(data2=="不限"&&data3=="不限"){
	    		$('.creatcli-fangxing+input').val(data1 + '室');
				$scope.itemList[$scope.keyindex].value = data1 + '室';
				$scope.submitData.RoomType=data1*1;
				$scope.submitData.HallType=0;
				$scope.submitData.BathType=0;
	    	}else if(data1=="不限"){
	    		$('.creatcli-fangxing+input').val(data2 + '厅'+data3+'卫');  
				$scope.itemList[$scope.keyindex].value =data2 + '厅'+data3+'卫';
				$scope.submitData.RoomType=0;
				$scope.submitData.HallType=data2*1;
				$scope.submitData.BathType=data3*1;
	    	}else if(data3=="不限"){
	    		$('.creatcli-fangxing+input').val(data1 + '室'+data2 + '厅');
				$scope.itemList[$scope.keyindex].value = data1 + '室'+data2 + '厅';
				$scope.submitData.RoomType=data1*1;
				$scope.submitData.HallType=data2*1;
				$scope.submitData.BathType=0;
	    	}else if(data2=="不限"){
	    		$('.creatcli-fangxing+input').val(data1 + '室'+data3+'卫');
				$scope.itemList[$scope.keyindex].value = data1 + '室'+data3+'卫';
				$scope.submitData.RoomType=data1*1;
				$scope.submitData.HallType=0;
				$scope.submitData.BathType=data3+1;
	    	}else{
	    		$('.creatcli-fangxing+input').val(data1 + '室'+ data2 + '厅'+data3+'卫');
				$scope.itemList[$scope.keyindex].value =data1 + '室'+ data2 + '厅'+data3+'卫';
				$scope.submitData.RoomType=data1*1;
				$scope.submitData.HallType=data2*1;
				$scope.submitData.BathType=data3*1;
	    	}
	    }
	});
}




	$ionicModal.fromTemplateUrl('createcli-modal', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  
	  //控制显示模态框内容
	  //"心理价位","住房面积","装修要求","房屋结构","楼层高度","户型要求"
	  $scope.openModal = function(index,$index,key) {
	  	$scope.showmsg=false;
	    $scope.modal.show();
	    if(index == 1){
	    	$scope.showkey=true;
	    	$scope.keyindex = $index;	
	    	$scope.toubutit = "选择要补充的客户需求"
	    }else{
	    	$scope.keyindex = $index;	 
	    	$scope.showkey=false;
	    	switch ($scope.itemList[$scope.keyindex].key)
						{
						case '心理价位':
						  $scope.valueList = ["心理价位","住房面积","装修要求","房屋结构","楼层高度","户型要求"];
						  $scope.toubutit = "设置" + $scope.itemList[$scope.keyindex].key;
						  $scope.modalheight=true;
						 break;
						case '住房面积':
						  $scope.valueList = ["小户型 小于70平米","中等户型 80-105平米","大户型 大于120平米"];
						  $scope.toubutit = "设置" + $scope.itemList[$scope.keyindex].key;
						  $scope.modalheight=false;
						  break;
						case '装修要求':
						  $scope.valueList = ["毛坯房","简装","精装修","豪华"];
						  $scope.toubutit = "设置" + $scope.itemList[$scope.keyindex].key;
						  $scope.modalheight=false;
						  break;
						case '房屋结构':
						  $scope.valueList = ["单层","多层","小高层","复式","独栋","双拼或联排"];
						  $scope.toubutit = "设置" + $scope.itemList[$scope.keyindex].key;
						  $scope.modalheight=false;
						  break;
						case '楼层高度':
						  $scope.valueList = ["低楼层","中间楼层","高楼层"];
						  $scope.toubutit = "设置" + $scope.itemList[$scope.keyindex].key;
						  $scope.modalheight=false;
						  break;
						case '户型要求':
						  $scope.valueList = ["心理价位","住房面积","装修要求","房屋结构","楼层高度","户型要求"];
						  $scope.toubutit = "设置" + $scope.itemList[$scope.keyindex].key;
						  $scope.modalheight=true;
						  break;
						default:
						  $scope.valueList = ["请先选择你的需求"];
						  $scope.toubutit = "";
						  $scope.modalheight=false;
						}
	    }
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	 
	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });
	  
	  $scope.$on('modal.hidden', function() {
	    
	  });
	  
	  $scope.$on('modal.removed', function() {
	   
	  });
	
	
	//修改或新增
	if($stateParams.id>=0){
		$scope.Title="修改客户";
		$scope.itemList=[]
		$http.get($Factory.Client.get.url,{params:{id:$stateParams.id }}).then(function(resData) {
				$scope.submitData = resData.data;
				
				//其他需求详情
				switch (resData.data.SpaceType)
						{
						case 1:
						  $scope.itemList.push({key:"住房面积",value:"小户型 小于70平米",data:1})
						  break;
						case 2:
						  $scope.itemList.push({key:"住房面积",value:"中等户型 80-105平米",data:2})
						  break;
						case 3:
						  $scope.itemList.push({key:"住房面积",value:"大户型 大于120平米",data:3})
						  break;
						default:
						}
				switch (resData.data.Fitment)
						{
						case 1:
						  $scope.itemList.push({key:"装修要求",value:"毛坯房",data:1})
						  break;
						case 2:
						  $scope.itemList.push({key:"装修要求",value:"简装",data:2})
						  break;
						case 3:
						  $scope.itemList.push({key:"装修要求",value:"精装修",data:3})
						  break;
						case 4:
						  $scope.itemList.push({key:"装修要求",value:"豪华",data:4})
						  break;
						default:
						}
				switch (resData.data.BuildType)
						{
						case 1:
						  $scope.itemList.push({key:"房屋结构",value:"单层",data:1})
						  break;
						case 2:
						  $scope.itemList.push({key:"房屋结构",value:"多层",data:2})
						  break;
						case 3:
						  $scope.itemList.push({key:"房屋结构",value:"小高层",data:3})
						  break;
						case 4:
						  $scope.itemList.push({key:"房屋结构",value:"复式",data:4})
						  break;
						case 5:
						  $scope.itemList.push({key:"房屋结构",value:"独栋",data:5})
						  break;
						case 6:
						  $scope.itemList.push({key:"房屋结构",value:"双拼或联排",data:6})
						  break;
						default:
						}
				switch (resData.data.Floor)
						{
						case 1:
						  $scope.itemList.push({key:"楼层高度",value:"低楼层",data:1})
						  break;
						case 2:
						  $scope.itemList.push({key:"楼层高度",value:"中间楼层",data:2})
						  break;
						case 3:
						  $scope.itemList.push({key:"楼层高度",value:"高楼层",data:3})
						  break;
						default:
						}
						
				//户型
				if(resData.data.RoomType>0&&resData.data.HallType>0&&resData.data.BathType>0){
		    		$scope.itemList.push({key:"户型要求",value:resData.data.RoomType+"室"+resData.data.HallType+"厅"+resData.data.BathType+"卫",data:""})
		    	}else if(resData.data.HallType>0&&resData.data.BathType>0){
		    		$scope.itemList.push({key:"户型要求",value:resData.data.HallType+"厅"+resData.data.BathType+"卫",data:""})
		    	}else if(resData.data.RoomType>0&&resData.data.BathType>0){
		    		$scope.itemList.push({key:"户型要求",value:resData.data.RoomType+"室"+resData.data.BathType+"卫",data:""})
		    	}else if(resData.data.RoomType>0&&resData.data.HallType>0){
		    		$scope.itemList.push({key:"户型要求",value:resData.data.RoomType+"室"+resData.data.HallType+"厅",data:""})
		    	}else if(resData.data.RoomType>0){
		    		$scope.itemList.push({key:"户型要求",value:resData.data.RoomType+"室",data:""})
		    	}else if(resData.data.HallType>0){
		    		$scope.itemList.push({key:"户型要求",value:resData.data.HallType+"厅",data:""})
		    	}else if(resData.data.BathType>0){
		    		$scope.itemList.push({key:"户型要求",value:resData.data.BathType+"卫",data:""})
		    	}else{
		    		
		    	}
				
			}).catch(function(resData) {
				$ionicLoading.show({
					template: '请求客户数据失败',
					duration: 1500
				})
			})
	}else{
		$scope.Title="新建客户";
		$scope.submitData={
			Agent:'',
			AgentId:'',
			BathType:'',
			BuildType:'',
			Fitment:'',
			Floor:'',
			HallType:'',
			IsNews:false,
			IsExst:false,
			IsRent:false,
			Id:'',
			Level:1,
			Mark:null,
			Name:null,
			Phone:null,
			Price:'',
			PriceType:0,
			RoomType:0,
			Sex:1,
			SpaceType:0
		}
		$scope.submitData.Name=$rootScope.choosecreatcliName;
		$scope.submitData.Phone=$rootScope.choosecreatcliPhone;
	}

	
	
	
	
	//客户需求可选列表
	$scope.keyList=["心理价位","住房面积","装修要求","房屋结构","楼层高度","户型要求"]
	$scope.itemList=[]
	
	$scope.additem = function(){
		$scope.itemList.push({key:"",value:"",data:0});
	    $scope.modal.show();
    	$scope.showkey=true;
    	$scope.keyindex = $scope.itemList.length-1;	
    	$scope.toubutit = "选择要补充的客户需求";
	  	
	   
	}
	   
	  
	$scope.deleteitem = function(index,key){
		$scope.itemList.splice(index,1);
		if(key=="户型要求"){
			$scope.submitData.RoomType=0;
			$scope.submitData.HallType=0;
			$scope.submitData.BathType=0;
		}
	}
	//点击选择键
	$scope.choosekey = function(key){
			function contains(arr, obj) {  
			    var i = arr.length;  
			    while (i--) {  
			        if (arr[i].key === obj) {  
			            return true;  
			        }  
			    }  
			    return false;  
			} 
			if(contains($scope.itemList, key)){
				$scope.modal.hide();
				$ionicLoading.show({
					template: key+'需求已存在',
					duration: 1000
				})
				return
			}else{
				$scope.itemList[$scope.keyindex].key = key;
				$scope.itemList[$scope.keyindex].value = "";
				$scope.itemList[$scope.keyindex].data = "";
				$scope.modal.hide();				
			}
		
	}
	$scope.choosevalue = function($index,value){
		$scope.itemList[$scope.keyindex].value = value;
		$scope.itemList[$scope.keyindex].data = $index+1;
		$scope.modal.hide();
	}
	

	
	//转千分位显示
	function toThousands(num) {
	    var num = (num || 0).toString(), result = '';
	    if(num.indexOf('.')>=0){
	    	var wei = num.slice(num.indexOf('.'))
	    	num = num.substring(0,num.indexOf('.'))
	    	while (num.length > 3) {
		        result = ',' + num.slice(-3) + result;
		        num = num.slice(0, num.length - 3);
		    }
		    if (num) { result = num + result + wei; }
	    }else{
		    while (num.length > 3) {
		        result = ',' + num.slice(-3) + result;
		        num = num.slice(0, num.length - 3);
		    }
		    if (num) { result = num + result; }
	    	
	    }
	    
	    return result;
	}

	$scope.savePrice=function(){
		if($scope.submitData.PriceType==0){
			$scope.itemList[$scope.keyindex].value=toThousands($scope.submitData.Price)+" 万"
		}else if($scope.submitData.PriceType==1){
			$scope.itemList[$scope.keyindex].value=toThousands($scope.submitData.Price)+" 万"
		}else{
			$scope.itemList[$scope.keyindex].value=toThousands($scope.submitData.Price)+" 元/月"
		}
		$scope.modal.hide();
	}
	
	
	
	$scope.save=function(){
		
		//先清零
		$scope.submitData.SpaceType=0;
		$scope.submitData.Fitment=0;
		$scope.submitData.BuildType=0;
		$scope.submitData.Floor=0;

		for(var i=0;i<$scope.itemList.length;i++){
			switch ($scope.itemList[i].key)
						{
						case '住房面积':
						  $scope.submitData.SpaceType = $scope.itemList[i].data;
						  break;
						case '装修要求':
						  $scope.submitData.Fitment = $scope.itemList[i].data;
						  break;
						case '房屋结构':
						  $scope.submitData.BuildType = $scope.itemList[i].data;
						  break;
						case '楼层高度':
						  $scope.submitData.Floor = $scope.itemList[i].data;
						  break;
						default:
						  
						}
		}
		
		var req = {
				 method: 'POST',
				 url: $Factory.Client.save.url,
				 headers: {
				   'Content-Type': 'application/json'
				 },
				 data:$scope.submitData
				}
		$http(req).then(function(resData){
					$scope.showmsg=true;
					$scope.showerrmsg=false;
					
					if(resData.data.status==0){
						$scope.msginfo=resData.data.msg;
						$scope.modal.show();
						
						//添加积分
						var req = {
						 method: 'POST',
						 url: $Factory.Score.add.url,
						 headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						 },
						 data: "actId="+10
						}
						$http(req).then(function(resData){
							
						})
						//友盟统计
						Umeng.Analytics.logEvent({
						    eventId: 'ft_clientSave'
						}, function () {
						    
						}, function (reason) {
						
						});
						
						
						$timeout(function(){
							$scope.modal.hide();
							$ionicHistory.goBack()
						},1500)
					}
			},function(err){
				$scope.showmsg=true;
				$scope.showerrmsg=true;
				
				if(err.status==-1){
					$scope.msginfo='网络不给力';
					$scope.modal.show();
				}else{
					$scope.msginfo='新增失败';
					$scope.modal.show();
				}
				$timeout(function(){
					$scope.modal.hide();		
				},1500)
			})	
	}
})
