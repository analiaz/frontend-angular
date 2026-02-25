import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFooter } from './todo-footer';

describe('TodoFooter', () => {
  let component: TodoFooter;
  let fixture: ComponentFixture<TodoFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
