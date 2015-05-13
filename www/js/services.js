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

                //$http.get("https://pre.quboqu.com/api/subjects?callback=JSON_CALLBACK")
                $http(req)
                    .success(function (response, data, status) {
                        alert('success');
                        //$scope.data = response;
                        //$scope.status = status;
                        //$scope.result = "success:";
                    }).error(function (response, data, status, headers, config) {
                        alert('fail');
                        //$scope.data = data || "Request failed";
                        //$scope.status = status;
                        //$scope.result = "error:";
                    });
            }
        }
    })

    .factory('subjects', function () {
        var subjects = [{
            id: 1,
            title: '标的1',
            status: '募集中',
            annual_rate: '10.8%',
            time_left: 23,
            min_inv_amoun: 1000,
            amount: 50000,
            instal_type: '先本后息',
            cur_inv_amount: 10000
        },{
            id: 2,
            title: '标的2',
            status: '募集中',
            annual_rate: '11.6%',
            time_left: 98,
            min_inv_amount: 2000,
            amount: 50000,
            instal_type: '等额本息',
            cur_inv_amount: 30000
        }];

        return {
            all: function() {
                return subjects;
            },
            get: function(subjectId) {
                for (var i = 0; i < subjects.length; i++) {
                    if (subjects[i].id === parseInt(subjectId)) {
                        return subjects[i];
                    }
                }
                return null;
            }
        }
    });