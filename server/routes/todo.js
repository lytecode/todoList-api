const todoRouter = require("express").Router();
const {
  createTodo,
  findTodos,
  findTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todo");
const auth = require("../middleware/auth");

todoRouter.post("/", auth, createTodo);
todoRouter.get("/", findTodos);
todoRouter.get("/:todoId", findTodo);
todoRouter.put("/:todoId", auth, updateTodo);
todoRouter.delete("/:todoId", auth, deleteTodo);

module.exports = todoRouter;
