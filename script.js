const form = document.querySelector("#todo-form");
const list = document.querySelector("#todo-list");

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
    // add to-do to data and render UI


    todos.push({
        title: event.target[0].value,
        complete: false, // item isn't complete yet
        id: self.crypto.randomUUID() // gives each list item unique identifiers!
    });

    // update data
    localStorage["data"] = JSON.stringify(todos);
    buildUI();
    form.reset();
})

document.documentElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("button-complete")) {
        todos = todos.filter((todo) => todo.id !== event.target.parentElement.id);
        localStorage["data"] = JSON.stringify(todos);
        buildUI();
    }
});

buildUI();