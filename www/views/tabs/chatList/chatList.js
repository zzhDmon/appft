angular.module('App')
.controller('chatListCtl',function(goTo,$scope,$rootScope,$ionicPopover,$ionicSideMenuDelegate){
	
	$scope.goto=function(id){
        goTo.goto('dialogbox',{id:id})
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

