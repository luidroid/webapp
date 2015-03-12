'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:WnetworkCtrl
 * @description
 * # WnetworkCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('WirelessNetworkCtrl', function ($scope,$state,HttpStatus,UserService,WirelessNetworkService) {
      $scope.installcode = ''; 
	  $scope.title = '';
      $scope.isError = false;
	  $scope.errors = {};
	  $scope.errorField = '';
	  $scope.isSuccess = false;
	  $scope.messages = {}; 

	  var installcodeTmp = angular.copy($scope.installcode);
	  	  
	  // Get user role
	  UserService.getUser().then(function(res){
		  $scope.isAdmin = UserService.isAdmin(res.data.role);
	  }, function(){
	  	  goToLoginView();
	  });
	  	  
	  // Labels
	  WirelessNetworkService.getLabels().then(function(res){
	  	 $scope.translation = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Get initial installcode values
	 /* WirelessNetworkService.getInitialValues().then(function(res){
		  $scope.installcode = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });*/

	  // Save installcode settings values
	  $scope.submit = function(){
		  WirelessNetworkService.saveInstallCode($scope.installcode).then(function(res){
			 
			  if(res.data.errorField){
			  	  $scope.isSuccess = false;
				  $scope.errorField = res.data.errorField; 
			  }
			  else if(res.data.errors){
			  	  $scope.title = res.data.title;
				  $scope.isError = true;
				  $scope.errors = res.data.errors;	  
				  $scope.isSuccess = !$scope.isError;
			  }
			  else{
			  	  $scope.title = res.data.title;
				  $scope.isSuccess = true;
				  $scope.messages = res.data.success;
				  $scope.isError = !$scope.isSuccess;
				  $scope.errorField = '';
				  $scope.checked = false;
			  }
			  installcodeTmp = angular.copy($scope.installcode);
			  angular.element('#saveButton').blur();

		  }, function(error){ 
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
	  };
	   
	  
	  // Cleans error message if field is edited after sending form
	  $scope.clean = function(){
		  if(installcodeTmp !== $scope.installcode){
			  $scope.errorField = '';
		  }
	  };
	  	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };

  });
