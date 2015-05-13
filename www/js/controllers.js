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
            register.registerReq($scope.phone, $scope.smsVerifyCode);
        };

        $scope.sendSms = function () {
            //var phone = $scope.phone;
        };

    })

    .controller('SubjectsCtrl', function($scope, subjects){
        $scope.subjects = subjects.all();
    })

    .controller('SubjectDetailCtrl', function($scope, $stateParams, subjects){
        $scope.subject = subjects.get($stateParams.subjectId);
    })

    .controller('BindCtrl', function ($scope) {

    });
