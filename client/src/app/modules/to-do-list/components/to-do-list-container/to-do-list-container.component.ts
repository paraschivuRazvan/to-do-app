import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListContainerService } from './to-do-list-container.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Task } from './to-do-list.model';

import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-to-do-list-container',
  templateUrl: './to-do-list-container.component.html',
  styleUrls: ['./to-do-list-container.component.scss']
})
export class ToDoListContainerComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public showLoading = false;
  public taskList: Task[];
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  newTaskForm = new FormGroup({
    taskTitle: new FormControl()
  });

  constructor(
    private toDoListContainerService: ToDoListContainerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
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

      this.subscription.add(this.toDoListContainerService.createTask(sendData).subscribe(
        (resp: Task) => {
          this.taskList.push(resp);
          this.resetForm(this.newTaskForm);
          this.showLoading = false;
        },
        error => {
          console.error('CONTROLLER ERROR ' + error.message);
          this.openConfirmationDialog(error.message);
          this.showLoading = false;
        }
      ));
    }
  }

  public changeStatus(taskId: number, event: any) {
    const data = {
      status: event.checked
    };
    this.subscription.add(this.toDoListContainerService.updateTask(taskId, data).subscribe(
      (resp: Task) => {
        this.taskList.forEach(function (item: any, index: number) {
          if (item.id === taskId) {
            this.taskList[index] = resp;
          }
        }.bind(this));

        this.snackBar.open('Task status changed successfully.', '', {
          duration: 3000
        });
        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.openConfirmationDialog(error.message);
        this.showLoading = false;
      }
    ));
  }

  public editTask(task: any) {
    const data = Object.assign({}, task);

    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: data
    });

    this.subscription.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoading = true;
        const data = {
          title: result.titleFormControl,
          description: result.descriptionFormControl
        };

        this.toDoListContainerService.updateTask(task.id, data).subscribe(
          (resp: Task) => {
            this.snackBar.open('Task edited successfully.', '', {
              duration: 3000
            });

            this.taskList.forEach(function (item: any, index: number) {
              if (item.id === task.id) {
                this.taskList[index] = resp;
              }
            }.bind(this));
            this.showLoading = false;
          },
          error => {
            console.error('CONTROLLER ERROR ' + error.message);
            this.openConfirmationDialog(error.message);
            this.showLoading = false;
          }
        );
      }
    }));
  }

  public confirmDeleteTask(taskId: number) {
    this.openConfirmationDialog(taskId);
  }

  public openConfirmationDialog(taskId: any) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    if (typeof taskId === 'number') {
      this.dialogRef.componentInstance.dialogHeading = 'Attention';
      this.dialogRef.componentInstance.dialogMessage =
        'Are you sure you want to delete this entry?';
      this.dialogRef.componentInstance.btnText = 'Delete';

      this.subscription.add(this.dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteTask(taskId);
        }
        this.dialogRef = null;
      }));
    } else {
      this.dialogRef.componentInstance.dialogHeading = 'Attention';
      this.dialogRef.componentInstance.dialogMessage = taskId;
      this.dialogRef.componentInstance.btnText = 'Ok';

      this.dialogRef.afterClosed().subscribe(result => {
        this.dialogRef = null;
      });
    }
  }

  public deleteTask(taskId: number) {
    this.subscription.add(this.toDoListContainerService.deleteTask(taskId).subscribe(
      (resp: Task) => {
        this.taskList = this.removeFromArray(this.taskList, taskId);
        this.snackBar.open('Task deleted successfully.', '', {
          duration: 3000
        });
        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.openConfirmationDialog(error.message);
        this.showLoading = false;
      }
    ));
  }

  private removeFromArray(array: any[], id: number) {
    return array.filter(el => el.id !== id);
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
      (resp: Task[]) => {
        this.taskList = resp;

        this.showLoading = false;
      },
      error => {
        console.error('CONTROLLER ERROR ' + error.message);
        this.openConfirmationDialog(error.message);
        this.showLoading = false;
      }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
