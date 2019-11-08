import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [ProgressSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [ProgressSpinnerComponent]
})
export class SharedModule { }
