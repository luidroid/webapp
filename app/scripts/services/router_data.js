'use strict';

/**
 * @ngdoc service
 * @name webApp.RouterData
 * @description
 * # RouterData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('RouterService', function ($http) {
    // Service logic
    var srv = {};  
    var url;

    srv.getLabels = function(){
        url = '../routerListServlet?action=labels';
        return $http.get(url);
    };
    
    srv.getRouters = function(){
        url = '../routerListServlet?action=routers';
        return $http.get(url);
    };

    // Public API here
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      getRouters: function () {
        return srv.getRouters();
      }
    };
  });
