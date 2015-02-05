'use strict';

/**
 * @ngdoc service
 * @name webApp.componentData
 * @description
 * # componentData
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('ComponentService', function ($http) {
    // Service logic
    var srv = {};  
    var url,xhr;

    // Get component list
    srv.getComponentListLabels = function(){
        url = '../componentListServlet?action=labels';
        return $http.get(url);
    };
    
    srv.getComponents = function(){
        url = '../componentListServlet?action=components';
        return $http.get(url);
    };
    
    // Component Details
    srv.getComponentDetailLabels = function(){
        url = '../componentDetailServlet?action=labels';
        return $http.get(url);
    };
    
    srv.getComponentById = function(id){
        url = '../componentDetailServlet?action=component&id=' + id;
        return $http.get(url);
    };
    
    srv.deleteComponent = function(id){
      url = '../componentDetailServlet?action=delete&id=' + id;
        xhr = $http({
            method: 'POST',
            url: url,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    };
    
    srv.identifyComponent = function(id){
      url = '../componentDetailServlet?action=identify&id=' + id;
      return $http.get(url);
    };
    
    // New Components
    srv.getComponentNewLabels = function(){
        url = '../componentNewServlet?action=labels';
        return $http.get(url);
    };
    srv.getNewComponents = function(){
        url = '../componentNewServlet?action=commission';
        return $http.get(url);
    };
    
    srv.saveComponents = function(components){
      url = '../componentNewServlet?action=save';
        xhr = $http({
            method: 'POST',
            url: url,
            params: components,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    };

    // Edit Component
    srv.getComponentEditLabels = function(){
        url = '../componentEditServlet?action=labels';
        return $http.get(url);
    };
    
    srv.getEditComponentById = function(id){
        url = '../componentEditServlet?action=component&id=' + id;
        return $http.get(url);
    };
    
    srv.editComponent = function(component){
      url = '../componentEditServlet?action=edit';
        xhr = $http({
            method: 'POST',
            url: url,
            params: component,
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        return xhr;
    };
  
    srv.getValidationRules = function(){
      url = '../componentEditServlet?action=validationRules';
      return $http.get(url);
    };

    // Public API here
    return {
      getComponentListLabels: function () {
        return srv.getComponentListLabels();
      },
      getComponentNewLabels: function () {
        return srv.getComponentNewLabels();
      },
      getComponentDetailLabels: function () {
        return srv.getComponentDetailLabels();
      },
      getComponentEditLabels: function () {
          return srv.getComponentEditLabels();
      },
      getComponents: function () {
        return srv.getComponents();
      },
      getNewComponents: function () {
          return srv.getNewComponents();
      },
      saveComponents: function (components) {
          return srv.saveComponents(components);
      },
      getComponentById: function (id) {
          return srv.getComponentById(id);
      },
      getEditComponentById: function (id) {
          return srv.getEditComponentById(id);
      },
      editComponent: function (component) {
          return srv.editComponent(component);
      },
      deleteComponent: function (id) {
          return srv.deleteComponent(id);
      },
      identifyComponent: function (id) {
          return srv.identifyComponent(id);
      },
      getValidationRules: function () {
          return srv.getValidationRules();
      }
    };
  });
