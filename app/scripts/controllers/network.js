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
      $scope.network = {
      	'upnp' : true,
      	'currentDhcp' : true,
      	'currentIpAddress' : '',
      	'currentDefaultGateway' : '',
      	'dhcp' : true,
      	'ipAddress' : '',
      	'defaultGateway' : '',
      	'dns' : '',
      	'selectedPos' : 0
      };

	  //$scope.currentSettings = true;
	  $scope.isDisabled = '';
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
		  if(!$scope.isAdmin){
		  	$scope.isDisabled = true;
		  }
	  }, function(){
	  	  goToLoginView();
	  });
	    
	  // Get labels
	  NetworkService.getLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Get initial network values
	  NetworkService.getNetworkValues().then(function(res){
	  	  $scope.network = res.data;
		  $scope.servers = res.data.currentDns;
		  $scope.currentSelectedOption = $scope.network.currentCidr.options[res.data.currentCidr.selectedPos]; 
  	  	  $scope.selectedOption = $scope.network.cidr.options[res.data.cidr.selectedPos];
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });

	  // Save changes button
	  $scope.submit = function(){
	  	  $scope.network.selectedPos = $scope.selectedOption.value; console.log($scope.network);
		  NetworkService.saveNetworkValues($scope.network).then(function(res){
			  if(res.data.errorFields){ 
				  $scope.errorFields = res.data.errorFields;
				  //$scope.currentSettings = false;
				  if(res.data.errors){
					  $scope.isError = true;
					  $scope.title = res.data.errors.title;
					  $scope.errors = res.data.errors.messages;
					  $scope.isSuccess = !$scope.isError;
				  }
			  }
			  else{
				  $scope.isSuccess = true;
				  $scope.title = res.data.success.title;
				  $scope.messages = res.data.success.messages;
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
			  $scope.errorFields.IPV4 = '';
		  }
		  if(networkTmp.defaultGateway !== $scope.network.defaultGateway){
			  $scope.errorFields.IPV4DEFAULTGATEWAY = '';
		  }
		  if(networkTmp.dns !== $scope.network.dns){
			  $scope.errorFields.SERVERLIST = '';
		  }
		  return;
	  };
	  	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
