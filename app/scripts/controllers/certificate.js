'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:CertificateCtrl
 * @description
 * # CertificateCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('CertificateCtrl', function ($scope, $state, $interval, $window, HttpStatus, ngProgress, CertificateService, FileUploader) {
	  $scope.isFileuploadInfo = false;
    $scope.isFileuploadWarning = false;
    $scope.isActiveCertificate = false;
    $scope.certificatePassword = '';
  
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

    /*var serviceInterval,
        service,
        stopService;*/

    // Labels
    CertificateService.getLabels().then(function(res){
  		$scope.translation = res.data;
  	}, function(error){
  		  if(error.status === HttpStatus.FORBIDDEN){
         goToLoginView();
        }
  	});

    CertificateService.getInitialValues().then(function(res){
      $scope.isActiveCertificate = res.data.cert;
    }, function(error){
        if(error.status === HttpStatus.FORBIDDEN){
         goToLoginView();
        }
    });
  
	  $scope.submit = function(){
        $scope.isSuccess = false; 
        $scope.isError = false;
  		  if (angular.element('#certFileUpload').val()) {
            CertificateService.setPwd($scope.certificatePassword).then(function(){
                angular.forEach(uploader.queue, function(item){ 
                    CertificateService.validate(item.file.size).then(function(res){ 
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
            }); 		  	
  		  }
  		  else{
          $scope.isFileuploadInfo = true;
  		  }
	 };

    $scope.activateCertificate = function(){
      $scope.isDisabled = true;    
      CertificateService.activate().then(function(){
          angular.element('#certificateModal').modal('hide');
          window.location.href = '';
      },function(error){
        console.log(error);
      });
    };

    angular.element('#certFileUpload').change(function (){
       var filename = angular.element(this).val();
       $scope.selectedFile = filename;
       //angular.element('#selectedFile').html(fileName);
    });

   /* service = function(){
      CertificateService.isHostActivated().then(function(){
          console.log('host is activ');
          stopService();
          //goToLoginView();    
      });
    };

    stopService = function(){
        if(angular.isDefined(serviceInterval)){
            $interval.cancel(serviceInterval);
            serviceInterval = undefined;
        }
    };*/   
     
	    
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
            $scope.isActiveCertificate = response.cert;
          }              
      };
      uploader.onCompleteAll = function() {
          console.info('onCompleteAll');  
          angular.element('#certFileUpload').val('');
          $scope.selectedFile = '';
          $scope.certificatePassword = '';        
      };

      //console.info('uploader', uploader);

      var goToLoginView = function(){
        $state.go('login');
      };
  });
