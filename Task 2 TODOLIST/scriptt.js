const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
    if (filter && filter !== todo.status) {
        return '';
    }
    let checked = todo.status === "completed" ? "checked" : "";
    return `
    <li class="todo">
        <label for="${index}">
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
            <span>${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
    `;
}

function showTodos() {
    if (todosJson.length === 0) {
        todosHtml.innerHTML = '';
    } else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    }
}

function addTodo(todo) {
    input.value = "";
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

function updateStatus(element) {
    const index = element.id;
    todosJson[index].status = todosJson[index].status === "pending" ? "completed" : "pending";
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

function remove(element) {
    const index = element.dataset.index;
    todosJson.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}

addButton.addEventListener("click", () => {
    const todo = input.value.trim();
    if (todo) {
        addTodo(todo);
    }
});

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const todo = input.value.trim();
        if (todo) {
            addTodo(todo);
        }
    }
});

deleteAllButton.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
});

filters.forEach((filterElement) => {
    filterElement.addEventListener("click", () => {
        filter = filterElement.dataset.filter;
        showTodos();
    });
});