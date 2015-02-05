'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ComponentDetailsCtrl
 * @description
 * # ComponentDetailsCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('ComponentDetailsCtrl', function ($scope,$state,$stateParams,$interval,HttpStatus,UserService,ComponentService) {
      $scope.component = {};
	  $scope.isDisabled = false;
	  $scope.errors = [];
	  $scope.isError = false;
	  $scope.infos = [];
	  $scope.isInfo = false;
	  //$scope.username = '';
	  $scope.isBatteryAvailable = true;
	  
	  // Get user role
	  UserService.getUser().then(function(res){
		  $scope.isAdmin = UserService.isAdmin(res.data.role);
		 // $scope.username = UserService.getRole();
	  }, function(){
	  	  goToLoginView();
	  });
	  
	  /*
	  $scope.$watch('username', function() {
		  UserService.updateUsername($scope.username);
	  });*/
	  	 
	  // Get labels
	  ComponentService.getComponentDetailLabels().then(function(res){
	  	 $scope.translation = res.data;
	  }, function(error){
		  if(error.status === HttpStatus.FORBIDDEN){
				goToLoginView();
		  }
	  });
	  
	  // Get component by Id
	  ComponentService.getComponentById($stateParams.id).then(function(res){
		  if(res.data.error){
		  		$scope.errors = res.data.errors;
		  		$scope.isError = true;
		  }
		  else{
			  $scope.component = res.data.component;
			  if($scope.component){
				  if($scope.component.battery.type){
					  drawBattery($scope.component.battery.percent);
					  $scope.isBatteryAvailable = false;
				  }
				  drawSignal($scope.component.signal.strength);  
			  }	  
		  } 	 
	  }, function(error){
		  goToComponentList();
		  if(error.status === HttpStatus.FORBIDDEN){
	  			goToLoginView();
	  	  }
	  });
	  
	  // Identify component
	  $scope.identify = function(){
		  ComponentService.identifyComponent($scope.component.id).then(function(res){
			  if(res.data.error){
				  $scope.isError = true; 
				  $scope.errors = res.data.error;
				  angular.element('#identifyButton').blur();
			  }
			  else{
				  var counter = res.data.counter;
				  var counterInfo1 = res.data.counterInfo1;
				  var counterInfo2 = res.data.counterInfo2;
			  	  $scope.isDisabled = true;		  	 		  	 
			  	  $scope.isError = false;
			  	  
			  	  var timerInterval = $interval(function(){
			  		  $scope.isInfo = true;	
			  		  $scope.infos[0] = counterInfo1 + counter-- + counterInfo2;
			  		  
			  		  if(counter < 0){
			  			$interval.cancel(timerInterval);
			  			$scope.isDisabled = false;
			  			$scope.isInfo = false;
			  			$scope.infos.splice(0,1);
			  		  }
			  	  },1000);
			  }
		  	  
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });
	  };
	  
	  // Delete Component
	  $scope.deleteAction = function(){
		  console.log('id: ' + $scope.component.id);
		  ComponentService.deleteComponent($scope.component.id).then(function(res){
			  angular.element('#deleteModal').modal('hide');
			  if(res.data.error){
				  $scope.errors = res.data.error;
				  $scope.isError = true;  
			  }
			  else{			 	
				  goToComponentList();  
			  }
			 
		  }, function(error){
			  if(error.status === HttpStatus.FORBIDDEN){
		  			goToLoginView();
		  	  }
		  });	
	  };

	  // Draw signal
	  var drawSignal = function(value){
			var x = 10,
				y = 100,
				width = 20,
				height = 20,
				colorSignal = 'gray',
				colorSignalOk = '#003366', //'#0099FF', blue
				num = value/width,
				rect;
				
			
			var stage = new Kinetic.Stage({
				  container: 'signalContainer',
				  width: 160,
				  height: 125
			});
			var layer = new Kinetic.Layer();
			
			// Signal body
			for(var i=0; i<5; i++){
				rect = new Kinetic.Rect({
			        x: x,
			        y: y,
			        width: width,
			        height: height,
			        stroke: colorSignal
			    });
				layer.add(rect);
				
				x = x + width + 10;
				y = y - 20;
				height = height + 20;
			}
			
			// Signal filled
			x = 10 + 1;
			y = 100 + 1;
			width = 20 - 2;
			height = 20 - 2;
			for(i=0; i<num; i++){
				rect = new Kinetic.Rect({
			        x: x,
			        y: y,
			        width: width,
			        height: height,
			        fill: colorSignalOk
			    });
				layer.add(rect);
				
				x = x + width + 10 + 2;
				y = y - 20;
				height = height + 20;
			}

		    stage.add(layer);
			
	  };

	  //Draw battery
	  var drawBattery = function(value){ 
			var x = 10,
				y = 5,
				width = 70,
				height = 100,
				colorBattery = 'gray',
				colorBatteryOk = '#72A74B', //green
				colorBatteryNok = '#F20000', //red
			    fillBattery = colorBatteryOk,
			    fillText = 'black';
			
			var stage = new Kinetic.Stage({
				  container: 'batteryContainer',
				  width: 100,
				  height: 125
			});
			var layer = new Kinetic.Layer();

			// Cap
			var rect = new Kinetic.Rect({
		        x: width/2,
		        y: y,
		        width: 4*y,
		        height: 3*y,
		        fill: colorBattery
		    });
			layer.add(rect);
			
			// Body
			rect = new Kinetic.Rect({
		        x: x,
		        y: 4*y,
		        width: width,
		        height: height,
		        stroke: colorBattery
		    });
			layer.add(rect);
			
			// Percentage filled
			if(value < 15){
				fillBattery = colorBatteryNok;
				fillText = colorBatteryNok;
			}
			rect = new Kinetic.Rect({
		        x: x + 1,
		        y: 4*y + height - value + 1,
		        width: width - 2,
		        height: value - 2,
		        fill: fillBattery
		    });
			layer.add(rect);
			
			// Battery text
			var text = new Kinetic.Text({
		        x: x,
		        y: height/2,
		        text: value + '%',
		        fontSize: 25,
		        fontFamily: 'Calibri',
		        fill: fillText,
		        align: 'center',
		        width: width
		    });
			layer.add(text);

		    stage.add(layer);	
	  };
	  
	  var goToComponentList = function(){
		  $state.go('components');
	  };
	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };
  });
