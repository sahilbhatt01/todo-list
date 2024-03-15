
import React, { useState } from 'react';
import TodoModal from './TodoModal';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  
  const openModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (editedTodo) => {
    setTodos(todos.map(todo => todo.id === editedTodo.id ? editedTodo : todo));
    closeModal();
  };

  return (
    <div className="App">
      <h1>MY TODO APP</h1>
      <button onClick={() => openModal(null)}>Add Tasks</button>
      {showModal && (
        <TodoModal
          todo={selectedTodo}
          closeModal={closeModal}
          addTodo={addTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      )}
      <ul>
        {todos.map(todo => (  
          <li key={todo.id}>
            <span onClick={() => openModal(todo)}>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;