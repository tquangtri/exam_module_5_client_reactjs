import axios from "axios";

export type Task = {
  id: number,
  name: string,
  status: string,
}

export enum EDIT_ACTION {
  ADD,
  UPDATE,
}

export enum TASK_STATUS {
  DONE,
  NOT_DONE,
}

export type GetAllTaskResponse = {

}


const URL_SERVER = "http://localhost:8000/api/";
const URL_SERVER_TASK = "http://localhost:8000/api/v1/tasks/";

export default class TaskUtil {
  static isDone(task : Task) : boolean {
    if(!task) return false;
    if(Number(task.status) === TASK_STATUS.DONE){
      return true;
    }
    return false;
  }

  static getDefaultTask(): Task {
    return {
      id: 0,
      name: "none",
      status: "none",
    }
  }

  static async asyncGetTasks() {
    let tasks: any = [];
    await axios.get(URL_SERVER_TASK)
      .then(
        (any: any) => {
          console.log("======================Got response============================");
          console.log(any);
          tasks = any.data.content;
        })
      .catch(err => {
         console.log("AXIOS CALL FAILURE", err)
    });
    return tasks;
  }
  
  static async asyncAddTask(task : Task) {
    let reponse : any;
    task.status = TASK_STATUS.NOT_DONE + "";
    await axios.post(URL_SERVER_TASK, {task: task})
      .then(
        (any: any) => {
          console.log("======================Got response============================");
          console.log(any);
          reponse = any;
        })
      .catch(err => {
         console.log("AXIOS CALL FAILURE", err)
         reponse = {
          status: 400
         };
    });
    return reponse;
  }

  
  static async asyncUpdateTask(task : Task) {
    let reponse : any;
    await axios.put(URL_SERVER_TASK, {task: task})
      .then(
        (any: any) => {
          console.log("======================Got response============================");
          console.log(any);
          reponse = any;
        })
      .catch(err => {
         console.log("AXIOS CALL FAILURE", err)
    });
    return reponse;
  }
  

  static async asyncDeleteTask(id : number) {
    if(isNaN(Number(id))) return;

    let res: any;
    await axios.delete(URL_SERVER_TASK + id,)
      .then(
        (any: any) => {
          console.log("======================Got response============================");
          console.log(any);
          res = any;
        })
      .catch(err => {
         console.log("AXIOS CALL FAILURE", err)
    });
    return res;
  }
}