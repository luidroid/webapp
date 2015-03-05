/*global jQuery:false*/
'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:CommissionCtrl
 * @description
 * # CommissionCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('CommissionCtrl', function ($scope, $state, $interval, $timeout, HttpStatus, WirelessNetwork, CommissionService, RouterService, ComponentService, _) {
    $scope.components = [];
    $scope.routers = [];
    $scope.commissionTimeout = 30;
    $scope.isLoading = false;
    var cachedComponents = [],
        cachedRouters = [],
        isValid = false,
        serviceInterval,
	    service,
	    stopService;
    /*var testcachedRouters = [
	    {
	    	'components' : null,
	    	'id' : '002',
	    	'name' : null,
	    	'networkAddress' : '0x02',
	    	'signal' : null,
	    	'type' : null
	    }
    ]; */

    $scope.isFormValid = function(isDisabled){
    	isValid = isDisabled;
	    return isValid ? '' : 'true'; 
	};

	// Labels
	CommissionService.getLabels().then(function(res){
	  	 $scope.translation = res.data;
	}, function(){
	  	  goToLoginView();
	});

	RouterService.getRouters().then(function(res){ 
	  	cachedRouters = res.data;
	  	$scope.isLoading = true;
	  	$scope.isAvailableForm = true;
	}, function(){
	  	  goToLoginView();
	});

	$scope.toggle = function(){
		if(isValid){
			WirelessNetwork.isOpen = $scope.wnetwork;
  			CommissionService.toggleWirelessNetwork($scope.wnetwork,$scope.commissionTimeout).then(function(res){ 
				  $scope.wnetwork = res.data.wnetwork;
				  if($scope.wnetwork){
				  	  if($scope.components.length === 0 && $scope.routers.length === 0){
				  	  	 $scope.isSearching = true;	
				  	  }			  					 				  				 			 			 
					  $scope.endTime = jQuery.now() + res.data.endTime;
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
					  $scope.isSearching = false;
				  }				 
			}, function(error){
				  if(error.status === HttpStatus.FORBIDDEN){
			  			goToLoginView();
			  	  }
			});
  		}
	};

	//Service
	service = function(){
		var foundDevice = {};
		// Router list
		RouterService.getRouters().then(function(res){ 
			var newRouters = [];	
			angular.forEach(res.data, function(router){
				  foundDevice = _.findWhere(cachedRouters,{id: router.id});
				  if(angular.isUndefined(foundDevice)){
				  		newRouters.push(router);	
			  	  }						  
		  	});

			if(angular.isDefined(newRouters) && newRouters.length > 0 ){
				$scope.routers = newRouters;
				$scope.isRouterList = true;
				$scope.isSearching = false;
			}
			else{
				$scope.isRouterList = false;
			}

		},function(){
			goToLoginView();
		});

		// Component list
		CommissionService.getNotPermitedComponents().then(function(res){ 

			angular.forEach(res.data, function(component){
				  foundDevice = _.findWhere(cachedComponents,{id: component.id});
				  if(angular.isUndefined(foundDevice)){
				  		cachedComponents.push(component);	
			  	  }						  
		  	}); 

			if(angular.isDefined(cachedComponents) && cachedComponents.length > 0){
				CommissionService.getComponents(cachedComponents).then(function(res){
					$scope.components = res.data;
					if($scope.components.length > 0){
						$scope.isComponentList = true;
						$scope.isSearching = false;
					}else{
						$scope.isComponentList = false;
					}	
				});
			}
			else{
				$scope.isComponentList = false;
			}
		
		},function(){
			goToLoginView(); 
		});

	}; 

 	// Stop service interval if it exists
    stopService = function(){
	  if(angular.isDefined(serviceInterval)){
		  $interval.cancel(serviceInterval);
		  serviceInterval = undefined;
	  }
    };

     // Check if timer stopped
    $scope.$on('timer-stopped', function (){
	   stopService();
	   $timeout(function(){ 
		   $scope.wnetwork = false;
		   WirelessNetwork.isOpen = $scope.wnetwork;
		   $scope.isSearching = false;
	   },250); 
    });

    $scope.$on('$destroy', function() {
	    // Make sure that the interval is destroyed too
	    stopService();
	    if($scope.wnetwork){
	    	WirelessNetwork.isOpen = false;
	    	CommissionService.closeWirelessNetwork();
	    }
    });

	var goToLoginView = function(){
		$state.go('login');
	};

  });
