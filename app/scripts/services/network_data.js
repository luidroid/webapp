'use strict';

/**
 * @ngdoc service
 * @name webApp.NetworkData
 * @description
 * # NetworkData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('NetworkService', function ($http) {
    // Service logic
    var srv = {};  
    var url,xhr;
    
    // Labels
    srv.getLabels = function(){
        url = '../settingsNetworkServlet?action=labels';
        return $http.get(url);
    };
    
    // Get network structure
    srv.getNetwork = function(){
        url = '../dashboardServlet?action=network';
        return $http.get(url);
    };
    
    // Get initial network values
    srv.getNetworkValues = function(){
        url = '../settingsNetworkServlet?action=networkValues';
        return $http.get(url);
    };

    // Save network values
    srv.saveNetworkValues = function(networkObj){
      url = '../settingsNetworkServlet?action=save';
        xhr = $http({
            method: 'POST',
            url: url,
            params: networkObj,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    }; 

    // Public API here
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      getNetwork: function () {
          return srv.getNetwork();
      },
      getNetworkValues: function () {
          return srv.getNetworkValues();
      },
      saveNetworkValues: function (networkObj) {
          return srv.saveNetworkValues(networkObj);
      }
    };
  });
