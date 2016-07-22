app.directive('noSpace', ['$interval', function($interval) {
  function init(scope, element, attrs, ctrl) {
    var val = '';
    if (scope[attrs.ngModel]) val = scope[attrs.ngModel];
    if (element.val()) val = element.val();
    if (attrs.ngValue) val = attrs.ngValue;
    render(ctrl, val)
  }

  function render(ctrl, value) {
    ctrl.$setViewValue(value);
    ctrl.$render();
  }

  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ctrl) {
      if(!ctrl) return;
      init(scope, element, attrs, ctrl);

      $interval(function() {
        var val = element.val();
        if(angular.isUndefined(val)) val = '';
        render(ctrl, val.replace(/\s+/g, ''));
      });

      element.bind('keypress', function(event) {
        if (event.keyCode === 32) event.preventDefault();
      });
    }
  };
}]);
