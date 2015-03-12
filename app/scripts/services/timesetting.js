'use strict';

/**
 * @ngdoc service
 * @name webApp.Timesetting
 * @description
 * # Timesetting
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('TimesettingService', function ($http) {
    // Service logic
    var srv = {};  
    var url,xhr;

    srv.getLabels = function(){
        url = '../timesettingServlet?action=labels';
        return $http.get(url);
    };

    srv.getInitialValues = function(){
        url = '../timesettingServlet?action=values';
        return $http.get(url);
    };
    
    srv.saveDatetime = function(datetimeObj){
        url = '../timesettingServlet?action=edit&datetime=' + datetimeObj;
        xhr = $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    };

    // Public API here
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      getInitialValues: function () {
        return srv.getInitialValues();
      },
      saveDatetime: function (datetimeObj) {
        return srv.saveDatetime(datetimeObj);
      }
    };
  });
