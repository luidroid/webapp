'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('LoginCtrl', function ($scope,$state,LoginService) {
    $scope.user = {
      'username': '',
      'password': ''
    };
    
    // Labels
    LoginService.getLabels().then(function(res){
  		$scope.translation = res.data;		
  		// Get language options
  		LoginService.getLanguageOptions().then(function(res){
  			$scope.options = res.data.options;
  		    $scope.selectedOption = $scope.options[res.data.selectedPos];
  	  });		
  	});
	
  	// Translate page according to selected language
  	$scope.translate = function(){
  		LoginService.translate($scope.selectedOption.value).then(function(res){
  			$scope.translation = res.data;
    	});
  	};

  	// Authenticate user
  	$scope.submit = function(){
  		LoginService.authenticate($scope.user).then(function(res){
    			if(res.data.logged){
    				$state.go('home');
    			}
    			else{
    				$scope.errorMsg = true;
    			}  		
  	 	});	
    };

  });
