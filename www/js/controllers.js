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
                //$location.path("/register/step2")
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

        //$http({
        //    method: 'GET',
        //    url: 'https://pre.quboqu.com/api/subjects'
        //}).success(function (data) {
        //    $scope.subjects = angular.fromJson(data).items;
        //}).error(function () {
        //    alert("error");
        //});
    })

    .controller('SubjectDetailCtrl', function ($scope, $stateParams, subjects, $ionicPopup, $timeout) {

        //$http({
        //    method: 'GET',
        //    url: 'https://pre.quboqu.com/api/subjects'
        //}).success(function (data) {
        //    var subjects = angular.fromJson(data).items;
        //    alert('ok');
        //    for (var i = 0; i < subjects.length; i++) {
        //        if (subjects[i].id === parseInt(subjectId)) {
        //            $scope.subject = subjects[i];
        //            alert('success');
        //        }
        //    }
        //}).error(function () {
        //    alert("error");
        //});

        subjects.retrieveSubjects().then(function (data) {
            var subjects = angular.fromJson(data.data).items;
            for (var i = 0; i < subjects.length; i++) {
                if (subjects[i].id == parseInt($stateParams.subjectId)) {
                    $scope.subject = subjects[i];
                }
            }
        });


        //$scope.subject = subjects.get($stateParams.subjectId);

        $scope.popupAmount = function () {
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/popupChooseAmount.html',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>确认投资</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            e.preventDefault();

                        }
                    }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });
            //$timeout(function () {
            //    myPopup.close();
            //}, 3000);
        };
        //
        //$scope.closePopup = function () {
        //    myPopup.closePopup();
        //}
    })

    .controller('BindCtrl', function ($scope) {

    });
