'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ExportCtrl
 * @description
 * # ExportCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('ExportCtrl', function ($scope,$state,HttpStatus,FileService) {
      $scope.files = [];
	  $scope.infos = [];
	  $scope.isInfo = false;
	  var isAvailable = false;
//    $scope.isError = false;
//	  $scope.errors = {};
//	  $scope.isSuccess = false;
//	  $scope.messages = {};
//	  $scope.errorFields = {};
	  
	  // Get labels
	  FileService.getLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(){
	  		goToLoginView();
	  });
	  
	  // Get available files
	  FileService.getFiles().then(function(res){
		  if(res.data.files){
			 $scope.files = res.data.files;
		  	 $scope.value = $scope.files.length;
		  	 isAvailable = true; 
		  }

	  	 if(res.data.info){
	  		$scope.infos = res.data.info;
	  		$scope.isInfo = true;
	  		isAvailable = false;
		  }
	  	 $scope.isAvailable = isAvailable;
	  }, function(error){
	  	  if(error.status === HttpStatus.FORBIDDEN){
	  		 goToLoginView();
	  	  }
	  });
	  	 	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
