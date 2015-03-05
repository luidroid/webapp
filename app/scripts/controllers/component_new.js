/*global jQuery:false*/
'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ComponentNewCtrl
 * @description
 * # ComponentNewCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('ComponentNewCtrl', function ($scope,_,$state,$interval,$timeout,HttpStatus,ComponentService,WirelessNetworkService) {
      $scope.components = [];
	  $scope.endTime = 0;
	  $scope.wnetwork = false;
	  $scope.isLoading = true;
	  $scope.isEmpty = true; 
	  $scope.rules = {};
	  $scope.title = '';
	  $scope.success = false;
	  $scope.isError = false;
	  $scope.errors = [];
  	  var serviceInterval,
	  	  service,
	  	  stopService;
	  
	  $scope.commissionTimeout = 30;
	  var isValid = false;

	  $scope.isFormValid = function(isDisabled){
	  	isValid = isDisabled;
	  	return isValid ? '' : 'true';	  
	  };

	  // Labels
	  ComponentService.getComponentNewLabels().then(function(res){ 
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
	  
	  // Wireles network
	  WirelessNetworkService.isOpenNetwork().then(function(res){
		  $scope.wnetwork = res.data.wnetwork;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	 	  
	  // Check if timer stopped
	  $scope.$on('timer-stopped', function (){ 
		  stopService();
		  $timeout(function(){ 
			  $scope.components = [];
			  $scope.wnetwork = false;
	          $scope.isLoading = true;
	          $scope.isEmpty = true; 
		  },300); 
      });
	  
	  // open/close wireless network
	  $scope.toggle = function(){		
	  		if(isValid){
	  			WirelessNetworkService.toggleNetwork($scope.wnetwork,$scope.commissionTimeout).then(function(res){ 
				  $scope.wnetwork = res.data.wnetwork;			  
				  if($scope.wnetwork){				  
					  if(res.data.errors){ 
						  $scope.title = res.data.title;
						  $scope.errors = res.data.errors;
						  $scope.isError = true;
					  }					 				  				 
					  $scope.isLoading = false;				 
					  $scope.endTime = jQuery.now() + res.data.endTime; // TODO
					  $timeout(function(){
					     $scope.$broadcast('timer-start');
					  },0);				  
					  // Don't start a new service request if it exists
					  if(angular.isDefined(serviceInterval)){
					  	return; 
					  } 
					  serviceInterval = $interval(service, 3000);
				  }
				  else{
					  stopService();
					  $scope.isLoading = true;
					  $scope.isEmpty = true; 
					  $scope.isWarning = false;
					  $scope.components = [];
				  }	
				 
			  }, function(error){
				  if(error.status === HttpStatus.FORBIDDEN){
			  			goToLoginView();
			  	  }
			  });	
	  		}
		  /*WirelessNetworkService.toggleNetwork($scope.wnetwork).then(function(res){ 
			  $scope.wnetwork = res.data.wnetwork;			  
			  if($scope.wnetwork){				  
				  if(res.data.errors){ 
					  $scope.title = res.data.title;
					  $scope.errors = res.data.errors;
					  $scope.isError = true;
				  }
				 				  				 
				  $scope.isLoading = false;
				  $scope.endTime = jQuery.now() + res.data.endTime; // TODO
				  $timeout(function(){
				     $scope.$broadcast('timer-start');
				  },0);				  
				  // Don't start a new service request if it exists
				  if(angular.isDefined(serviceInterval)){
				  	return; 
				  } 
				  serviceInterval = $interval(service, 3000);
			  }
			  else{
				  stopService();
				  $scope.isLoading = true;
				  $scope.isEmpty = true; 
				  $scope.isWarning = false;
				  $scope.components = [];
			  }	
			 
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			//goToLoginView();
		  	  }
		  });	*/	  		  
	  };
	  
	  // Get new components
	  service =  function(){
		  ComponentService.getNewComponents().then(function(res){  
			  if(res.data.error){
				  $scope.errors = res.data.error;
				  $scope.isError = true; 
				  $scope.isEmpty = true;
				  $scope.isLoading = true;
				  stopService();
			  }
			  else{
				  var dataComponents = res.data.components;
				  if(dataComponents){
					  if(dataComponents.length > 0){
						  var newComponents = angular.copy(dataComponents);
						  var cashedComponents = angular.copy($scope.components);
						  $scope.isLoading = true;
						  $scope.isEmpty = false;
					  
						  //show component list
						  var foundComponent;
						  angular.forEach(cashedComponents, function(component){
							  foundComponent = _.findWhere(newComponents,{id: component.id});
							  if(angular.isUndefined(foundComponent)){
								  var ind = getIndexByComponentId(component.id,$scope.components);
								  $scope.components.splice(ind,1);	
						  	  }						  
					  	  });
						  
						  angular.forEach(newComponents, function(component){
							 foundComponent = _.findWhere($scope.components,{id: component.id});
							 if(angular.isUndefined(foundComponent)){
								 $scope.components.push(component);	 
							 }				  		
						  });
					  } else{
						  $scope.isLoading = false; 
						  $scope.isEmpty = true;
						  $scope.components = [];
					  }	  
				  }
				  else{
					  //$scope.isLoading = false; 
					  $scope.isEmpty = true;
					  $scope.components = [];
				  }					  
			  }
	     	 
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		 });

	  };
	  
	  // Stop service interval if it exists
	  stopService = function(){
		  if(angular.isDefined(serviceInterval)){
			  $interval.cancel(serviceInterval);
			  serviceInterval = undefined;
		  }
	  };
	  
	  $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        stopService();
      });

	  //Identify Component
	  $scope.identify = function(id){
		  ComponentService.identifyComponent(id).then(function(res){
		  	console.log(res.data);		 		  	  
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  		  goToLoginView();
		  	  }
		  });
	  };
	  
	  	  
	  // Save button
	  $scope.submit = function(){
		  $scope.isWarning = false;
		  
		  // Get only selected components
		  var arr = [];
		  angular.forEach($scope.components, function(component){
			  if(component.checked){
				 arr.push(component); 
			  }
		  });
		  //console.log(arr);
		  
		  // Save components
		  ComponentService.saveComponents(arr).then(function(res){
			 if(res.data.field_errors){
				 angular.forEach(res.data.field_errors, function(error,key){
					 angular.forEach($scope.components, function(component){
						 if(key === component.id){
							 component.error = error;
						 }
					 });
				 });	
			 }

			 if(res.data.warning){ 
				 $scope.title = res.data.title;
				 $scope.warnings = res.data.warning;
				 $scope.isWarning = true;
			 }
			 else{
				 stopService();
				 goToComponentView(); 
			 }
			 angular.element('#saveButton').blur(); 
			
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
	  };
	    
	  // Select all components
	  $scope.checkAll = function () {
	      var checked = !$scope.isChecked();
	      angular.forEach($scope.components, function(component){
	    	  component.checked = checked;
		  });
	   };
	    
	   // Returns true if and only if all components are checked.
	   $scope.isChecked = function () {
	      var allChecked = _.reduce($scope.components, function (memo, component) {
	        return memo + (component.checked ? 1 : 0);
	      }, 0);
	      $scope.allChecked = allChecked;
	      return (allChecked === $scope.components.length);
	   };
	   
	   var goToComponentView = function(){
			  $state.go('components');
	   };
	   
	   var goToLoginView = function(){
			  $state.go('login');
	   };
	   
	  function getIndexByComponentId(id,arr){
		   var res = -1;
		   angular.forEach(arr, function(item,index){
				 if(id === item.id){
					 res = index;
					 return;
				 }
		   });
		   return res;
	   }
  });
