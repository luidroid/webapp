'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ComponentListCtrl
 * @description
 * # ComponentListCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('ComponentListCtrl', function ($scope,$state,HttpStatus,UserService,ComponentService) {
      $scope.components = [];	 
	  $scope.errors = [];
	  $scope.isError = false;
	  $scope.warnings = [];
	  $scope.isWarning = false;
	  $scope.infos = [];
	  $scope.isInfo = false;
	  $scope.isLoading = false;
	  $scope.isAvailable = false;
	  $scope.isAdmin = false;
	  $scope.isCommission = false;
	  
	  // Get user role
	  UserService.getUser().then(function(res){
		  $scope.isAdmin = UserService.isAdmin(res.data.role);
	  }, function(){
	  	  goToLoginView();
	  });

	  // Labels
	  ComponentService.getComponentListLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Get component list
	  ComponentService.getComponents().then(function(res){
		  $scope.isLoading = true;
		  $scope.isAvailable = true;
	  	  $scope.components = res.data.components;
	  	  $scope.isCommission = res.data.isCommission;	  	  
	  	  	  	  	  		  
	  	  if(res.data.error){
	  		$scope.title = res.data.title;
	  		$scope.errors = res.data.error;
	  		$scope.isError = true;
		  }
	  	  
	  	  if(res.data.warning){
	  		$scope.title = res.data.title;
	  		$scope.warnings = res.data.warning;
	  		$scope.isWarning = true;
	  	  }
	  	  
	  	  if(res.data.info){
	  		$scope.infos = res.data.info;
	  		$scope.isInfo = true;
	  		$scope.isAvailable = false;
		  }
	  	  
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
