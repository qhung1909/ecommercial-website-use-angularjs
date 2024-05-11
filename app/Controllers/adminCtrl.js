app.controller('adminCtrl', function ($scope, $http) {
    $http.get('data.json').then(function(response) {
        $scope.dsSP = response.data.products;
        $scope.productCount = $scope.dsSP.length;

        var categories = [];

        for (var i = 0; i < $scope.dsSP.length; i++) {
            var productCategory = $scope.dsSP[i].categories;

            if (!categories.includes(productCategory)) {
                categories.push(productCategory);
            }
        }

       
        $scope.categoryCount = categories.length;
    });
    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
});