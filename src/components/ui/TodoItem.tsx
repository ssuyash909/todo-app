import React from "react";

import { Checkbox } from "./checkbox";
import type { Todo } from "@/types/todo";
import { MdDelete } from "react-icons/md";

interface TodoItemprops {
    item : Todo;
    onMarkComplete :(id: string) => void,
    onDelete :(id: string) => void,
}

const TodoItem : React.FC<TodoItemprops> = ({item, onMarkComplete, onDelete}) =>{

    return(
        <div  className="flex items-center gap-[5px]" key={item.id}>
        <Checkbox checked={item.isCompleted} onCheckedChange={(checked) => {
            if(checked){
                onMarkComplete(item.id);    
            }else{
                onMarkComplete(item.id); 
            }
        }}/>
        <p className={ item.isCompleted ? "line-through" : " " }>{item.title}</p>
        {item.isCompleted && <MdDelete onClick={() =>{
            if(onDelete){
                onDelete(item.id);
            }
        }} />}
      </div>
    )
}

export default TodoItem;