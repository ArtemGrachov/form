let app = angular.module('formApp', []);

app.controller('formCtrl', function($scope) {
    $scope.testVal = 12344;
    $scope.phoneCountry = 'ua';
    $scope.phoneCodes = {
        'ua': '+380',
        'ru': '+007',
        'be': '+375',
        'po': '+048',
        'ro': '+040',
        'md': '+373'
    }
    $scope.phoneNumber = '';

    $scope.phone = function() {
        return $scope.phoneCodes[$scope.phoneCountry];
    }

    $scope.phoneFormat = $scope.phone();
    $scope.phoneNumber = $scope.phoneFormat;

    $scope.inputPhone = function() {

        if ($scope.phoneNumber) {
            if ($scope.phoneNumber.indexOf($scope.phone()) === 0) {
                $scope.phoneNumber = (/^\+*\d+/).exec($scope.phoneNumber)[0];
                $scope.phoneFormat = $scope.phoneNumber;
            } else {
                $scope.phoneNumber = $scope.phoneFormat;
            }
        } else {
            $scope.phoneNumber = $scope.phone();
        }
    }

    $scope.selectPhoneCode = function() {
        $scope.phoneFormat = $scope.phone() + $scope.phoneFormat.substring(4, $scope.phoneFormat.length);
        $scope.phoneNumber = $scope.phoneFormat;
    }

    $scope.submitForm = function() {
        if ($scope.testForm.$valid) {
            alert('Welcome!');
        };
    }

    $scope.confirmPassClear = function() {
        $scope.passwordConfirm = '';
    }

});

app.directive('confPass', function() {
    return {
        require: 'ngModel',
        scope: {
            pass: "=confPass"
        },
        link: function(scope, element, attr, ctrl) {
            function checkPass(value) {
                if (value === scope.pass) {
                    ctrl.$setValidity('passConfirm', true);
                } else {
                    ctrl.$setValidity('passConfirm', false);
                }
                return value;
            }
            ctrl.$parsers.push(checkPass);
        }
    }
});