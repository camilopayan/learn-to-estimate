
app.controller('TimerController', ['PomTimer',
	function(PomTimer){
		var tc = this;
		tc.timeLeft = 0;
		tc.phase = "POMODORO";
		tc.poms = 0;

		function tickCallback(){
			tc.timeLeft =  PomTimer.getTimeLeft();
		}
		tickCallback();
		PomTimer.registerTickCallback(tickCallback);

		PomTimer.registerPhaseCallback(function(){
			tc.phase = PomTimer.getPhase();
			tc.poms = PomTimer.getPomCount();
		});

		tc.start = function(){
			PomTimer.startTimer();
		};
		
		tc.cancel = function(){
			PomTimer.stopTimer();
		};

	}]
);
