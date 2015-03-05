'use strict';

/**
 * @ngdoc service
 * @name webApp.FileData
 * @description
 * # FileData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('FileService', function ($http) {
    // Service logic
    var srv = {};  
    var url;
    
    // Import
    srv.getImportLabels = function(){
        url = '../fileUploadServlet?action=labels';
        return $http.get(url);
    };

    srv.validate = function(filesize){
        url = '../fileUploadServlet?action=validate&filesize=' + filesize;
        return $http.get(url);
    };

    // Export
    srv.getLabels = function(){
        url = '../settingsExportServlet?action=labels';
        return $http.get(url);
    };
    
    srv.getFiles = function(){
      url = '../settingsExportServlet?action=files';
      return $http.get(url);
    };


    // Public API
    return {
      getImportLabels: function () {
        return srv.getImportLabels();
      }, 
      validate: function (filesize) {
        return srv.validate(filesize);
      }, 
      getLabels: function () {
        return srv.getLabels();
      },  
      getFiles: function () {
        return srv.getFiles();
      }
    };
  });
