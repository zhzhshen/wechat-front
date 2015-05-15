angular.module('starter.services', [])
    .factory('register', function () {
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