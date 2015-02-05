'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ComponentEditCtrl
 * @description
 * # ComponentEditCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('ComponentEditCtrl', function ($scope,$stateParams,$location,$state,HttpStatus,ComponentService) {
      $scope.component = {};
	  $scope.name = '';
	  $scope.title = '';
      $scope.isError = false;
	  $scope.errors = {};
	  $scope.errorFields = {};
	  var componentTmp = angular.copy($scope.component);
	  
	  // Labels
	  ComponentService.getComponentEditLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(error){ 
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Get validation rules
	  ComponentService.getValidationRules().then(function(res){
	  	$scope.rules = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Get component by Id
	  ComponentService.getEditComponentById($stateParams.id).then(function(res){
		  if(res.data.error){
	  		  $scope.errors = res.data.error;
	  		  $scope.isError = true;
		  }
		  else{
			  $scope.component = res.data.component;
		  	  $scope.name = $scope.component.name; 
		  } 	 
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Cancel button
	  $scope.cancel = function(){
		  goToComponentView();
	  };
	  
	  // Save button
	  $scope.submit = function(){
		  $scope.component.name = $scope.name;
		  ComponentService.editComponent($scope.component).then(function(res){
			  if(res.data.errors){
				  $scope.title = res.data.title;
				  $scope.errors = res.data.errors;
				  $scope.isError = true;
				  componentTmp = angular.copy($scope.component);
				  angular.element('#saveButton').blur();
			 }	 	 
			 if(res.data.errorFields){
				 $scope.errorFields = res.data.errorFields;
			 }else{
				  goToComponentView(); 
			 }	
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });	 
	  };
	  
	  // Cleans error message if field is edited after sending form
	  $scope.clean = function(){
		  if(componentTmp.name !== $scope.component.name){
			  $scope.errorFields.name = '';
		  }
	  };
	  
	  var goToComponentView = function(){
		  $location.path('/components/' + $stateParams.id);
	  };
	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
