'use strict';

/**
 * @ngdoc service
 * @name webApp.certificateData
 * @description
 * # certificateData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('CertificateService', function ($http) {
    // Service logic
    var srv = {};  
    var xhr,url;
    
    srv.getLabels = function(){
        url = '../certificateServlet?action=labels';
        return $http.get(url);
    };
    
    srv.validate = function(certificate){
        url = '../certificateServlet?action=validate';
        xhr = $http({
            method: 'GET',
            url: url,
            params: certificate
        });
        return xhr;
    };
     
      
    // Public API
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      validate: function (certificate) {
        return srv.validate(certificate);
      }
    };
  });
