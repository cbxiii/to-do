const form = document.querySelector("#todo-form");
const list = document.querySelector("#todo-list");
const buttonAddTodo = document.querySelector("#button-add-todo");

let todos = [];

if (localStorage["data"] !== null && localStorage["data"] !== undefined) {
    todos = JSON.parse(localStorage["data"]);
}

function buildUI() {
    let HTML = ``;
    todos.forEach((todo) => {
        HTML += `
            <li id="${todo.id}">
                ${todo.title}
                <button aria-label="Complete" class="button-complete">
                    X
                </button>
            </li>`;
    });
    list.innerHTML = HTML;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // don't allow empty todo value
    if (!form[0].value) {
        buttonAddTodo.classList.add("shake");
        return;
    }    

    // add to-do to data and render UI
    addTodo(event);
    form.reset();
})

buttonAddTodo.addEventListener("animationend", () => {
    buttonAddTodo.classList.remove("shake", "added");
});

function addTodo() {

    todos.push({
        title: form[0].value,
        complete: false, // item isn't complete yet
        id: self.crypto.randomUUID() // gives each list item unique identifiers!
    });

    // update data
    localStorage["data"] = JSON.stringify(todos);
    buttonAddTodo.classList.add("added");
    buildUI();
}


// remove todo
document.documentElement.addEventListener("click", (event) => {
    const listItem = event.target.parentElement;

    listItem.classList.toggle("completed");
    setTimeout(() => {
        todos = todos.filter((todo) => todo.id !== event.target.parentElement.id);
        localStorage["data"] = JSON.stringify(todos);
        buildUI();
    }, 1000);
});


buildUI();