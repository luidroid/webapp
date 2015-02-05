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
    $scope.commission = {}; 
	  $scope.title = '';
      $scope.isError = false;
	  $scope.errors = {};
	  $scope.errorFields = {};
	  $scope.isSuccess = false;
	  $scope.messages = {}; 
	  var commissionTmp = angular.copy($scope.commission);
	  	  
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
	  
	  // Get initial commission values
	  WirelessNetworkService.getCommissionValues().then(function(res){
		  $scope.commission = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });

	  // Save commission settings values
	  $scope.submit = function(){
		  WirelessNetworkService.saveInstallCode($scope.commission).then(function(res){
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
			  commissionTmp = angular.copy($scope.commission);
			  angular.element('#saveButton').blur();
		  }, function(error){ 
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
	  };
	  
	 // Save timeout settings 
	  $scope.submitTimeoutForm = function(){
		  WirelessNetworkService.saveTimeout($scope.commission).then(function(res){
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
			  commissionTmp = angular.copy($scope.commission);
			  angular.element('#saveTimeoutButton').blur();
		  }, function(error){ 
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
	  };
	  
	  
	  // Cleans error message if field is edited after sending form
	  $scope.clean = function(){
		  if(commissionTmp.installationCode !== $scope.commission.installationCode){
			  $scope.errorFields.installationCode = '';
		  }
		  if(commissionTmp.timeout !== $scope.commission.timeout){
			  $scope.errorFields.timeout = '';
		  }
	  };
	  	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
