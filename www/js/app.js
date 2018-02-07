// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('App', ['ionic','App.imglist','ngCordova','angularMoment','monospaced.elastic'])
.config(function($ionicConfigProvider,$stateProvider,$urlRouterProvider,$httpProvider){
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
	
	$stateProvider.state('logo',{
		url: '/logo',
		templateUrl: 'views/logo/logo.html',
		controller:'LogoController'
	}).state('login',{
		url: '/login',
		templateUrl: 'views/login/login.html',
		controller:'LoginController'
	}).state('registerorback',{
		cache:false,
		url: '/registerorback/:name',
		templateUrl: 'views/registerorback/registerorback.html',
		controller:'RegisterorbackController'
	}).state('agreement',{
		url: '/agreement',
		templateUrl: 'views/agreement/agreement.html',
		controller:'AgreementController',
		data:{isPublic:true}
	})
	
	
	.state('dialogBox',{
		url: '/dialogbox/:id',
		templateUrl: 'views/publicPage/dialogBox/dialogBox.html',
		controller:'dialogBoxCtl',
		data:{isPublic:true}
	})
	.state('realName',{
		url: '/realname',
		templateUrl: 'views/publicPage/realName/realName.html',
		controller:'realNameCtl',
		data:{isPublic:true}
	})
	.state('tabs',{
		url:'/tabs',
		abstract: true,
		templateUrl:'views/tabs.html'
	})
	.state('tabs.ifHaveHouse',{
		url:'/ifhavehouse/:query',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/ifHaveHouse.html',
				controller:'ifHaveHouseCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.mySet',{
		url:'/ifhavehouse/myset',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/mySet/mySet.html',
				controller:'mySetCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.aboutUs',{
		url:'/ifhavehouse/myset/aboutus',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/mySet/aboutUs/aboutUs.html',
				controller:'aboutUsCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.feedBack',{
		url:'/ifhavehouse/myset/feedback',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/mySet/feedBack/feedBack.html',
				controller:'feedBackCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.changePwd',{
		url:'/ifhavehouse/myset/changepwd',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/mySet/changePwd/changePwd.html',
				controller:'changePwdCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.clientSearch',{
		url:'/ifhavehouse/clientsearch',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/clientSearch/clientSearch.html',
				controller:'clientSearchCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.houseSearch',{
		url:'/ifhavehouse/housesearch',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/houseSearch/houseSearch.html',
				controller:'houseSearchCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.fbManage',{
		url:'/ifhavehouse/fbmanage/:type',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/fbManage/fbManage.html',
				controller:'fbManageCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.addSell',{
		url:'/ifhavehouse/fbmanage/addsell',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/fbManage/addSell/addSell.html',
				controller:'addSellCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.addRent',{
		url:'/ifhavehouse/fbmanage/addrent',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/fbManage/addRent/addRent.html',
				controller:'addRentCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.changeFy',{
		url:'/ifhavehouse/fbchange/changefy/:type/:id',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/fbManage/changeFy/changeFy.html',
				controller:'changeFyCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.needManage',{
		url:'/ifhavehouse/needmanage/:type',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/needManage/needManage.html',
				controller:'needManageCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.addNeed',{
		url:'/ifhavehouse/needmanage/addneed/:type',
		views:{
			home:{
				templateUrl:'views/tabs/ifHaveHouse/needManage/addNeed/addNeed.html',
				controller:'addNeedCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.perCenter',{
		url:'/percenter',
		views:{
			mine:{
				templateUrl:'views/tabs/perCenter/perCenter.html',
				controller:'perCenterCtl'
			}
		},
		data:{isPublic:true}
	})
	.state('tabs.chatList',{
		url:'/chatlist',
		views:{
			classify:{
				templateUrl:'views/tabs/chatList/chatList.html',
				controller:'chatListCtl'
			}
		},
		data:{isPublic:true}
	})
	


	.state('tabs.home',{
		url:'/home',
//		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/home.html',
				controller:'HomeController'
			}
		}			
	}).state('tabs.chat',{
		url:'/home/chat',
		views:{
			home:{
				templateUrl:'views/tabs/home/chat/chat.html',
				controller:'ChatController'
			}
		}
	}).state('tabs.alikehouse',{
		url:'/home/alikehouse/:minprize/:maxprize/:roomType',
		views:{
			home:{
				templateUrl:'views/tabs/home/alikehouse/alikehouse.html',
				controller:'AlikehouseController'
			}
		}
	}).state('tabs.alikehousedetail',{
		url:'/home/alikehousedetail/:id/:type',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/alikehouse/alikehousedetail/alikehousedetail.html',
				controller:'AlikehousedetailController'
			}
		}
	}).state('tabs.hisweidian',{
		url:'/home/alikehouse/hisweidian/:uid',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/alikehouse/hisweidian/hisweidian.html',
				controller:'HisweidianController'
			}
		}
	}).state('tabs.fyfabu',{
		url:'/home/fyfabu',
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/fyfabu.html',
				controller:'FyfabuController'
			}
		}
	}).state('tabs.cfyfabu',{
		url:'/home/cfyfabu',
		views:{
			classify:{
				templateUrl:'views/agreement/agreement.html',
				controller:'AgreementController'
			}
		}
	}).state('tabs.fydetail',{
		cache:false,
		url:'/home/fyfabu/fydetail/:id/:housetype',
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/fydetail/fydetail.html',
				controller:'FydetailController'
			}
		}
	}).state('tabs.addershou',{
		url:'/home/fyfabu/addershou/:title:id',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/addershou/addershou.html',
				controller:'AddershouController'
			}
		}
	}).state('tabs.ershoutd',{
		url:'/home/fyfabu/addershou/ershoutd/:name',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/addershou/ershoutd/ershoutd.html',
				controller:'ErshoutdController'
			}
		}
	}).state('tabs.ershouxiaoqu',{
		url:'/home/fyfabu/addershou/ershouxiaoqu',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/addershou/ershouxiaoqu/ershouxiaoqu.html',
				controller:'ErshouxiaoquController'
			}
		}
	}).state('tabs.addzufang',{
		cache:false,
		url:'/home/fyfabu/addzufang/:title:id',
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/addzufang/addzufang.html',
				controller:'AddzufangController'
			}
		}
	}).state('tabs.zufangtd',{
		url:'/home/fyfabu/addershou/zufangtd/:name',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/addzufang/zufangtd/zufangtd.html',
				controller:'ZufangtdController'
			}
		}
	}).state('tabs.zufangxiaoqu',{
		url:'/home/fyfabu/addzufang/zufangxiaoqu',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/fyfabu/addzufang/zufangxiaoqu/zufangxiaoqu.html',
				controller:'ZufangxiaoquController'
			}
		}
	}).state('tabs.weidian',{
		url:'/home/weidian/:uid',
		cache:false ,
		views:{
			home:{
				templateUrl:'views/tabs/home/weidian/weidian.html',
				controller:'WeidianController'
			}
		}
	}).state('tabs.shareweidian',{
		url:'/home/weidian/shareweidian/?id=',
		views:{
			home:{
				templateUrl:'views/tabs/home/weidian/shareweidian/shareweidian.html',
				controller:'ShareweidianController'
			}
		}
	}).state('tabs.chushou',{
		url:'/home/chushou',
		views:{
			home:{
				templateUrl:'views/tabs/home/chushou/chushou.html',
				controller:'ChushouController'
			}
		}
	}).state('tabs.chushousub',{
		url:'/home/chushou/subscribe',
		views:{
			home:{
				templateUrl:'views/tabs/home/chushou/subscribe/subscribe.html',
				controller:'ChushouSubController'
			}
		}
	}).state('tabs.chushoudetail',{
		url:'/home/chushou/chushoudetail/:id',
		views:{
			home:{
				templateUrl:'views/tabs/home/chushou/chushoudetail/chushoudetail.html',
				controller:'ChushoudetailController'
			}
		}
	}).state('tabs.readchushou',{
		url:'/home/chuzu/chushoudetail/readchushou/:url',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/chushou/chushoudetail/readchushou/readchushou.html',
				controller:'ReadchushouController'
			}
		}
	}).state('tabs.chuzu',{
		url:'/home/chuzu',
		views:{
			home:{
				templateUrl:'views/tabs/home/chuzu/chuzu.html',
				controller:'ChuzuController'
				
			}
		}
	}).state('tabs.chuzusub',{
		url:'/home/chuzu/subscribe',
		views:{
			home:{
				templateUrl:'views/tabs/home/chuzu/subscribe/subscribe.html',
				controller:'ChuzuSubController'
			}
		}
	}).state('tabs.chuzudetail',{
		url:'/home/chuzu/chuzudetail/:id',
		views:{
			home:{
				templateUrl:'views/tabs/home/chuzu/chuzudetail/chuzudetail.html',
				controller:'ChuzudetailController'
			}
		}
	}).state('tabs.readchuzu',{
		url:'/home/chuzu/chuzudetail/readchuzu/:url',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/chuzu/chuzudetail/readchuzu/readchuzu.html',
				controller:'ReadchuzuController'
			}
		}
	}).state('tabs.ershoulist',{
		url:'/home/ershoulist',
		views:{
			home:{
				templateUrl:'views/tabs/home/ershoulist/ershoulist.html',
				controller:'ErshoulistController'
			}
		}
	}).state('tabs.zufanglist',{
		url:'/home/zufanglist',
		views:{
			home:{
				templateUrl:'views/tabs/home/zufanglist/zufanglist.html',
				controller:'ZufanglistController'
			}
		}
	}).state('tabs.newhouse',{
		url:'/home/newhouse',
		views:{
			home:{
				templateUrl:'views/tabs/home/newhouse/newhouse.html',
				controller:'NewhouseController'
			}
		}
	}).state('tabs.newhousedetail',{
		url:'/home/newhouse/newhousedetail/:id',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/newhouse/newhousedetail/newhousedetail.html',
				controller:'NewhousedetailController'
			}
		}
	}).state('tabs.renzheng',{
		url:'/home/renzheng',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/renzheng/renzheng.html',
				controller:'RenzhengController'
			}
		}
	}).state('tabs.renzhengmsg',{
		url:'/home/renzheng/renzhengmsg',
		views:{
			home:{
				templateUrl:'views/tabs/home/renzheng/renzhengmsg/renzhengmsg.html',
				controller:'RenzhengmsgController'
			}
		}
	}).state('tabs.shareposter',{
		url:'/home/shareposter/:tid/:TemplateType',
		views:{
			home:{
				templateUrl:'views/tabs/home/shareposter/shareposter.html',
				controller:'ShareposterController'
			}
		}
	}).state('tabs.searchhouse',{
		url:'/home/searchhouse/:housetype',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/searchhouse/searchhouse.html',
				controller:'SearchhouseController'
			}
		}
	}).state('tabs.searchresult',{
		url:'/home/searchhouse/searchresult/:query/:type',
		views:{
			home:{
				templateUrl:'views/tabs/home/searchhouse/searchresult/searchresult.html',
				controller:'SearchresultController'
			}
		}
	}).state('tabs.gpslocation',{
		url:'/home/gpslocation',
		views:{
			home:{
				templateUrl:'views/tabs/home/gpslocation/gpslocation.html',
				controller:'GpslocationController'
			}
		}
	}).state('tabs.incarousel',{
		url:'/home/incarousel/:name',
		views:{
			home:{
				templateUrl:'views/tabs/home/incarousel/incarousel.html',
				controller:'IncarouselController'
			}
		}
	}).state('tabs.homeinfodetail',{
		url:'/home/homeinfodetails/:id',
		views:{
			home:{
				templateUrl:'views/tabs/home/homeinfodetail/homeinfodetail.html',
				controller:'HomeinfodetailController'
			}
		}
	}).state('tabs.uidhomeinfodetail',{
		url:'/home/uidhomeinfodetail/:id/:uid',
		views:{
			home:{
				templateUrl:'views/tabs/home/homeinfodetail/homeinfodetail.html',
				controller:'HomeinfodetailController'
			}
		}
	}).state('tabs.choosefy',{
		url:'/home/choosefy/:tid',
		views:{
			home:{
				templateUrl:'views/tabs/home/choosefy/choosefy.html',
				controller:'ChoosefyController'
			}
		}
	}).state('tabs.fypic',{
		url:'/home/choosefy/fypic/:tid/:hid',
		views:{
			home:{
				templateUrl:'views/tabs/home/choosefy/fypic/fypic.html',
				controller:'FypicController'
			}
		}
	}).state('tabs.popposter',{
		url:'/home/popposter',
		cache:false,
		views:{
			home:{
				templateUrl:'views/tabs/home/popposter/popposter.html',
				controller:'PopposterController'
			}
		}
	}).state('tabs.list',{
		url:'/home/list/:name:id',
		views:{
			home:{
				templateUrl:'views/tabs/home/list/list.html',
				controller:'ListController'
			}
		}
	}).state('tabs.contact',{
		url:'/contact',
		cache:false,
		views:{
			classify:{
				templateUrl:'views/tabs/contact/contact.html',
				controller:'ContactCtr'		
			}
		}
		
	}).state('tabs.clidetail',{
		url:'/contact/clidetail/:id',
		cache:false,
		views:{
			classify:{
				templateUrl:'views/tabs/contact/clidetail/clidetail.html',
				controller:'ClidetailCtr'		
			}
		}
		
	}).state('tabs.createcli',{
		url:'/contact/createcli/:id',
		cache:false,
		views:{
			classify:{
				templateUrl:'views/tabs/contact/createcli/createcli.html',
				controller:'CreatecliCtr'		
			}
		}
		
	}).state('tabs.contactlist',{
		url:'/contact/createcli/contactlist',
		views:{
			classify:{
				templateUrl:'views/tabs/contact/createcli/contactlist/contactlist.html',
				controller:'ContactlistCtr'		
			}
		}
		
	}).state('tabs.info',{
		url:'/info',
		views:{
			classify:{
				templateUrl:'views/tabs/info/info.html',
				controller:'InfoController'		
			}
		}
		
	}).state('tabs.uidinfodetails',{
		url:'/info/uidinfodetails/:id/:type/:uid',
		views:{
			classify:{
				templateUrl:'views/tabs/info/infodetails/infodetails.html',
				controller:'InfodetailsController'		
			}
		}
		
	}).state('tabs.infodetails',{
		url:'/info/infodetails/:id/:type',
		cache:false,
		views:{
			classify:{
				templateUrl:'views/tabs/info/infodetails/infodetails.html',
				controller:'InfodetailsController'		
			}
		}
	}).state('tabs.shareinfodetails',{
		url:'/info/shareinfodetails',
		cache:false,
		views:{
			classify:{
				templateUrl:'views/tabs/info/shareinfodetails/shareinfodetails.html',
				controller:'ShareinfodetailsController'		
			}
		}
	}).state('tabs.shareuidinfodetails',{
		url:'/info/shareuidinfodetails/:uid',
		cache:false,
		views:{
			classify:{
				templateUrl:'views/tabs/info/shareinfodetails/shareinfodetails.html',
				controller:'ShareinfodetailsController'		
			}
		}
	}).state('tabs.find',{
		url:'/find',
		views:{
			find:{
				templateUrl:'views/tabs/find/find.html',
				controller:'CartController'
				
			}
		}
		
	}).state('tabs.dazibao',{
		url:'/find/dazibao',
//		cache:false,
		views:{
			find:{
				templateUrl:'views/tabs/find/dazibao/dazibao.html',
				controller:'DazibaoController'
			}
		}
	}).state('tabs.like',{
		url:'/find/dazibao/like/:id:url:name',
		views:{
			find:{
				templateUrl:'views/tabs/find/dazibao/like/like.html',
				controller:'LikeController'
			}
		}
	}).state('tabs.duanzi',{
		url:'/find/duanzi',
		views:{
			find:{
				templateUrl:'views/tabs/find/duanzi/duanzi.html',
				controller:'DuanziController'
			}
		}
	}).state('tabs.findinfo',{
		url:'/find/info',
		views:{
			find:{
				templateUrl:'views/tabs/find/findinfo/findinfo.html',
				controller:'FindInfoController'		
			}
		}
		
	}).state('tabs.findinfodetails',{
		url:'/find/info/findinfodetails/:id/:type/:uid',
		views:{
			find:{
				templateUrl:'views/tabs/find/findinfo/findinfodetails/findinfodetails.html',
				controller:'FindInfodetailsController'		
			}
		}
		
	}).state('tabs.findpopposter',{
		url:'/find/findpopposter',
//		cache:false,
		views:{
			find:{
				templateUrl:'views/tabs/find/findpopposter/findpopposter.html',
				controller:'FindPopposterController'
			}
		}
	}).state('tabs.findshareposter',{
		url:'/find/findpopposter/findshareposter/:tid/:TemplateType',
		views:{
			find:{
				templateUrl:'views/tabs/find/findpopposter/findshareposter/findshareposter.html',
				controller:'FindShareposterController'
			}
		}
	}).state('tabs.findlist',{
		url:'/find/findpopposter/findlist/:name/:id',
		views:{
			find:{
				templateUrl:'views/tabs/find/findpopposter/findlist/findlist.html',
				controller:'FindListController'
			}
		}
	}).state('tabs.findchoosefy',{
		url:'/find/choosefy/:tid',
		views:{
			find:{
				templateUrl:'views/tabs/find/findchoosefy/findchoosefy.html',
				controller:'FindChoosefyController'
			}
		}
	}).state('tabs.findfypic',{
		url:'/find/choosefy/findfypic/:tid/:hid',
		views:{
			find:{
				templateUrl:'views/tabs/find/findchoosefy/findfypic/findfypic.html',
				controller:'FindFypicController'
			}
		}
	}).state('tabs.mine',{
		url:'/mine',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/mine.html',
				controller:'MineController'
			}
		}
	}).state('tabs.aboutus',{
		url:'/mine/aboutus',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/aboutus/aboutus.html',
				controller:'AboutusController'
			}
		}
	}).state('tabs.myinfo',{
		url:'/mine/myinfo',
		cache:false,
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myinfo/myinfo.html',
				controller:'MyinfoController'
			}
		}
	}).state('tabs.changeinfo',{
		url:'/mine/myinfo/changeinfo/:name',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myinfo/changeinfo/changeinfo.html',
				controller:'ChangeinfoController'
			}
		}
	}).state('tabs.changephone',{
		url:'/mine/myinfo/changephone',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myinfo/changephone/changephone.html',
				controller:'ChangephoneController'
			}
		}
	}).state('tabs.imgpreview',{
		url:'/mine/myinfo/imgpreview',
		cache:false,
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myinfo/imgpreview/imgpreview.html',
				controller:'ImgpreviewController'
			}
		}
	}).state('tabs.imgcut',{
		url:'/mine/myinfo/imgpreview/imgcut/:imgurl',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myinfo/imgpreview/imgcut/imgcut.html',
				controller:'ImgcutController'
			}
		}
	}).state('tabs.eqcode',{
		url:'/mine/myinfo/eqcode',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myinfo/eqcode/eqcode.html',
				controller:'EqcodeController'
			}
		}
	}).state('tabs.mypoints',{
		url:'/mine/mypoints',
		cache:false,
		views:{
			mine:{
				templateUrl:'views/tabs/mine/mypoints/mypoints.html',
				controller:'MypointsController'
			}
		}
	}).state('tabs.potrule',{
		url:'/mine/mypoints/potrule',
		cache:false,
		views:{
			mine:{
				templateUrl:'views/tabs/mine/mypoints/potrule/potrule.html',
				controller:'PotruleController'
			}
		}
	}).state('tabs.giftlist',{
		url:'/mine/mypoints/giftlist',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/mypoints/giftlist/giftlist.html',
				controller:'GiftlistController'
			}
		}
	}).state('tabs.refcode',{
		url:'/mine/refcode',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/refcode/refcode.html',
				controller:'RefcodeController'
			}
		}
	}).state('tabs.sharerefcode',{
		url:'/mine/refcode/sharerefcode/:phone/:name',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/refcode/sharerefcode/sharerefcode.html',
				controller:'ShareRefcodeController'
			}
		}
	}).state('tabs.myweidian',{
		url:'/mine/myweidian/:uid',
		cache:false ,
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myweidian/myweidian.html',
				controller:'MyWeidianController'
			}
		}
	}).state('tabs.myfydetail',{
		cache:false,
		url:'/mine/myweidian/myfydetail/:id/:housetype',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/myweidian/myfydetail/myfydetail.html',
				controller:'MyFydetailController'
			}
		}
	}).state('tabs.setting',{
		url:'/mine/setting',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/setting/setting.html',
				controller:'SettingController'
			}
		}
	}).state('tabs.checkprogress',{
		url:'/mine/checkprogress',
		cache:false,
		views:{
			mine:{
				templateUrl:'views/tabs/mine/checkprogress/checkprogress.html',
				controller:'CheckprogressController'
			}
		}
	}).state('tabs.minerenzheng',{
		url:'/mine/checkprogress/minerenzheng',
		cache:false,
		views:{
			mine:{
				templateUrl:'views/tabs/mine/checkprogress/minerenzheng/minerenzheng.html',
				controller:'MinerenzhengController'
			}
		}
	}).state('tabs.minerenzhengmsg',{
		url:'/mine/checkprogress/minerenzheng/minerenzhengmsg',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/checkprogress/minerenzheng/minerenzhengmsg/minerenzhengmsg.html',
				controller:'MinerenzhengmsgController'
			}
		}
	}).state('tabs.problem',{
		url:'/mine/setting/problem',
		views:{
			mine:{
				templateUrl:'views/tabs/mine/setting/problem/problem.html',
				controller:'ProblemController'
			}
		}
	});
	//非 url 跳转
	$urlRouterProvider.otherwise('/logo');
})


.constant('views',{currentView:null})

.run(function(goTo,$rootScope,$ionicSideMenuDelegate,$ionicTabsDelegate,views,$state,ModalService){
	
	
	$rootScope.closeshare=function(){
		$('#sharelist').css('display','none');
		$('#sharemodal').animate({
			bottom:'-220px'
		},300)
	}
	$rootScope.openshare=function(){
		$('#sharelist').css('display','block');
		$('#sharemodal').animate({
			bottom:0
		},300)
	}

	
	//除了一级页面其他 页面不想看到 tab-bar
	$rootScope.$on('$ionicView.beforeEnter',function(event,data){
		//console.log('进入'+data.stateName+'视图');
		views.currentView=data.stateName;
		$ionicTabsDelegate.showBar(views.currentView == 'tabs.home' || views.currentView == 'tabs.info' || views.currentView == 'tabs.find' || views.currentView == 'tabs.mine' || views.currentView == 'tabs.contact')	
		
	})
	$rootScope.$on('$ionicView.beforeLeave',function(event,data){
		//console.log('离开'+data.stateName+'视图');
	})
	
	//登录拦截，判断后跳转到登录页面可跳转页面
	//后台可进入微店 ||toState.name=='tabs.weidian' ||toState.name=='tabs.searchhouse'
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		
		if(toState.name=='login'||toState.name=='registerorback'||toState.name=='agreement'||toState.name=='logo'||toState.name=='tabs.home'||toState.name=='tabs.chushoudetail'||toState.name=='tabs.readchushou'||toState.name=='tabs.chuzudetail'||toState.name=='tabs.readchuzu'||
		toState.name=='tabs.info'||toState.name=='tabs.contact'||toState.name=='tabs.infodetails'||toState.name=='tabs.uidinfodetails'||toState.name=='tabs.shareinfodetails'||toState.name=='tabs.find'||toState.name=='tabs.dazibao'||toState.name=='tabs.duanzi'||
		toState.name=='tabs.humor'||toState.name=='tabs.like'||toState.name=='tabs.fydetail'||toState.name=='tabs.chuzudetail'||toState.name=='tabs.fypic'||toState.name=='tabs.alikehouse'||toState.name=='tabs.alikehousedetail'||
		toState.name=='tabs.hisweidian'||toState.name=='tabs.homeinfodetail'||toState.name=='tabs.uidhomeinfodetail'||toState.name=='tabs.searchresult'||
		toState.name=='tabs.gpslocation'||toState.name=='tabs.ershoutd'||toState.name=='tabs.ershoulist'||toState.name=='tabs.zufanglist'||toState.name=='tabs.newhouse'||toState.name=='tabs.newhousedetail' ||
		toState.name=='tabs.findinfodetails' ||toState.name=='tabs.myweidian' ||toState.name=='tabs.myfydetail' ||toState.name=='tabs.sharerefcode'){
	
			return;// 如果是进入登录界面则允许			
		}
		// 如果用户不存在
		// if(localStorage.getItem('loged')=='0'){
		if(localStorage.getItem('loged')!=='0'){
			event.preventDefault();// 取消默认跳转行为
			$state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面			
		}else{
		}
	});
	
	// $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
    //     var isPublic = angular.isObject(toState.data) && toState.data.isPublic === true;    //判断当前state的data属性"isPublic" === true
    //     // var token = Passport.getToken();    //这里的getToken()是我自己写的取得当前token的方法，可以换成你自己的方法
    //     if (!isPublic) {     
    //              //do nothing
    //     }
    //     else {    //表示该state访问需要权限
    //       ModalService.show('views/login/login-model.html', 'LoginController', {'login': true})    //调用ModalService.show()方法，显示登录modal框，这里还要指定Controller为LoginController，你也可以替换为自己的Controller
    //         .then(function (data) {
	// 			console.log(data)
    //           if (data.login) {    //login 是我自定义的参数，后面会讲到
    //             $rootScope.$broadcast('login', 'true');        //向下广播 login事件，这样就可以在其他controller中接收到该事件，从而进行相应的操作
    //           }
    //           else {
	// 			$state.go(fromState.name);
    //             // if(data.state){    //state也是我自定义的参数
	// 			// 	$state.go(data.state);
    //             // }else{
	// 			// 	$state.go(fromState.name);
    //             // }
    //           }
    //         });
    //     }
    //   });
})

.run(function($timeout,$ionicPopup,$cordovaAppVersion,$cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2,$ionicPlatform,$rootScope
	,$q,$http,$Factory,$ionicHistory,$cordovaToast,$location,$cordovaStatusbar,$ionicLoading,$cordovaNetwork) {
	
	//ios风格显示
 	ionic.Platform.setPlatform('ios');
  	$ionicPlatform.ready(function() {
	    if(window.cordova && window.cordova.plugins.Keyboard) {
	      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	      // for form inputs)
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	
	      // Don't remove this line unless you know what you are doing. It stops the viewport
	      // from snapping when text inputs are focused. Ionic handles this internally for
	      // a much nicer keyboard experience.
	      cordova.plugins.Keyboard.disableScroll(true);
	    }
	    if(window.StatusBar) {
	        //StatusBar.styleDefault();
	        //StatusBar.styleBlackTranslucent();
	        StatusBar.hide();     
	    }
      
      	Umeng.Analytics.config({
		    appkey: '59f668bc734be44eb9000352', 
		    channel: 'your_channel'
		}, function () {
//		    alert("友盟API初始化成功");
		}, function (reason) {
		});

		JMessage.init({ isOpenMessageRoaming: true });

		// JMessage.register({ username: 'testone', password: '123654', nickname: 'nickname',
		// 	gender: 'male', extras: { key1: 'value1' }},
		// 	(suc) => {
		// 		// do something.
		// 		alert('regsuc'+JSON.stringify(suc))
		// 	}, (error) => {
		// 		alert('regerr'+JSON.stringify(error))
		// })
		// $timeout(function(){
		// 	JMessage.login({ username: 'test', password: '123654' },
		// 	(suc) => {
		// 		alert('logsuc'+JSON.stringify(suc))
		// 		JMessage.getMessageById({type:'single',username:'viktor',appKey:'',messageId:'1'},
		// 			(msg)=>{
		// 				alert('msgsuc'+JSON.stringify(msg))
		// 			},(err)=>{
		// 				alert('msgerr'+JSON.stringify(err
		// 				))
		// 			})
		// 	}, (error) => {
		// 		alert('logerr'+JSON.stringify(error))
		// 	})
		// })
  	});
 
	document.addEventListener("deviceready", function () {
	    var type = $cordovaNetwork.getNetwork();
	    var isOnline = $cordovaNetwork.isOnline();
	    var isOffline = $cordovaNetwork.isOffline();
		
		//wifi下自动更新
		if(type==='wifi'){
			$http.get($Factory.Server.getversion.url).then(function(resData){
             		var serverAppVersion = resData.data.version; //从服务端获取最新版本号
             		//获取版本
             		$cordovaAppVersion.getVersionNumber().then(function (version) {
             		    if (version != serverAppVersion) {
             		    	showUpdateConfirm(resData.data.description,resData.data.url,serverAppVersion);           		    
             		    }else{
             		    	 
             		    }
             		});
        		
        	})	
		}

	  }, false);
	  
    // 显示是否更新对话框
    function showUpdateConfirm(updateinfo,updateurl,version) {
        var confirmPopup = $ionicPopup.confirm({
            title: '检查到新版本'+version,
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
	  
  
  
	// 双击退出
    $ionicPlatform.registerBackButtonAction(function (e) {
        //可以双击退出的页面
        if ($location.path() == '/login' || $location.path() == '/tabs/home' || $location.path() == '/tabs/info' || $location.path() == '/tabs/find' || $location.path() == '/tabs/mine' || $location.path() == '/tabs/contact' ) {
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortCenter('再按一次退出房田网');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
        }
//      else if($location.path() == '/tabs/contact/createcli/-1'){
//      	$rootScope.showSelfModal=true;
//      	$('#createcli .selfbackdrop').css('display','block');
//			$('#createcli .selfmodal').css('display','block');
//      }
//      else if ($ionicHistory.backView()&&$location.path() !== '/tabs/contact/createcli/-1') {
//          	$ionicHistory.goBack()
//      }
        else if ($ionicHistory.backView()) {
			if($location.path() == '/tabs/contact/createcli/-1'){
				// 返回确定退出？
				// $rootScope.showSelfModal=true;
				$('#createcli .selfbackdrop').css('display','block');
			   	$('#createcli .selfmodal').css('display','block');
		   	}
		   	else{
				$ionicHistory.goBack()
		   	}
        }
		else {
        }
        e.preventDefault(); 
        return false;
	}, 101);
   
})


