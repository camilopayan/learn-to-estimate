var app = angular.module("EstimatePom", []);

// Seconds to Minutes:Seconds filter
app.filter('timeify', 
	function() {
		return function(time){
			m = time / 60;
			s = time  % 60;
			return Math.floor(m) + ':' + ( s < 10 ? ('0'+s) : s );
		};
	}
);
