angular.module('App')
//监听Dom是否渲染完毕
.directive('onFinishRenderFilters',['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}])
// slide-box只有两条
.directive('repeatDone', function () {
    return function (scope, element, attrs) {
      if (scope.$last) { // all are rendered
        scope.$eval(attrs.repeatDone);
      }
    }
 })