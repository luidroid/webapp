'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:RouterListCtrl
 * @description
 * # RouterListCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('RouterListCtrl', function ($scope,$state,HttpStatus,RouterService) { 
      // Get labels
	  RouterService.getLabels().then(function(res){ 
	  	 $scope.translation = res.data;
	  }, function(){
	  		goToLoginView();
	  });

	  // Get router list
	  RouterService.getRouters().then(function(res){ 
	  	if(angular.isDefined(res.data) && res.data.length > 0){
 			$scope.routers = res.data;
 			$scope.isAvailable = true;  	
	  	}else{
	  		$scope.isInfo = true;
	  	}
	  	$scope.isLoading = true;  	
	  }, function(error){
	  		if(error.status === HttpStatus.FORBIDDEN){ 
	             goToLoginView();
	        }
	  });

	  var goToLoginView = function(){
		  $state.go('login');
	  };

  });
