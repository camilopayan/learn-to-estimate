app.factory('TodoService',
[		  'PomTimer', '$log',
function(PomTimer, $log){
	var todolist = [];
	var donelist = [];
	var activetodo = null;

	var TodoService = {};

	TodoService.addTodo = function(task, estimate){
		var todo = {
			task: task,
			estimate: estimate,
			poms: 0
		};
		if(todolist.length === 0){
			activetodo = todo;
			return;
		}
		todolist.push(todo);
	};

	TodoService.finish = function(){
		donelist.push(activetodo);
		activetodo = todolist.pop();
	};

	TodoService.deleteTodo = function(i){
		todolist.splice(i,1);
	};

}]);
