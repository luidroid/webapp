'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:EventListCtrl
 * @description
 * # EventListCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('EventListCtrl', function ($scope, $state, HttpStatus, EventService) {
	  $scope.isEmpty = true;
	  $scope.items = [];
	  $scope.busy = false;
	  $scope.isFirstEvent = false;
      var afterValue = -1;  
	  //$scope.reddit = new Reddit();
	  
	  // Get labels
	  EventService.getLabels().then(function(res){
	  	 $scope.translation = res.data;
	  }, function(){
	  		goToLoginView();
	  });
	  
	  $scope.nextPage = function(){ //console.log('load more now: ' + afterValue);		
		  if(afterValue !== 0){  //console.log('vor ' + afterValue);
			    if($scope.busy){
			  		return false;
			    } 
			    $scope.busy = true;

			  	EventService.getEvents(afterValue).then(function(res){ console.log(res.data);
				  	 var items = res.data.events;
				  	 if(angular.isDefined(items) && items.length > 0){
				  		for (var i = 0; i < items.length; i++) {  		
				  			$scope.items.push(items[i]);
					  	}
				  		afterValue = $scope.items[$scope.items.length - 1].id; //console.log('nach ' + afterValue);
					  	$scope.isEmpty = false;		  	
					  	$scope.isInfo = false;
					  	$scope.busy = false;		   
				  	 }
				  	 else{
				  	 	$scope.isFirstEvent = true;
				  	 }

 					 $scope.isLoading = true;

			  	 	 if(angular.isUndefined($scope.items) || $scope.items.length === 0) {
						$scope.isEmpty = true;
				  		$scope.isInfo = true;
			  	 	 }
		  	 
				}, function(){
					  goToLoginView();		 
				});   
		  }
	  };
	  
	  // Refresh events
	  $scope.refreshEvents = function(){
		  afterValue = -1;
		  if($scope.busy){
		  	$scope.busy = false;
		  }
		  $scope.isFirstEvent = false;
		  $scope.items = [];
		  $scope.nextPage();
	  }; 
	  
	  // Export Events
	 /* $scope.exportEvents = function(){
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
	  	*/  		 	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };

  });
