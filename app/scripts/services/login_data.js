'use strict';

/**
 * @ngdoc service
 * @name webApp.LoginData
 * @description
 * # LoginData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('LoginService', function ($http) {
    // Service logic
   var srv = {};  
    var xhr,url;
    
    srv.getLabels = function(){
        url = '../loginServlet?action=labels';
        return $http.get(url);
    };
    
    srv.getLanguageOptions = function(){
        url = '../loginServlet?action=languages';
        return $http.get(url);
    };
    
    srv.translate = function(language){
        url = '../loginServlet?action=translate&language=' + language;
        return $http.get(url);
    };
    
    srv.authenticate = function(user){
        url = '../loginServlet?action=authenticate';
        xhr = $http({
            method: 'POST',
            url: url,
            params: user,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    };
      
    srv.logout = function(){
        url = '../loginServlet?action=logout';
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
      getLanguageOptions: function () {
        return srv.getLanguageOptions();
      },
      translate: function (language) {
          return srv.translate(language);
      },
      authenticate: function (user) {
        return srv.authenticate(user);
      },
      logout: function () {
        return srv.logout();
      }
    };
  });
