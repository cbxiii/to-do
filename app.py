from dataclasses import dataclass

from flask import Flask, render_template, request

app = Flask(__name__)

id = 0


@dataclass
class Todo:
    todo: str
    id: int


class Todos:
    def __init__(self):
        self.todos: list[Todo] = []
        self.id = 0

    def newTodo(self, todo) -> Todo:
        self.id += 1
        new_todo = Todo(todo, self.id)
        self.todos.append(new_todo)
        return new_todo

    def remove(self, id) -> bool:
        index = self.indexOf(id)
        if index != -1:
            print(self.todos[index])
            del self.todos[index]
            return True
        else:
            return False

    def indexOf(self, id) -> int:
        for i, t in enumerate(self.todos):
            if t.id == id:
                print(i)
                return i
        return -1

    def get_todos(self) -> list[Todo]:
        return self.todos


todo_list = Todos()
todos = todo_list.get_todos()


@app.route("/")
def main():
    return render_template("index.html", todos=todos)


@app.route("/todo", methods=["POST"])
def todo():
    todo = request.form.get("todo")
    todo_list.newTodo(todo)

    return render_template("todo.html", todos=todos)


@app.route("/todo/<int:id>", methods=["DELETE"])
def complete(id):
    if not todo_list.remove(id):
        return "todo not found...", 404
    todos = todo_list.get_todos()
    return render_template("todo.html", todos=todos)

if __name__ == "__main__":
    app.run(debug=True)
