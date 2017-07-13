let app = angular.module('formApp', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/reg', {
            templateUrl: 'reg.html',
            controller: 'formCtrl',
            resolve: {
                redir: function($location, $rootScope, $cookies) {
                    if ($cookies.get('userAuth')) {
                        $location.path('/dash');
                    }
                }
            }
        })
        .when('/dash', {
            templateUrl: 'dash.html',
            resolve: {
                redir: function($location, $rootScope, $cookies) {
                    if (!$cookies.get('userAuth')) {
                        $location.path('/login');
                    }
                }
            }
        })
        .when('/login', {
            templateUrl: 'login.html',
            resolve: {
                redir: function($location, $cookies) {
                    if ($cookies.get('userAuth')) {
                        $location.path('/dash');
                    }
                }
            }
        })
        .when('/post/:postId', {
            templateUrl: 'post.html',
            resolve: {
                redir: function($location, $cookies) {
                    if ($location.$$hash.indexOf('comment') >= 0) {
                        if (!$cookies.get('userAuth')) {
                            $location.path('/dash');
                        }
                    }
                }
            }
        })
        .when('/news/:page', {
            templateUrl: 'news.html'
        })
        .when('/logout', {
            resolve: {
                logout: function($rootScope, $location, $cookies) {
                    $location.path('/');
                    $cookies.remove('userAuth');
                }
            }
        })
        .otherwise({
            templateUrl: 'news.html'
        });
})

app.run(function($rootScope, $cookies) {;
    $rootScope.siteTitle = 'AngularJS Test'

    $rootScope.isAuth = function() {
        return $cookies.get('userAuth');
    }
    $rootScope.pageTitle = 'AngularJS Test'
    $rootScope.testUsername = 'Test-user';
    $rootScope.server = 'https://jsonplaceholder.typicode.com';
});