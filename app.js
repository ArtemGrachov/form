let app = angular.module('formApp', []);


app.controller('formCtrl', function($scope, phoneCodes) {
    $scope.phoneCountry = 'ua';
    $scope.submitForm = function() {
        alert('Hello!');
    };
    $scope.phoneCode = $scope.phoneNumber = phoneCodes.getPhoneCode($scope.phoneCountry);
    $scope.selectPhoneCode = function() {
        $scope.phoneCode = $scope.phoneNumber = phoneCodes.getPhoneCode($scope.phoneCountry);
    }
    $scope.phoneInput = function(e) {
        if (($scope.phoneNumber.length <= 4 && !(/\d/).test(e.key))) {
            $scope.phoneNumber = $scope.phoneCode;
        };
    }
    $scope.phoneChange = function(oldVal) {
        if ($scope.phoneNumber == undefined || $scope.phoneNumber.length < 4) {
            $scope.phoneNumber = $scope.phoneCode;
        } else {
            if ($scope.phoneNumber.indexOf($scope.phoneCode) != 0 ||
                !(/^\+[0-9]+$/).test($scope.phoneNumber)
            ) {
                $scope.phoneNumber = oldVal;
            }
        }
    }
});


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

app.factory('phoneCodes', function() {
    let codes = {
        'ua': '+380',
        'ru': '+007',
        'be': '+375',
        'po': '+048',
        'ro': '+040',
        'md': '+373'
    };

    return {
        getPhoneCode: function(country) {
            return codes[country];
        }
    }
})