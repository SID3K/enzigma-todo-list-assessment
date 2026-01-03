import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Task } from '../../models/todoList.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [TaskFormComponent, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  standalone: true
})
export class TodoListComponent {
  public todoList:Task[];
  public showModal:boolean = false;
  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent;
  public activeMenuTaskId: number | null = null;
  public editingTask: Task | null = null;
  public pageSize:number;
  public pageSizes;
  public currentPage:number;
  public selectedTaskToDelete: Task | null;
  public showDeleteModal:boolean;

  constructor(private taskService:TaskService){
    this.todoList = [];
    this.pageSize = 3;
    this.pageSizes= [3, 5, 10, 20]
    this.currentPage = 1;
    this.selectedTaskToDelete = null;
    this.showDeleteModal = false;
  }

  public ngOnInit(){
    this.todoList = this.taskService.getAllTasks();
  }

  get modalTitle(): string {
  return this.editingTask ? 'Edit Task' : 'Create Task';
}

  get saveButtonLabel(): string {
    return this.editingTask ? 'Update' : 'Save';
  }


  toggleMenu(taskId: number) {
    this.activeMenuTaskId =
    this.activeMenuTaskId === taskId ? null : taskId;
  }

  closeMenu() {
    this.activeMenuTaskId = null;
  }

  public openModal() {
    this.showModal = true;
  }

   closeModal() {
    this.taskFormComponent.reset();
    this.showModal = false;
    this.editingTask = null;
  }


  openCreate() {
    this.editingTask = null;
    this.showModal = true;
  }

  openEdit(task: Task) {
    this.editingTask = task;
    this.showModal = true;

    setTimeout(() => {
      this.taskFormComponent.setValue(task);
    });
  }

  public handleSave() {
     if (!this.taskFormComponent.isValid()) return;

    const data = this.taskFormComponent.getValue();

    if (this.editingTask) {
      console.log('editing')
      this.taskService.updateTask({ ...data, id: this.editingTask.id });
    } else {
      console.log('create')
      this.taskService.addTask(data);
    }

    this.closeModal();
  }

  deleteTask(task: Task) {
      this.taskService.deleteTask(task.id);
      this.todoList = this.taskService.getAllTasks();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }
  }



get tasks() {
  return this.taskService.getAllTasks();
}

get totalPages(): number {
  return Math.ceil(this.tasks.length / this.pageSize);
}

get paginatedTasks() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this.tasks.slice(start, end);
}

changePageSize(size: number) {
  this.pageSize = size;
  this.currentPage = 1;
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

openDeleteModal(task: Task) {
  this.selectedTaskToDelete = task;
  this.showDeleteModal = true;
}

closeDeleteModal() {
  this.selectedTaskToDelete = null;
  this.showDeleteModal = false;
}

confirmDelete() {
  if (!this.selectedTaskToDelete) return;

  this.taskService.deleteTask(this.selectedTaskToDelete.id);

  // handle pagination edge case
  if (this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages || 1;
  }

  this.closeDeleteModal();
}
 
}