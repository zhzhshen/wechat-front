angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/navigation.html'
            })

            .state('bind', {
                url: '/bind',
                views: {
                    '@': {
                        templateUrl: 'templates/bind.html',
                        controller: 'BindCtrl'
                    }
                }
            })

            .state('register', {
                url: '/register',
                views: {
                    '@': {
                        templateUrl: 'templates/register.html',
                        controller: 'RegisterCtrl'
                    }
                }
            })

            .state('register.step2', {
                url: '/step2',
                views: {
                    '@': {
                        templateUrl: 'templates/register2.html',
                        controller: 'RegisterCtrl'
                    }
                }
            })

            .state('register.success', {
                url: '/success',
                views: {
                    '@': {
                        templateUrl: 'templates/registerSuccess.html'
                    }

                }
            })

            .state('subjects', {
                url: '/subjects',
                views: {
                    '@': {
                        templateUrl: 'templates/subjects.html',
                        controller: 'SubjectsCtrl'
                    }
                }
            })
            .state('subjects.detail', {
                url: '/:subjectId',
                views: {
                    '@': {
                        templateUrl: 'templates/subjectDetail.html',
                        controller: 'SubjectDetailCtrl'
                    }
                }
            })

            .state('subjects.investConfirm', {
                url: '/investConfirm',
                views: {
                    '@': {
                        templateUrl: 'templates/investConfirm.html',
                        controller: 'InvestConfirmCtrl'
                    }
                }
            })

            .state('mobileCheck', {
                url: '/mobileCheck/:openId',
                views: {
                    '@': {
                        templateUrl: 'templates/mobileCheck.html',
                        controller: 'MobileCtrl'
                    }
                }
            })

            .state('profile', {
                url: '/profile',
                views: {
                    '@': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('myInvestments',{
                url: '/myInvestments',
                views: {
                    '@' : {
                        templateUrl: 'templates/myInvestments.html'
                    }
                }
            })

            .state('mySubjects', {
                url: '/mySubjects',
                views: {
                    '@': {
                        templateUrl: 'templates/mySubjects.html',
                        controller: 'MySubjectsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });
