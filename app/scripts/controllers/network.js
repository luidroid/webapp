'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:NetworkCtrl
 * @description
 * # NetworkCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('NetworkCtrl', function ($scope,$state,HttpStatus,UserService,NetworkService) {
      $scope.network = {};
	  $scope.title = '';
      $scope.isError = false;
	  $scope.errors = {};
	  $scope.errorFields = {};
	  $scope.isSuccess = false;
	  $scope.messages = {}; 
	  var networkTmp = angular.copy($scope.network);
		
	  // Get user role
	  UserService.getUser().then(function(res){
		  $scope.isAdmin = UserService.isAdmin(res.data.role);
	  }, function(){
	  	  //goToLoginView();
	  });
	    
	  // Get labels
	  NetworkService.getLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			//goToLoginView();
	  	  }
	  });
	  
	  // Get initial network values
	  NetworkService.getNetworkValues().then(function(res){
		  $scope.network = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			//goToLoginView();
	  	  }
	  });

	  // Save changes button
	  $scope.submit = function(){
		  NetworkService.saveNetworkValues($scope.network).then(function(res){
			  $scope.title = res.data.title;
			  if(res.data.errors){
				  $scope.isError = true;
				  $scope.errors = res.data.errors;
				  if(res.data.errorFields){
					  $scope.errorFields = res.data.errorFields; 
				  }
				  $scope.isSuccess = !$scope.isError;
			  }
			  
			  if(res.data.success){
				  $scope.isSuccess = true;
				  $scope.messages = res.data.success;
				  $scope.isError = !$scope.isSuccess;
				  $scope.errorFields = {};
			  }	
			  networkTmp = angular.copy($scope.network);
			  angular.element('#saveButton').blur();
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
		  angular.element('#saveButton').blur();
	  }; 
	  
	  // Cleans error message if field is edited after sending form
	  $scope.clean = function(){
		  if(networkTmp.ipAddress !== $scope.network.ipAddress){
			  $scope.errorFields.ipAddress = '';
		  }
		  return;
	  };
	  	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
