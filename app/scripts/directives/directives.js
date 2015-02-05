'use strict';

/**
 * @ngdoc directive
 * @name webApp.directives
 * @description
 * # directives
 * Directive in the webApp.
 */
angular.module('webApp')
	.directive('match', function () {	  
		 return {
	         require: 'ngModel',
	         restrict: 'A',
	         scope: {
	             match: '='
	         },
	         link: function(scope, elem, attrs, ctrl) {
	             scope.$watch(function() {
	                 var modelValue = ctrl.$modelValue || ctrl.$$invalidModelValue;
	                 return (ctrl.$pristine && angular.isUndefined(modelValue)) || scope.match === modelValue;
	             }, function(currentValue) {
	                 ctrl.$setValidity('match', currentValue);
	             });
	         }
	     };	
	})
	.directive('dynMinlength', function () {
		return {
		    require: 'ngModel',
		    link: function(scope,elm,attr,ngModel){

		      var minlength = 0;

		      var minLengthValidator = function(value){     
		        var validity = ngModel.$isEmpty(value) || value.length >= minlength;
		        ngModel.$setValidity('minlength',  validity);
		        return validity ? value : undefined;
		      };

		      attr.$observe('dynMinlength', function(val){
		         minlength = parseInt(val,10);
		         minLengthValidator(ngModel.$viewValue);
		      });

		      ngModel.$parsers.push(minLengthValidator);
		      ngModel.$formatters.push(minLengthValidator);
		    } 
		};		
	})
	.directive('dynMaxlength', function () {
		return {
		    require: 'ngModel',
		    link: function(scope,elm,attr,ngModel){

		      var maxlength = 0;

		      var maxLengthValidator = function(value){     
		        var validity = ngModel.$isEmpty(value) || value.length <= maxlength;
		        ngModel.$setValidity('maxlength',  validity);
		        return validity ? value : undefined;
		      };

		      attr.$observe('dynMaxlength', function(val){
		    	  maxlength = parseInt(val,10);
		    	  maxLengthValidator(ngModel.$viewValue);
		      });

		      ngModel.$parsers.push(maxLengthValidator);
		      ngModel.$formatters.push(maxLengthValidator);
		    } 
		};		
	});