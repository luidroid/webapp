'use strict';

/**
 * @ngdoc service
 * @name webApp.wnetworkData
 * @description
 * # wnetworkData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('WirelessNetworkService', function ($http) {
    // Service logic
    var srv = {};  
    var url,xhr;
    
    // Get labels
    srv.getLabels = function(){
        url = '../settingsWirelessNetworkServlet?action=labels';
        return $http.get(url);
    };
    
    // Get initial commission values
    srv.getCommissionValues = function(){
        url = '../settingsWirelessNetworkServlet?action=commissionValues';
        return $http.get(url);
    };
    
    // Check if open for join is activated
    srv.isOpenNetwork = function(){
        url = '../componentNewServlet?action=networkStatus';
        return $http.get(url);
    };
    
    // Open/close network
    srv.toggleNetwork = function(status,timeout){
        url = '../componentNewServlet?action=network&status=' + status + '&timeout=' + timeout;
        xhr = $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    };
        
    // Save install code
    srv.saveInstallCode = function(commissionObj){
      url = '../settingsWirelessNetworkServlet?action=save';
        xhr = $http({
            method: 'POST',
            url: url,
            params: commissionObj,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    }; 
    
    // Save timeout value
    srv.saveTimeout = function(commissionObj){
      url = '../settingsWirelessNetworkServlet?action=timeout';
        xhr = $http({
            method: 'POST',
            url: url,
            params: commissionObj,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    }; 



    // Public API here
    return {
      getLabels: function () {
          return srv.getLabels();
      },
      getCommissionValues: function () {
          return srv.getCommissionValues();
      },
      isOpenNetwork: function () {
          return srv.isOpenNetwork();
      },
      toggleNetwork: function (status,timeout) {
          return srv.toggleNetwork(status,timeout);
      },
      saveInstallCode: function (commissionObj) {
          return srv.saveInstallCode(commissionObj);
      },
      saveTimeout: function (commissionObj) {
          return srv.saveTimeout(commissionObj);
      }
    };
  });
