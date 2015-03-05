/*global $:false*/
'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function ($scope, $state, $window, NavbarService, LoginService, UserService, WirelessNetwork, CommissionService) {
  	$scope.currentYear = new Date().getFullYear();
  	angular.element('html,body').scrollTop(0);
    var customView;

  	NavbarService.getLabels().then(function(res){
  		$scope.translation = res.data;
  	});

  	UserService.getRole().then(function(res){
  		$scope.user = res.data; 
  		$scope.isAdmin = UserService.isAdmin($scope.user.role);
  	});

    $scope.checkView = function(view){
      validateView(view);
    };

    $scope.goToView = function(){
       CommissionService.closeWirelessNetwork();
       WirelessNetwork.isOpen = false;
       angular.element('#commissionModal').modal('hide');
       if(customView === 'login'){
         LoginService.logout();
       }
       $state.go(customView);
    };

  	// Logout
  	$scope.logout = function(){
      if(WirelessNetwork.isOpen){
        validateView('login');
      }
      else{
        LoginService.logout();
        goToLoginView();
      }		
  	};

    $scope.getNavbarClass = function(path) {
  		return setNavClass(path);
  	};

  	var setNavClass = function(path){
  		return $state.current.name === path ? 'active' : '';
  	};

  	var goToLoginView = function(){
  	    $state.go('login');
  	};


    var validateView = function(view){
       if(WirelessNetwork.isOpen){
          customView = view;
          angular.element('#commissionModal').modal('show'); 
        }
        else{
          $state.go(view);
        }
    };

    // Warning dialog if user reloads page while wireless network is open
    var windowElement = angular.element($window);
    windowElement.on('beforeunload', function (event) {
      if(WirelessNetwork.isOpen){    
        return $scope.translation.dialog.message;      
      }    
    });
 /* $(window).bind('beforeunload', function() {
         if(WirelessNetwork.isOpen){
            return $scope.translation.dialog.message;
         }
    });*/


  });
