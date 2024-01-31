import React, { useEffect, useState } from 'react';
import './App.css';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TaskUtil, { EDIT_ACTION, Task } from './TaskUtils';
import TodoEdit from './TodoEdit';

export default function Main() {
  const [taskToEdit, setTaskToEdit] = useState<Task>(TaskUtil.getDefaultTask());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editMode, setEditMode] = useState<EDIT_ACTION>(EDIT_ACTION.ADD);


  useEffect(
    () => {
      TaskUtil.asyncGetTasks()
      .then(
        (allTasks : Task[]) => {
          console.log("setTASK");
          if(!allTasks) return;
          let sortedTasks = allTasks.sort((a, b ) => {
            if(!TaskUtil.isDone(a) && TaskUtil.isDone(b)){
              return -1;
            }
            if(TaskUtil.isDone(a) && !TaskUtil.isDone(b)){
              return 1;
            }
            return 0;
          }); 
          setTasks(sortedTasks); 
        }
      );
    }, [])

  useEffect(
    () => {      
      console.log("task change caught in main", tasks);
      if(!tasks){
        return;
      }
    }, [tasks]);

  useEffect(
      () => {      
        console.log("editMode change caught in main", editMode);
      }, [editMode])

  return (
    <div className="">
      <TodoHeader></TodoHeader>

      <TodoList 
        tasks={tasks} 
        editMode = {editMode}
        setEditMode = {setEditMode} 
        setTaskToEdit = {setTaskToEdit}
        taskToEdit = {TaskUtil.getDefaultTask()}
      ></TodoList>

      <TodoEdit 
        tasks={tasks} 
        editMode = {editMode}
        taskToEdit  = {taskToEdit} 
      ></TodoEdit>
    </div>
  );
}
