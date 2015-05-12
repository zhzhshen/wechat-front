angular.module('starter.controllers', [])
    .controller('RegisterCtrl', function ($scope, $http, $ionicPopup, $location, register, $state) {
        $scope.nextStep = function () {
            if ($scope.account == null) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请输入用户名'
                });
            } else if ($scope.password == null) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请输入密码'
                });
            } else if ($scope.confirmPassword == null) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请再次输入密码'
                });
            } else if ($scope.password != $scope.confirmPassword) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '两次输入密码不一致'
                });
            } else {
                register.stash($scope.account, $scope.password);
                $state.go('register.step2')
                //$location.path("/register/step2")
            }
        };

        $scope.register = function () {
            alert('register!');
            register.registerReq($scope.phone, $scope.smsVerifyCode);
        };

        $scope.sendSms = function () {
            alert('sms!');
            //var phone = $scope.phone;
        };

    })

    .controller('BindCtrl', function ($scope) {

    });
