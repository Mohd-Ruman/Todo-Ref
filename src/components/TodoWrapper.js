import React from 'react'
import { TodoForm } from './TodoForm'
import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

uuidV4();

export const TodoWrapper = () => {

  const [todos, setTodos] = useState([])

  const addTodo = todo => {
    setTodos([...todos, {id : uuidV4(), task: todo,
       completed : false, isEditing : false}])
       console.log(todos)
  }

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    )
  }
  
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? {...todo, isEditing : !todo.isEditing} : todo
      )
    )
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo
      )
    )
  }

  return (
    <div className='TodoWrapper'>
      <h1> Get Things Done !</h1>
      <TodoForm addTodo={addTodo}/>
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
    
  )
}