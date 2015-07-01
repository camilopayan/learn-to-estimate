var app = angular.module("FirePom", [])
// Factory to keep the timer state
.controller('timerController', ['$scope', '$timeout',
	function($scope, $timeout){
		$scope.pom = {};		
		settings = {};		
		settings.pomTime = 5;
		settings.shortRestTime = 3;
		settings.longRestTime = 3;
		$scope.pom.state = "POMODORO";
		$scope.pom.count = 0;
		$scope.pom.startTime = settings.pomTime;
		$scope.pom.timeoutId = null;
		//Kept in milliseconds.
		$scope.pom.timeLeft = settings.pomTime * 1000;


		$scope.pom.start = function(){
			$scope.pom.state = "POMODORO";
			tick();
		};
		
		$scope.pom.cancel = function(){
			clearTimeout();
			$scope.pom.state = "POMODORO";
			$scope.pom.timeLeft = settings.pomTime * 1000;
		};

		var finishPhase = function(){
			switch ( $scope.pom.state ){
				case "POMODORO":
					$scope.pom.count++;
					if ($scope.pom.count % 4 === 0 && $scope.pom.count > 0) {
						$scope.pom.state = "LONGBREAK";
						$scope.pom.timeLeft = settings.longRestTime * 1000;
						break;
					}
					$scope.pom.state = "SHORTBREAK";
					$scope.pom.timeLeft = settings.shortRestTime * 1000;
					break;
				case "LONGBREAK":
				case "SHORTBREAK":
					$scope.pom.state = "POMODORO";
					$scope.pom.timeLeft = settings.pomTime * 1000;
					break;
			}
		};

		var tick = function (){
			$scope.pom.timeLeft -= 1000;

			if($scope.pom.timeLeft <= 0){
				finishPhase();
				if($scope.pom.state === "POMODORO") {
					clearTimeout();
					return;
				}
			}

			$scope.pom.timeoutId = $timeout( tick, 1000 );
		};

		var clearTimeout = function(){
			$timeout.cancel( $scope.pom.timeoutId );
			$scope.pom.timeoutId = null;
		};

	}]
)


// Seconds to Minutes:Seconds filter
.filter('timeify', 
	function() {
		return function(input){
			var time  = input/1000;
			m = time / 60;
			s = time  % 60;
			return Math.floor(m) + ':' + ( s < 10 ? ('0'+s) : s );
		};
	}
);
