todo.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage) {
	var todos = $scope.todos = todoStorage.get();

    //if smth change in list then upload storage
	$scope.$watch('todos', function () {
		todoStorage.put(todos);
	}, true);

	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}

		todos.push({
			title: newTodo,
			completed: false
		});

		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
        $scope.editing = true;
		$scope.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		$scope.originalTodo = angular.extend({}, todo);
	};


	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		todo.title = todo.title.trim();

		if (!todo.title) {
			$scope.removeTodo(todo);
		}
        $scope.editing = false;
	};

	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
	};

});
