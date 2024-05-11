app.controller('userCtrl', function ($scope, $http, $window) {
    $scope.users = [];

    $http.get('data.json')
        .then(function (response) {
            $scope.users = response.data.users;
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });


    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;

        var loggedInUser = $scope.users.find(function (user) {
            return user.username === username && user.password === password;
        });

        if (loggedInUser) {
            alert('Đăng nhập thành công!');
            $window.location.href = '/';
        } else {
            alert('Tên người dùng hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
    };
});
