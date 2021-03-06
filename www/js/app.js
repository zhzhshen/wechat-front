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

            .state('subjects', {
                url: '/subjects',
                views: {
                    '@': {
                        templateUrl: 'templates/subjects.html',
                        controller: 'SubjectsCtrl'
                    }
                }
            })
            .state('detail', {
                url: '/subjects/:subjectId',
                views: {
                    '@': {
                        templateUrl: 'templates/subjectDetail.html',
                        controller: 'SubjectDetailCtrl'
                    }
                }
            })

            .state('investment', {
                url: '/investment',
                templateUrl: 'templates/investment.html'
            })

            .state('account', {
                url: '/accouont',
                templateUrl: 'templates/account.html'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });
