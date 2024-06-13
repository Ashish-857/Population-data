import React, { useState, useEffect } from 'react';

function Local() {
  // State ko local storage se initialize karna
  const [myData, setMyData] = useState(() => {
    const storedData = localStorage.getItem('myData');
    return storedData ? JSON.parse(storedData) : { name: '', age: 0, city: '', todos: [] };
  });

  // State ko local storage mein update karna
  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(myData));
  }, [myData]);

  // Input fields ke changes ko handle karne ke liye
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // To-do add karne ke liye function
  const handleAddTodo = () => {
    // Check if the input is not empty
    if (myData.newTodo.trim() !== '') {
      setMyData(prevData => ({
        ...prevData,
        todos: [...prevData.todos, { id: Date.now(), text: prevData.newTodo.trim() }],
        newTodo: '' // Clear the input field after adding
      }));
    }
  };

  // To-do delete karne ke liye function
  const handleDeleteTodo = (id) => {
    setMyData(prevData => ({
      ...prevData,
      todos: prevData.todos.filter(todo => todo.id !== id)
    }));
  };

  return (
    <div>
      <input type="text" name="name" value={myData.name} onChange={handleChange} />
      <input type="number" name="age" value={myData.age} onChange={handleChange} />
      <input type="text" name="city" value={myData.city} onChange={handleChange} />
      <input
        type="text"
        name="newTodo"
        value={myData.newTodo || ''}
        onChange={handleChange}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {myData.todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Local;
