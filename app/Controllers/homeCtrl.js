app.controller('homeCtrl', function($scope, $rootScope) {
    $rootScope.cart = $rootScope.cart || [];

    $rootScope.getCartItemCount = function () {
        return $rootScope.cart.length;
    };
    console.log('Số lượng trong cart là: ',$rootScope.cart.length);
});
