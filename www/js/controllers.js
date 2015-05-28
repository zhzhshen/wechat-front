angular.module('starter.controllers', [])
    .controller('RegisterCtrl', function ($scope, $http, $ionicPopup, $location, register, $state, users, bind, $interval) {
        $scope.validateSMSCode = function () {
            var code = $scope.smsVerifyCode;
            if (code == null || code == '') {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请输入短信验证码'
                });
            } else if (isNaN(code) || code.length != 6) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '短信验证码格式错误'
                });
            } else {
                register.validateSMSCode($scope.smsVerifyCode).then(function success(resp) {
                    $state.go('register.step2');
                }, function error(resp) {
                    $ionicPopup.alert({
                        title: '错误',
                        template: '手机号验证码错误'
                    });
                });
            }
        }

        $scope.register = function () {
            var pwd = $scope.password;

            if (pwd == null || pwd == '') {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请输入密码'
                });
            } else if ($scope.confirmPassword == null) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请再次输入密码'
                });
            } else if (pwd != $scope.confirmPassword) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '两次输入密码不一致'
                });
            } else if (!isNaN(pwd) || pwd.length < 8) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '密码格式错误'
                });
            } else {
                register.register(users.getPhone(), pwd).then(function success(resp) {
                    users.login(pwd).then(function success() {
                        users.current().then(function success(resp) {
                            bind.bind(resp.data['id']).then(function success() {
                                $state.go('register.success');
                            }, function error(resp) {
                                if (resp.status == 403) {
                                    $ionicPopup.alert({
                                        title: '错误',
                                        template: '密码错误'
                                    });
                                } else {
                                    $ionicPopup.alert({
                                        title: '错误',
                                        template: '微信已绑定'
                                    });
                                }
                            });
                        });
                    }, function error() {
                    });
                }, function error(resp) {

                });
            }
        };

        $scope.countDown = 120;
        $scope.valid = true;
        $scope.sendSms = function () {
            if ($scope.valid) {
                $scope.valid = false;
                register.sendSMSCode().then(function success(resp) {
                    if (resp.status == 200) {

                    }
                }, function error(resp) {
                    if (resp.status == 400) {
                        $ionicPopup.alert({
                            title: '错误',
                            template: '手机号格式错误'
                        });
                    }
                });

                $interval(function () {
                    if ($scope.countDown > 1) {
                        $scope.countDown = $scope.countDown - 1
                    } else {
                        $scope.valid = true;
                        $scope.countDown = 120;
                    }
                }, 1000, 120);
            }
        };
    })

    .controller('SubjectsCtrl', function ($scope, subjects) {
        subjects.retrieveSubjects().then(function (resp) {
            console.log(resp.data);
            $scope.subjects = angular.fromJson(resp.data).items;
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
                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
        };
    })

    .controller('MobileCtrl', function ($scope, $stateParams, users, $state, $ionicPopup, GLOBAL) {
        users.setOpenId($stateParams.openId);

        $scope.nextStep = function () {
            var phone = $scope.phone;
            if (phone == null || phone == '') {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请输入手机号'
                });
            } else if (isNaN(phone) || phone.length != 11) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '手机号格式错误'
                });
            } else {
                users.checkPhoneDuplication($scope.phone).then(function success(resp) {
                    if (GLOBAL.getAccessToken() == null) {
                        GLOBAL.setAccessToken(resp.headers('ACCESS-TOKEN'));
                    }
                    if (resp.status == 200) {
                        $state.go('bind')
                    }
                }, function error(resp) {
                    if (GLOBAL.getAccessToken() == null) {
                        GLOBAL.setAccessToken(resp.headers('ACCESS-TOKEN'));
                    }
                    if (resp.status == 400) {
                        $ionicPopup.alert({
                            title: '错误',
                            template: '手机号格式错误'
                        });
                    } else if (resp.status == 404) {
                        $state.go('register');
                    }
                });
            }
        }
    })

    .controller('InvestConfirmCtrl', function () {

    })

    .controller('ProfileCtrl', function ($scope, $state) {
        $scope.myInvestments = function () {
            $state.go('myInvestments');
        }

        $scope.transactionHistory = function () {
            $state.go('transactionHistory');
        }

    })

    .controller('BindCtrl', function ($scope, bind, users, $ionicPopup, $state) {
        $scope.bind = function () {
            var pwd = $scope.password;
            if (pwd == null || pwd == '') {
                $ionicPopup.alert({
                    title: '错误',
                    template: '请输入密码'
                });
            } else if (!isNaN(pwd) || pwd.length < 8) {
                $ionicPopup.alert({
                    title: '错误',
                    template: '密码格式错误'
                });
            } else {
                users.login($scope.password).then(function success() {
                    users.current().then(function success(resp) {
                        bind.bind(resp.data['id']).then(function success() {
                            $state.go('register.success');
                        }, function error() {
                            if (resp.status == 403) {
                                $ionicPopup.alert({
                                    title: '错误',
                                    template: '密码错误'
                                });
                            } else {
                                $ionicPopup.alert({
                                    title: '错误',
                                    template: '微信已绑定'
                                });
                            }
                        });
                    });
                }, function error() {
                    $ionicPopup.alert({
                        title: '错误',
                        template: '密码错误'
                    });
                });
            }
        }
    });