'use strict';

/**
 * @ngdoc service
 * @name webApp.dashboard
 * @description
 * # dashboard
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('DashboardService', function ($http) {
    // Service logic
    var srv = {};  
    var url;
    
    srv.getLabels = function(){ 
        url = '../dashboardServlet?action=labels';
        //url = 'json/dashboard/labels.json';
        return $http.get(url);
    };

    srv.getGatewayInfo = function(){ 
        url = '../dashboardServlet?action=info';
        //url = 'json/dashboard/labels.json';
        return $http.get(url);
    };

    srv.getUsage = function(){ 
        url = '../dashboardServlet?action=usage';
        //url = 'json/dashboard/usage.json';
        return $http.get(url);
    };

    srv.getWnetwork = function(){ 
        url = '../dashboardServlet?action=wnetwork';
        //url = 'json/dashboard/wnetwork.json';
        return $http.get(url);
    };

    // Public API
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      getGatewayInfo: function () {
        return srv.getGatewayInfo();
      },
      getUsage: function () {
        return srv.getUsage();
      },
      getWnetwork: function () {
        return srv.getWnetwork();
      }
    };
  });
