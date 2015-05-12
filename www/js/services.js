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

    .factory('investment', function () {
        var subjects = [{
            id: 1,
            title: '标的1',
            status: '募集中',
            annual_rate: '10.8%',
            time_left: '23',
            min_inv_amount: '1000'
        },{
            id: 2,
            title: '标的2',
            status: '募集中',
            annual_rate: '11.6%',
            time_left: '98',
            min_inv_amount: '3200000'
        }];

        return {
            all: function() {
                return subjects;
            }
        }
    });