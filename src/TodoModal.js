import React, { useState, useEffect } from 'react';

function TodoModal({ todo, closeModal, addTodo, editTodo, deleteTodo }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDate(todo.date);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !description.trim()) return;
    if (todo) {
      editTodo({
        id: todo.id,
        title,
        date,
        description
      });
    } else {
      addTodo({
        id: new Date().getTime(),
        title,
        date,
        description
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todo.id);
      closeModal();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title....."
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
            required
          />
          <button type="submit">{todo ? 'Edit' : 'Submit'}</button>
          {todo && <button type="button" onClick={handleDelete}>Delete</button>}
        </form>
      </div>
    </div>
  );
}

export default TodoModal;