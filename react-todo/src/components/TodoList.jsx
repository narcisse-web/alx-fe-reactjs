import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn about React", isCompleted: false },
    { id: 2, text: "Meet friend for lunch", isCompleted: false },
    { id: 3, text: "Build really cool todo app", isCompleted: false },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          My Todo List
        </h1>
        <AddTodoForm addTodo={addTodo} />

        {todos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-8">
            No todos yet! Add some above.
          </p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm transition duration-200 ease-in-out ${
                  todo.isCompleted ? "opacity-60" : ""
                }`}
              >
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-grow text-lg cursor-pointer select-none ${
                    todo.isCompleted
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;
