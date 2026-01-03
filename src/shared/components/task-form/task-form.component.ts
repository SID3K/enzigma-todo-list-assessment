import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  standalone: true
})
export class TaskFormComponent {
  public taskForm!: FormGroup;
  @Output() save = new EventEmitter<any>();

  assignedToOptions = [
    { label: 'Select User', value: '' },
    { label: 'User1', value: 'User1' },
    { label: 'User2', value: 'User2' },
    { label: 'User3', value: 'User3' },
    { label: 'Anjali', value: 'Anjali' },
    { label: 'Kiran', value: 'Kiran' },
    { label: 'Raju', value: 'Raju' }
  ];

  priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
  ];

  statusOptions = [
    { label: 'Not Stared', value: 'Not Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' }
  ];

  constructor(private fb: FormBuilder) {
     this.taskForm = this.fb.group({
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      comments: ['']
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.taskForm.invalid) return;
    this.save.emit(this.taskForm.value);
  }

   isValid(): boolean {
    this.taskForm.markAllAsTouched();
    return this.taskForm.valid;
  }

  getValue() {
    return this.taskForm.value;
  }

  setValue(task: any) {
    this.taskForm.patchValue(task);
  }

  reset() {
    this.taskForm.reset();
  }
}
