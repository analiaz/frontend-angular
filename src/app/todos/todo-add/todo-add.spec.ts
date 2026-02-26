import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TodoAdd } from './todo-add';
import { crear } from '../todo.action';

describe('TodoAdd', () => {
  let component: TodoAdd;
  let fixture: ComponentFixture<TodoAdd>;
  let store: MockStore;

  const initialState = {
    todos: [],
    filtro: 'todos'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoAdd],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un FormControl con validador required', () => {
    expect(component.txtInput).toBeDefined();
    expect(component.txtInput.hasError('required')).toBe(true);
  });

  it('debería despachar acción crear cuando el input es válido', () => {
    spyOn(store, 'dispatch');

    component.txtInput.setValue('Nueva tarea');
    component.agregar();

    expect(store.dispatch).toHaveBeenCalledWith(crear({ content: 'Nueva tarea' }));
  });

  it('NO debería despachar acción crear cuando el input está vacío', () => {
    spyOn(store, 'dispatch');

    component.txtInput.setValue('');
    component.agregar();

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('debería resetear el input después de agregar', () => {
    component.txtInput.setValue('Nueva tarea');
    component.agregar();

    expect(component.txtInput.value).toBeNull();
  });
});
