app.directive('loginCheck', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(value) {
                if (value.length == 0) {
                    ctrl.$setValidity('length', false);
                    ctrl.$setValidity('chars', true);
                } else {
                    ctrl.$setValidity('length', true);
                    if ((/^[а-яА-ЯіІїЇёЁa-zA-Z_]+$/).test(value)) {
                        ctrl.$setValidity('chars', true);
                    } else {
                        ctrl.$setValidity('chars', false);
                    };
                };
                return value;
            });
        }
    };
});

app.directive('comparing', function() {
    return {
        require: 'ngModel',
        scope: { compareTo: '=' },
        link: function(scope, element, attrs, ctrl) {

            let compare = function(value) {

                if (value === scope.compareTo) {
                    ctrl.$setValidity('compare', true)

                } else {
                    ctrl.$setDirty();
                    ctrl.$setValidity('compare', false)

                }
                return value;
            }

            ctrl.$parsers.unshift(compare);
            ctrl.$formatters.push(compare);

            scope.$watch('compareTo', function() {
                compare(ctrl.$viewValue);
            });
        }
    }
})

app.directive('password', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(value) {
                ctrl.$setValidity('length', value.length >= 5)

                return value;
            })
        }
    }
})

app.directive('phoneNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            let undelCode = function(value) {
                if (value.length >= 13) {
                    ctrl.$setValidity('length', true);
                } else {
                    ctrl.$setValidity('length', false);
                };
                return value;
            }
            ctrl.$parsers.push(undelCode);
        }
    }
})