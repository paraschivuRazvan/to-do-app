import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListContainerComponent } from './components/to-do-list-container/to-do-list-container.component';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

export const ROUTES: Routes = [
  {
    path: '',
    component: ToDoListContainerComponent
  }
];

@NgModule({
  declarations: [ToDoListContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ToDoListModule { }
