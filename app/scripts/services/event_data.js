'use strict';

/**
 * @ngdoc service
 * @name webApp.eventData
 * @description
 * # eventData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('EventService', function ($http) {
    // Service logic
    var srv = {};  
    var url;
    
    // Get labels
    srv.getLabels = function(){
        url = '../eventListServlet?action=labels';
        return $http.get(url);
    };
    
    // Event list
    srv.getEvents = function(afterValue){
      url = '../eventListServlet?action=events&after=' + afterValue;
      return $http.get(url);
    };
    
    srv.exportEvents = function(){
      url = '../eventListServlet?action=export';
      return $http.get(url);
    };
    
    srv.exportDone = function(){
      url = '../eventListServlet?action=exported';
      return $http.get(url);
    };

    // Public API here
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      getEvents: function (afterValue) {
        return srv.getEvents(afterValue);
      },
      exportEvents: function () {
          return srv.exportEvents();
      },
      exportDone: function () {
          return srv.exportDone();
      }
    };
  });
