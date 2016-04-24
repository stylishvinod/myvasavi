angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $rootScope, $state) {

    $rootScope.serverURL = "http://localhost:8080";

    $scope.loadEvents = function() {
        $state.go("app.events");
    }

    $scope.loadCommittee = function() {
        $state.go("app.committee");
    }

    $scope.loadOffers = function() {
        $state.go("app.offers");
    }

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady()
    {

  //      $scope.changeOricommitteeCtrlantationPortrait = function() {
            screen.lockOrientation('portrait');
  //      }
    }

    $scope.homePage = function() {
  //      $state.go("app.mainPage");
//   $state.go("app.mainPage", {}, { reload: true });
   $state.transitionTo('app.mainPage', null, {reload: true, notify:true});
    //    $state.reload("app.mainPage");

//        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    }

})

.controller('allModalsCtrl', function($scope, $http, $stateParams, $rootScope, backcallFactory) {
    backcallFactory.backcallfun();

    $http.get($rootScope.serverURL + '/allModels/' + $stateParams.modelFor).success(function(data) {
        console.log(data);
        $scope.modelFor = $stateParams.modelFor;
        $scope.allModals = data;
    });
})

.controller('eventsCtrl', function($scope, $http, $stateParams, $rootScope) {
        $http.get($rootScope.serverURL + '/getEvents').success(function(data) {
            $scope.events = data;
        });
    })

    .controller('committeeCtrl', function($scope, $http, $stateParams, $rootScope) {
            $http.get($rootScope.serverURL + '/getCommittee').success(function(data) {
                $scope.comminfo = data;
            });
        })

        .controller('offersCtrl', function($scope, $http, $stateParams, $rootScope) {
                $http.get($rootScope.serverURL + '/getOffers').success(function(data) {
                    $scope.offerinfo = data;
                });
            })


    .controller('perticularEventCtrl', function($scope, $http, $stateParams, $rootScope, $ionicSlideBoxDelegate) {
        $http.get($rootScope.serverURL + '/getPerticularEvent/' + $stateParams.eventId).success(function(data) {
            $scope.eventObj = data[0];

            $ionicSlideBoxDelegate.update();
            $ionicSlideBoxDelegate.loop(true);
        });
    })

.controller('shopInfoCtrl', function($scope, $http, $stateParams, $rootScope, $ionicLoading, $compile, $ionicSlideBoxDelegate) {
    $http.get($rootScope.serverURL + '/shopInfo/' + $stateParams.shopId).success(function(data) {
        console.log(data);
        $scope.shopObj = data[0];
        $scope.conceptObj = $scope.shopObj.models_available[0];

        $ionicSlideBoxDelegate.update();
        $ionicSlideBoxDelegate.loop(true);

        function initialize() {
            var myLatlng = new google.maps.LatLng(16.306386,80.464135);
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><center>" + $scope.shopObj.shop_name + ",</center><center>Sri Vasavi Wholesale Cloth Merchant Society,</center><center>Guntur<cenetr></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });
            infowindow.open(map, marker);
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
            $scope.map = map;
        }
        ionic.Platform.ready(initialize);
    });

})


.controller('perticularModalCtrl', function($scope, $stateParams, $http, $rootScope) {

    $http.get($rootScope.serverURL + '/shopsUnderModel/' + $stateParams.modelFor + '/' + $stateParams.perticularModalName)
        .success(function(data) {
            $scope.shopDetails = data;
            //  $scope.items = data;
        });

})

  .controller('serchShopCtrl', function($scope, $http, $rootScope) {
  var stringEx = '';
  $http.get($rootScope.serverURL + '/listShops').success(function(data) {
      console.log(data);
      $scope.shopDetails = data;
  });
  })



//  Factory methods
.factory('backcallFactory', ['$state','$ionicPlatform','$ionicHistory','$timeout',function($state,$ionicPlatform,$ionicHistory,$timeout){

  var obj={}
      obj.backcallfun=function(){

         $ionicPlatform.registerBackButtonAction(function () {
            if ($state.current.name == "app.mainPage") {
              var action= confirm("Do you want to Exit?");
               if(action){
                  navigator.app.exitApp();
                }//no else here just if

        }else{
              $ionicHistory.nextViewOptions({
                   disableBack: true
                  });
          $state.go('app.mainPage');
          //go to home page
       }
          }, 100);//registerBackButton
  }//backcallfun
  return obj;
  }]);
