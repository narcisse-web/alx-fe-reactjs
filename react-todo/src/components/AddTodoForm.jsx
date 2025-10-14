import React, { useState } from "react";

function AddTodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value);
    }
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-6">
      <input
        type="text"
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new todo..."
        aria-label="New todo item"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 ease-in-out"
      >
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
