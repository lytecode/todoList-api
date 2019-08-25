const todoRouter = require("express").Router();
const {
  createTodo,
  findTodos,
  findTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo");

todoRouter.post("/", createTodo);
todoRouter.get("/", findTodos);
todoRouter.get("/:todoId", findTodo);
todoRouter.put("/:todoId", updateTodo);
todoRouter.delete("/:todoId", deleteTodo);

module.exports = todoRouter;
