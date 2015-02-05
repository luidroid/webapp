'use strict';

/**
 * @ngdoc service
 * @name webApp.User
 * @description
 * # User
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('UserService', function ($http,$rootScope,Roles) {
    // Service logic
    var srv = {};  
    var url,xhr;

    srv.username = '';
    
    srv.getRole = function(){ 
        url = '../loginServlet?action=role';
        return $http.get(url);
    };

    srv.updateUsername = function (name) {
      this.username = name;
      $rootScope.$broadcast('usernameUpdated');
    };
    
    srv.getUsername = function () {
      return this.username;
    };
       
    // Get labels
    srv.getLabels = function(){
        url = '../settingsPasswordServlet?action=labels';
        return $http.get(url);
    };
    
    srv.changePassword = function(user){
      url = '../settingsPasswordServlet?action=change';
      xhr = $http({
            method: 'POST',
            url: url,
            params: user,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
      return xhr;
     };
  
     srv.getUser = function () {
       url = '../loginServlet?action=role';
       return $http.get(url);
     };
     
     srv.isAdmin = function (role) {
       return role === Roles.ADMIN;
     };
     
     srv.getPasswordRules = function () {
       url = '../settingsPasswordServlet?action=rules';
       return $http.get(url);
     };
     
     srv.getUserOptions = function () {
       url = '../settingsPasswordServlet?action=userOptions';
       return $http.get(url);
     };


    // Public API here
    return {
      getLabels: function () {
        return srv.getLabels();
      },
      authenticate: function (user) {
        return srv.authenticate(user);
      },
      logout: function () {
          return srv.logout();
      },
      getUser: function () {
          return srv.getUser();
      },
      setUser: function (role) {
        return srv.setUser(role);
      },
      getRole: function () {
        return srv.getRole();
      },
      isAdmin: function (role) {
          return srv.isAdmin(role);
      },
      updateUsername: function (role) {
          return srv.updateUsername(role);
      },
      getUsername: function () {
          return srv.getUsername();
      },
      changePassword: function (user) {
        return srv.changePassword(user);
      },
      getPasswordRules: function () {
        return srv.getPasswordRules();
      },
      getUserOptions: function () {
        return srv.getUserOptions();
      }
    };
  });
