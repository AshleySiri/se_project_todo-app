import { v4 as uuidv4 } from "https://esm.sh/uuid@9";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

let todoSection;

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todoSection.setItem(todoElement);
};

todoSection = new Section(
  {
    data: initialTodos,
    renderer: renderTodo,
  },
  ".todos__list"
);

todoSection.renderItems();

const addTodoForm = document.querySelector("#add-todo-popup .popup__form");
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const newTodo = {
      name: inputValues.name,
      date,
      id: uuidv4(),
    };

    const todoElement = generateTodo(newTodo);
    todoSection.setItem(todoElement);

    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
