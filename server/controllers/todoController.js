"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const Todo_1 = require("../models/Todo");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.Todo.find();
        res.status(200).json({
            todos,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newTodo = new Todo_1.Todo(body);
        const savedTodo = yield newTodo.save();
        const allTodos = yield Todo_1.Todo.find();
        res.status(201).json({
            message: "Todo added",
            todo: savedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield Todo_1.Todo.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield Todo_1.Todo.find();
        res.status(201).json({
            message: "Todo Updated",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTodo = yield Todo_1.Todo.findByIdAndRemove(req.params.id);
        const allTodos = yield Todo_1.Todo.find();
        res.status(201).json({
            message: "Todo Deleted",
            todo: deleteTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteTodo = deleteTodo;
