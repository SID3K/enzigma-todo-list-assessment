import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../shared/models/todoList.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoListComponent } from '../shared/components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  public todoList : Task[];

  constructor(){
    this.todoList = [];
  }
  


  

}
