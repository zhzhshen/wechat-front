angular.module('starter.services', [])
    .factory('users', function() {
        var openId;
        var phone;

        return {
            setOpenId : function(id) {
                openId = id;
            },

            getOpenId : function() {
                return openId;
            },

            checkBidingStatus : function(id, $http) {
                var req = {
                    method: 'POST',
                    url: 'https://pre.quboqu.com/ums/users/wechat-binding-validation',
                    data: {
                        'openId': id
                    }
                };
                return $http(req);
            },

            checkPhoneDuplication : function(phone, $http) {
                this.phone = phone;
                var req = {
                    method: 'POST',
                    url: 'https://pre.quboqu.com/ums/users/phone-duplication-verification',
                    data: {
                        'phone': phone
                    }
                };
                return $http(req);
            }
        }
    })

    .factory('register', function (users) {
        var account;
        var password;

        return {
            stash: function (name, pwd) {
                account = name;
                password = pwd;
            },

            registerReq: function (phone, smsVerifyCode) {
                var req = {
                    method: 'POST',
                    url: 'https://pre.quboqu.com/ums/users/register',
                    data: {
                        'name': account,
                        'password': password,
                        'phone': phone,
                        'smsVerifyCode': smsVerifyCode
                    }
                };
                return $http(req);
            }
        }
    })

    .factory('subjects', function ($http) {
        var subjects;

        return {
            retrieveSubjects: function () {
                return $http({
                    method: 'GET',
                    url: 'https://pre.quboqu.com/api/subjects'
                });
            },
            get: function (subjectId) {
                alert(subjects.length);
                for (var i = 0; i < subjects.length; i++) {
                    if (subjects[i].id === parseInt(subjectId)) {
                        alert('ok');
                        return subjects[i];
                    }
                }
                alert('not ok');
                return null;
            }
        }
    });