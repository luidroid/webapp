'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', function ($scope,$state,NavbarService,LoginService,UserService) {
  	$scope.currentYear = new Date().getFullYear();
  	
  	NavbarService.getLabels().then(function(res){
  		$scope.translation = res.data;
  	});

  	UserService.getRole().then(function(res){
  		$scope.user = res.data;
  	});

  	// Logout
	$scope.logout = function(){
		LoginService.logout();
		goToLoginView();
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

  });
