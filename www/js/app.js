// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])
    .factory('Auth', function() {
        return {
            isLoggedIn: false
        };
    })



.run(function($ionicPlatform, $rootScope, $state, $location, Auth) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

})


.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/searchShop.html',
                controller: 'serchShopCtrl'
            }
        }
    })

    .state('app.events', {
        url: '/events',
        views: {
            'menuContent': {
                templateUrl: 'templates/eventsDisplay.html',
                controller: 'eventsCtrl'
            }
        }
    })

    .state('app.committee', {
        url: '/committee',
        views: {
            'menuContent': {
                templateUrl: 'templates/comitteeinfo.html',
                controller: 'committeeCtrl'
            }
        }
    })


    .state('app.offers', {
        url: '/offers',
        views: {
            'menuContent': {
                templateUrl: 'templates/offers.html',
                controller: 'offersCtrl'
            }
        }
    })


        .state('app.perticularEvent', {
            url: '/perticularEvent/:eventId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/perticularEvent.html',
                    controller: 'perticularEventCtrl'
                }
            }
        })



        .state('app.modals', {
            url: '/modals/:modelFor',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allModals.html',
                    controller: 'allModalsCtrl'
                }
            }
        })

    .state('app.mainPage', {
        url: '/mainPage',
        views: {
            'menuContent': {
                templateUrl: 'templates/mainPage.html'
            }
        }
    })

    .state('app.perticularModal', {
           url: '/perticularModal/:modelFor/:perticularModalName',
           views: {
               'menuContent': {
                   templateUrl: 'templates/searchShop.html',
                   controller: 'perticularModalCtrl'
               }
           }
       })



    .state('app.shopInfo', {
        url: '/shopInfo/:shopId',
        views: {
            'menuContent': {
                templateUrl: 'templates/shopInfo.html',
                controller: 'shopInfoCtrl'
            }
        }
    })



    // if none of the above states are matched, use this as the fallback
    //  $urlRouterProvider.otherwise('/app/playlists');
    $urlRouterProvider.otherwise('/app/mainPage');

});
