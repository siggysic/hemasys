app.directive('uppercase', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ctrl) {
      if(!ctrl) {
        return;
      }
      ctrl.$parsers.push(function(val) {
        if(angular.isUndefined(val)) {
          var val = '';
        }
        var clean = val.toUpperCase();
        if(val !== clean) {
          ctrl.$setViewValue(clean);
          ctrl.$render();
        }
        return clean;
      });
      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});
