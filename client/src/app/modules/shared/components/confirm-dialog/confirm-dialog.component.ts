import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  public dialogHeading: string;
  public dialogMessage: string;
  public btnText: string;
  public showCancelBtn: boolean;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    this.showCancelBtn = false;
  }

  ngOnInit() { }
}
