import React from 'react';
import './App.css';
import TaskUtil, { EDIT_ACTION, Task } from './TaskUtils';

type EachTodoItemActionProp = {
  task: Task
  allTask: Task[],
  editMode: EDIT_ACTION,
  setEditMode : Function,

  taskToEdit: Task,
  setTaskToEdit : Function,
}

export default function EachTodoItemAction(props : EachTodoItemActionProp) {
  const handleSelected = () => {
    if(!props.task) return; 
    props.setTaskToEdit(props.task); 

    if(props.editMode === EDIT_ACTION.ADD){
      props.setEditMode(EDIT_ACTION.UPDATE);
      return;
    }
    if(props.editMode === EDIT_ACTION.UPDATE){
      props.setEditMode(EDIT_ACTION.ADD);
      return;
    }
  }

  const handleDelete = () => {
    if(!props.task) return;
    TaskUtil.asyncDeleteTask(props.task.id).then(
      () => {
        alert("DELETE SUCCESS !");
        window.location.reload();
      }
    );
  }

  return (
    <div className="">
      <p>Action: </p>
      <input 
        title="any" 
        placeholder="any"
        value="any" 
        type="checkbox" 
        onChange={handleSelected}
      />

      <button 
        type="button"
        onClick={handleDelete}>
        TRASH
      </button>
       
    </div>
  );
}
