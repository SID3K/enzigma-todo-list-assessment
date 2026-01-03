import { Injectable } from '@angular/core';
import { Task } from '../models/todoList.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public taskList:Task[];
  private idCounter = 3;
  constructor() { 
      this.taskList=[
        {
          id:1,
          assignedTo: "User1",
          status: "Completed",
          dueDate: "2026-01-05",
          priority: "Medium",
          comments: "Code review completed"
      },
      {
        id:2,
        assignedTo: "User2",
        status: "Not Started",
        dueDate: "2026-01-12",
        priority: "Low",
        comments: "Waiting for requirement clarification"
      }
    ];
  }

  getAllTasks(){
    return this.taskList;
  }

  addTask(task: Omit<Task, 'id'>) {
  this.taskList.push({ ...task, id: this.idCounter++ });
}

  updateTask(updated: Task) {
    const index = this.taskList.findIndex(t => t.id === updated.id);
    if (index !== -1) {
      this.taskList[index] = updated;
    }
  }

  deleteTask(id: number) {
    console.log('delete');
    this.taskList = this.taskList.filter(t => t.id != id);
  }
}
