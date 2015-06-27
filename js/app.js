var app = angular.module("FirePom", [])
// Factory to keep the timer state
.controller('timerController', ['$scope', '$interval',
	function($scope, $interval){
		$scope.timer = {};		
		$scope.timer.defaults = {};		
		$scope.timer.defaults.pomTime = 1500;
		$scope.timer.defaults.shortRestTime = 30;
		$scope.timer.defaults.longRestTime = 900;
		$scope.timer.state = null;
		$scope.timer.timeLeft = $scope.timer.defaults.pomTime;

	}]
)


// Seconds to Minutes:Seconds filter
.filter('secondsToString', 
	function() {
		return function(input){
			var s = input % 60;
			return Math.floor(input/60) + ':' + ( s < 10 ? ('0'+s) : s );
		};
	}
);
