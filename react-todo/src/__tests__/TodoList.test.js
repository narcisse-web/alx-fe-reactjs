import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import TodoList from '../components/TodoList'; 

test('renders TodoList component with initial todos', () => {
  render(<TodoList />); 

  expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();

  expect(screen.getByText(/Learn about React/i)).toBeInTheDocument();
  expect(screen.getByText(/Meet friend for lunch/i)).toBeInTheDocument();
  expect(screen.getByText(/Build really cool todo app/i)).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/Add a new todo.../i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
});

test('allows user to add a new todo', async () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText(/Add a new todo.../i);
  const addButton = screen.getByRole('button', { name: /Add/i });

  fireEvent.change(input, { target: { value: 'Test new todo' } });
  expect(input.value).toBe('Test new todo'); 

  fireEvent.submit(addButton);

  await waitFor(() => {
    expect(screen.getByText(/Test new todo/i)).toBeInTheDocument();
  });

  expect(input.value).toBe('');
});

test('allows user to toggle a todo as completed/incomplete', async () => {
  render(<TodoList />);

  const todoItem = screen.getByText(/Learn about React/i);

  expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  expect(todoItem).toHaveClass('text-gray-800');

  fireEvent.click(todoItem);

  await waitFor(() => {
    expect(todoItem).toHaveClass('line-through');
  });
  expect(todoItem).toHaveClass('text-gray-500'); 

  fireEvent.click(todoItem);

  expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  expect(todoItem).toHaveClass('text-gray-800');
});

test('allows user to delete a todo', async () => {
  render(<TodoList />);

  const todoText = 'Meet friend for lunch';
  const todoItem = screen.getByText(todoText);
  expect(todoItem).toBeInTheDocument(); 


  const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });


  const deleteButtonForLunch = deleteButtons[1]; 

  fireEvent.click(deleteButtonForLunch);

  await waitFor(() => {
    expect(screen.queryByText(todoText)).not.toBeInTheDocument();
  });

  expect(screen.getByText(/Learn about React/i)).toBeInTheDocument();
});

test('does not add an empty todo', () => {
  render(<TodoList />);

  const input = screen.getByPlaceholderText(/Add a new todo.../i);
  const addButton = screen.getByRole('button', { name: /Add/i });

  const initialTodos = screen.getAllByRole('listitem').length;

  fireEvent.change(input, { target: { value: '   ' } });
  fireEvent.submit(addButton);

  expect(screen.getAllByRole('listitem').length).toBe(initialTodos);
  expect(input.value).toBe(''); // Input should still clear
});

test('displays "No todos yet!" message when list is empty', async () => {
  render(<TodoList />);

  const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
  for (const button of deleteButtons) {
    fireEvent.click(button);
  }

  await waitFor(() => {
    expect(screen.queryByText(/Learn about React/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Meet friend for lunch/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Build really cool todo app/i)).not.toBeInTheDocument();
  });

  expect(screen.getByText(/No todos yet! Add some above./i)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(/Add a new todo.../i);
  const addButton = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(input, { target: { value: 'First todo' } });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText(/First todo/i)).toBeInTheDocument();
    expect(screen.queryByText(/No todos yet! Add some above./i)).not.toBeInTheDocument();
  });
});