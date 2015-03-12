'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TimesettingCtrl
 * @description
 * # TimesettingCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('TimesettingCtrl', function ($scope, $state, HttpStatus, TimesettingService) {
      $scope.timesetting = '';

 	  // Get labels
	  TimesettingService.getLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });

	  TimesettingService.getInitialValues().then(function(res){
	  	$scope.timesetting = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });

	  $scope.submit = function(){
	  	  TimesettingService.saveDatetime($scope.timesetting).then(function(){
	  	  	console.log('datetime save ok');
		  	//$scope.timesetting = res.data;
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
	  };

	  var goToLoginView = function(){
		  $state.go('login');
	  };

  });
