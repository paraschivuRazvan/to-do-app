import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListContainerService } from './to-do-list-container.service';

import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-to-do-list-container',
  templateUrl: './to-do-list-container.component.html',
  styleUrls: ['./to-do-list-container.component.scss']
})
export class ToDoListContainerComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public showLoading = false;
  public taskList: any;

  newTaskForm = new FormGroup({
    taskTitle: new FormControl()
  });

  constructor(private toDoListContainerService: ToDoListContainerService) {
    this.taskList = [];
  }

  ngOnInit() {

    this.newTaskForm = new FormGroup({
      taskTitle: new FormControl('', [Validators.required])
    });

    this.getTasks();

  }

  public addTask() {
    if (this.newTaskForm.valid) {
      this.showLoading = true;

      const sendData = {
        title: this.newTaskForm.get('taskTitle').value,
        description: ''
      };

      this.toDoListContainerService.creteTask(sendData).subscribe(
        resp => {
          this.taskList.push(resp);
          this.resetForm(this.newTaskForm);
          this.showLoading = false;
        },
        error => {
          console.log('CONTROLLER ERROR' + error.error_description);
          this.showLoading = false;
        }
      );
    }
  }

  public editTask(taskId) {
    
  }

  public deleteTask(taskId) {

  }

  public resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }

  public getTasks() {
    this.showLoading = true;

    this.subscription.add(this.toDoListContainerService.getListOfTasks().subscribe(
      resp => {
        console.log('getListOfTasks');
        console.log(resp);

        this.taskList = Object.keys(resp).map(function (key) {
          return resp[key];
        });

        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR' + error.error_description);
        this.showLoading = false;
      }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
