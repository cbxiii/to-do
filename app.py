from flask import Flask, render_template, request
from dataclasses import dataclass

app = Flask(__name__)


@dataclass
class Todo:
    todo: str

def newTodo(todo) -> Todo:
    return Todo(todo)

todos: list[Todo] = []

@app.route("/")
def main():
    return render_template("index.html", todos=todos)

@app.route("/todo", methods=['POST'])
def todo():
    todo = request.form.get("todo")
    todos.append(newTodo(todo))

    return render_template("todo.html", todos=todos)

if __name__ == "__main__":
    app.run(debug=True)
