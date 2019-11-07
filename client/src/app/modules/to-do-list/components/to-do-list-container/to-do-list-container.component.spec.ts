import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListContainerComponent } from './to-do-list-container.component';

describe('ToDoListContainerComponent', () => {
  let component: ToDoListContainerComponent;
  let fixture: ComponentFixture<ToDoListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
