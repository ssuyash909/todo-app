import { useEffect, useState } from 'react';

import {Button} from './components/ui/button';
import { Input } from './components/ui/input';
import TodoItem from './components/ui/TodoItem';
import { useJokes } from './hooks/useJokes';

import type{ Todo } from './types/todo';

import './App.css'


function App() {
  const {joke , isLoading} = useJokes(); 
  const [value,setValue] = useState<string>("");
  const [todos,setTodos] = useState<Todo[]>(() =>{
    const todos = localStorage.getItem('todos');
    if(todos)
      return JSON.parse(todos) as Todo[]
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  
  const handleAdd = () =>{
    setTodos([...todos,{
      id: Date.now().toString(),
      title : value, 
      isCompleted : false
    }]);
    setValue("");
  }

  const handleToggleCheck =(id : string) => {
    const updatedState  = todos.map(todo => todo.id == id ? {...todo, isCompleted: !todo.isCompleted} : todo );
    setTodos(updatedState);
  }

  const handleDelete = ( id : string) => {
    const updatedState  = todos.filter(todo => todo.id !== id);
    setTodos(updatedState);
  }

  return (
      <div className="flex w-[100vw] h-[100vh] items-center justify-center">
        <div className='w-[30vw]'>
          {!isLoading ? <div>{joke?.setup}{joke?.punchline}</div> : <div>Loading.....</div>}
          <div className='flex gap-[20px] mt-[10px]'>
            <Input value={value} onChange={(e) =>{setValue(e.target.value)}} placeholder='Type something here'></Input>
            <Button onClick={handleAdd} disabled={value.trim() === ""}>Add</Button>
          </div>
          <div className='mt-[5px]'>
          {todos.map((todo)=>(
            <TodoItem 
            item={todo} 
            key={todo.id}
            onMarkComplete={(id) => handleToggleCheck(id)}
            onDelete={(id) => handleDelete(id)}
            ></TodoItem>
          ))}
          </div>

        </div>
      </div>
  )
}

export default App
