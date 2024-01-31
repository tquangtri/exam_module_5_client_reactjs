import React, { useEffect } from 'react';
import './App.css';
import EachTodoItem from './EachTodoItem';
import EachTodoItemAction from './EachTodoItemAction';
import { EDIT_ACTION, Task } from './TaskUtils';

type TodoListProp = {
  tasks: Task[],  
  editMode: EDIT_ACTION,
  setEditMode: Function,
  setTaskToEdit : Function,
  taskToEdit : Task
}

export default function TodoList(props : TodoListProp) {
  useEffect(
    () => {
      console.log("task change caught", props.tasks);
    }, [props.tasks])
  return (
    <div className="">
      <ul>
        {
          props.tasks?.map(
            (eachTask : Task) => {
              return (                
              <li key={eachTask.id} className="li_EachTodoItem">
                <EachTodoItem 
                  task={eachTask} 
                  allTask={props.tasks}
                  setTaskToEdit={props.setTaskToEdit}/>

                <EachTodoItemAction 
                  task={eachTask} 
                  allTask={props.tasks}
                  editMode={props.editMode}
                  setEditMode={props.setEditMode}                  
                  setTaskToEdit ={props.setTaskToEdit}
                  taskToEdit ={props.taskToEdit}
                ></EachTodoItemAction>
              </li>
              )
            }
          )
        }
      </ul>
    </div>
  );
}
