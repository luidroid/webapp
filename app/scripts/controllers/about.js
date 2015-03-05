'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('AboutCtrl', function ($scope) { console.log('about ctrl ok');
    $scope.translation = {
      'title' : 'About Device',
      'editButton': 'Edit',
      'gateway' : {
      	'legend': 'Information',
      	'id': 'Wireless mac address',
      	'fw': 'Firmware version',
      	'hw': 'Hardware version',
      	'os': 'OS version'
      }
    };
  });
