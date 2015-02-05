'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:CertificateCtrl
 * @description
 * # CertificateCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('CertificateCtrl', function ($scope,$state,HttpStatus,ngProgress,CertificateService,FileUploader) {
   	$scope.files = [];
	  $scope.certificate  = { 'filename': '' };

	  // Labels
    CertificateService.getLabels().then(function(res){
  		$scope.translation = res.data;
  	}, function(error){
  		  if(error.status === HttpStatus.FORBIDDEN){
          goToLoginView();
        }
  	});
	 
	  
	  $scope.checkFile = function(){
		  console.log('checking file');
		  if (angular.element('#certFileUpload').val()) {
			  console.log('upload file now');
			  angular.forEach(uploader.queue, function(item){
				  $scope.certificate.filename = item.file.name;
				  CertificateService.validate($scope.certificate).then(function(){
					  console.log('cert ok');
					  ngProgress.start();
					  ngProgress.color('#04284D'); //kaba blue
					  item.upload();
				  },function(error){
					  if(error.status === HttpStatus.FORBIDDEN){
              goToLoginView();
            }
				  });			  
			  });	  
		  }
		  else{
			  console.log('no file selected');
		  }
		  
		  
//	      angular.forEach(uploader.queue, function(item, key){  
//	          var foundFile = _.findWhere($scope.files,{name: item.file.name});      
//	          if(angular.isUndefined(foundFile)){
//	        	  item.upload();
//	            /*customFile.name = item.file.name;
//	            customFile.size = item.file.size;
//	            
//	            FileService.checkFile(customFile).then(function(res){
//	              item.upload();
//	            }, function(error){
//	                if(error.status == HttpStatus.FORBIDDEN){
//	                  goToLoginView();
//	                }
//	            });*/
//
//	          }
//	          else{
//	            console.log('File already exists');
//	          }     
//	      });
	    };

    var uploader = $scope.uploader = new FileUploader({
        url: '/certificateServlet',
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
	    
	// CALLBACKS
      uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
          console.info('onWhenAddingFileFailed', item, filter, options);
      };
      uploader.onAfterAddingFile = function(fileItem) {
          console.info('onAfterAddingFile', fileItem);
//          if(angular.isUndefined(fileItem)){
//             this.queue = [];
//          }
      };
     uploader.onAfterAddingAll = function(addedFileItems) {
          console.info('onAfterAddingAll', addedFileItems);
          if(angular.isUndefined(addedFileItems)){
            console.log('no items ok');
          }
      };
      uploader.onBeforeUploadItem = function(item) {
          console.info('onBeforeUploadItem', item);
//          if(angular.isUndefined(item)){
//            console.log('no items before upload');
//          }
      };
      uploader.onProgressItem = function(fileItem, progress) {
          console.info('onProgressItem', fileItem, progress);
          //$scope.progress = progress;
      };
      uploader.onProgressAll = function(progress) {
          console.info('onProgressAll', progress);
      };
      uploader.onSuccessItem = function(fileItem, response, status, headers) {
          console.info('onSuccessItem', fileItem, response, status, headers);
//          customFile.name = fileItem.file.name;
//          customFile.size = Math.floor(fileItem.file.size/1024) + ' KB';
//          customFile.lastModified = fileItem.file.lastModifiedDate;
//          $scope.files.push(customFile);
//          $scope.isEmpty = false;
      };
      uploader.onErrorItem = function(fileItem, response, status, headers) {
          console.info('onErrorItem', fileItem, response, status, headers);
      };
      uploader.onCancelItem = function(fileItem, response, status, headers) {
          console.info('onCancelItem', fileItem, response, status, headers);
      };
      uploader.onCompleteItem = function(fileItem, response, status, headers) {
          console.info('onCompleteItem', fileItem, response, status, headers);
      };
      uploader.onCompleteAll = function() {
          console.info('onCompleteAll');
          ngProgress.complete();
          //this.queue = [];
      };

      console.info('uploader', uploader);

      var goToLoginView = function(){
        $state.go('login');
      };
  });
