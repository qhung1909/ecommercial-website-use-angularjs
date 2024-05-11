app.controller('categoryCtrl', function($scope, $routeParams) {
    $scope.category = $routeParams.category;

    $scope.currentPage = 0; 
    $scope.pageSize = 5; 

    $scope.numberOfPages = function() {
        return Math.ceil($scope.dsSP.length / $scope.pageSize);
    };

    $scope.getCurrentPageItems = function() {
        var startIndex = $scope.currentPage * $scope.pageSize;
        var endIndex = startIndex + $scope.pageSize;
        return $scope.dsSP.slice(startIndex, endIndex);
    };
});
