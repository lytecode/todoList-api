const Todos = require("../models/todo");

module.exports = {
  /**
   * @route   POST /api/todos
   * @desc    Create todo
   * @access  Private
   */
  createTodo: async (req, res) => {
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({
        message: "Item field cannot be empty"
      });
    }
    const newItem = new Todos({ item });
    const todo = await newItem.save();
    res.status(201).json({
      message: "success",
      data: todo
    });
  },

  /**
   * @route   GET /api/todos
   * @desc    GET  todos
   * @access  Public
   */
  findTodos: async (req, res) => {
    const todos = await Todos.find().sort({ date: -1 });
    res.status(200).json({
      message: "success",
      todos
    });
  },

  /**
   * @route   GET /api/todos/:todoId
   * @desc    GET  contact
   * @access  Public
   */
  findTodo: async (req, res) => {
    const { todoId } = req.params;

    try {
      const todo = await Todos.findById({ _id: todoId });
      res.status(200).json({
        message: "success",
        todo
      });
    } catch (err) {
      res.status(400).json({
        message: `The id ${todoId} does not exist`
      });
    }
  },

  /**
   * @route   PUT /api/todos/:todoId
   * @desc    UPDATE todo
   * @access  Public
   */
  updateTodo: async (req, res) => {
    const { todoId } = req.params;
    const { item } = req.body;

    if (!item) {
      return res.status(400).json({
        message: "Item field cannot be empty"
      });
    }

    try {
      const todo = await Todos.findOneAndUpdate(
        { _id: todoId },
        { item },
        { new: true }
      );

      res.status(200).json({
        message: "Todo successfully updated",
        data: todo
      });
    } catch (err) {
      res.status(404).json({
        message: `Cannot update a todo with the id ${todoId}`
      });
    }
  },

  /**
   * @route   DELETE /api/todos/:todoId
   * @desc    DELETE Todo
   * @access  Public
   */
  deleteTodo: async (req, res) => {
    const { todoId } = req.params;

    try {
      await Todos.findOneAndDelete({ _id: todoId });
      res.status(200).json({
        message: "Todo successfully deleted"
      });
    } catch (err) {
      res.status(404).json({
        message: `Todo with the id ${todoId} doesn't exist`
      });
    }
  }
};
