import React from 'react';
import './App.css';
import TaskUtil, { TASK_STATUS, Task } from './TaskUtils';

type EachTodoItemProp = {
  task: Task,
  allTask: Task[],  
  setTaskToEdit : Function,
}

export default function EachTodoItem(props : EachTodoItemProp) {
  return (
    <div className="EachTodoItem">
      <p>id: {props.task?.id}</p>
      <p>name: {props.task?.name}</p>
      <p>status: </p> 
      
      <input 
        title="any" 
        placeholder="any"
        type="checkbox" 
        checked = {TaskUtil.isDone(props.task)} 
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          let doneOrNot = e.currentTarget.value;

          let tempTask = props.task;
          tempTask.status = (doneOrNot ? TASK_STATUS.DONE : TASK_STATUS.NOT_DONE) + "";
          TaskUtil.asyncUpdateTask(tempTask)
          .then((res : any) => {
            alert("UPDATE TASK SUCCESS");
            props.setTaskToEdit(tempTask);
          });
        }}
      />
      
    </div>
  );
}
