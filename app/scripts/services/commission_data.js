'use strict';

/**
 * @ngdoc service
 * @name webApp.CommissionData
 * @description
 * # CommissionData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('CommissionService', function ($http) {
    // Service logic
    var srv = {};  
    var url,xhr;
    
    // Get labels
    srv.getLabels = function(){
        url = '../commissionServlet?action=labels';
        return $http.get(url);
    };
    // Open/close network
    srv.toggleWirelessNetwork = function(status,timeout){
        url = '../commissionServlet?action=network&status=' + status + '&timeout=' + timeout;
        return $http.get(url);
    };

    // Get not permited components
    srv.getNotPermitedComponents = function(){
        url = '../commissionServlet?action=notPermitedComponents';
        return $http.get(url);
    };
    
    // Get components
    srv.getComponents = function(components){
        url = '../commissionServlet?action=components';
        xhr = $http({
            method: 'GET',
            url: url,
            params: components,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    };

    // Close wireless network
    srv.closeWirelessNetwork = function(){
        url = '../commissionServlet?action=close';
        return $http.get(url);
    };

    // Public API here
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      toggleWirelessNetwork: function (status,timeout) {
        return srv.toggleWirelessNetwork(status,timeout);
      },
      getNotPermitedComponents: function () {
        return srv.getNotPermitedComponents();
      },
      getComponents: function (components) {
        return srv.getComponents(components);
      },
      closeWirelessNetwork: function () {
        return srv.closeWirelessNetwork();
      }
    };
  });
