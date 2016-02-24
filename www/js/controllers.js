var app = angular.module('controllers', []);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

//Contactos
app.controller('ContactsCtrl', function($scope, $cordovaContacts){

	$scope.phoneContacts = [];
	$scope.mostrar = false;

  $scope.getContacts = function() {
		$scope.mostrar = true;
    $scope.phoneContacts = [];

    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
    };

    function onError(contactError) {
      alert(contactError);
    };

    var options = {};
    options.multiple = true;

    $cordovaContacts.find(options).then(onSuccess, onError);
  };
});

//Información del cacharro
app.controller('DeviceCtrl', function($scope, $ionicPlatform, $cordovaDevice, $timeout){
	var device = $cordovaDevice.getDevice();
	$scope.manufacturer = device.manufacturer;
	$scope.model = device.model;
	$scope.platform = device.platform;
	$scope.uuid = device.uuid;
});

//Vibración
app.controller('VibrateCtrl', function($ionicPlatform, $scope, $cordovaVibration, $timeout) {
  $ionicPlatform.ready(function() {
		$scope.vibrarCorto = function() {
			$cordovaVibration.vibrate(100);
		};

		$scope.vibrarLargo = function() {
			$cordovaVibration.vibrate(500);
		};

    $scope.vibrarPatron = function() {
      // A vibration pattern
      $cordovaVibration.vibrate([100, 300, 100, 300, 500]);
    };
  });
});

//Toasts
app.controller('ToastCtrl', function($ionicPlatform, $scope, $cordovaToast) {
	$scope.data = {
		texto : 'Texto de ejemplo',
		duracion : 'long',
		posicion : 'bottom',
	};
  $ionicPlatform.ready(function() {
    $scope.showToast = function() {
			//todo: probar si va sin englobar los datos en data
			//en el primer intento no funcionó
			//Aclaración sobre lo anterior: ng-model debe ser algo.dato, cuando encuentre la
			//web donde lo vi, lo pondré
      $cordovaToast.show($scope.data.texto, $scope.data.duracion, $scope.data.posicion);
    }
  });
});

//Batería
app.controller('BatteryCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaBatteryStatus) {
  $ionicPlatform.ready(function() {
		//no es la manera de hacerlo de angular ni ionic, pero es la unica manera
		//de la que me funciona
		window.addEventListener("batterystatus", onBatteryStatus, false);

		function onBatteryStatus(info) {
    	$scope.batteryLevel = info.level;
			$scope.isPluggedIn = info.isPlugged;
		};
  });
});

//Cámara
app.controller('CameraCtrl', function($ionicPlatform, $scope, $cordovaCamera, $ionicModal) {
  $ionicPlatform.ready(function() {
		$scope.imgSrc = 'img/ionic.png';
		if(typeof Camera != 'undefined'){
			var options = {
	      quality: 70,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: false,
	      encodingType: Camera.EncodingType.JPEG,
	      popoverOptions: CameraPopoverOptions,
				allowEdit: true,
				correctOrientation: true,
				//correctOrientation: false,
	      saveToPhotoAlbum: true
	  	};
		}

    $scope.takePicture = function() {
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.imgSrc = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        console.log(err);
      });
    };

		$scope.showImage = function() {
  		$scope.showModal('templates/image.html');
		};

		$scope.showModal = function(templateUrl) {
		  $ionicModal.fromTemplateUrl(templateUrl, {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		  });
		};

		$scope.closeModal = function() {
		  $scope.modal.hide();
		  $scope.modal.remove()
		};

  });
});

//Acelerómetro
//se para al rato
app.controller('MotionCtrl', function($ionicPlatform, $scope, $timeout, $cordovaDeviceMotion) {
  $ionicPlatform.ready(function() {
    // Values @ this instance
    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
      $scope.X = result.x;
      $scope.Y = result.y;
      $scope.Z = result.z;
      $scope.timeStamp = result.timestamp;
  }, function(err) {
    // An error occurred. Show a message to the user
    console.log(err);
  });

  // Keep watching for change in values
  // watch Acceleration
  var options = {
    frequency: 2000
  };

  $scope.watch = $cordovaDeviceMotion.watchAcceleration(options);
  $scope.watch.then(
    null,
    function(error) {
      // An error occurred
    },
    function(result) {
      $scope.X = result.x;
      $scope.Y = result.y;
      $scope.Z = result.z;
      $scope.timeStamp = result.timestamp;
    });

    $timeout(function() {
      $scope.watch.clearWatch();
    }, 10000);
  });
});

//Conexión a la red
//no funcionan los eventos
app.controller('NetworkCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaNetwork) {
  $ionicPlatform.ready(function() {
    $scope.type = $cordovaNetwork.getNetwork();
    $scope.isOnline = $cordovaNetwork.isOnline();
    $scope.isOffline = $cordovaNetwork.isOffline();

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
      $scope.isOnline = true;
			$scope.isOffline = false;
			alert('on');
      // Sync local data to your server here
    });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
			$scope.isOnline = false;
			$scope.isOffline = true;
			alert('off');
      // the device is offline, we need to store the data locally
    });
  });
});

//Compartir
app.controller('ShareCtrl', function($ionicPlatform, $scope, $cordovaSocialSharing) {
  $ionicPlatform.ready(function() {
    var message = 'Mensaje demo';
    var subject = 'Asunto demo';
    var link = 'http://somerandom.link/image.png'; // fake image

    $scope.nativeShare = function() {
      $cordovaSocialSharing.share(message, subject, link); // Share via native share sheet
    };
  });
});

//Sqlite
app.controller('SqliteCtrl', function($ionicPlatform, $scope, $cordovaSQLite, $sce) {
    /*$ionicPlatform.ready(function() {
        $scope.messages = '';

        var db = $cordovaSQLite.openDB({
            name: "demo.db"
        });

        $scope.messages = '';
        $scope.showMessage = function(msg) {
            $scope.messages += $sce.trustAsHtml('> '+msg);
        }

        $scope.showMessage('<b>Opened new DB</b><br/>');

        db.transaction(function(tx) {

            // Drop demo_table if it exists
            tx.executeSql('DROP TABLE IF EXISTS demo_table');
            $scope.showMessage('<b>Dropped exsiting demo_table</b><br/>');

            // create table
            tx.executeSql('CREATE TABLE IF NOT EXISTS demo_table (id integer primary key, data text, data_num integer)');
            $scope.showMessage('<b>Created demo_table</b><br/>');

            $scope.showMessage('<b>Inserting Sample Data</b><br/>');
            // insert sample data
            tx.executeSql("INSERT INTO demo_table (data, data_num) VALUES (?,?)", ["demo", 100], function(tx, res) {

                $scope.showMessage('&nbsp;&nbsp;&nbsp;insertId: ' + res.insertId + '<br/>');
                $scope.showMessage('&nbsp;&nbsp;&nbsp;rowsAffected: ' + res.rowsAffected + '<br/>');

            });
        });

    });*/
});

//Sonido. Funciona, pero no hay manera de pausar.
app.controller('SoundCtrl', function($ionicPlatform, $scope, $timeout, $cordovaNativeAudio){
	$scope.sound = 'Nada que ver';
  $ionicPlatform.ready(function() {
		//preloadSimple -> para sonidos muy cortos, no se pueden pausar
    $cordovaNativeAudio.preloadComplex('mazinger', 'audio/mazinger.m4a', 1, 1);
  });

  $scope.playSound = function() {
		$scope.sound = 'mazinger';
    $cordovaNativeAudio.play($scope.sound);
  };

	$scope.stopSound = function() {
		$cordovaNativeAudio.stop($scope.sound);
	};
});

//Sonido. No chuta
/*app.controller('SoundCtrl', function($ionicPlatform, $scope, $cordovaMedia){
	$scope.play = function(src) {
	        $scope.media = $cordovaMedia.newMedia(src);
	        $scope.media.play();
					$scope.src="nananana lideeer";
	    }

	    var mediaStatusCallback = function(status) {
	        if(status == 1) {
	            $ionicLoading.show({template: 'Loading...'});
	        } else {
	            $ionicLoading.hide();
	        }
	    }



	/*$scope.data = {
		src : 'audio/debutante.mp3',
	};
	$ionicPlatform.ready(function(){
	  var media = $cordovaMedia.newMedia(scope.data.src);

		$scope.playSong = function(){
			media.play();
		};
	});*/

  /*var iOSPlayOptions = {
    numberOfLoops: 0,
    playAudioWhenScreenIsLocked : false
  }
  media.play(iOSPlayOptions); // iOS only!*/

  /*media.play(); // Android

  media.pause();

  media.stop();

  media.release();

  media.seekTo(5000); // milliseconds value

  media.setVolume(0.5);

  media.startRecord();

  media.stopRecord();
});*/

//el filtro orderBy por defecto es incapaz de ordenar objetos, para ello
//se usa esta función
app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
