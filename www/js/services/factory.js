angular.module('App')
.factory('$Factory',function(){
//	var baseSever = 'http://app.fang-tian.com';
	var baseSever = 'http://192.168.0.105:8081';
//	var baseSever = 'http://ap.jiayuanservice.com';
	return {
		host:baseSever,
		Server: {
                msg: { url: baseSever + '/Server/SendMsg', method: 'POST' }, //发送短信 {phone,isResist=[1 注册，null 验证]} 
                login: { url: baseSever + '/Server/Login', method: 'POST' },//登陆 {Phone，Password，Status=[1 密码登陆，2 验证码登陆（Password=msg）]}
                repass: { url: baseSever + '/Server/Repass', method: 'POST' },//修改密码 {Phone，Password，Msg}
                regist: { url: baseSever + '/Server/Register', method: 'POST' },//注册 {Phone，Password，Msg}
                back: { url: baseSever + '/Feedback/save', method: 'POST' },//反馈 {Discription}
                logout: { url: baseSever + '/Server/LogOut', method: 'POST' },//登出
                phone: { url: baseSever + '/Server/Check', method: 'POST' },//检验验证码 >>{phone，msg}
                hjson: { url: baseSever + '/app/data.json', method: 'GET' },//前端数据
                upload: { url: baseSever + '/Upload/Save', method: 'POST' },//上传图片 {path,file,orientation,noWater}
                agent: { url: baseSever + '/Server/Agent', method: 'POST' },//当前用户 >>{ status = 0, msg = curr.Phone }             
                getversion: { url: baseSever + '/server/GetCurrentVersion', method: 'GET' },//获取最新版本号             
            },
            User:{
                get: { url: baseSever + '/UserInfo/get', method: 'GET' },
                save: { url: baseSever + '/UserInfo/save', method: 'POST' },
                qCode: { url: baseSever + '/UserInfo/QCode', method: 'POST' },//用户二维码 {uid}
            },
            OutsideHouse: {//业主出售 (保存、获取订阅在 User.get)
                query: { url: baseSever + '/OutsideHouse/Query', method: 'GET', isArray: true },
                get: { url: baseSever + '/OutsideHouse/Get', method: 'GET' },
            },
            OutsideHouseRent:{//业主出租 (保存、获取订阅在 User.get)
                query: { url: baseSever + '/OutsideHouseRent/Query', method: 'GET', isArray: true },
                get: { url: baseSever + '/OutsideHouseRent/Get', method: 'GET' },
            },
            News:{//资讯
                query: { url: baseSever + '/News/Query', method: 'GET', isArray: true },
                get: { url: baseSever + '/News/Get', method: 'GET' }
            },
            HouseSource:{
                communities: { url: baseSever + '/Community/Query', method: 'GET', isArray: true },//小区查询
                query: { url: baseSever + '/HouseSource2/Query', method: 'GET', isArray: true },
                get: { url: baseSever + '/HouseSource2/Get', method: 'GET' },//编辑时获取
                detail: { url: baseSever + '/HouseSource2/GetDetails', method: 'GET' },//详情展示
                save: { url: baseSever + '/HouseSource2/Save', method: 'POST' },
                delete: { url: baseSever + '/HouseSource2/Delete', method: 'POST' },
                setRecommend: { url: baseSever + '/HouseSource2/SetRecommend', method: 'POST' },//设置，取消推荐
                myShop: { url: baseSever + '/HouseSource2/MyShop', method: 'GET' }//微店
            },
            Template:{//模板
                banner: { url: baseSever + '/Template/GetBanner', method: 'GET', isArray: true },//首页 banner
                main: { url: baseSever + '/Template/GetMainTemplate', method: 'GET', isArray: true },// 首页 模板
                query: { url: baseSever + '/Template/Query', method: 'GET', isArray: true },
                hit: { url: baseSever + '/Template/hit', method: 'POST' }, //点击数
                jakes: { url: baseSever + '/Joke/Query', method: 'GET', isArray: true },//段子
                log: { url: baseSever + '/Template/LogShare', method: 'POST' }//分享记录
            },
            SecondVersion:{
                homenews: { url: baseSever + '/CustomHouseSource/News', method: 'GET' },//首页资讯
                alikehouse: { url: baseSever + '/CustomHouseSource/Houses', method: 'GET' },//相似房源
                alikehousedetail: { url: baseSever + '/CustomHouseSource/Detail', method: 'GET' },//相似房源详情
            },
            NewHouse:{
                query: { url: baseSever + '/NewHouse/Query', method: 'GET' },//新房查询
                cities: { url: baseSever + '/NewHouse/Cities', method: 'GET' },
                get: { url: baseSever + '/NewHouse/get', method: 'GET' },//新房
            },
            Client:{
            	get: { url: baseSever + '/AgentCustom/Get', method: 'GET' },
            	delete: { url: baseSever + '/AgentCustom/Delete', method: 'POST' },
            	query: { url: baseSever + '/AgentCustom/Query', method: 'GET' },
                save: { url: baseSever + '/AgentCustom/Save', method: 'POST' }
            },
            Score:{
            	get: { url: baseSever + '/Score/Home', method: 'GET' }, //我的积分
            	rule: { url: baseSever + '/Score/Rule', method: 'GET' }, //积分规则
            	add: { url: baseSever + '/Score/ActionSucess', method: 'POST' }//分享成功
            },
            Exchange:{
            	list: { url: baseSever + '/Exchange/Query', method: 'GET' }, //商品列表
            	detail: { url: baseSever + '/Exchange/Get', method: 'GET' }, //商品详情
            	change: { url: baseSever + '/Exchange/Save', method: 'POST' }//兑换
            },
            //2.5新增
            VTwoPFive:{
            	toutiao: { url: baseSever + '/CustomHouseSource/News', method: 'GET' }, //商品列表
            	homesearch: { url: baseSever + '/CustomHouseSource/TitleQuery', method: 'GET' }, //首页头条
            	hotsearch: { url: baseSever + '/CustomHouseSource/HotSearch', method: 'GET' },//热门搜索
            	findnews: { url: baseSever + '/CustomHouseSource/Newsest', method: 'GET' }//发现新闻
            }
	}
})
.factory('Apphost', [ function () {
//	var apphost = 'http://app.fang-tian.com/app';
	var apphost = 'http://192.168.0.105:8081/app';
//	var apphost = 'http://ap.jiayuanservice.com/app';
	 return {
	   apphost: apphost
	 }
}])
/** * 微信分享插件Service */
.factory('WechatService', [ function () {
	 function share(params) {
	   if (typeof Wechat === "undefined") {
	     alert("手机尚未安装微信");
	     return false;
	   }
	
	   var json = {};
	   Wechat.share(params, function (suc) {

	   }, function (err) {

	   });
	   return true;
	 }

	 return {
	   share: share
	 }
}])
/** 公共页面切换转场进入动画 **/
.factory('goTo', ['$state','$ionicViewSwitcher','$ionicHistory', function ($state,$ionicViewSwitcher,$ionicHistory) {
    function goto(state,params) {
      if(params){
        $state.go(state,params)
      }else{
          $state.go(state)
      }

      $ionicViewSwitcher.nextDirection("forward");
    }

    return {
      goto: goto
    }
}])
/** 公共页面切换转场返回动画 **/
.factory('goBack', ['$state','$ionicViewSwitcher','$ionicHistory', function ($state,$ionicViewSwitcher,$ionicHistory) {
    function goback(backto) {
        if(backto<0){
            $ionicHistory.goBack(backto);
        }else{
            $ionicHistory.goBack();    
        }
        $ionicViewSwitcher.nextDirection("back");
    }

    return {
        goback: goback
    }
}])
// testLogin
.factory('ModalService', ['$ionicModal', '$rootScope', '$q', '$injector', '$controller',
    function ($ionicModal, $rootScope, $q, $injector, $controller) {
        return {
            show: show
        };
        function show(templateUrl, controller, parameters) {
            var deferred = $q.defer(),
            ctrlInstance,
            modalScope = $rootScope.$new(),
            thisScopeId = modalScope.$id;

            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: modalScope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                modalScope.modal = modal;
                modalScope.openModal = function () {
                    modalScope.modal = show();
                };
                modalScope.closeModal = function (result) {
                    deferred.resolve(result);
                    modalScope.modal.hide();
                };
                modalScope.$on('modal.hidden', function (thisModal) {
                    if (thisModal.currentScope) {
                        var modalScopeId = thisModal.currentScope.$id;
                        if (thisScopeId === modalScopeId) {
                            deferred.resolve(null);
                            _cleanup(thisModal.currentScope);
                        }
                    }
                });
                //Invoke the controller
                var locals = {'$scope': modalScope, 'parameters': parameters};
                var ctrlEval = _evalController(controller);
                ctrlInstance = $controller(controller, locals);
                if (ctrlEval.isControllerAs) {
                    ctrlInstance.openModal = modalScope.openModal;
                    ctrlInstance.closeModal = modalScope.closeModal;
                }
                modalScope.modal.show();
            }, function (err) {
            deferred.reject(err);
            });
            return deferred.promise;
        }

        function _cleanup(scope) {
            scope.$destroy();
            if (scope.modal) {
            scope.modal.remove();
            }
        }
        function _evalController(ctrlName) {
            var result = {
            isControllerAs: false,
            controllerName: '',
            propName: ''
            };
            var fragments = (ctrlName || '').trim().split(/\s+/);
            result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
            if (result.isControllerAs) {
            result.controllerName = fragments[0];
            result.propName = fragments[2];
            }
            else {
            result.controllerName = ctrlName;
            }
            return result;
        }
    }])