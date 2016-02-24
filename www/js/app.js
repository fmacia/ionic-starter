// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'controllers', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

	.state('app.contactos', {
    url: '/contactos',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactos.html',
				controller: 'ContactsCtrl'
      }
    }
  })

	.state('app.dispositivo', {
		url: '/dispositivo',
		views: {
			'menuContent': {
				templateUrl: 'templates/dispositivo.html',
				controller: 'DeviceCtrl'
			}
		}
	})

	.state('app.vibracion', {
		url: '/vibracion',
		views: {
			'menuContent': {
				templateUrl: 'templates/vibracion.html',
				controller: 'VibrateCtrl'
			}
		}
	})

	.state('app.toast', {
		url: '/toast',
		views: {
			'menuContent': {
				templateUrl: 'templates/toast.html',
				controller: 'ToastCtrl'
			}
		}
	})

	.state('app.bateria', {
		url: '/bateria',
		views: {
			'menuContent': {
				templateUrl: 'templates/bateria.html',
				controller: 'BatteryCtrl'
			}
		}
	})

	.state('app.camara', {
		url: '/camara',
		views: {
			'menuContent': {
				templateUrl: 'templates/camara.html',
				controller: 'CameraCtrl'
			}
		}
	})

	.state('app.motion', {
		url: '/motion',
		views: {
			'menuContent': {
				templateUrl: 'templates/motion.html',
				controller: 'MotionCtrl'
			}
		}
	})

	.state('app.red', {
		url: '/red',
		views: {
			'menuContent': {
				templateUrl: 'templates/red.html',
				controller: 'NetworkCtrl'
			}
		}
	})

	.state('app.compartir', {
		url: '/compartir',
		views: {
			'menuContent': {
				templateUrl: 'templates/compartir.html',
				controller: 'ShareCtrl'
			}
		}
	})

	.state('app.sqlite', {
		url: '/sqlite',
		views: {
			'menuContent': {
				templateUrl: 'templates/sqlite.html',
				controller: 'SqliteCtrl'
			}
		}
	})

	.state('app.sonidos', {
		url: '/sonidos',
		views: {
			'menuContent': {
				templateUrl: 'templates/sonidos.html',
				controller: 'SoundCtrl'
			}
		}
	});

  // if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/contactos');
});
