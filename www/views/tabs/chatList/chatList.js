angular.module('App')
.controller('chatListCtl',function(goTo,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate,$timeout){
	
	$scope.goto=function(id){
        goTo.goto('dialogBox',{id:id})
    }
// 旋轉導航
    var items = $('#chat_list .menuItem');
    for(var i = 0, l = items.length; i < l; i++) {
        
        items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
    }
    $scope.toggleOpen=function(e){
        $('#chat_list .circle').removeClass('open');
        // $('#chat_list .circle').toggleClass('open');
        $timeout(function(){
            $('#chat_list .circle').css('display','none');
        },100)
    }
    $scope.openNav=function(){
        $('#chat_list .circle').css('display','block');
        // $('#chat_list .circle').toggleClass('open');
        $timeout(function(){
            $('#chat_list .circle').addClass('open');
        },100)
    }

})
.directive('headRedPoint', function($compile, $timeout){
    // Runs during compile
    return {
       restrict: 'A', 
       replace: false,
       link: function(scope, element, attrs, controller) {
           var key = attrs.headRedPoint || false;
           var template ="<span ng-class={true:'tabs-red-point',false:''}["+key+"]></span>";
           var html = $compile(template)(scope);  
           $timeout(function() {
             var test = angular.element(element).parent().append(html)
           },100)
                      
        }
    };
 })

