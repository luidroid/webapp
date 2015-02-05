'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:PasswordCtrl
 * @description
 * # PasswordCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('PasswordCtrl', function ($scope,$state,HttpStatus,UserService) {
      $scope.user = {
		  username: '',
		  currentPassword: '',
		  newPassword: ''
	  };
	  $scope.title = '';
      $scope.isError = false;
	  $scope.errors = {};
	  $scope.isSuccess = false;
	  $scope.messages = {};
	  $scope.errorFields = {};
	  $scope.translation = {};
	  $scope.rules = {};
	  $scope.options = [];
	  $scope.selectedOption = {};
	  var userTmp = angular.copy($scope.user);

	  // Get labels
	  UserService.getLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // User options
	  UserService.getUserOptions().then(function(res){
		 $scope.options = res.data.options;
	     $scope.selectedOption = $scope.options[res.data.selectedPos];
	  }, function(){
	     console.log('error user options');
	  });
	  
	  // Get validation rules
	  UserService.getPasswordRules().then(function(res){
	  	$scope.rules = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Change password
	  $scope.submit = function(){
		 $scope.user.username = $scope.selectedOption.value;
		 UserService.changePassword($scope.user).then(function(res){			 
			 if(res.data.errors){
				  $scope.title = res.data.title;
				  $scope.errors = res.data.errors;
				  $scope.isError = true;
				  $scope.isSuccess = !$scope.isError;
			 }	 	 
			 if(res.data.errorFields){
				 $scope.errorFields = res.data.errorFields;
			 }
			 if(res.data.success){
				  $scope.title = res.data.title;
				  $scope.messages = res.data.success;
				  $scope.isSuccess = true;
				  $scope.isError = !$scope.isSuccess;
			 }
			 userTmp = angular.copy($scope.user);
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
		  angular.element('#saveButton').blur(); 
	  }; 
	  
	  // Cleans error message if field is edited after sending form
	  $scope.clean = function(){
		  if(userTmp.username !== $scope.user.username){
			  $scope.errorFields.username = '';
		  }
		  if(userTmp.currentPassword !== $scope.user.currentPassword){
			  $scope.errorFields.currentPassword = '';
		  }
		  if(userTmp.newPassword !== $scope.user.newPassword){
			  $scope.errorFields.newPassword = '';
		  }
	  };

	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
