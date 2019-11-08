import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  editTaskForm = new FormGroup({
    titleFormControl: new FormControl(),
    descriptionFormControl: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sharedService: SharedService
  ) {
    this.editTaskForm = new FormGroup({
      titleFormControl: new FormControl(data.title, [
        Validators.required
      ]),
      descriptionFormControl: new FormControl(data.description, [])
    });
  }

  ngOnInit() {
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dialogRef.close(Object.assign({}, this.editTaskForm.value));
  }
}
