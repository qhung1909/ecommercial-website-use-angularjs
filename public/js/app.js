var app = angular.module('tzapp', ['ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../app/views/home.html?' + Math.random(),
            controller: 'homeCtrl'
        })
        .when('/detail/:id', {
            templateUrl: '../app/views/detail.html?' + Math.random(),
            controller: 'detailCtrl'
        })
        .when('/login', {
            templateUrl: '../app/views/login.html?' + Math.random(),
            controller: 'userCtrl'
        })
        .when('/cart', {
            templateUrl: '../app/views/cart.html?' + Math.random(),
            controller: 'cartCtrl'
        })
        .when('/category/:category', {
            templateUrl: '../app/views/product.html?' + Math.random(),
            controller: 'tzCtrl'
        })
        .when('/news', {
            templateUrl: '../app/views/news.html?' + Math.random(),
            controller: 'newsCtrl'
        })
        .when('/admin',{
            templateUrl: '../app/views/admin.html?' + Math.random(),
            controller: 'adminCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.run(function ($rootScope) {
    if (localStorage.getItem('cart')) {
        $rootScope.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        $rootScope.cart = [];
    }
});

app.filter('vndCurrency', function () {
    return function (input) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input);
    };
});

app.run(function ($rootScope, $timeout) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 100)
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.isLoading = true;
        alert('404');
    });
})