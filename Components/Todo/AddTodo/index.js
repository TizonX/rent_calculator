import React, { useState } from 'react'
import "../../../style/todo/addTodo.css";
const AddTodo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTodo, setEditedTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, newTodo]);
            setNewTodo('');
        }
    };

    const removeTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        setEditingIndex(null);
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTodo(todos[index]);
    };
    const saveEdit = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = editedTodo;
        setTodos(updatedTodos);
        setEditingIndex(null);
    };
    const cancelEdit = () => {
        setEditingIndex(null);
    };
    return (
        <div className="App">
            <h1>Todo List</h1>
            <div className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTodo}
                                    onChange={(e) => setEditedTodo(e.target.value)}
                                />
                                <button onClick={() => saveEdit(index)}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {todo}
                                <button onClick={() => startEditing(index)}>Edit</button>
                                <button onClick={() => removeTodo(index)}>Remove</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AddTodo