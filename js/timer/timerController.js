
app.controller('TimerController', ['PomTimer',
	function(PomTimer){
		var tc = this;
		tc.timeLeft = 0;
		tc.phase = "POMODORO";
		tc.classStatus = null;
		tc.poms = 0;

		function tickCallback(){
			tc.timeLeft =  PomTimer.getTimeLeft();
		}
		tickCallback();
		PomTimer.registerTickCallback(tickCallback);

		PomTimer.registerPhaseCallback(function(){
			tc.phase = PomTimer.getPhase();
			if(tc.phase === "LONGBREAK" || tc.phase === "SHORTBREAK"){
				tc.classStatus = "running break";
			} else {
				tc.classStatus = "";
			}
			tc.poms = PomTimer.getPomCount();
		});

		tc.start = function(){
			PomTimer.startTimer();
			tc.classStatus = "running pom";
		};
		
		tc.cancel = function(){
			PomTimer.stopTimer();
		};

	}]
);
