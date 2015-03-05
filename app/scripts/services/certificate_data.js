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
    var url;
    
    srv.getLabels = function(){
        url = '../certificateServlet?action=labels';
        return $http.get(url);
    };

    srv.getInitialValues = function(){
        url = '../certificateServlet?action=initialValues';
        return $http.get(url);
    };

    srv.validate = function(filesize){
        url = '../certificateServlet?action=validate&filesize=' + filesize;
        return $http.get(url);
    };
    
    srv.activate = function(){
        url = '../certificateServlet?action=activate';
        return $http.get(url);
    };

    srv.isHostActivated = function(){
        url = '../loginServlet?action=host';
        return $http.get(url);
    };

    srv.setPwd = function(pwd){
        url = '../certificateServlet?action=certPwd&pwd=' + pwd;
        return $http.get(url);
    };
      
    // Public API
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      getInitialValues: function () {
        return srv.getInitialValues();
      },
      validate: function (filesize) {
        return srv.validate(filesize);
      },
      activate: function () {
        return srv.activate();
      },
      isHostActivated: function () {
        return srv.isHostActivated();
      },
      setPwd: function (pwd) {
        return srv.setPwd(pwd);
      }
    };
  });
