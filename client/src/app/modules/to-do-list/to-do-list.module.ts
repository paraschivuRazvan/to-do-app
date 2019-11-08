import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ToDoListContainerComponent } from './components/to-do-list-container/to-do-list-container.component';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ToDoListContainerComponent
  }
];

@NgModule({
  declarations: [ToDoListContainerComponent, EditTaskComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [EditTaskComponent],
  exports: [ToDoListContainerComponent, EditTaskComponent]

})
export class ToDoListModule { }
