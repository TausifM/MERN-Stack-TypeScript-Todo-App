import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./API";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from "./powerbi-react/Demo";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault();
    addTodo(formData)
    .then(({ status, data }) => {
      if (status !== 201) {
        throw new Error("Error! Todo not saved")
      }
      setTodos(data.todos)
    })
    .catch(err => console.log(err))
  };
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) return console.log(data);
        setTodos(data.todos);
      })
      .catch((err: Error) => console.log(err));
  };
  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) return console.log(data);
        setTodos(data.todos);
      })
      .catch((err: Error) => console.log(err));
  }

  return (
     <main className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/demo" element={<Demo/>}/>
      </Routes>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updatedTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
      </BrowserRouter>
    </main>
  );
}

export default App;
