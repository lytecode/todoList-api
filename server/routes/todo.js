const todoRouter = require("express").Router();

todoRouter.post("/", createTodo);
todoRouter.get("/", findTodos);
todoRouter.get("/:todoId", findTodo);
todoRouter.put("/:todoId", updateTodo);
todoRouter.delete("/:todoId", deleteTodo);

module.exports = todoRouter;
