'use strict';

/**
 * @ngdoc service
 * @name webApp.navbar
 * @description
 * # navbar
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('NavbarService', function ($http) {
    // Service logic
    var srv = {};  
    var url;
    
    srv.getLabels = function(){ 
        url = '../navbarServlet?action=labels';
        return $http.get(url);
    };

    // Public API here
    return {
      getLabels: function () {
        return srv.getLabels();
      }
    };
  });
