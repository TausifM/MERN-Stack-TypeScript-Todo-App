import React from "react";
type Props = TodoProps & {
  updatedTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};
const TodoItem: React.FC<Props> = ({ todo, updatedTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.desc}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updatedTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done"}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
