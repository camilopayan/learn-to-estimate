app.factory('PomTimer',
[       '$timeout', '$log', 
function($timeout,   $log){
	var settings = {};		
	settings.pomTime = 5;
	settings.shortRestTime = 3;
	settings.longRestTime = 3;

	var pom = {};
	pom.state = "POMODORO";
	pom.count = 0;
	pom.startTime = settings.pomTime;
	pom.timeoutId = null;
	//Kept in milliseconds.
	pom.timeLeft = settings.pomTime;

	var callbacks = {};
	callbacks.tick = [];
	callbacks.phase = [];

	function tick(){
		pom.timeLeft -= 1;
		var done = false;
		if(pom.timeLeft <= 0){
			finishPhase();
			if (pom.state === "POMODORO") {
				clearTimeout();
				done = true;
			}
		}
		angular.forEach(callbacks.tick, function(callback){
			callback();
		});
		if (!done) {
			pom.timeoutId = $timeout( tick, 1000 );
		}
	}

	function finishPhase(){
		switch ( pom.state ){
			case "POMODORO":
				pom.count++;
				if (pom.count % 4 === 0 && pom.count > 0) {
					pom.state = "LONGBREAK";
					pom.timeLeft = settings.longRestTime;
					break;
				}
				pom.state = "SHORTBREAK";
				pom.timeLeft = settings.shortRestTime;
				break;
			case "LONGBREAK":
			case "SHORTBREAK":
				pom.state = "POMODORO";
				pom.timeLeft = settings.pomTime;
				break;
		}
		angular.forEach(callbacks.phase, function(callback){
			callback();
		});
	}

	function clearTimeout(){
		$timeout.cancel( pom.timeoutId );
		pom.timeoutId = null;
	}
	
	// Public service API code.
	var PomTimer = {};
	PomTimer.startTimer = function(){
		pom.state = "POMODORO";
		pom.timeLeft = settings.pomTime;
		tick();
	};
	PomTimer.stopTimer = function(){
		clearTimeout();
		pom.state = "POMODORO";
		pom.timeLeft = settings.pomTime;
	};
	PomTimer.registerTickCallback = function( callback ){
		callbacks.tick.push(callback);
	};
	PomTimer.registerPhaseCallback = function( callback ){
		callbacks.phase.push(callback);
	};
	PomTimer.getTimeLeft = function(){
		return pom.timeLeft;
	};
	PomTimer.getPhase = function(){
		return pom.state;
	};
	PomTimer.getPomCount = function(){
		return pom.count;
	};

	return PomTimer;
}]);
