'use strict';

/**
 * @ngdoc service
 * @name webApp.Reddit
 * @description
 * # Reddit
 * Factory in the webApp.
 */
angular.module('webApp')
  .factory('Reddit', function ($http) {
   // Service logic
  var Reddit = function() {
      this.items = [];
      this.busy = false;
      this.after = '';
  };
   
  Reddit.prototype.nextPage = function() {
      if (this.busy){
        return;
      } 
      this.busy = true;

      var url = '../eventListServlet?action=scroll&after=' + this.after;
      $http.get(url).success(function(data) {
        if(data.events){
          var items = data.events;
            for (var i = 0; i < items.length; i++) {
              this.items.push(items[i]);
            }
            this.after = this.items[this.items.length - 1].id;
            this.busy = false;
        }
      }.bind(this));
   };

   return Reddit;
  });
