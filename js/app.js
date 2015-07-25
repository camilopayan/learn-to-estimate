var app = angular.module("EstimatePom", ['ngSanitize']);

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

app.filter('pomify', function(){
	return function( numPoms ){
		o = "";
		for( i = 0; i< numPoms; i++ ){
			o += '<i class="fa fa-check-circle"></i>';
		}
		return o;
	};
});
