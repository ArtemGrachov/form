app.controller('formCtrl', function($scope, $window, $rootScope, $cookies, phoneCodes) {
    $scope.phoneCountry = 'ua';
    $rootScope.pageTitle = $rootScope.siteTitle + ' :: Registration';

    $scope.submitForm = function() {
        $window.location.href = '#!/dash';
        $cookies.put('userAuth', true);
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


app.controller('loginCtrl', function($scope, $rootScope, $http, $window, $cookies) {
    $rootScope.pageTitle = $rootScope.siteTitle + ' :: Sign in';

    $scope.submitForm = function() {
        $cookies.put('userAuth', true);
        $http.get($rootScope.server + '/users?id=1')
            .then(function(response) {
                $rootScope.user = response.data[0];
            })
        $window.location.href = '#!/dash';
    }
})

app.controller('newsCtrl', function($scope, $rootScope, $window, $http, $routeParams, $cookies) {
    $scope.posts = [];
    $rootScope.pageTitle = $rootScope.siteTitle + ' :: News';
    $scope.newsOrder = 'id';
    $scope.loadPosts = function(firstPost, lastPost) {
        for (let i = firstPost; i <= lastPost; i++) {
            $http.get($rootScope.server + '/posts/' + i)
                .then(function(response) {
                    $scope.posts.push(response.data);
                });
        };
    };
    if ($routeParams.page) {
        $scope.firstPost = 1 + ($routeParams.page * 10 - 10);
        $scope.lastPost = $routeParams.page * 10;
    } else {
        $scope.firstPost = 1;
        $scope.lastPost = 10;
    };
    $scope.loadPosts($scope.firstPost, $scope.lastPost);
})

app.controller('postCtrl', function($scope, $routeParams, $http, $rootScope) {
    $scope.postId = $routeParams.postId;

    $http.get($rootScope.server + '/posts/' + $scope.postId)
        .then(function(response) {
            $scope.postData = response.data;
            $rootScope.pageTitle = $rootScope.siteTitle + ' :: ' + $scope.postData.title;
        })
        .then(function() {
            $http.get($rootScope.server + '/users/' + $scope.postData.userId)
                .then(function(response) {
                    $scope.postAuthor = response;
                })
        })
})