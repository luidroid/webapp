'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('ImportCtrl', function ($scope,$state,HttpStatus,ngProgress,FileUploader,FileService) { 
	 $scope.isFileuploadInfo = false;
     $scope.isFileuploadWarning = false;

     var uploader = $scope.uploader = new FileUploader({
	        url: '/fileUploadServlet',
	        removeAfterUpload: true
      });

      // FILTERS
      uploader.filters.push({
        name: 'customFilter',
        fn: function() {
            if(this.queue.length > 0){
              this.queue = [];
            }
            return true;//this.queue.length < 1;
        }
      });

      // Get labels
	  FileService.getImportLabels().then(function(res){
	  	$scope.translation = res.data;
	  }, function(){
	  		goToLoginView();
	  });
	   
	 $scope.submit = function(){ 
        $scope.isSuccess = false; 
        $scope.isError = false;
  		  if (angular.element('#importFileUpload').val()) {
                angular.forEach(uploader.queue, function(item){ 
                    FileService.validate(item.file.size).then(function(res){ 
                        if(res.data.valid){ 
                            ngProgress.start();
                            ngProgress.color('#04284D'); //kaba blue
                            item.upload();
                            $scope.isFileuploadInfo = false;
                        }
                        else{
                          $scope.isFileuploadWarning = true;
                        }
                    }, function(error){
                        if(error.status === HttpStatus.FORBIDDEN){
                          goToLoginView();
                        }
                    });    
                });     		  	
  		  }
  		  else{
          	$scope.isFileuploadInfo = true;
  		  }
	 };

	   // CALLBACKS
	  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
	      console.info('onWhenAddingFileFailed', item, filter, options);
	  };
	  uploader.onAfterAddingFile = function(fileItem) {
	      console.info('onAfterAddingFile', fileItem);
	      $scope.isFileuploadInfo = false;
	      $scope.isFileuploadWarning = false;
	  };
	  uploader.onAfterAddingAll = function(addedFileItems) {
	      console.info('onAfterAddingAll', addedFileItems);
	  };
	  uploader.onBeforeUploadItem = function(item) {
	      console.info('onBeforeUploadItem', item);
	  };
	  uploader.onProgressItem = function(fileItem, progress) {
	      console.info('onProgressItem', fileItem, progress);
	      //$scope.max = progress;
	  };
	  uploader.onProgressAll = function(progress) {
	      console.info('onProgressAll', progress);
	  };
	  uploader.onSuccessItem = function(fileItem, response, status, headers) {
	      console.info('onSuccessItem', fileItem, response, status, headers);
	  };
	  uploader.onErrorItem = function(fileItem, response, status, headers) {
	      console.info('onErrorItem', fileItem, response, status, headers);
	      $scope.isError = true;
	      $scope.title = response.title;
	      $scope.errors = response.errors;
	      ngProgress.complete();
	  };
	  uploader.onCancelItem = function(fileItem, response, status, headers) {
	      console.info('onCancelItem', fileItem, response, status, headers);
	  };
	  uploader.onCompleteItem = function(fileItem, response, status, headers) {
	      console.info('onCompleteItem', fileItem, response, status, headers);
	       ngProgress.complete();
	      if(response.errors){
	        $scope.isError = true;
	        $scope.title = response.title;
	        $scope.errors = response.errors;
	      }
	      else if(response.warning){
	        $scope.isFileuploadWarning = response.warning;
	      }
	      else{
	        $scope.isSuccess = true;
	        $scope.title = response.title;
	        $scope.messages = response.messages;
	      }              
	  };
	  uploader.onCompleteAll = function() {
	      console.info('onCompleteAll');  
	      angular.element('#importFileUpload').val('');      
	  };

      //console.info('uploader', uploader);
	  
	  var goToLoginView = function(){
		  $state.go('login');
	  };

  });
