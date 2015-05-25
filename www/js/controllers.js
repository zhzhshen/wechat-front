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
                $state.go('register.step2');
            }
        };

        $scope.register = function () {
            //register.registerReq($scope.phone, $scope.smsVerifyCode).then(function(){
            //    alert('success');
            //});
            $state.go('register.success');
        };

        $scope.sendSms = function () {
            //var phone = $scope.phone;
        };

    })

    .controller('SubjectsCtrl', function ($scope, subjects) {
        subjects.retrieveSubjects().then(function (data) {
            $scope.subjects = angular.fromJson(data.data).items;
        });
    })

    .controller('SubjectDetailCtrl', function ($scope, $stateParams, subjects, $ionicPopup, $state) {
        subjects.retrieveSubjects().then(function (data) {
            var subjects = angular.fromJson(data.data).items;
            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i].id == parseInt($stateParams.subjectId)) {
                    $scope.subject = subjects[i];
                }
            }
        });

        $scope.popupAmount = function () {
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/popupChooseAmount.html',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>立即投资</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('subjects.investConfirm');
                            //e.preventDefault();

                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        };
    })

    .controller('MobileCtrl', function($scope, $stateParams, users, $state) {
        users.setOpenId($stateParams.openId);

        $scope.nextStep = function() {
            users.checkPhoneDuplication($scope.phone).then(function(status){
                if(status==400) {
                    alert('手机号已注册');
                } else {
                    $state.go('register');
                }
            });
        }
    })

    .controller('InvestConfirmCtrl', function() {

    })

    .controller('ProfileCtrl', function($scope, $state) {
        $scope.myInvestments = function() {
            $state.go('myInvestments');
        }

        $scope.transactionHistory = function() {
            $state.go('transactionHistory');
        }

    })

    .controller('MySubjectsCtrl', function() {

    })

    .controller('BindCtrl', function ($scope) {

    });