import { Request, Response } from "express";
import { ITodo } from "../types/todo";
import Todo from "../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({
      todos,
    });
  } catch (error) {
    console.log(error);
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "desc" | "status">;
    const todo: ITodo = new Todo({
      name: body.name,
      desc: body.desc,
      status: body.status,
    });
    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();
    res.status(201).json({
      message: "Todo added",
      todo: newTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(201).json({
      message: "Todo Updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(201).json({
      message: "Todo Deleted",
      todo: deleteTodo,
      todos: allTodos,
    });
  } catch (error) {
    console.log(error);
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
