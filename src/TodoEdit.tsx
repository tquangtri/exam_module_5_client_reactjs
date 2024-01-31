import React, { useEffect, useState } from 'react';
import './App.css';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TaskUtil, { EDIT_ACTION, Task } from './TaskUtils';


type TodoAddProp = {
  taskToEdit: Task,  
  tasks: Task[],
  editMode: EDIT_ACTION
}

export default function TodoEdit(props : TodoAddProp) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState<string>("");

  const addItem = () => {
    if(!name || !name.length){
      alert("PLS INPUT SOMETHING, DON'T LEAVE EMPTY");
      return;
    }
    if(name.length > 200){
      alert("NAME CAN'T BE LONGER THAN 200 characters");
      return;
    }

    TaskUtil.asyncAddTask({
      id: -1,
      name: name,
      status: "any"
    })
    .then( (res: any) => {
      if(!res || !res.status){
        return;
      }
      if(res.status === 200){
        alert("ADD SUCCESS");
        window.location.reload();
        return;
      }
      if(res.status === 400){
        alert("Add task FAILED, possible reason:"
        + " Duplicate name, empty name or name too long");
        return;
      }
    })
    // .catch(
    //   err => {        
    //     alert("Add task FAILED, possible reason:"
    //     + " Duplicate name, empty name or name too long");
    //     return;
    //   }
    // )
  }

  const updateItem = () => {    
    let tempTask = props.taskToEdit;
    tempTask.name = name;
    console.log("updateItem", tempTask);

    TaskUtil.asyncUpdateTask(tempTask)
    .then( (any: any) => {
      alert("UPDATE SUCCESS");
      window.location.reload();
    });
  }


  useEffect(
    () => {      
      console.log("task change caught in main", tasks);
    }, [tasks])

  return (
    <div className="">
      {
        (props.editMode === EDIT_ACTION.ADD) 
        ? <p>Add to your to do list</p>
        : <p>Update your to do</p>
      }
      <input 
        className="input_text"
        title="any" 
        placeholder="input your task name here"
        value={name} 
        type="text" 
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setName(e.currentTarget.value)
        }}
      />
      <button 
        type = "button"
        className="button_submit"
        title="any" 
        onClick={() => {
          if(props.editMode === EDIT_ACTION.ADD){
            addItem();
            return;
          }
          if(props.editMode === EDIT_ACTION.UPDATE){
            updateItem();
            return;
          }
        }}
      >
        {
        (props.editMode === EDIT_ACTION.ADD) 
        ? <p>Add item</p>
        : <p>Update item</p>
      }
      </button>
    </div>
  );
}
