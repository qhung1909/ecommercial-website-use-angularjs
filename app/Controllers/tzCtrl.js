app.controller('tzCtrl', function ($scope, $location, $http) {
    $scope.showBanner = true;
    $scope.pageSize = 8;
    $scope.currentPage = 1;
    $scope.searchKeyword = '';

    $scope.$on('$locationChangeStart', function (event, next, current) {
        if ($location.path() !== '/') {
            $scope.showBanner = false;
        } else {
            $scope.showBanner = true;
        }
    });

    $scope.formatPrice = function (price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    $scope.dsSP = [];
    $http.get('data.json').then(
        function (res) {
            $scope.dsSP = res.data.products;
            var category = $location.path().split('/').pop();
            if (category) {
                $scope.filteredProducts = $scope.dsSP.filter(function (product) {
                    return product.categories === category;
                });
                $scope.currentCategory = category;
            } else {
                $scope.filteredProducts = $scope.dsSP;
            }
            $scope.pageChanged();
        },
        function (res) {
            console.log('Error: ' + res.status);
        }
    );

    $scope.pageChanged = function () {
        var startIndex = ($scope.currentPage - 1) * $scope.pageSize;
        var endIndex = startIndex + $scope.pageSize;
        $scope.pagedProducts = $scope.filteredProducts.slice(startIndex, endIndex);
        $scope.buildPages();
    };

    $scope.buildPages = function () {
        $scope.pages = [];
        var totalPages = $scope.numPages();
        for (var i = 1; i <= totalPages; i++) {
            $scope.pages.push(i);
        }
        // Tạo thanh số trang nhiều trang
        // Tự load giống fb. cuộn xuống thì hiện ra thêm SP
    };

    $scope.numPages = function () {
        return Math.ceil($scope.filteredProducts.length / $scope.pageSize);
    };

    $scope.setPage = function (page) {
        if (page >= 1 && page <= $scope.numPages()) {
            $scope.currentPage = page;
            $scope.pageChanged();
        }
    };


    $scope.$on('$locationChangeStart', function (event, next, current) {
        var category = $location.path().split('/').pop();
        $scope.search(category);
    });


    $scope.search = function () {
        var category = $scope.currentCategory;
        var searchKeyword = $scope.searchKeyword ? $scope.searchKeyword.toLowerCase() : '';

        var productsToSearch = $scope.dsSP;
        if (category) {
            productsToSearch = productsToSearch.filter(function (product) {
                return product.categories === category;
            });
        }

        if (searchKeyword) {
            $scope.filteredProducts = productsToSearch.filter(function (product) {
                return product.name.toLowerCase().includes(searchKeyword);
            });
        } else {
            $scope.filteredProducts = productsToSearch;
        }

        $scope.currentPage = 1;
        $scope.pageChanged();
    };

    $scope.sortByPriceDesc = function () {
        $scope.filteredProducts.sort(function (a, b) {
            return b.price - a.price;
        });
        $scope.currentPage = 1;
        $scope.pageChanged();
    };

    $scope.sortByPriceAsc = function () {
        $scope.filteredProducts.sort(function (a, b) {
            return a.price - b.price;
        });
        $scope.currentPage = 1;
        $scope.pageChanged();
    };

    $scope.sortByNameAZ = function () {
        $scope.filteredProducts.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); 
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        $scope.currentPage = 1;
        $scope.pageChanged();
    };
    
    $scope.sortByNameZA = function () {
        $scope.filteredProducts.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); 
            var nameB = b.name.toUpperCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
        $scope.currentPage = 1;
        $scope.pageChanged();
    };

});
