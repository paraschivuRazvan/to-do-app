import { TestBed } from '@angular/core/testing';

import { ToDoListContainerService } from './to-do-list-container.service';

describe('ToDoListContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToDoListContainerService = TestBed.get(ToDoListContainerService);
    expect(service).toBeTruthy();
  });
});
