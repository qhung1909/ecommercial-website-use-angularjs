app.controller('cartCtrl', function ($scope, $window, $location, $http) {
    $scope.userInfo = {};
    $scope.discounts = [];

    $http.get('data.json')
        .then(function (response) {
            $scope.discounts = response.data.discount;
            console.log('Discounts:', $scope.discounts);
        })
        .catch(function (error) {
            console.error('Error fetching discounts:', error);
        });

    $scope.discountAmount = 0;
    $scope.discount = function () {
        var voucher = $scope.userInfo.voucher;

        if (!voucher || voucher.trim() === '') {
            $scope.discountTotal = $scope.tongTien();
            console.log('Tổng tiền:', $scope.discountTotal);
            return;
        }

        var discountCode = $scope.discounts.find(function (discount) {
            return discount.code === voucher;
        });

        if (discountCode) {
            var currentDate = new Date();
            var expirationDate = new Date(discountCode.date);

            if (currentDate <= expirationDate) {
                discountAmount = discountCode.amount;
                $scope.discountTotal = $scope.tongTien() - discountAmount;
                console.log(discountAmount);
                alert('Áp dụng mã giảm giá thành công.');
            } else {
                alert('Mã giảm giá đã hết hạn.');
            }
        } else {
            alert('Mã giảm giá không tồn tại.');
        }
        console.log('Đã nhấn vào nút "SUBMIT", Mã giảm giá:', voucher);

    };


    $scope.submitOrder = function () {
        $scope.cart = [];
        $scope.userInfo = {};
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        alert('Đặt hàng thành công!');
        $location.path('/');
        $scope.$on('$locationChangeSuccess', function () {
            $window.location.reload();
        });
    };

    $scope.xoa = function (id) {
        $scope.cart.splice($scope.cart.findIndex(i => i.id === id), 1);
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }

    $scope.tinhTongTien = function () {
        var tongTien = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            tongTien += $scope.cart[i].price * $scope.cart[i].soLuong;
        }
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        return tongTien;
    }
    $scope.xoaHet = function () {
        $scope.cart = [];
        localStorage.setItem('cart', JSON.stringify($scope.cart));
    }

    $scope.decreaseQuantity = function (item) {
        if (item.soLuong > 1) {
            item.soLuong--;
        }
        localStorage.setItem('cart', JSON.stringify($scope.cart));

    };
    $scope.increaseQuantity = function (item) {
        item.soLuong++;
        localStorage.setItem('cart', JSON.stringify($scope.cart));

    };
    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    $scope.calculateTotal = function (item) {
        var price = parseFloat(item.price);
        var quantity = parseFloat(item.soLuong);
        return (price * quantity).toFixed(2);
    };

    $scope.tongTien = function () {
        return $scope.cart.reduce((init, cur) => init + cur.price * cur.soLuong, 0);
    }

    $scope.tongSoSanPham = function () {
        return $scope.cart.length;
    };
    $scope.discount();
});