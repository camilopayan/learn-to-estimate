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
