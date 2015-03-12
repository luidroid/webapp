'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	return window._; // assumes underscore has already been loaded on the page
});
angular
  .module('webApp', [
    'ngMessages', 'ui.router', 'easypiechart','infinite-scroll','toggle-switch','underscore','angularFileUpload','timer','ngProgress'
  ])
  .constant('HttpStatus', {
	'FORBIDDEN' : 403
  })
  .constant('Roles', {
	'ADMIN' : 'admin',
  })
  .value('WirelessNetwork', {
	'isOpen' : false,
  })
  .config(function($stateProvider, $urlRouterProvider) {
  	 // For any unmatched url, redirect to /login
	 $urlRouterProvider.otherwise('/login');
	  
	 // Set up the states
	 $stateProvider
	    .state('login', {
	       url: '/login',
	       templateUrl: 'views/login.html',
	       controller: 'LoginCtrl'
	    })
	    .state('home', {
	       url: '/home',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@home': { 
	            	templateUrl: 'views/dashboard.html',
	            	controller: 'DashboardCtrl'
	            }
	       }
	    })
	    .state('commission', {
	       url: '/commission',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@commission': { 
	            	templateUrl: 'views/commission.html',
	            	controller: 'CommissionCtrl'
	            }
	       }
	    })
	    .state('components', {
	       url: '/components',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@components': { 
	            	templateUrl: 'views/component_list.html',
	            	controller: 'ComponentListCtrl'
	            }
	       }
	    })
	    .state('components.new', {
	       url: '/new',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html'
	            },
	            'content@components': { 
	            	templateUrl: 'views/component_new.html',
	            	controller: 'ComponentNewCtrl'
	            }
	       }
	    })
	    .state('components.edit', {
	       url: '/edit/:id',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html'
	            },
	            'content@components': { 
	            	templateUrl: 'views/component_edit.html',
	            	controller: 'ComponentEditCtrl'
	            }
	       }
	    })
	    .state('components.details', {
	       url: '/:id',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html'
	            },
	            'content@components': { 
	            	templateUrl: 'views/component_details.html',
	            	controller: 'ComponentDetailsCtrl'
	            }
	       }
	    })
	    .state('routers', {
	       url: '/routers',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@routers': { 
	            	templateUrl: 'views/router_list.html',
	            	controller: 'RouterListCtrl'
	            }
	       }
	    })
	    .state('events', {
	       url: '/events',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@events': { 
	            	templateUrl: 'views/event_list.html',
	            	controller: 'EventListCtrl'
	            }
	       }
	    })
	    .state('network', {
	       url: '/network',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@network': { 
	            	templateUrl: 'views/network.html',
	            	controller: 'NetworkCtrl'
	            }
	       }
	    })
	    .state('wnetwork', {
	       url: '/wnetwork',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@wnetwork': { 
	            	templateUrl: 'views/wnetwork.html',
	            	controller: 'WirelessNetworkCtrl'
	            }
	       }
	    })
	    .state('timesetting', {
	       url: '/timesetting',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@timesetting': { 
	            	templateUrl: 'views/timesettings.html',
	            	controller: 'TimesettingCtrl'
	            }
	       }
	    })
	    .state('certificate', {
	       url: '/certificate',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@certificate': { 
	            	templateUrl: 'views/certificate.html',
	            	controller: 'CertificateCtrl'
	            }
	       }
	    })
	    .state('import', {
	       url: '/import',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@import': { 
	            	templateUrl: 'views/import.html',
	            	controller: 'ImportCtrl'
	            }
	       }
	    })
	    .state('export', {
	       url: '/export',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@export': { 
	            	templateUrl: 'views/export.html',
	            	controller: 'ExportCtrl'
	            }
	       }
	    })
	    .state('password', {
	       url: '/password',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@password': { 
	            	templateUrl: 'views/password.html',
	            	controller: 'PasswordCtrl'
	            }
	       }
	    })
	    .state('about', {
	       url: '/about',
	       views: {
	            '': { 
	            	templateUrl: 'views/main.html',
	            	controller: 'MainCtrl'
	            },
	            'content@about': { 
	            	templateUrl: 'views/about.html',
	            	controller: 'AboutCtrl'
	            }
	       }
	    });
  });
