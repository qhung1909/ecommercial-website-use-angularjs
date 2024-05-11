app.controller('detailCtrl', function ($scope, $routeParams, $rootScope) {

    $scope.product = {};
    if (localStorage.getItem('cart')) {
        $rootScope.cart = JSON.parse(localStorage.getItem('cart'));
    } else {
        $rootScope.cart = [];
    }


    for (var i = 0; i < $scope.dsSP.length; i++) {
        if ($scope.dsSP[i].id == $routeParams.id) {
            $scope.product = $scope.dsSP[i];
            console.log($scope.dsSP[i]);
            break;
        }
    }


    $scope.mua = function (product) {
        if ($rootScope.cart.filter(i => i.id === product.id).length === 0) {
            product.soLuong = 1;
            $rootScope.cart.push(product);
        } else {
            $rootScope.cart.forEach(i => {
                if (i.id == product.id) {
                    i.soLuong++;
                }
            });
        }
        console.log($rootScope.cart);
        localStorage.setItem('cart', JSON.stringify($rootScope.cart));

    }
    $scope.totalItemsInCart = 0;


    function calculateTotalItemsInCart() {
        var totalItems = 0;
        $rootScope.cart.forEach(function (item) {
            totalItems += item.soLuong || 0;
        });
        return totalItems;
    }

    $scope.$watchCollection(function () {
        return $rootScope.cart;
    }, function (newCart, oldCart) {
        $scope.totalItemsInCart = calculateTotalItemsInCart();
    });

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    $scope.calculateDiscountPercentage = function (originalPrice, discountedPrice) {
        if (originalPrice === 0) return 0;
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    };

    $scope.renderStar = function (number) {
        var codeStar = '';
        for (var i = 0; i < number; i++) {
            codeStar += `<i class="fa-solid fa-star"></i>`;
        }
        for (var i = 0; i < 5 - number; i++) {
            codeStar += `<i class="fa-regular fa-star"></i>`;
        }
        return codeStar;
    }

    $scope.saoDangChon = 0;
    $scope.saoDuocChon = 0;
    $scope.noiDungDanhGia = '';
    $scope.luuDanhGia = function () {
        $scope.product.comments.unshift({
            "user": {
                "id" : 1,
                "fullname" : "Sơn Tùng MTP"
            },
            "date": new Date().toLocaleDateString('sv-SE'),
            "content": $scope.noiDungDanhGia,
            "star" : $scope.saoDuocChon
        });
        document.querySelector('#close-modal').click();
    }
});
