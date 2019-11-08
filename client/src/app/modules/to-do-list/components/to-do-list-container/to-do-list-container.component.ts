import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoListContainerService } from './to-do-list-container.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list-container',
  templateUrl: './to-do-list-container.component.html',
  styleUrls: ['./to-do-list-container.component.css']
})
export class ToDoListContainerComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private showLoading = false;

  constructor(private toDoListContainerService: ToDoListContainerService) { }

  ngOnInit() {

    this.showLoading = true;

    this.subscription.add(this.toDoListContainerService.getListOfTasks().subscribe(
      resp => {
        console.log('getListOfTasks');
        console.log(resp);
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
