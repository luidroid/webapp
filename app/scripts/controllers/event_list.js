'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:EventListCtrl
 * @description
 * # EventListCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('EventListCtrl', function ($scope,$state,$timeout,HttpStatus,EventService) {
      $scope.isLoading = false;
	  $scope.isEmpty = true;
	  $scope.items = [];
	  $scope.busy = false;
	  var afterValue = '';	  
	  //$scope.reddit = new Reddit();
	  
	  // Get labels
	  EventService.getLabels().then(function(res){
	  	 $scope.translation = res.data;
	  }, function(){
	  		goToLoginView();
	  });
	  
	  $scope.nextPage = function(){ console.log('hier');
		  if($scope.busy){
		  	return;
		  } 
		  $scope.busy = true;
		 
		  EventService.getEvents(afterValue).then(function(res){ console.log('get event ok');
		  	 var items = res.data.events;
		  	 if(items){
		  		for (var i = 0; i < items.length; i++) {  		
		  			$scope.items.push(items[i]);
			  	}
		  		afterValue = $scope.items[$scope.items.length - 1].id;
			  	$scope.busy = false;
			  	$scope.isEmpty = false;
			  	$scope.isLoading = true;
			  	$scope.isInfo = false;
		  	 }
		  	 else{
		  		$scope.isLoading = true;
		  		$scope.isEmpty = true;
		  		$scope.isInfo = true;
		  	    $scope.infos = res.data.infos;
		  	 }
		  }, function(){
			  goToLoginView();
			 
		  });   
		  
	  };
	  
	  // Refresh events
	  $scope.refreshEvents = function(){
		  afterValue = '';
		  $scope.items = [];
		  $scope.nextPage();
	  }; 
	  
	  // Export Events
	  $scope.exportEvents = function(){
		  $scope.isLoading = false;
		  EventService.exportEvents().then(function(res){
			  $scope.isLoading = true;
			  window.open(res.data.url,'_blank');
			  $timeout(function(){
				  EventService.exportDone();
			  },1000);
		  }, function(){
		  		goToLoginView();
		  });
	  };
	  	  		 	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };

  });
