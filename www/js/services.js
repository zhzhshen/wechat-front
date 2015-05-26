angular.module('starter.services', [])
    .factory("GLOBAL", function () {
        var accessToken;

        return {
            setAccessToken: function (val) {
                accessToken = val;
            },
            getAccessToken: function () {
                return accessToken;
            }
        }
    })

    .factory('users', function ($http, domain, GLOBAL) {
        var openId;
        var phone;

        return {
            setOpenId: function (id) {
                openId = id;
            },

            getOpenId: function () {
                return openId;
            },

            getPhone: function () {
                return phone;
            },

            checkBidingStatus: function (id) {
                var req = {
                    method: 'POST',
                    url: domain + '/ums/users/wechat-binding-validation',
                    data: {
                        'openId': id
                    }
                };
                return $http(req);
            },

            checkPhoneDuplication: function (p) {
                phone = p;
                var req = {
                    method: 'POST',
                    url: domain + '/ums/users/phone-duplication-verification',
                    data: {
                        'phone': phone
                    }
                };
                return $http(req);
            },

            login : function(pwd){
                var req = {
                    method: 'POST',
                    url: domain + '/ums/users/login',
                    data: {
                        'phone': phone,
                        'password': pwd
                    },
                    headers: {
                        'ACCESS-TOKEN': GLOBAL.getAccessToken()
                    }
                };
                return $http(req);
            },

            current: function(){
                var req = {
                    method: 'GET',
                    url: domain + '/ums/users/current',
                    headers: {
                        'ACCESS-TOKEN': GLOBAL.getAccessToken()
                    }
                };
                return $http(req);
            }
        }
    })

    .factory('bind', function(GLOBAL, users, $http, domain){
        return {
            bind: function(){
                var req = {
                    method: 'POST',
                    url: domain + '/ums/users/',
                    data: {
                        'openId': users.getOpenId()
                    },
                    headers: {
                        'ACCESS-TOKEN': GLOBAL.getAccessToken()
                    }
                };
                return $http(req);
            }
        }
    })

    .factory('register', function (users, $http, domain, GLOBAL) {
        return {
            register: function (phone, password) {
                var req = {
                    method: 'POST',
                    url: domain + '/ums/users/register',
                    data: {
                        'phone': phone,
                        'password': password
                    },
                    headers: {
                        'ACCESS-TOKEN': GLOBAL.getAccessToken()
                    }
                };
                return $http(req);
            },

            sendSMSCode: function () {
                var phone = users.getPhone();
                var req = {
                    method: 'POST',
                    url: domain + '/ums/users/register/notification',
                    data: {
                        'phone': phone
                    },
                    headers: {
                        'ACCESS-TOKEN': GLOBAL.getAccessToken()
                    }
                };
                return $http(req);
            },

            validateSMSCode: function (verificationCode) {
                var req = {
                    method: 'POST',
                    url: domain + '/ums/users/register/notification/verification',
                    data: {
                        'smsVerifyCode': verificationCode
                    },
                    headers: {
                        'ACCESS-TOKEN': GLOBAL.getAccessToken()
                    }
                };
                return $http(req);
            }
        }
    })

    .factory('subjects', function ($http, domain) {
        var subjects;

        return {
            retrieveSubjects: function () {
                return $http({
                    method: 'GET',
                    url: domain + '/api/subjects'
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